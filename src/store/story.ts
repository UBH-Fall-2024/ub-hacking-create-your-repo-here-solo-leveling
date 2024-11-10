// Basic store setup for story settings 

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, StorySettings, GeneratedStory } from '@/types';

interface StoryState {
  tasks: Task[];
  settings: StorySettings;
  aiModel: string;
  story: GeneratedStory | null;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  removeTask: (taskId: string) => void;
  setSettings: (settings: Partial<StorySettings>) => void;
  setCustomSetting: (key: keyof StorySettings, value: string) => void;
  setAIModel: (model: string) => void;
  setStory: (story: GeneratedStory) => void;
  clearStory: () => void;
}

export const useStoryStore = create<StoryState>()(
  persist(
    (set) => ({
      tasks: [],
      settings: {
        universe: '',
        customUniverse: '',
        character: '',
        customCharacter: '',
        narrativeStyle: '',
        customNarrativeStyle: '',
      },
      aiModel: 'gpt-3.5-turbo',
      story: null,
      addTask: (task) => set((state) => ({ 
        tasks: [...state.tasks, task],
        story: null // Clear story when tasks change
      })),
      updateTask: (taskId, updates) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task
        ),
        story: null // Clear story when tasks change
      })),
      removeTask: (taskId) => set((state) => ({ 
        tasks: state.tasks.filter((task) => task.id !== taskId),
        story: null // Clear story when tasks change
      })),
      setSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings },
        story: null // Clear story when settings change
      })),
      setCustomSetting: (key, value) => set((state) => ({
        settings: {
          ...state.settings,
          [key]: 'custom',
          [`custom${key.charAt(0).toUpperCase() + key.slice(1)}`]: value,
        },
        story: null // Clear story when settings change
      })),
      setAIModel: (model) => set({ aiModel: model }),
      setStory: (story) => set({ story }),
      clearStory: () => set({ story: null }),
    }),
    {
      name: 'story-store',
    }
  )
);