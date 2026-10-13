import { NavLink } from "react-router-dom";
import {
  Headphones,
  LayoutList,
  Server,
  Users,
  Package,
  FileText,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";

export default function SuperAdminSidebar() {
  const user = useAuthStore((s) => s.user);

  const links =
    user?.role === "support"
      ? [{ to: "/superadmin/support", label: "Support", icon: Headphones }]
      : [
          { to: "/superadmin/servers", label: "Servers", icon: Server },
          {
            to: "/superadmin/instances",
            label: "Wordpress",
            icon: LayoutList,
          },
          { to: "/superadmin/support", label: "Support", icon: Headphones },
          { to: "/superadmin/users", label: "Users", icon: Users },
          { to: "/superadmin/products", label: "Products", icon: Package },
          { to: "/superadmin/invoices", label: "Invoices", icon: FileText },
          {
            to: "/superadmin/upcomming-renewals",
            label: "Upcomming-Renewals",
            icon: FileText,
          },
        ];

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 border-r border-slate-200 bg-white flex flex-col">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <motion.img
            src="/Cloudedatalogo.svg"
            alt="Cloude Data Logo"
            className="w-9 h-9 object-contain"
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="flex flex-col leading-tight"
            >
              <span className="font-black text-[#17a0fe] text-lg tracking-tight">
                CloudeData
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-rose-500">
                {user?.role === "support" ? "Support Panel" : "Control Panel"}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={16}
                    className={isActive ? "text-indigo-600" : "text-slate-400"}
                  />
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500"
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs uppercase">
            {user?.name?.[0] ?? "A"}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate">
              {user?.name ?? "Admin"}
            </p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
