import React, { useEffect, useState } from 'react';

import {
  useAdminReply,
  useAdminTicket,
  useUpdateTicketStatus,
} from '../../hooks/useSupport';
import { getSocket } from '../../services/socket';

const ReplyBubble = ({ reply }) => {
  const isUser = reply.sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
          isUser ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-100'
        }`}
      >
        <p className="text-xs font-semibold opacity-80">{reply.senderName}</p>
        <p className="mt-1 whitespace-pre-wrap">{reply.text}</p>
        {reply.attachment?.url && (
          <a
            href={reply.attachment.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs underline mt-2 block opacity-90"
          >
            {reply.attachment.name || 'Attachment'}
          </a>
        )}
        <span className="text-[10px] opacity-60 block mt-1">
          {new Date(reply.timestamp).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default function AdminReplyModal({ ticketId, isOpen, onClose }) {
  const { data: ticket, refetch } = useAdminTicket(ticketId, isOpen);
  const replyMutation = useAdminReply(ticketId);
  const updateStatus = useUpdateTicketStatus();

  const [replyText, setReplyText] = useState('');
  const [replyFile, setReplyFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [status, setStatus] = useState('Open');
  const [liveReplies, setLiveReplies] = useState([]);

  useEffect(() => {
    if (ticket?.status) setStatus(ticket.status);
  }, [ticket?.status]);

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
        refetch();
      }
    };

    const onStatus = ({ ticketId: id, status: s }) => {
      if (id === ticketId) setStatus(s);
    };

    socket.on('ticket:reply', onReply);
    socket.on('ticket:status', onStatus);

    return () => {
      socket.off('ticket:reply', onReply);
      socket.off('ticket:status', onStatus);
      socket.emit('leave:ticket', ticketId);
    };
  }, [isOpen, ticketId, refetch]);

  useEffect(() => {
    if (!isOpen) {
      setReplyText('');
      setReplyFile(null);
      setFilePreview('');
      setLiveReplies([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const mergedReplies = [...(ticket?.replies || [])];
  liveReplies.forEach((lr) => {
    const key = lr.replyId || lr._id;
    if (!mergedReplies.some((r) => (r.replyId || r._id) === key)) mergedReplies.push(lr);
  });

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    await updateStatus.mutateAsync({ ticketId, status: newStatus });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const fd = new FormData();
    fd.append('text', replyText);
    if (replyFile) fd.append('attachment', replyFile);

    await replyMutation.mutateAsync(fd);
    setReplyText('');
    setReplyFile(null);
    setFilePreview('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div
        className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white font-mono">{ticketId}</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="flex flex-1 min-h-0 flex-col md:flex-row">
          <aside className="md:w-72 border-b md:border-b-0 md:border-r border-white/10 p-4 space-y-3 text-sm shrink-0">
            {ticket ? (
              <>
                <div>
                  <p className="text-slate-500 text-xs uppercase">User</p>
                  <p className="font-semibold text-white">{ticket.userName}</p>
                  <p className="text-slate-400">{ticket.userEmail}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase">Department</p>
                  <p className="text-white">{ticket.department}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase">Priority</p>
                  <p className="text-white">{ticket.priority}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase">Created</p>
                  <p className="text-white">{new Date(ticket.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase mb-1">Status</p>
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    disabled={updateStatus.isPending}
                    className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                  >
                    <option>Open</option>
                    <option>Pending</option>
                    <option>Closed</option>
                  </select>
                </div>
                <p className="text-slate-400 text-xs pt-2 border-t border-white/10">{ticket.subject}</p>
                <p className="text-slate-300 text-xs">{ticket.message}</p>
              </>
            ) : (
              <p className="text-slate-400">Loading...</p>
            )}
          </aside>

          <div className="flex-1 flex flex-col min-h-0 p-4">
            <div className="flex-1 overflow-y-auto mb-4">
              {mergedReplies.length === 0 ? (
                <p className="text-slate-500 text-center py-8 text-sm">No replies yet</p>
              ) : (
                mergedReplies.map((rep, idx) => (
                  <ReplyBubble key={rep.replyId || rep._id || idx} reply={rep} />
                ))
              )}
            </div>

            {status !== 'Closed' && (
              <form onSubmit={handleSubmit} className="border-t border-white/10 pt-4">
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type support reply..."
                  className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-red-500"
                />
                <div className="flex items-center justify-between mt-3 gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-3 py-2 bg-slate-800 rounded-lg text-sm text-slate-300 hover:bg-slate-700">
                      <i className="fas fa-paperclip mr-1"></i> Attach
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setReplyFile(file || null);
                          setFilePreview(file ? file.name : '');
                        }}
                      />
                    </label>
                    {filePreview && <span className="text-xs text-green-400">{filePreview}</span>}
                  </div>
                  <button
                    type="submit"
                    disabled={replyMutation.isPending}
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold disabled:opacity-60"
                  >
                    {replyMutation.isPending ? 'Sending...' : 'Send Reply'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
