// src/components/SupportPage.jsx
import React, { useState } from 'react';
import CardStats from './CardStats';
import TicketTable from './TicketTable';
import RaiseTicketModal from './RaiseTicketModal';
import ReplyModal from './ReplyModal';
import { initialTickets } from './dummyTickets';

const SupportPage = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);
  const [replyModal, setReplyModal] = useState({ isOpen: false, ticket: null });
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = (msg) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 4000);
  };

  const handleRaiseTicket = (newTicket) => {
    setTickets(prev => [newTicket, ...prev]);
    showToast(`✅ Ticket raised successfully! ID: ${newTicket.id}`);
  };

  const handleSendReply = (ticketId, replyMessage) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, replies: [...(ticket.replies || []), { id: Date.now().toString(), text: replyMessage, sender: "user", timestamp: new Date().toISOString() }] }
          : ticket
      )
    );
    showToast(`💬 Your reply has been added to ticket ${ticketId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            Support Center
          </h1>
          <p className="text-gray-500 mt-1">Manage your tickets & conversations</p>
        </div>

        <CardStats tickets={tickets} />
        <TicketTable
          tickets={tickets}
          onReplyClick={(ticket) => setReplyModal({ isOpen: true, ticket })}
          onRaiseTicketClick={() => setIsRaiseModalOpen(true)}
        />

        <RaiseTicketModal
          isOpen={isRaiseModalOpen}
          onClose={() => setIsRaiseModalOpen(false)}
          onRaiseTicket={handleRaiseTicket}
        />

        <ReplyModal
          isOpen={replyModal.isOpen}
          onClose={() => setReplyModal({ isOpen: false, ticket: null })}
          ticket={replyModal.ticket}
          onSendReply={handleSendReply}
        />

        {/* Toast Notification */}
        {toast.visible && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-3">
            <i className="fas fa-ticket-alt text-indigo-300"></i>
            <span className="font-medium">{toast.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportPage;