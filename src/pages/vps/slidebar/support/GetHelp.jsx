import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle, Mail, MessageCircle, BookOpen, Video, FileText,
  ChevronDown, Send, CheckCircle, AlertCircle, Clock, ExternalLink,
  LifeBuoy, Headphones, MessageSquare, Phone
} from 'lucide-react';

const GetHelp = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ Data
  const faqs = [
    {
      id: 1,
      question: 'How do I install Docker on my VPS?',
      answer: 'You can install Docker with a single command from our VPS Dashboard. Go to your VPS > Docker Manager > Install Docker. Or manually via SSH: `curl -fsSL https://get.docker.com | sh`'
    },
    {
      id: 2,
      question: 'What is the difference between Automated and Snapshot backups?',
      answer: 'Automated backups run on a schedule (daily/weekly) and are incremental. Snapshots capture the entire system state at a point in time and are faster to restore but take more storage.'
    },
    {
      id: 3,
      question: 'How can I change my root password?',
      answer: 'Go to VPS Settings > Change Root Password. Enter your new password and confirm. The change will take effect immediately.'
    },
    {
      id: 4,
      question: 'Can I upgrade my VPS plan?',
      answer: 'Yes, go to Billing > Plans and choose a higher tier. The upgrade applies instantly without downtime.'
    },
    {
      id: 5,
      question: 'How do I set up a PTR record for my IP?',
      answer: 'In VPS Settings > IP Address section, click "Set PTR Record" and enter your desired domain name. The change may take up to 24 hours to propagate.'
    }
  ];

  // Knowledge base links
  const kbLinks = [
    { icon: BookOpen, title: 'Documentation', desc: 'Complete API & user guides', link: '/docs' },
    { icon: Video, title: 'Video Tutorials', desc: 'Step-by-step screencasts', link: '/tutorials' },
    { icon: FileText, title: 'API Reference', desc: 'REST API endpoints', link: '/api-docs' },
    { icon: MessageCircle, title: 'Community Forum', desc: 'Ask other users', link: '/forum' }
  ];

  // Mock recent tickets
  const recentTickets = [
    { id: 'T-1001', subject: 'Cannot connect to MySQL container', status: 'Open', date: '2026-04-20' },
    { id: 'T-0998', subject: 'Billing invoice not generated', status: 'Resolved', date: '2026-04-18' },
    { id: 'T-0995', subject: 'High CPU usage alert', status: 'In Progress', date: '2026-04-15' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormStatus({ type: 'success', message: 'Your message has been sent. Our team will respond within 24 hours.' });
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    setTimeout(() => setFormStatus({ type: '', message: '' }), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <LifeBuoy size={16} />
            <span>24/7 Support</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            How can we help?
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Find answers, contact support, or browse our knowledge base. We're here to help you succeed.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <QuickCard icon={Headphones} title="24/7 Live Chat" desc="Talk to an expert instantly" bgColor="bg-indigo-50" textColor="text-indigo-600" />
          <QuickCard icon={Mail} title="Email Support" desc="support@cloudedata.com" bgColor="bg-emerald-50" textColor="text-emerald-600" />
          <QuickCard icon={Phone} title="Call Us" desc="+1 (800) 123-4567" bgColor="bg-amber-50" textColor="text-amber-600" />
        </div>

        {/* Main Grid: FAQ + Contact Form */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="text-indigo-600" size={24} />
              <h2 className="text-xl font-bold text-slate-800">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                    className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-800 hover:bg-slate-50 transition"
                  >
                    {faq.question}
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${activeFaq === faq.id ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 text-slate-600 border-t border-slate-100 pt-3"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="text-indigo-600" size={24} />
              <h2 className="text-xl font-bold text-slate-800">Send us a message</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Brief issue summary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Describe your issue in detail..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : <><Send size={18} /> Send Message</>}
              </button>
              {formStatus.message && (
                <div className={`flex items-center gap-2 p-3 rounded-xl text-sm ${formStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {formStatus.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Knowledge Base Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">Knowledge Base</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kbLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="group bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition">
                  <item.icon className="text-indigo-600" size={24} />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
                <div className="mt-3 flex items-center text-indigo-600 text-sm font-medium gap-1">
                  Explore <ExternalLink size={14} />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-slate-500" />
              <h3 className="font-bold text-slate-800">Your Recent Support Tickets</h3>
            </div>
            <a href="/support/tickets" className="text-sm text-indigo-600 hover:underline">View all</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs font-semibold text-slate-500 bg-white">
                <tr>
                  <th className="px-6 py-3">Ticket ID</th>
                  <th className="px-6 py-3">Subject</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-3 font-mono text-sm font-medium text-slate-700">{ticket.id}</td>
                    <td className="px-6 py-3 text-slate-600">{ticket.subject}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                        ticket.status === 'Open' ? 'bg-amber-100 text-amber-700' :
                        ticket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          ticket.status === 'Open' ? 'bg-amber-500' :
                          ticket.status === 'Resolved' ? 'bg-emerald-500' : 'bg-blue-500'
                        }`} />
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-500">{ticket.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Chat Floating Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-xl hover:bg-indigo-700 transition z-50 flex items-center gap-2"
        >
          <MessageCircle size={24} />
          <span className="hidden md:inline font-semibold">Live Chat</span>
        </motion.button>
      </div>
    </div>
  );
};

// QuickCard Component
const QuickCard = ({ icon: Icon, title, desc, bgColor, textColor }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition">
    <div className={`p-3 rounded-xl ${bgColor} ${textColor}`}>
      <Icon size={24} />
    </div>
    <div>
      <h3 className="font-bold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  </div>
);

export default GetHelp;