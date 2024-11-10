'use client';

import { motion } from 'framer-motion';
import { Brain, Settings2, Lock, User, Book, Sparkles, Sword } from 'lucide-react';
import { useStoryStore } from '@/store/story';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';
import { usePreferencesStore } from '@/store/preferences';

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

interface UserPreferences {
  nickname?: string;
  title?: string;
  catchphrase?: string;
  questStyle?: string;
  personalLore?: string;
}

export default function SettingsPage() {
  const { user } = useUser();
  const { aiModel, setAIModel } = useStoryStore();
  const { preferences, updatePreference } = usePreferencesStore();
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const [formValues, setFormValues] = useState({
    nickname: preferences.nickname || '',
    title: preferences.title || '',
    catchphrase: preferences.catchphrase || '',
    questStyle: preferences.questStyle || '',
    personalLore: preferences.personalLore || '',
  });

  useEffect(() => {
    setFormValues({
      nickname: preferences.nickname || '',
      title: preferences.title || '',
      catchphrase: preferences.catchphrase || '',
      questStyle: preferences.questStyle || '',
      personalLore: preferences.personalLore || '',
    });
  }, [preferences]);

  const handlePreferenceChange = (key: keyof typeof formValues, value: string) => {
    setFormValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveStatus('saving');
      
      Object.entries(formValues).forEach(([key, value]) => {
        updatePreference(key as keyof typeof formValues, value);
      });
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } finally {
      setIsSaving(false);
    }
  };

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
            Settings & Preferences
          </h1>
          <p className="text-muted-foreground">
            Customize your adventure settings and story preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* Profile Customization */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-purple-500" />
              Character Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Adventure Nickname</label>
                <input
                  type="text"
                  value={formValues.nickname}
                  onChange={(e) => handlePreferenceChange('nickname', e.target.value)}
                  placeholder={user?.nickname || 'Your adventurer name'}
                  className="w-full bg-background/50 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Character Title</label>
                <input
                  type="text"
                  value={formValues.title}
                  onChange={(e) => handlePreferenceChange('title', e.target.value)}
                  placeholder="e.g., The Legendary Procrastinator"
                  className="w-full bg-background/50 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
            </div>
          </section>

          {/* Story Preferences */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Book className="w-5 h-5 text-purple-500" />
              Story Preferences
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Personal Catchphrase</label>
                <input
                  type="text"
                  value={formValues.catchphrase}
                  onChange={(e) => handlePreferenceChange('catchphrase', e.target.value)}
                  placeholder="Your signature line in stories"
                  className="w-full bg-background/50 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Quest Style</label>
                <input
                  type="text"
                  value={formValues.questStyle}
                  onChange={(e) => handlePreferenceChange('questStyle', e.target.value)}
                  placeholder="How you prefer to approach challenges"
                  className="w-full bg-background/50 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Personal Lore</label>
                <textarea
                  value={formValues.personalLore}
                  onChange={(e) => handlePreferenceChange('personalLore', e.target.value)}
                  placeholder="Your character's backstory or special traits"
                  className="w-full bg-background/50 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[100px]"
                />
              </div>
            </div>
          </section>

          {/* AI Model Selection */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Story Generation
            </h2>
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

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={isSaving}
              className={`
                px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 
                text-white font-medium transition-all shadow-lg 
                hover:shadow-purple-500/25 disabled:opacity-50 
                flex items-center gap-2
              `}
            >
              {saveStatus === 'saving' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              )}
              {saveStatus === 'success' && "Saved!"}
              {saveStatus === 'error' && "Error saving"}
              {saveStatus === 'idle' && "Save Preferences"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 