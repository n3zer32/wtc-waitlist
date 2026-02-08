'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BigLogo } from '@/components/BigLogo';

export default function Home() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Something went wrong');
            }

            setIsSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to join waitlist');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 max-w-md"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                        className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
                    >
                        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>

                    <h2 className="text-3xl font-bold text-slate-900">You&apos;re on the list!</h2>
                    <p className="text-lg text-slate-600">
                        We&apos;ll notify you at <span className="font-medium text-slate-900">{email}</span> when we launch.
                    </p>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full max-w-xl space-y-10 text-center"
            >
                {/* Big Interactive Logo */}
                <div className="flex justify-center">
                    <BigLogo />
                </div>

                {/* Message */}
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-medium">
                        <span>✨</span>
                        Coming Soon
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        We&apos;re almost ready!
                    </h1>
                    <p className="text-lg text-slate-600 max-w-md mx-auto">
                        Get AI-powered thumbnail analysis to maximize your click-through rate. Join the waitlist to be first in line.
                    </p>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative max-w-md mx-auto">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 bg-white text-lg
                focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10
                transition-all duration-200"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <motion.button
                        type="submit"
                        disabled={isSubmitting || !email}
                        whileTap={{ scale: 0.98 }}
                        className="group w-full max-w-md mx-auto flex items-center justify-center gap-2
              bg-slate-900 text-white text-lg font-semibold py-4 px-8 rounded-xl
              hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200"
                    >
                        {isSubmitting ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Join the Waitlist
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </>
                        )}
                    </motion.button>
                </form>

                {/* Social Proof */}
                <p className="text-sm text-slate-500">
                    🎉 <span className="font-medium">247</span> creators already signed up
                </p>
            </motion.div>
        </main>
    );
}
