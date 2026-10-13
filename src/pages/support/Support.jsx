import React, { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { HeadphonesIcon, Plus } from "lucide-react";

import CardStats from "./CardStats";
import TicketTable from "./TicketTable";
import RaiseTicketModal from "./RaiseTicketModal";
import ReplyModal from "./ReplyModal";
import ViewTicketModal from "./ViewTicketModal";
import { useCloseTicket, useTickets } from "../../hooks/useSupport";

const STATUS_TABS = ["All", "Open", "Pending", "Closed"];

const SupportPage = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("All");
  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);
  const [replyModal, setReplyModal] = useState({ isOpen: false, ticket: null });
  const [viewModal, setViewModal] = useState({ isOpen: false, ticket: null });

  const params = useMemo(
    () => ({
      page: 1,
      limit: 50,
      ...(statusFilter !== "All" ? { status: statusFilter } : {}),
    }),
    [statusFilter],
  );

  const { data, isLoading, refetch } = useTickets(params);
  const closeTicket = useCloseTicket();
  const tickets = data?.items || [];

  const handleCloseTicket = async (ticketId) => {
    if (!window.confirm("Close this ticket?")) return;
    await closeTicket.mutateAsync(ticketId);
    refetch();
  };

  const handleViewClick = (ticket) => setViewModal({ isOpen: true, ticket });
  const handleReplyClick = (ticket) => setReplyModal({ isOpen: true, ticket });

  const handleModalClose = () => {
    setViewModal({ isOpen: false, ticket: null });
    setReplyModal({ isOpen: false, ticket: null });
    setIsRaiseModalOpen(false);
    refetch();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <HeadphonesIcon size={20} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                Support Center
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">
                Manage your tickets &amp; conversations
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsRaiseModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            <Plus size={16} />
            <span>Raise a Ticket</span>
          </button>
        </div>

        {/* Stats */}
        <CardStats tickets={tickets} />

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-5 mt-6 flex-wrap">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                statusFilter === tab
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table / Loading */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-400">Loading tickets...</p>
          </div>
        ) : (
          <TicketTable
            tickets={tickets}
            onViewClick={handleViewClick}
            onReplyClick={handleReplyClick}
            onRaiseTicketClick={() => setIsRaiseModalOpen(true)}
            onCloseTicket={handleCloseTicket}
          />
        )}

        {/* Modals */}
        <RaiseTicketModal
          isOpen={isRaiseModalOpen}
          onClose={() => setIsRaiseModalOpen(false)}
        />
        <ReplyModal
          isOpen={replyModal.isOpen}
          onClose={() => setReplyModal({ isOpen: false, ticket: null })}
          ticket={replyModal.ticket}
        />
        <ViewTicketModal
          isOpen={viewModal.isOpen}
          onClose={handleModalClose}
          ticket={viewModal.ticket}
          onRefresh={refetch}
        />
      </div>
    </div>
  );
};

export default SupportPage;
