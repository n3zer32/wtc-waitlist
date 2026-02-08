"use client";

import { motion } from "framer-motion";

export const BigLogo = () => {
    return (
        <motion.div
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="flex items-center gap-3 cursor-pointer select-none group"
        >
            <span className="text-5xl font-semibold tracking-tight text-slate-900">
                willthey
            </span>

            <motion.div
                whileTap={{ scale: 0.9, rotate: -2 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="
          flex items-center justify-center
          bg-white 
          border-[3px] border-slate-200
          rounded-2xl
          px-6 py-2
          shadow-lg
          group-hover:border-slate-300 
          group-hover:shadow-xl
          group-hover:bg-slate-50
          transition-all duration-150
        "
            >
                <span className="text-5xl font-semibold text-slate-900">
                    .click
                </span>
            </motion.div>
        </motion.div>
    );
};
