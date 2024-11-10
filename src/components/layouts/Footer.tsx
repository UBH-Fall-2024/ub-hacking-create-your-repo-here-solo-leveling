'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative mt-20"
    >
      {/* Gradient divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="relative">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-purple-900/10" />
        
        <div className="container mx-auto px-4 py-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <motion.h3 
                whileHover={{ scale: 1.05 }}
                className="text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent inline-block"
              >
                SoloLevel.design
              </motion.h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Transform your daily tasks into epic adventures. Every task is a quest, every goal a legendary achievement.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Your Adventure</h4>
              <nav className="flex flex-col space-y-2">
                <Link 
                  href="/journey" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Journey Overview
                </Link>
                <Link 
                  href="/quests" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Active Quests
                </Link>
                <Link 
                  href="/achievements" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Achievements
                </Link>
              </nav>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Resources</h4>
              <nav className="flex flex-col space-y-2">
                <Link 
                  href="/guide" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Adventure Guide
                </Link>
                <Link 
                  href="/showcase" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Quest Showcase
                </Link>
              </nav>
            </div>

            {/* Community */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Community</h4>
              <nav className="flex flex-col space-y-2">
                <a 
                  href="https://twitter.com/sololeveldesign" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Twitter
                </a>
                <a 
                  href="https://discord.gg/sololevel" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discord
                </a>
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-purple-500/20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} SoloLevel.design. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/privacy" 
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy
                </Link>
                <Link 
                  href="/terms" 
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
