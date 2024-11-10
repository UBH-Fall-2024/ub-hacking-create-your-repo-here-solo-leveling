'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 w-full z-50"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-purple-900/30 to-background/80 backdrop-blur-md border-b border-purple-500/20" />

      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        {/* Logo/Brand with magical effect */}
        <Link href="/" className="group relative">
          <motion.span 
            className="text-2xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <span className="font-extrabold">sololevel</span>
            <span className="font-medium">.design</span>
          </motion.span>
          <motion.div 
            className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-lg group-hover:opacity-75 transition-opacity opacity-0"
            whileHover={{ opacity: 1 }}
          />
        </Link>

        {/* Main Navigation */}
        <nav className="flex items-center gap-8">
          <Link 
            href="/journey"
            className="relative group"
          >
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Your Journey
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
          </Link>
          
          <Link 
            href="/quests"
            className="relative group"
          >
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Active Quests
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Quick Add Quest Button */}
          <Link href="/story-settings">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-purple-500/25"
            >
              New Quest
            </motion.button>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
