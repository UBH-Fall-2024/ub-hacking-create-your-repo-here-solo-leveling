'use client';

import { motion } from 'framer-motion';
import { useUser } from '@auth0/nextjs-auth0/client';
import { User, Mail, Calendar, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoading } = useUser();

  if (isLoading) return null;
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        {/* Profile Header */}
        <div className="text-center space-y-4">
          <div className="relative w-24 h-24 mx-auto">
            {user.picture ? (
              <img 
                src={user.picture}
                alt={user.name || 'Profile'}
                className="w-full h-full rounded-full border-4 border-purple-500/20"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-purple-500/10 flex items-center justify-center">
                <User className="w-8 h-8 text-purple-500" />
              </div>
            )}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 rounded-full border-2 border-purple-500/20"
            />
          </div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          {user.email && (
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              {user.email}
            </p>
          )}
        </div>

        {/* Account Details */}
        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-purple-500/20 bg-background/50 backdrop-blur-sm space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-500" />
              Account Details
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Joined {new Date(user.updated_at || '').toLocaleDateString()}
              </p>
              {/* Add more user details as needed */}
            </div>
          </div>

          {/* Add more sections like Quest Stats, Achievements, etc. */}
        </div>
      </motion.div>
    </div>
  );
} 