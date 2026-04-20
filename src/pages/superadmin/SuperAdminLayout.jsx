import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { Server, LayoutList } from 'lucide-react';

import { useAuthStore } from '../../store/authStore';

const links = [
  { to: '/superadmin/servers', label: 'Servers', icon: Server },
  { to: '/superadmin/instances', label: 'Instances', icon: LayoutList },
];

export default function SuperAdminLayout() {
  const user = useAuthStore((s) => s.user);
  const authBootstrapped = useAuthStore((s) => s.authBootstrapped);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!authBootstrapped) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-200">
        Loading superadmin access...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'superadmin') {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <aside className="w-72 border-r border-red-900/30 bg-gradient-to-b from-slate-900 via-slate-900 to-red-950/30 p-6">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-widest text-red-300 font-bold">Control Plane</div>
          <div className="text-2xl font-black mt-2">
            Cloude<span className="text-orange-400">Data</span>
          </div>
        </div>
        <nav className="space-y-2">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    isActive ? 'bg-red-600 text-white' : 'text-slate-300 hover:bg-red-900/40 hover:text-white'
                  }`
                }
              >
                <Icon size={16} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10 bg-slate-950">
        <Outlet />
      </main>
    </div>
  );
}
