// Basic store setup for story settings 

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StorySettings, Task, GeneratedStory } from '@/types';

interface StoryState {
  settings: Partial<StorySettings>;
  tasks: Task[];
  story: GeneratedStory | null;
  
  // Actions
  setSettings: (settings: Partial<StorySettings>) => void;
  setCustomSetting: (
    type: 'universe' | 'character' | 'narrativeStyle',
    value: string
  ) => void;
  setTasks: (tasks: Task[]) => void;
  setStory: (story: GeneratedStory) => void;
}

export const useStoryStore = create<StoryState>()(
  persist(
    (set) => ({
      settings: {},
      tasks: [],
      story: null,
      
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
    }),
    {
      name: 'story-storage',
    }
  )
);