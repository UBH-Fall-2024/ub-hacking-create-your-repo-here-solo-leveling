import { OpenAI } from 'openai';
import { generateStoryPrompt } from '@/lib/prompts/storyPrompt';
import { parseStoryResponse } from '@/lib/parsers/storyParser';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { tasks, settings, model } = await request.json();

    if (!tasks || !settings) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
      });
    }

    console.log('Generating story with:', { 
      taskCount: tasks.length,
      settings,
      model 
    });

    const prompt = generateStoryPrompt(tasks, settings);
    
    const completion = await openai.chat.completions.create({
      model: model || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a master storyteller who transforms tasks into epic narratives.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const story = completion.choices[0]?.message?.content;
    
    if (!story) {
      throw new Error('No story generated');
    }

    console.log('Raw story response:', story);

    const parsedStory = parseStoryResponse(story);
    console.log('Parsed story:', parsedStory);

    return new Response(JSON.stringify(parsedStory), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Story generation error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate story',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { status: 500 }
    );
  }
}