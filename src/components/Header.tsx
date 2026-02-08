"use client";

import { Logo } from "./Logo";

export const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                {/* Logo */}
                <Logo />

                {/* Free Badge */}
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span>Credits:</span>
                    <span className="font-semibold text-green-600">Free</span>
                </div>
            </div>
        </header>
    );
};
