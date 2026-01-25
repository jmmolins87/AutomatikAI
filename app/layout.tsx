import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutomatikAI | Human strategy. Artificial intelligence.",
  description: "AI-powered digital marketing agency. We transform your digital presence with innovative strategies and measurable results.",
  keywords: ["digital marketing", "artificial intelligence", "AI", "automation", "growth hacking", "analytics"],
  authors: [{ name: "AutomatikAI Agency" }],
  icons: {
    icon: [
      { url: '/logo/logo.svg', type: 'image/svg+xml' },
      { url: '/logo/logo.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/logo/logo.png',
    apple: [
      { url: '/logo/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
