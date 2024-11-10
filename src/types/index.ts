import { CHARACTER_TYPES, UNIVERSE_SETTINGS, NARRATIVE_STYLES } from './constants';

export type QuestType = 'MAIN_QUEST' | 'SIDE_QUEST' | 'DAILY';
export type QuestDifficulty = 'NORMAL' | 'HARD' | 'EPIC' | 'LEGENDARY';

export interface Task {
    id: string;
    title: string;
    description?: string;
    deadline?: Date;
    type: QuestType;
    difficulty: QuestDifficulty;
    estimatedTime?: string;
  }
  
  export interface StorySettings {
    // Universe settings
    universe: keyof typeof UNIVERSE_SETTINGS | 'custom';
    customUniverse?: string;  // For custom universe description
    
    // Character settings
    character: keyof typeof CHARACTER_TYPES | 'custom';
    customCharacter?: string;  // For custom character description
    
    // Narrative settings
    narrativeStyle: keyof typeof NARRATIVE_STYLES | 'custom';
    customNarrativeStyle?: string;  // For custom narrative description
  }
  
  export interface GeneratedStory {
    title: string;
    openingScene: string;
    transformedTasks: {
      id: string;
      originalTask: string;
      questName: string;
      narrative: string;
      completion: string;
    }[];
    epilogue: string;
  }