import React from "react";

export default function MoneyBack() {
  return (
    <div className="w-full flex justify-center px-[1rem] py-[0.75rem] sm:py-[1.25rem]">
      
      <div className="w-full max-w-[60rem] group overflow-hidden rounded-xl sm:rounded-2xl shadow-lg ring-1 ring-slate-900/5 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-0.5">
        
        <img
          src="/moneyback.png"
          alt="Money back guarantee"
          /* removed fixed max-height, using object-contain to show full image */
          className="block w-full h-auto object-contain transition-transform duration-700 ease-in-out group-hover:scale-[1.01]"
          loading="lazy"
          draggable={false}
        />
        
      </div>
    </div>
  );
}