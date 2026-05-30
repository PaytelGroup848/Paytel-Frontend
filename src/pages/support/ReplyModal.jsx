import React, { useEffect, useState } from 'react';

import { useAddReply, useTicket } from '../../hooks/useSupport';
import { getSocket } from '../../services/socket';

const ReplyBubble = ({ reply }) => {
  const isUser = reply.sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[85%] rounded-xl px-4 py-2 ${
          isUser ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="text-xs font-semibold opacity-80 mb-1">{reply.senderName || (isUser ? 'You' : 'Support')}</p>
        <p className="text-sm whitespace-pre-wrap">{reply.text}</p>
        {reply.attachment?.url && (
          <a
            href={reply.attachment.url}
            target="_blank"
            rel="noreferrer"
            className={`text-xs underline mt-2 block ${isUser ? 'text-indigo-100' : 'text-indigo-600'}`}
          >
            <i className="fas fa-paperclip mr-1"></i>
            {reply.attachment.name || 'Attachment'}
          </a>
        )}
        <span className={`text-[10px] block mt-1 ${isUser ? 'text-indigo-200' : 'text-gray-400'}`}>
          {new Date(reply.timestamp).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const ReplyModal = ({ isOpen, onClose, ticket: initialTicket }) => {
  const ticketId = initialTicket?.ticketId || initialTicket?.id;
  const { data: ticketData } = useTicket(ticketId);
  const ticket = ticketData || initialTicket;
  const replyMutation = useAddReply(ticketId);

  const [replyText, setReplyText] = useState('');
  const [replyFile, setReplyFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [liveReplies, setLiveReplies] = useState([]);

  useEffect(() => {
    if (!isOpen || !ticketId) return undefined;

    const socket = getSocket();
    socket.emit('join:ticket', ticketId);

    const onReply = ({ ticketId: id, reply }) => {
      if (id === ticketId) {
        setLiveReplies((prev) => {
          const key = reply.replyId || reply._id;
          if (prev.some((r) => (r.replyId || r._id) === key)) return prev;
          return [...prev, reply];
        });
      }
    };

    socket.on('ticket:reply', onReply);

    return () => {
      socket.off('ticket:reply', onReply);
      socket.emit('leave:ticket', ticketId);
    };
  }, [isOpen, ticketId]);

  useEffect(() => {
    if (!isOpen) {
      setReplyText('');
      setReplyFile(null);
      setFileName('');
      setLiveReplies([]);
    }
  }, [isOpen]);

  if (!isOpen || !ticket) return null;

  const baseReplies = ticket.replies || [];
  const mergedReplies = [...baseReplies];
  liveReplies.forEach((lr) => {
    const key = lr.replyId || lr._id;
    if (!mergedReplies.some((r) => (r.replyId || r._id) === key)) {
      mergedReplies.push(lr);
    }
  });

  const canReply = ticket.status === 'Open' || ticket.status === 'Pending';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return alert('Please type your reply');

    const fd = new FormData();
    fd.append('text', replyText);
    if (replyFile) fd.append('attachment', replyFile);

    await replyMutation.mutateAsync(fd);
    setReplyText('');
    setReplyFile(null);
    setFileName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b shrink-0">
          <h3 className="text-xl font-bold text-gray-800">
            <i className="fas fa-reply text-blue-500 mr-2"></i>
            Ticket {ticket.ticketId || ticket.id}
          </h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 min-h-0">
          <div className="bg-gray-50 rounded-lg p-3 mb-2 text-sm text-gray-600">
            <p className="font-semibold">{ticket.subject}</p>
            <p className="text-gray-500 mt-1">{ticket.message}</p>
          </div>

          <div className="max-h-64 overflow-y-auto mb-4">
            {mergedReplies.length === 0 ? (
              <p className="text-gray-400 italic text-sm text-center py-4">No replies yet</p>
            ) : (
              mergedReplies.map((rep, idx) => (
                <ReplyBubble key={rep.replyId || rep._id || idx} reply={rep} />
              ))
            )}
          </div>

          {canReply ? (
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Response *</label>
              <textarea
                rows="3"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
              />
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setReplyFile(file || null);
                    setFileName(file ? file.name : '');
                  }}
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-indigo-50 file:text-indigo-700"
                />
                {fileName && <p className="text-xs text-green-600 mt-1">{fileName}</p>}
              </div>
              <div className="flex justify-end gap-3 mt-5">
                <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={replyMutation.isPending}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow disabled:opacity-60"
                >
                  {replyMutation.isPending ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </form>
          ) : (
            <p className="text-sm text-gray-500 text-center">This ticket is closed.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
