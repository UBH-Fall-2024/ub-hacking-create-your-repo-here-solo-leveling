export interface Task {
    id: string;
    title: string;
    description?: string;
    deadline?: Date;
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