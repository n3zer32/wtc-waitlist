"use client";

import { motion } from "framer-motion";

export const Logo = () => {
    return (
        <motion.div
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="flex items-center gap-1.5 cursor-pointer select-none group"
        >
            <span className="text-lg font-semibold tracking-tight text-slate-900">
                willthey
            </span>

            <motion.div
                whileTap={{ scale: 0.9, rotate: -2 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="
          flex items-center justify-center
          bg-white 
          border-2 border-slate-200
          rounded-lg
          px-2 py-0.5
          shadow-sm
          group-hover:border-slate-300 
          group-hover:shadow-md
          group-hover:bg-slate-50
          transition-all duration-150
        "
            >
                <span className="text-lg font-semibold text-slate-900 leading-none">
                    .click
                </span>
            </motion.div>
        </motion.div>
    );
};
