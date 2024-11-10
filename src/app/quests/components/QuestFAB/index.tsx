'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface QuestFABProps {
  onClick: () => void;
}

export function QuestFAB({ onClick }: QuestFABProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-purple-500/25 flex items-center justify-center group z-50"
    >
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <Plus className="w-6 h-6" />
    </motion.button>
  );
}
