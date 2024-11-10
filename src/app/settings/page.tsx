'use client';

import { motion } from 'framer-motion';
import { Brain, Settings2, Lock } from 'lucide-react';
import { useStoryStore } from '@/store/story';

const AI_MODELS = {
  'gpt-4': {
    name: 'GPT-4',
    provider: 'OpenAI',
    description: 'Most capable model, best for creative storytelling',
    icon: Brain,
  },
  'gpt-3.5': {
    name: 'GPT-3.5',
    provider: 'OpenAI',
    description: 'Faster and more cost-effective',
    icon: Brain,
  },
  'gemini-pro': {
    name: 'Gemini Pro',
    provider: 'Google',
    description: 'Google\'s advanced language model',
    icon: Brain,
  },
} as const;

type AIModel = keyof typeof AI_MODELS;

export default function SettingsPage() {
  const { aiModel, setAIModel } = useStoryStore();

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings2 className="w-8 h-8 text-purple-500" />
            Account Settings
          </h1>
          <p className="text-muted-foreground">
            Customize your story generation experience
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* AI Model Selection */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Story Generation Model</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(AI_MODELS).map(([key, model]) => {
                const Icon = model.icon;
                return (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setAIModel(key as AIModel)}
                    className={`
                      relative p-4 rounded-lg border cursor-pointer
                      ${aiModel === key
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-purple-500/20 hover:border-purple-500/50 bg-background/50'}
                      backdrop-blur-sm transition-colors
                    `}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Icon className="w-5 h-5 text-purple-500" />
                        <span className="text-xs text-muted-foreground">
                          {model.provider}
                        </span>
                      </div>
                      <h3 className="font-medium">{model.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {model.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Authentication Section - Placeholder for Auth0 */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-500" />
                Authentication
              </h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-sm hover:bg-purple-500/20 transition-colors"
              >
                Coming Soon
              </motion.button>
            </div>
            <p className="text-sm text-muted-foreground">
              Account management and authentication features will be available soon.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
} 