// src/components/ReplyModal.jsx
import React, { useState } from 'react';

const ReplyModal = ({ isOpen, onClose, ticket, onSendReply }) => {
  const [replyText, setReplyText] = useState("");
  if (!isOpen || !ticket) return null;

  const supportReplies = ticket.replies?.filter(r => r.sender === "support") || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return alert("Please type your reply");
    onSendReply(ticket.id, replyText);
    setReplyText("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b">
          <h3 className="text-xl font-bold text-gray-800"><i className="fas fa-reply text-blue-500 mr-2"></i>Respond to Support</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
        </div>
        <div className="p-5">
          <div className="bg-gray-50 p-3 rounded-lg mb-4 max-h-32 overflow-y-auto text-sm">
            <p className="font-semibold text-gray-600 mb-1">Support reply:</p>
            {supportReplies.length > 0 ? supportReplies.map((rep, idx) => (
              <div key={idx} className="border-l-4 border-indigo-300 pl-3 py-1 my-2">
                <p className="text-gray-700">{rep.text}</p>
                <span className="text-xs text-gray-400">{new Date(rep.timestamp).toLocaleString()}</span>
              </div>
            )) : <p className="text-gray-400 italic">No support reply yet</p>}
          </div>
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Response *</label>
            <textarea rows="3" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write your reply..." className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"></textarea>
            <div className="flex justify-end gap-3 mt-5">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">Send Reply</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;