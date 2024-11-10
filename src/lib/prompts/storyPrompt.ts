import type { Task, StorySettings } from '@/types';

export const generateStoryPrompt = (tasks: Task[], settings: StorySettings) => `
You are crafting a COHERENT, ENGAGING story that weaves everyday tasks into a meaningful narrative.

STORY ELEMENTS:
Character: ${settings.customCharacter || settings.character}
- How they approach challenges
- Their unique perspective
- Their growth through these tasks

Setting: ${settings.customUniverse || settings.universe}
- How the environment affects the tasks
- Unique aspects of this world
- How the setting transforms ordinary moments

Style: ${settings.customNarrativeStyle || settings.narrativeStyle}
- Keep the tone consistent
- Use specific details and sensory elements
- Make the narrative flow naturally

TASKS TO TRANSFORM:
${tasks.map((task: Task) => `
${task.title}
- Type: ${task.type}
- Challenge Level: ${task.difficulty}
- Context: ${task.description || 'None provided'}
- Time Frame: ${task.estimatedTime || 'Unspecified'}
- Deadline: ${task.deadline ? new Date(task.deadline).toLocaleDateString() : 'None'}
`).join('\n')}

REQUIRED STRUCTURE:

# [Title that Captures the Core Theme]

## Opening Scene
[A focused scene that establishes character and setting - max 2 paragraphs]

## The Journey

### [Task Name Transformed]
[How the character approaches this specific challenge - include concrete details]
#### Victory Conditions
[Clear, specific outcomes that show character growth]

[Repeat for each task, maintaining narrative flow]

## Epilogue
[Brief conclusion showing overall growth - max 1 paragraph]

IMPORTANT:
1. NO generic descriptions or clichés
2. Each task should feel like a natural part of the story
3. Maintain consistent character voice and motivation
4. Include specific details from the setting
5. Keep the narrative focused and purposeful

Remember: This is a character-driven story where everyday tasks reveal growth and purpose.`; 