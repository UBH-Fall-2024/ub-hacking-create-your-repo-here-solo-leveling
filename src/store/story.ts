// Basic store setup for story settings 

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StorySettings, Task, GeneratedStory } from '@/types';

type AIModel = 'gpt-4' | 'gpt-3.5' | 'gemini-pro';

interface StoryState {
  settings: Partial<StorySettings>;
  tasks: Task[];
  story: GeneratedStory | null;
  aiModel: AIModel;
  
  // Actions
  setSettings: (settings: Partial<StorySettings>) => void;
  setCustomSetting: (
    type: 'universe' | 'character' | 'narrativeStyle',
    value: string
  ) => void;
  setTasks: (tasks: Task[]) => void;
  setStory: (story: GeneratedStory | null) => void;
  setAIModel: (model: AIModel) => void;
  clearStory: () => void;
}

export const useStoryStore = create<StoryState>()(
  persist(
    (set) => ({
      settings: {},
      tasks: [],
      story: null,
      aiModel: 'gpt-4',
      
      setSettings: (newSettings) => 
        set((state) => ({ 
          settings: { ...state.settings, ...newSettings } 
        })),
        
      setCustomSetting: (type, value) =>
        set((state) => ({
          settings: {
            ...state.settings,
            [type]: 'custom',
            [`custom${type.charAt(0).toUpperCase() + type.slice(1)}`]: value,
          },
        })),
        
      setTasks: (tasks) => set({ tasks }),
      setStory: (story) => set({ story }),
      setAIModel: (model) => set({ aiModel: model }),
      clearStory: () => set({ story: null }),
    }),
    {
      name: 'story-storage',
      partialize: (state) => ({
        settings: state.settings,
        tasks: state.tasks,
        story: state.story,
        aiModel: state.aiModel,
      }),
    }
  )
);