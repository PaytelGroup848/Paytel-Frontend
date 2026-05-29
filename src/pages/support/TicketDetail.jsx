import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAddReply, useCloseTicket, useTicket } from '../../hooks/useSupport';
import { getSocket } from '../../services/socket';

const ReplyBubble = ({ reply }) => {
  const isUser = reply.sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="text-xs font-bold opacity-80 mb-1">{reply.senderName || (isUser ? 'You' : 'Support')}</p>
        <p className="text-sm whitespace-pre-wrap">{reply.text}</p>
        {reply.attachment?.url && (
          <a
            href={reply.attachment.url}
            target="_blank"
            rel="noreferrer"
            className={`text-xs underline mt-2 block ${isUser ? 'text-indigo-100' : 'text-indigo-600'}`}
          >
            <i className="fas fa-paperclip mr-1"></i>
            {reply.attachment.name || 'View attachment'}
          </a>
        )}
        <span className={`text-[10px] block mt-2 ${isUser ? 'text-indigo-200' : 'text-gray-400'}`}>
          {new Date(reply.timestamp).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const statusStyles = {
  Open: 'bg-red-100 text-red-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Closed: 'bg-green-100 text-green-700',
};

export default function TicketDetail() {
  const { ticketId } = useParams();
  const { data: ticket, isLoading, refetch } = useTicket(ticketId);
  const replyMutation = useAddReply(ticketId);
  const closeTicket = useCloseTicket();

  const [replyText, setReplyText] = useState('');
  const [replyFile, setReplyFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [liveReplies, setLiveReplies] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (ticket?.status) setStatus(ticket.status);
  }, [ticket?.status]);

  useEffect(() => {
    if (!ticketId) return undefined;

    const socket = getSocket();
    socket.emit('join:ticket', ticketId);

    const onReply = ({ ticketId: id, reply }) => {
      if (id === ticketId) {
        setLiveReplies((prev) => {
          const key = reply.replyId || reply._id;
          if (prev.some((r) => (r.replyId || r._id) === key)) return prev;
          return [...prev, reply];
        });
        refetch();
      }
    };

    const onStatus = ({ ticketId: id, status: newStatus }) => {
      if (id === ticketId) setStatus(newStatus);
    };

    socket.on('ticket:reply', onReply);
    socket.on('ticket:status', onStatus);

    return () => {
      socket.off('ticket:reply', onReply);
      socket.off('ticket:status', onStatus);
      socket.emit('leave:ticket', ticketId);
    };
  }, [ticketId, refetch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <i className="fas fa-spinner fa-spin mr-2"></i> Loading ticket...
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Ticket not found</p>
        <Link to="/support" className="text-indigo-600 hover:underline">
          Back to support
        </Link>
      </div>
    );
  }

  const mergedReplies = [...(ticket.replies || [])];
  liveReplies.forEach((lr) => {
    const key = lr.replyId || lr._id;
    if (!mergedReplies.some((r) => (r.replyId || r._id) === key)) mergedReplies.push(lr);
  });

  const canReply = status === 'Open' || status === 'Pending';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const fd = new FormData();
    fd.append('text', replyText);
    if (replyFile) fd.append('attachment', replyFile);

    await replyMutation.mutateAsync(fd);
    setReplyText('');
    setReplyFile(null);
    setFileName('');
  };

  const handleClose = async () => {
    if (!window.confirm('Close this ticket?')) return;
    await closeTicket.mutateAsync(ticketId);
    setStatus('Closed');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/support" className="text-indigo-600 text-sm font-medium hover:underline mb-4 inline-block">
          <i className="fas fa-arrow-left mr-1"></i> Back to tickets
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap justify-between gap-4">
            <div>
              <p className="font-mono text-sm text-gray-500">{ticket.ticketId}</p>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">{ticket.subject}</h1>
              <p className="text-gray-500 text-sm mt-2">
                {ticket.department} · {ticket.priority} priority ·{' '}
                {new Date(ticket.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[status] || 'bg-gray-100'}`}>
                {status}
              </span>
              {canReply && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-3 py-1 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                >
                  Close Ticket
                </button>
              )}
            </div>
          </div>
          <p className="mt-4 text-gray-700 border-t pt-4">{ticket.message}</p>
          {ticket.attachment?.url && (
            <a
              href={ticket.attachment.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-indigo-600 text-sm"
            >
              <i className="fas fa-paperclip"></i>
              {ticket.attachment.name || 'Initial attachment'}
            </a>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 min-h-[300px]">
          <h2 className="font-bold text-gray-800 mb-4">Conversation</h2>
          {mergedReplies.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No replies yet. Support will respond soon.</p>
          ) : (
            mergedReplies.map((rep, idx) => (
              <ReplyBubble key={rep.replyId || rep._id || idx} reply={rep} />
            ))
          )}
        </div>

        {canReply && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your reply</label>
            <textarea
              rows={3}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400"
              placeholder="Type your message..."
            />
            <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setReplyFile(file || null);
                  setFileName(file ? file.name : '');
                }}
                className="text-sm text-gray-500"
              />
              {fileName && <span className="text-xs text-green-600">{fileName}</span>}
              <button
                type="submit"
                disabled={replyMutation.isPending}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-60"
              >
                {replyMutation.isPending ? 'Sending...' : 'Send Reply'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
