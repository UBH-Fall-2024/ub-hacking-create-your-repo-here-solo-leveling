import type { GeneratedStory } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface ParsedTask {
  questName: string;
  narrative: string;
  completion: string;
}

export function parseStoryResponse(content: string): Omit<GeneratedStory, 'transformedTasks'> & { transformedTasks: ParsedTask[] } {
  try {
    // Clean up content
    const cleanContent = content
      .replace(/```/g, '')
      .replace(/\*\*/g, '')
      .trim();

    // Split into major sections using headers
    const sections = cleanContent.split(/\n(?=#+\s)/g)
      .map(s => s.trim())
      .filter(Boolean);

    // Extract title (first section)
    const title = sections[0]
      .replace(/^#\s*/, '')
      .trim();

    // Find opening scene
    const openingScene = sections.find(s => /^##\s*Opening Scene/i.test(s))
      ?.split('\n')
      .slice(1)
      .join('\n')
      .trim() || 'The journey begins...';

    // Extract quest chapters
    const questSections = sections.filter(section =>
      /^###\s*Chapter \d+:/i.test(section)
    );

    // Parse each quest section
    const transformedTasks = questSections.map(section => {
      const lines = section.split('\n').filter(Boolean);
      
      // Extract quest name from chapter title
      const questName = lines[0]
        .replace(/^###\s*Chapter \d+:\s*/i, '')
        .replace(/\[|\]/g, '')
        .trim();

      // Find narrative and completion sections
      const narrativeLines = lines.slice(1);
      const narrative = narrativeLines
        .filter(line => !line.startsWith('-'))
        .join('\n')
        .trim();

      return {
        questName,
        narrative,
        completion: 'Victory awaits...' // We'll update this when the quest is completed
      };
    });

    // Find epilogue
    const epilogue = sections.find(s => /^##\s*Epilogue/i.test(s))
      ?.split('\n')
      .slice(1)
      .join('\n')
      .trim() || 'The story continues...';

    return {
      title,
      openingScene,
      transformedTasks,
      epilogue
    };
  } catch (error) {
    console.error('Story parsing error:', error);
    throw new Error('Failed to parse story response');
  }
} 