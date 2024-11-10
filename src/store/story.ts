// Basic store setup for story settings 

import { create } from 'zustand';
import type { StorySettings, Task, GeneratedStory } from '@/types';

interface StoryState {
  settings: Partial<StorySettings>;
  tasks: Task[];
  story: GeneratedStory | null;
  setSettings: (settings: Partial<StorySettings>) => void;
  setTasks: (tasks: Task[]) => void;
  setStory: (story: GeneratedStory) => void;
}

export const useStoryStore = create<StoryState>((set) => ({
  settings: {},
  tasks: [],
  story: null,
  setSettings: (settings) => set((state) => ({ settings: { ...state.settings, ...settings } })),
  setTasks: (tasks) => set({ tasks }),
  setStory: (story) => set({ story }),
}));