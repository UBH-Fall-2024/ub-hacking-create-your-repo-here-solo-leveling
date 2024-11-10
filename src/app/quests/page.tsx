'use client';

import { motion } from 'framer-motion';
import { useStoryStore } from '@/store/story';
import Link from 'next/link';
import { TaskInput } from './components/TaskInput';
import { QuestList } from './components/QuestList';
import { useSearchParams } from 'next/navigation';
import { Edit2 } from 'lucide-react';

export default function QuestsPage() {
  const { settings } = useStoryStore();
  const searchParams = useSearchParams();
  const isNewJourney = searchParams.get('newJourney') === 'true';

  // Check if story settings are fully configured
  const isConfigured = settings.universe && settings.character && settings.narrativeStyle;

  if (!isConfigured) {
    return (
      <div className="container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Configure Your Story Settings First
          </h1>
          <p className="text-muted-foreground">
            Before creating quests, you need to choose your universe, character, and narrative style.
          </p>
          <Link href="/story-settings">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-purple-500/25"
            >
              Configure Story Settings
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Welcome Message for New Journey */}
        {isNewJourney && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4 mb-8"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Your Journey Begins
            </h1>
            <p className="text-muted-foreground">
              Add your first tasks below to transform them into epic quests
            </p>
          </motion.div>
        )}

        {/* Story Settings Summary */}
        <div className="space-y-6">
          {/* Header */}
          <div className="relative p-4 bg-background/30 border border-purple-500/20 rounded-lg backdrop-blur-sm overflow-hidden">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/10 to-purple-500/5"
            />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 blur-sm"
                />
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Your Story Settings
                </h2>
              </div>
              <Link href="/story-settings">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground border border-purple-500/20 hover:border-purple-500/50 transition-all flex items-center gap-2"
                >
                  <span>Edit Settings</span>
                  <Edit2 className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Settings Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Universe Setting */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-background/30 border border-purple-500/20 rounded-lg backdrop-blur-sm group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="relative space-y-2">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                  <span className="text-sm font-medium text-purple-500">Universe</span>
                </div>
                <p className="font-medium break-words whitespace-pre-wrap">
                  {settings.customUniverse || settings.universe}
                </p>
              </div>
            </motion.div>

            {/* Character Setting */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-background/30 border border-purple-500/20 rounded-lg backdrop-blur-sm group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="relative space-y-2">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded"
                  />
                  <span className="text-sm font-medium text-purple-500">Character</span>
                </div>
                <p className="font-medium break-words whitespace-pre-wrap">
                  {settings.customCharacter || settings.character}
                </p>
              </div>
            </motion.div>

            {/* Narrative Style Setting */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-background/30 border border-purple-500/20 rounded-lg backdrop-blur-sm group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="relative space-y-2">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rotate-45"
                  />
                  <span className="text-sm font-medium text-purple-500">Style</span>
                </div>
                <p className="font-medium break-words whitespace-pre-wrap">
                  {settings.customNarrativeStyle || settings.narrativeStyle}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Task Input and Quest List */}
        <div className="space-y-8">
          <TaskInput />
          <QuestList />
        </div>
      </motion.div>
    </div>
  );
}
