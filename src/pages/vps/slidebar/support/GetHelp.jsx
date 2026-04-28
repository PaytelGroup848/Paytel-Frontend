import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle, BookOpen, Video, FileText, MessageCircle,
  ChevronDown, Send, CheckCircle, AlertCircle, Clock, ExternalLink,
  LifeBuoy, Headphones, MessageSquare, Plus, X, Paperclip,
  Ticket, Archive, Reply, Check, Upload, Sparkles, Trash2
} from 'lucide-react';

const GetHelp = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    name: '', email: '', subject: '', department: 'Technical', priority: 'Medium', message: ''
  });
  const [attachments, setAttachments] = useState([]);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pagination
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample tickets (initial data)
  const [tickets, setTickets] = useState([
    { id: '#YCB-973938', subject: 'rapidssl certificate issue', department: 'Technical', status: 'Closed', lastUpdated: '18/02/2026 (04:56)', customerReplied: false },
    { id: '#LYV-811895', subject: 'delhilutyens.com not working', department: 'Technical', status: 'Closed', lastUpdated: '04/02/2026 (10:06)', customerReplied: false },
    { id: '#MOF-687994', subject: 'technical support number', department: 'Technical', status: 'Closed', lastUpdated: '16/12/2025 (06:29)', customerReplied: false },
    { id: '#NWZ-931923', subject: 'transfer domain', department: 'Technical', status: 'Closed', lastUpdated: '13/12/2025 (04:18)', customerReplied: false },
    { id: '#IFL-578932', subject: 'new service and domain transfer', department: 'Technical', status: 'Closed', lastUpdated: '09/12/2025 (11:30)', customerReplied: false },
    { id: '#LLN-413828', subject: 'connect domain', department: 'General Enquiries', status: 'Closed', lastUpdated: '15/08/2025 (19:33)', customerReplied: false },
    { id: '#OPN-001', subject: 'Cannot access VPS console', department: 'Technical', status: 'Open', lastUpdated: '20/04/2026 (14:22)', customerReplied: false },
    { id: '#ANS-002', subject: 'Invoice overdue but paid', department: 'Billing', status: 'Answered', lastUpdated: '19/04/2026 (09:15)', customerReplied: false },
  ]);

  // Stats
  const openTickets = tickets.filter(t => t.status === 'Open').length;
  const answeredTickets = tickets.filter(t => t.status === 'Answered').length;
  const customerReplyTickets = tickets.filter(t => t.customerReplied === true).length;
  const closedTickets = tickets.filter(t => t.status === 'Closed').length;

  // Pagination logic
  const totalEntries = tickets.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentTickets = tickets.slice(startIndex, startIndex + entriesPerPage);

  const generateTicketId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomChars = Array(3).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `#${randomChars}-${randomNum}`;
  };

  const handleInputChange = (e) => {
    setTicketForm({ ...ticketForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files.map(file => ({ name: file.name, size: file.size })));
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const newTicketId = generateTicketId();
    const newTicket = {
      id: newTicketId,
      subject: ticketForm.subject,
      department: ticketForm.department,
      status: 'Open',
      lastUpdated: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
      customerReplied: false,
    };
    setTickets(prev => [newTicket, ...prev]);
    setFormStatus({ type: 'success', message: `Ticket raised! ID: ${newTicketId}` });
    setTicketForm({ name: '', email: '', subject: '', department: 'Technical', priority: 'Medium', message: '' });
    setAttachments([]);
    setIsSubmitting(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setFormStatus({ type: '', message: '' });
    }, 1500);
  };

  const addCustomerReply = (ticketId) => {
    setTickets(prev => prev.map(ticket =>
      ticket.id === ticketId
        ? {
            ...ticket,
            customerReplied: true,
            lastUpdated: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
          }
        : ticket
    ));
  };

  const deleteTicket = (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) {
      setTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
      // Adjust pagination if current page becomes empty
      const newTotalPages = Math.ceil((tickets.length - 1) / entriesPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const faqs = [
    { id: 1, question: 'How do I install Docker on my VPS?', answer: 'Run `curl -fsSL https://get.docker.com | sh` via SSH or use the one-click installer in your VPS Dashboard.' },
    { id: 2, question: 'Difference between Automated and Snapshot backups?', answer: 'Automated backups are incremental and scheduled. Snapshots capture full system state at a point in time.' },
    { id: 3, question: 'How to change root password?', answer: 'Go to VPS Settings → Change Root Password. Enter new password and confirm.' },
    { id: 4, question: 'Can I upgrade my VPS plan?', answer: 'Yes, visit Billing → Plans and select a higher tier. Upgrades are instant.' },
  ];

  const kbLinks = [
    { icon: BookOpen, title: 'Documentation', desc: 'Complete API & user guides', link: '/docs', gradient: 'from-blue-500 to-blue-600' },
    { icon: Video, title: 'Video Tutorials', desc: 'Step-by-step screencasts', link: '/tutorials', gradient: 'from-purple-500 to-purple-600' },
    { icon: FileText, title: 'API Reference', desc: 'REST API endpoints', link: '/api-docs', gradient: 'from-green-500 to-green-600' },
    { icon: MessageCircle, title: 'Community Forum', desc: 'Ask other users', link: '/forum', gradient: 'from-orange-500 to-orange-600' },
  ];

  const getStatusBadge = (status) => {
    const config = {
      Open: { bg: 'bg-amber-100', text: 'text-amber-800', icon: Clock, label: 'Open' },
      Answered: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Reply, label: 'Answered' },
      Closed: { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: CheckCircle, label: 'Closed' },
    };
    const { bg, text, icon: Icon, label } = config[status] || config.Open;
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${bg} ${text}`}>
        <Icon size={12} /> {label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-sm font-semibold mb-5 shadow-md">
            <LifeBuoy size={16} />
            <span>24/7 Priority Support</span>
          </motion.div>
          <motion.h1 initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-900 to-indigo-600 bg-clip-text text-transparent">
            How can we help?
          </motion.h1>
          <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">Track your tickets, get instant answers, or raise a new request. Our support team is here for you.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {[
            { label: 'Open', value: openTickets, icon: Clock, gradient: 'from-amber-400 to-amber-600' },
            { label: 'Answered', value: answeredTickets, icon: Reply, gradient: 'from-blue-400 to-blue-600' },
            { label: 'Customer-Reply', value: customerReplyTickets, icon: MessageSquare, gradient: 'from-emerald-400 to-emerald-600' },
            { label: 'Closed', value: closedTickets, icon: CheckCircle, gradient: 'from-slate-400 to-slate-600' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-5 hover:shadow-2xl transition-all group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:opacity-20 transition`} />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Raise Ticket Button + Table Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Ticket size={24} className="text-indigo-600" />
            Support Tickets
          </h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition"
          >
            <Plus size={18} /> Raise a Ticket
          </motion.button>
        </div>

        {/* Tickets Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-slate-50 to-indigo-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence>
                  {currentTickets.map((ticket, idx) => (
                    <motion.tr
                      key={ticket.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="hover:bg-slate-50/80 transition group"
                    >
                      <td className="px-6 py-4 font-medium text-slate-700">{ticket.department}</td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{ticket.id}</span>
                        <span className="ml-2 text-slate-700">{ticket.subject}</span>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(ticket.status)}</td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{ticket.lastUpdated}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {ticket.status !== 'Closed' && (
                            <button
                              onClick={() => addCustomerReply(ticket.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                              title="Add Customer Reply"
                            >
                              <MessageSquare size={14} /> Reply
                            </button>
                          )}
                          <button
                            onClick={() => deleteTicket(ticket.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition"
                            title="Delete Ticket"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-600">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="border border-slate-300 rounded-lg px-3 py-1 text-sm focus:ring-indigo-500 bg-white"
              >
                <option>10</option><option>25</option><option>50</option>
              </select>
              <span className="text-slate-600">entries</span>
            </div>
            <div className="text-slate-600">
              Showing {startIndex+1} to {Math.min(startIndex+entriesPerPage, totalEntries)} of {totalEntries} entries
            </div>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="px-3 py-1 rounded-lg border bg-white disabled:opacity-50">Previous</button>
              <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg">{currentPage}</span>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className="px-3 py-1 rounded-lg border bg-white disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>

        {/* Combined FAQ + Knowledge Base */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* FAQ */}
            <div className="p-6 border-r border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-md"><HelpCircle size={20} /></div>
                <h2 className="text-2xl font-bold text-slate-800">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-3">
                {faqs.map(faq => (
                  <div key={faq.id} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)} className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-800 hover:bg-slate-50">
                      {faq.question}
                      <ChevronDown size={16} className={`transition-transform ${activeFaq === faq.id ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeFaq === faq.id && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="px-4 pb-4 text-slate-600 border-t pt-3 text-sm">
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
            {/* Knowledge Base */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white shadow-md"><BookOpen size={20} /></div>
                <h2 className="text-2xl font-bold text-slate-800">Knowledge Base</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {kbLinks.map((item, idx) => (
                  <a key={idx} href={item.link} className="group p-4 rounded-xl border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-3 shadow-md`}>
                      <item.icon size={22} className="text-white" />
                    </div>
                    <h3 className="font-bold text-slate-800">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                    <div className="mt-3 flex items-center text-indigo-600 text-xs font-medium gap-1">Explore <ExternalLink size={12} /></div>
                  </a>
                ))}
              </div>
              <div className="mt-6 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-full shadow"><Headphones size={20} className="text-indigo-600" /></div>
                  <div><p className="font-semibold text-slate-800">Still need help?</p><p className="text-xs text-slate-500">24/7 live support</p></div>
                </div>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-md">Contact Us</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Raise Ticket Modal - Enhanced & Larger */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md">
                    <Sparkles size={22} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Raise a New Ticket</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Our team will respond within 24 hours</p>
                  </div>
                </div>
                <button
                  onClick={() => !isSubmitting && setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 transition"
                >
                  <X size={22} className="text-slate-500" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmitTicket} className="p-8 space-y-6">
                {/* Name & Email */}
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={ticketForm.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-base"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={ticketForm.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition text-base"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Subject <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={ticketForm.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition text-base"
                    placeholder="Brief description of the issue"
                  />
                </div>

                {/* Department & Priority */}
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Department</label>
                    <select
                      name="department"
                      value={ticketForm.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-base bg-white"
                    >
                      <option>Technical Support</option>
                      <option>Billing & Accounts</option>
                      <option>General Enquiries</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Priority</label>
                    <select
                      name="priority"
                      value={ticketForm.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-base bg-white"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Message <span className="text-red-500">*</span></label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={ticketForm.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition text-base resize-none"
                    placeholder="Please provide detailed information about your issue..."
                  />
                </div>

                {/* Attachments - Premium */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Attachments (Optional)</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-slate-50/50">
                    <label className="cursor-pointer flex flex-col items-center gap-2">
                      <div className="p-3 bg-indigo-100 rounded-full">
                        <Upload size={24} className="text-indigo-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-600">Click to upload files</span>
                      <span className="text-xs text-slate-400">Supported: PDF, images, logs (Max 5MB each)</span>
                      <input type="file" multiple className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                  {attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                          <div className="flex items-center gap-2 text-sm">
                            <Paperclip size={14} className="text-slate-400" />
                            <span className="text-slate-700 truncate max-w-[250px]">{file.name}</span>
                          </div>
                          <button type="button" onClick={() => removeAttachment(idx)} className="text-red-500 hover:text-red-700 p-1">
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status Message */}
                {formStatus.message && (
                  <div className={`flex items-center gap-2 p-4 rounded-xl text-sm ${formStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {formStatus.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    {formStatus.message}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition text-base"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md text-base"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <><Send size={18} /> Submit Ticket</>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GetHelp;