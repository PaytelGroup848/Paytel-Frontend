import React from 'react';

import { useTicketStats } from '../../hooks/useSupport';

const AdminSupportStats = () => {
  const { data: stats, isLoading } = useTicketStats();

  const cards = [
    { title: 'Total Tickets', value: stats?.total ?? 0, icon: 'fa-ticket-alt', color: 'from-blue-500 to-blue-600' },
    { title: 'Open', value: stats?.open ?? 0, icon: 'fa-folder-open', color: 'from-red-500 to-red-600' },
    { title: 'Pending', value: stats?.pending ?? 0, icon: 'fa-clock', color: 'from-amber-500 to-amber-600' },
    { title: 'Closed', value: stats?.closed ?? 0, icon: 'fa-check-circle', color: 'from-green-500 to-green-600' },
    {
      title: 'Replied by Support',
      value: stats?.repliedBySupport ?? 0,
      icon: 'fa-reply-all',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-24 rounded-2xl bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {cards.map((stat) => (
        <div
          key={stat.title}
          className={`bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg p-5 text-white`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">{stat.title}</p>
              <p className="text-3xl font-extrabold mt-1">{stat.value}</p>
            </div>
            <i className={`fas ${stat.icon} text-3xl text-white/30`}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSupportStats;
