'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BigLogo } from '@/components/BigLogo';

type View = 'upload' | 'waitlist' | 'success';

export default function Home() {
    const [view, setView] = useState<View>('upload');
    const [email, setEmail] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setThumbnailPreview(URL.createObjectURL(file));
            setView('waitlist');
        }
    }, []);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailPreview(URL.createObjectURL(file));
            setView('waitlist');
        }
    }, []);

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

            setView('success');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to join waitlist');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        setView('upload');
        if (thumbnailPreview) {
            URL.revokeObjectURL(thumbnailPreview);
            setThumbnailPreview(null);
        }
    };

    return (
        <AnimatePresence mode="wait">
            {/* SUCCESS VIEW */}
            {view === 'success' && (
                <motion.main
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="min-h-screen flex flex-col items-center justify-center px-4"
                >
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
                </motion.main>
            )}

            {/* WAITLIST VIEW */}
            {view === 'waitlist' && (
                <motion.main
                    key="waitlist"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="min-h-screen flex flex-col items-center px-4 pt-12 pb-8"
                >
                    {/* Logo at top */}
                    <div className="flex justify-center mb-12">
                        <BigLogo />
                    </div>

                    <div className="w-full max-w-xl space-y-8 text-center flex-1 flex flex-col justify-center">

                        {/* Message */}
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-medium">
                                <span>✨</span>
                                Coming Soon
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                                We&apos;re almost ready!
                            </h1>
                            <p className="text-lg text-slate-600">
                                Get AI-powered thumbnail analysis. Join the waitlist to be first in line.
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

                            {error && <p className="text-red-500 text-sm">{error}</p>}

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

                        <button onClick={handleBack} className="text-slate-500 hover:text-slate-700 text-sm">
                            ← Go back
                        </button>
                    </div>
                </motion.main>
            )}

            {/* UPLOAD VIEW */}
            {view === 'upload' && (
                <motion.main
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="min-h-screen flex flex-col items-center px-4 pt-12 pb-8"
                >
                    {/* Logo at top */}
                    <div className="flex justify-center mb-12">
                        <BigLogo />
                    </div>

                    <div className="w-full max-w-2xl space-y-8 text-center flex-1 flex flex-col justify-center">

                        {/* Title */}
                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                                Analyze your thumbnail
                            </h1>
                            <p className="text-lg text-slate-600">
                                Compare against top performers in your niche
                            </p>
                        </div>

                        {/* Video Title Input */}
                        <div className="max-w-md mx-auto">
                            <input
                                type="text"
                                value={videoTitle}
                                onChange={(e) => setVideoTitle(e.target.value)}
                                placeholder="Your video title (optional)"
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-center
                  focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10
                  transition-all duration-200"
                            />
                        </div>

                        {/* Upload Zone */}
                        <label
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`
                group relative flex cursor-pointer flex-col items-center justify-center
                rounded-2xl border-2 border-dashed p-12 transition-all duration-300
                ${isDragOver
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-slate-100'
                                }
              `}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="sr-only"
                            />

                            <motion.div
                                animate={{ scale: isDragOver ? 1.1 : 1 }}
                                transition={{ duration: 0.2 }}
                                className={`
                  mb-4 rounded-full p-4 transition-colors
                  ${isDragOver ? 'bg-blue-100' : 'bg-slate-100 group-hover:bg-blue-50'}
                `}
                            >
                                <svg className={`h-10 w-10 ${isDragOver ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </motion.div>

                            <span className="text-lg font-medium text-slate-700">
                                {isDragOver ? 'Drop your thumbnail here' : 'Drag & drop your thumbnail'}
                            </span>
                            <span className="mt-1 text-sm text-slate-500">
                                or click to browse • PNG, JPG up to 10MB
                            </span>
                        </label>
                    </div>
                </motion.main>
            )}
        </AnimatePresence>
    );
}
