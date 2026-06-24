import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { MessageCircle } from "lucide-react";

export default function WhatsappIcon({
 phoneNumber = "919311472357",
 message = "Hello! I'm interested in your services.",
}) {
 const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

 return (
   <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
     {/* Live Chat badge with floating arrow */}
     <motion.div
       initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: [0, -4, 0] }}
       transition={{
         opacity: { duration: 0.5 },
         y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
       }}
       className="flex items-center gap-1.5 bg-white text-green-700 px-4 py-2 rounded-full shadow-lg border border-green-100 text-sm font-semibold"
     >
       <MessageCircle size={16} className="text-green-500" />
       Live Chat
       {/* Small arrow pointing down */}
       <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-b border-r border-green-100 rotate-45 rounded-sm" />
     </motion.div>

     {/* Main WhatsApp button */}
     <motion.a
       href={whatsappLink}
       target="_blank"
       rel="noopener noreferrer"
       className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl hover:shadow-2xl transition-shadow"
       animate={{
         scale: [1, 1.08, 1],
         boxShadow: [
           "0 8px 25px rgba(34,197,94,0.4)",
           "0 12px 35px rgba(34,197,94,0.7)",
           "0 8px 25px rgba(34,197,94,0.4)",
         ],
       }}
       transition={{
         duration: 2,
         repeat: Infinity,
         ease: "easeInOut",
       }}
       whileHover={{ scale: 1.2 }}
       whileTap={{ scale: 0.95 }}
     >
       <FaWhatsapp size={28} />
       {/* Animated rings */}
       <span className="absolute inset-0 rounded-full bg-green-400 opacity-0 animate-ping" />
       <span className="absolute -inset-2 rounded-full border border-green-400/30 animate-ping" />
     </motion.a>
   </div>
 );
}