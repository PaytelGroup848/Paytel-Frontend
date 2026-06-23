// SuccessBanner.jsx
import { motion } from "framer-motion";

const SuccessBanner = ({ imageSrc, altText = "Success Stories" }) => {
  return (
    <div className="w-full flex justify-center py-10 md:py-14">
      <motion.img
        src="./storie1.webp"
        alt={altText}
        loading="lazy"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-[80vw] h-auto object-cover rounded-2xl shadow-2xl shadow-slate-300/50 ring-1 ring-slate-200"
      />
    </div>
  );
};

export default SuccessBanner; 