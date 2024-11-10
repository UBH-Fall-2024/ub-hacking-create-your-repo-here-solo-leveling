import type { Task, StorySettings } from '@/types';

export const generateStoryPrompt = (tasks: Task[], settings: StorySettings) => {
  // Get only active tasks
  const activeTasks = tasks.filter(task => task.status === 'active');

  return `
You are a master storyteller crafting an ENGAGING and COHERENT narrative that transforms active tasks into a meaningful story.

STORY WORLD:
Universe: ${settings.customUniverse || settings.universe}
Character: ${settings.customCharacter || settings.character}
Style: ${settings.customNarrativeStyle || settings.narrativeStyle}

ACTIVE QUESTS TO TRANSFORM (${activeTasks.length}):
${activeTasks.map((task) => `
Quest: ${task.title}
Type: ${task.type === 'MAIN_QUEST' ? 'Primary Story Arc' : task.type === 'SIDE_QUEST' ? 'Side Adventure' : 'Daily Challenge'}
Challenge Level: ${task.difficulty}
Context: ${task.description || 'None provided'}
Time Frame: ${task.estimatedTime || 'Unspecified'}
Deadline: ${task.deadline ? new Date(task.deadline).toLocaleDateString() : 'None'}
`).join('\n')}

NARRATIVE REQUIREMENTS:
1. Transform each task into a meaningful quest that fits the universe and character
2. Connect all quests into ONE COHERENT STORY
3. Use specific details from the chosen universe
4. Match the narrative style exactly
5. Make each quest feel significant to the overall story

STORY STRUCTURE:

# [Create an epic title that reflects the current quest arc]

## Opening Scene
[Set the stage with rich atmosphere and context]
- Show the character's current situation
- Establish the story's tone
- Hint at the challenges ahead

## The Journey
${activeTasks.map((task, index) => `
### Chapter ${index + 1}: [Create a quest-specific title]
[Transform "${task.title}" into an epic scene]
- Show how this quest connects to the larger story
- Include specific details from the universe
- Match the chosen narrative style
- Make the quest feel meaningful
`).join('\n')}

## Epilogue
[Show what achieving these quests will mean]
- Tie all quest threads together
- Show character growth
- Leave anticipation for future quests

IMPORTANT:
- Focus on ACTIVE quests only
- Create a UNIFIED story, not separate scenes
- Use SPECIFIC details from the chosen universe
- Match the chosen narrative style exactly
- Make quest completion feel MEANINGFUL

Remember: This is an ongoing story where each quest advances the character's journey.`;
}; 