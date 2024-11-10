import type { GeneratedStory } from '@/types';

export function parseStoryResponse(content: string): GeneratedStory {
  try {
    // Clean up the content
    const cleanContent = content
      .replace(/\*\*/g, '') // Remove markdown bold
      .trim();

    // Split into major sections
    const sections = cleanContent.split(/\n(?=(?:[A-Z][a-z]+:|\#|\d+\.|Quest \d+:))/g)
      .map(s => s.trim())
      .filter(Boolean);

    // Extract title
    const title = sections[0]
      .replace(/^#\s*/, '')
      .replace(/^Title:?\s*/i, '')
      .trim() || 'Your Epic Tale';

    // Find opening scene
    const openingScene = sections.find(s => 
      /Opening Scene|Prologue|Beginning|The Awakening/i.test(s)
    )?.split('\n').slice(1).join('\n').trim() || 'The journey begins...';

    // Extract quest sections
    const questSections = sections.filter(section =>
      /Quest|Journey|Task|Challenge/i.test(section) &&
      !/(Opening|Epilogue|Conclusion)/i.test(section)
    );

    // Parse quests
    const transformedTasks = questSections.map(section => {
      const lines = section.split('\n').filter(Boolean);
      const questName = lines[0]
        .replace(/^(?:Quest|Task|Challenge)?\s*\d*:?\s*/i, '')
        .replace(/^\d+\.\s*/, '')
        .trim();

      const completionIndex = lines.findIndex(line => 
        /Completion|Victory|Success|Outcome/i.test(line)
      );

      let narrative, completion;
      if (completionIndex !== -1) {
        narrative = lines.slice(1, completionIndex).join('\n').trim();
        completion = lines.slice(completionIndex + 1).join('\n').trim();
      } else {
        const midPoint = Math.max(1, Math.floor(lines.length * 0.8));
        narrative = lines.slice(1, midPoint).join('\n').trim();
        completion = lines.slice(midPoint).join('\n').trim();
      }

      // Clean up any remaining placeholders
      narrative = narrative
        .replace(/The quest unfolds\.\.\./g, '')
        .replace(/Victory awaits\.\.\./g, '')
        .trim();
      completion = completion
        .replace(/The quest unfolds\.\.\./g, '')
        .replace(/Victory awaits\.\.\./g, '')
        .trim();

      return {
        questName: questName || 'Unnamed Quest',
        narrative: narrative || 'A new challenge appears...',
        completion: completion || 'Victory awaits...'
      };
    });

    // Find epilogue
    const epilogue = (
      sections.find(s => /Epilogue|Conclusion|The End|Evolution/i.test(s)) ||
      sections[sections.length - 1]
    )?.split('\n').slice(1).join('\n').trim() || 'The story continues...';

    return {
      title: title.slice(0, 100),
      openingScene: openingScene.slice(0, 500),
      transformedTasks,
      epilogue: epilogue.slice(0, 500)
    };
  } catch (error) {
    console.error('Story parsing error:', error, '\nOriginal content:', content);
    throw new Error(`Failed to parse story: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 