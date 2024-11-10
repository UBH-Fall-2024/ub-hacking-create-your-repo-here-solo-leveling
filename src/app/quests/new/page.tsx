'use client';

import { motion } from 'framer-motion';
import { QuestForm } from '../components/QuestForm';
import { QuestDialog } from '../components/QuestDialog';

export default function NewQuestPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Create New Quest
          </h1>
          <p className="text-muted-foreground mt-2">
            Define your next epic challenge
          </p>
        </div>

        <QuestForm 
          onClose={() => window.history.back()}
          isNewQuest={true}
        />
      </motion.div>
    </div>
  );
} 