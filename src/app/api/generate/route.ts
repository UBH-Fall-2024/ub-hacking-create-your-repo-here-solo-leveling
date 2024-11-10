import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { generateStoryPrompt } from '@/lib/prompts/storyPrompt';
import { parseStoryResponse } from '@/lib/parsers/storyParser';
import type { GeneratedStory, Task, StorySettings } from '@/types';

// Initialize APIs
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

// Model configurations
const AI_MODELS = {
  'gpt-4': {
    provider: 'openai',
    model: 'gpt-4-turbo-preview',
    maxTokens: 4000,
  },
  'gpt-3.5': {
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    maxTokens: 4000,
  },
  'gemini-pro': {
    provider: 'google',
    model: 'gemini-pro',
  },
} as const;

type AIModel = keyof typeof AI_MODELS;

interface RequestBody {
  tasks: Task[];
  settings: StorySettings;
  model?: AIModel;
}

export async function POST(req: Request) {
  try {
    // Add debug logging
    console.log('Environment check:', {
      hasOpenAI: !!process.env.OPENAI_API_KEY,
      hasGoogleAI: !!process.env.GOOGLE_AI_API_KEY,
      nodeEnv: process.env.NODE_ENV
    });

    const { tasks, settings, model = 'gpt-4' } = await req.json() as RequestBody;
    
    if (!tasks || tasks.length === 0) {
      throw new Error('No tasks provided');
    }

    const selectedModel = AI_MODELS[model as AIModel];
    if (!selectedModel) {
      throw new Error('Invalid model selected');
    }

    // Check for required API keys with better error messages
    if (selectedModel.provider === 'openai' && !process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not found in environment variables');
    }
    if (selectedModel.provider === 'google' && !process.env.GOOGLE_AI_API_KEY) {
      throw new Error('Google AI API key not found in environment variables');
    }

    const prompt = generateStoryPrompt(tasks, settings);

    // Adjust based on narrative style
    const temperature = settings.narrativeStyle === 'MYSTERIOUS_SUPERNATURAL' ? 0.85 : 0.7;
    const presencePenalty = 0.3;  // Reduce repetition
    const frequencyPenalty = 0.4; // Encourage varied language

    let story: string | null = null;
    try {
      if (selectedModel.provider === 'openai') {
        const completion = await openai.chat.completions.create({
          model: selectedModel.model,
          messages: [
            {
              role: "system",
              content: "You are a skilled writer who creates engaging, natural narratives that transform tasks into meaningful stories. Focus on quality, coherence, and relatability."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature,
          presence_penalty: presencePenalty,
          frequency_penalty: frequencyPenalty,
        });
        story = completion.choices[0].message.content;
      } else {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        story = response.text();
      }
    } catch (error) {
      console.error('AI generation error:', error);
      throw new Error(
        `Failed to generate story with ${selectedModel.provider}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }

    if (!story) {
      throw new Error('No story generated');
    }

    const parsedStory = parseStoryResponse(story);
    
    const finalStory: GeneratedStory = {
      ...parsedStory,
      transformedTasks: tasks.map((task: Task, index: number) => ({
        id: task.id,
        originalTask: task.title,
        questName: parsedStory.transformedTasks[index]?.questName || task.title,
        narrative: parsedStory.transformedTasks[index]?.narrative || '',
        completion: parsedStory.transformedTasks[index]?.completion || ''
      }))
    };

    return NextResponse.json(finalStory);
  } catch (error) {
    // Improve error logging
    console.error('Story generation error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.constructor.name : typeof error,
      env: process.env.NODE_ENV
    });

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate story' },
      { status: 500 }
    );
  }
}