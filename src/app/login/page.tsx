'use client';

import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import Link from 'next/link';

// Import Google icon SVG
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Begin Your Journey
          </h1>
          <p className="text-muted-foreground">
            Choose your path to adventure
          </p>
        </div>

        {/* Login Options */}
        <div className="space-y-4">
          <motion.a
            href="/api/auth/login"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 w-full p-3 rounded-lg border border-purple-500/20 hover:border-purple-500/50 bg-background/50 backdrop-blur-sm transition-all"
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </motion.a>

          <motion.a
            href="/api/auth/login"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 w-full p-3 rounded-lg border border-purple-500/20 hover:border-purple-500/50 bg-background/50 backdrop-blur-sm transition-all"
          >
            <Github className="w-5 h-5" />
            <span>Continue with GitHub</span>
          </motion.a>
        </div>

        {/* Terms */}
        <p className="text-xs text-center text-muted-foreground">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-purple-500 hover:text-purple-400">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-purple-500 hover:text-purple-400">
            Privacy Policy
          </Link>
        </p>
      </motion.div>
    </div>
  );
} 