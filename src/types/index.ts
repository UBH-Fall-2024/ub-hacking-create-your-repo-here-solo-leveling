export interface Task {
    id: string;
    title: string;
    description?: string;
    deadline?: Date;
  }
  
  export interface StorySettings {
    character: string;
    universe: string;
    universeVariant: string;
    narrativeStyle: string;
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