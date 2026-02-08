import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "WillThey.click - Audit your thumbnail before you post",
    description: "Grammarly for YouTube thumbnails. Stop guessing and get an AI rating on your video design.",

    // This creates the "Big Card" on Twitter
    twitter: {
        card: "summary_large_image",
        title: "WillThey.click",
        description: "Grammarly for YouTube thumbnails.",
        creator: "@yourTwitterHandle", // Change this to your handle
        images: ["https://willthey.click/opengraph-image.png"],
    },

    // This handles Discord, iMessage, LinkedIn
    openGraph: {
        title: "WillThey.click",
        description: "Grammarly for YouTube thumbnails.",
        url: "https://willthey.click",
        siteName: "WillThey.click",
        locale: "en_US",
        type: "website",
    },
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
