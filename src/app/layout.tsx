import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "WillThey.Click - Coming Soon",
    description: "AI-powered thumbnail analysis to maximize your click-through rate. Join the waitlist!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gradient-to-b from-slate-50 to-white antialiased">
                {children}
            </body>
        </html>
    );
}
