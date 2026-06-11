import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50 flex items-center justify-center px-4 py-12">
      {/* Blurry orbs — light mode colors */}
      <div className="absolute top-[-100px] left-[-100px] w-[450px] h-[450px] rounded-full bg-indigo-300/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-blue-300/35 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-violet-200/30 blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] right-[15%] w-[250px] h-[250px] rounded-full bg-sky-300/25 blur-[100px] pointer-events-none" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #94a3b8 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Content — centered */}
      <div className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
