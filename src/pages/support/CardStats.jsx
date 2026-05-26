import React from 'react';

const CardStats = ({ tickets }) => {
  const total = tickets.length;
  const closed = tickets.filter(t => t.status === "Closed").length;
  const replied = tickets.filter(t => t.replies?.some(r => r.sender === "support")).length;
  const pending = tickets.filter(t => t.status !== "Closed").length;

  const stats = [
    { title: "Total Tickets", value: total, icon: "fa-ticket-alt", color: "from-blue-500 to-blue-600" },
    { title: "Closed", value: closed, icon: "fa-check-circle", color: "from-green-500 to-green-600" },
    { title: "Replied (Support)", value: replied, icon: "fa-reply-all", color: "from-purple-500 to-purple-600" },
    { title: "Pending", value: pending, icon: "fa-clock", color: "from-amber-500 to-amber-600" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg p-5 text-white transition transform hover:scale-[1.02] duration-200`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium tracking-wide">{stat.title}</p>
              <p className="text-4xl font-extrabold mt-2">{stat.value}</p>
            </div>
            <i className={`fas ${stat.icon} text-4xl text-white/30`}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardStats;