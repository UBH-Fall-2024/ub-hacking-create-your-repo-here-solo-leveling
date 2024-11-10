'use client';

import { motion } from 'framer-motion';
import { StoryConfigForm } from '@/components/story-settings/StoryConfigForm';

export default function StorySettingsPage() {
  return (
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Craft Your Epic Tale
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your universe, character, and narrative style to transform your tasks into legendary quests
          </p>
        </motion.div>

        <StoryConfigForm />
      </div>
    </div>
  );
} 