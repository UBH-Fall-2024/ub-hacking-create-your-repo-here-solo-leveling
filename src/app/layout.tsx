import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SoloLevel.design | Transform Tasks into Epic Quests",
  description: "Transform your daily tasks into epic story-driven quests with AI-powered narrative generation.",
  keywords: ["productivity", "gamification", "AI", "storytelling", "task management"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900`}
        suppressHydrationWarning
      >
        <div className="relative min-h-screen flex flex-col">
          {/* Ambient background effects */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
          </div>
          
          <Header />
          
          {/* Main content area */}
          <main className="relative flex-grow pt-16">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
