'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useUser } from '@auth0/nextjs-auth0/client';
import { LogIn, LogOut, User, Settings } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  const { user, isLoading } = useUser();

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
          {!isLoading && (
            <>
              {user ? (
                // Logged in navigation
                <>
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
                  <Link href="/quests/new">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-purple-500/25"
                    >
                      New Quest
                    </motion.button>
                  </Link>

                  {/* User Menu */}
                  <div className="flex items-center gap-4">
                    <Link 
                      href="/settings" 
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <Link 
                      href="/profile" 
                      className="flex items-center gap-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                        {user.picture ? (
                          <Image 
                            src={user.picture} 
                            alt={user.name || 'Profile'} 
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                      </div>
                    </Link>
                    <Link
                      href="/api/auth/logout"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Link>
                  </div>
                </>
              ) : (
                // Non-logged in navigation
                <>
                  <Link 
                    href="/about"
                    className="relative group"
                  >
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      About
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                  <Link
                    href="/api/auth/login"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Get Started
                  </Link>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
}
