import { NavLink, Navigate, Outlet } from "react-router-dom";
import { Headphones, LayoutList, Server } from "lucide-react";

import { useAuthStore } from "../../store/authStore";
import { AnimatePresence, motion } from "framer-motion";

export default function SuperAdminLayout() {
  const user = useAuthStore((s) => s.user);
  const authBootstrapped = useAuthStore((s) => s.authBootstrapped);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const links =
    user?.role === "support"
      ? [
          {
            to: "/superadmin/support",
            label: "Support",
            icon: Headphones,
          },
        ]
      : [
          {
            to: "/superadmin/servers",
            label: "Servers",
            icon: Server,
          },
          {
            to: "/superadmin/instances",
            label: "Instances",
            icon: LayoutList,
          },
          {
            to: "/superadmin/support",
            label: "Support",
            icon: Headphones,
          },
        ];

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

  if (user?.role !== "superadmin" && user?.role !== "support") {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <aside className="w-72 border-r border-red-900/30 bg-gradient-to-b from-slate-900 via-slate-900 to-red-950/30 p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 cursor-pointer min-w-max">
            <div className="relative flex items-center justify-center w-12 h-12">
              <motion.img
                src="/Cloudedatalogo.svg"
                alt="Cloude Data Logo"
                className="
                w-10 h-10
                object-contain
                drop-shadow-xl
                group-hover:scale-110
                transition-transform duration-300
              "
                animate={{ y: [0, -2, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />
            </div>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <span className="font-black text-[#17a0fe] text-lg tracking-tight">
                  Cloude<span className="text-[#17a0fe]">Data</span>
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
          {user?.role === "support" ? (
            <div className="text-xs text-center uppercase tracking-widest text-red-300 font-bold">
              Support Panel
            </div>
          ) : (
            <div className="text-xs uppercase tracking-widest text-red-300 font-bold">
              Control Panel
            </div>
          )}
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
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-slate-300 hover:bg-red-900/40 hover:text-white"
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
