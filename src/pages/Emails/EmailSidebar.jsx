import React, { memo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Mail, Forward, Users, Inbox, ReplyAll,
  Globe, Smartphone, FileText, Download, Shield, BookOpen,
} from 'lucide-react';

const sidebarItems = [
  { label: 'Mailboxes',        icon: Mail,       path: '/emails/mailbox' },
  { label: 'Forwarders',       icon: Forward,    path: '/emails/forwarders' },
  { label: 'Email Aliases',    icon: Users,      path: '/emails/aliases' },
  { label: 'Automatic Reply',  icon: ReplyAll,   path: '/emails/autoreply' },
  // { label: 'Domain Settings',  icon: Globe,      path: '/emails/domain-settings' },
  { label: 'Connect Apps',     icon: Smartphone, path: '/emails/connect' },
  { label: 'Email Logs',       icon: FileText,   path: '/emails/logs' },
  { label: 'DKIM',      icon: Shield,     path: '/emails/dkim' },
  { label: 'Tutorials',        icon: BookOpen,   path: '/emails/tutorials' },
];

const EmailSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  const handleNavigation = useCallback(
    (path) => navigate(path),
    [navigate]
  );

  return (
    <aside className="w-[260px] shrink-0 bg-white/80 backdrop-blur-md border border-slate-200/70 rounded-2xl shadow-sm p-4 space-y-1 self-start">
      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-3 mb-3">
        Email Settings
      </h2>
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        return (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all group ${
              active
                ? 'bg-gradient-to-r from-indigo-50 to-white border border-indigo-200 text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800 border border-transparent'
            }`}
          >
            <Icon size={18} className={`shrink-0 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
};

export default memo(EmailSidebar);