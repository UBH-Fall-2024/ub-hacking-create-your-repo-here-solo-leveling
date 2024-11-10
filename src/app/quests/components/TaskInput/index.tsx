'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { QuestDialog } from '../QuestDialog';
import { QuestForm } from '../QuestForm';

export function TaskInput() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {/* Main Add Quest Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsDialogOpen(true)}
        className="w-full p-4 rounded-lg border border-dashed border-purple-500/50 hover:border-purple-500 bg-background/50 hover:bg-purple-500/10 transition-all group flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <Plus className="w-5 h-5" />
        <span>Add New Quest</span>
      </motion.button>
      
      <QuestDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
      >
        <QuestForm onClose={() => setIsDialogOpen(false)} />
      </QuestDialog>
    </>
  );
} 