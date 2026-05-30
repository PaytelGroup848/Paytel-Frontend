import React, { useMemo, useState } from 'react';

import CardStats from './CardStats';
import TicketTable from './TicketTable';
import RaiseTicketModal from './RaiseTicketModal';
import ReplyModal from './ReplyModal';
import { useCloseTicket, useTickets } from '../../hooks/useSupport';

const STATUS_TABS = ['All', 'Open', 'Pending', 'Closed'];

const SupportPage = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);
  const [replyModal, setReplyModal] = useState({ isOpen: false, ticket: null });

  const params = useMemo(
    () => ({
      page: 1,
      limit: 50,
      ...(statusFilter !== 'All' ? { status: statusFilter } : {}),
    }),
    [statusFilter]
  );

  const { data, isLoading } = useTickets(params);
  const closeTicket = useCloseTicket();
  const tickets = data?.items || [];

  const handleCloseTicket = async (ticketId) => {
    if (!window.confirm('Close this ticket?')) return;
    await closeTicket.mutateAsync(ticketId);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            Support Center
          </h1>
          <p className="text-gray-500 mt-1">Manage your tickets & conversations</p>
        </div>

        <CardStats tickets={tickets} />

        <div className="flex flex-wrap gap-2 mb-4">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                statusFilter === tab
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-white text-gray-600 border hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-gray-400">
            <i className="fas fa-spinner fa-spin mr-2"></i>
            Loading tickets...
          </div>
        ) : (
          <TicketTable
            tickets={tickets}
            onReplyClick={(ticket) => setReplyModal({ isOpen: true, ticket })}
            onRaiseTicketClick={() => setIsRaiseModalOpen(true)}
            onCloseTicket={handleCloseTicket}
          />
        )}

        <RaiseTicketModal isOpen={isRaiseModalOpen} onClose={() => setIsRaiseModalOpen(false)} />

        <ReplyModal
          isOpen={replyModal.isOpen}
          onClose={() => setReplyModal({ isOpen: false, ticket: null })}
          ticket={replyModal.ticket}
        />
      </div>
    </div>
  );
};

export default SupportPage;
