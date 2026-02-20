/**
 * OpenAI Provider for Android App Generation
 */

import { AndroidAppDefinition } from '../../types/app';

export interface GenerationConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

const ANDROID_PROMPT = `You are an expert Android developer. Generate a complete, production-ready Android app using Kotlin and Jetpack Compose.

Requirements:
- Use Material Design 3 (Material You)
- MVVM + Clean Architecture
- Hilt for DI
- Room for persistence
- Retrofit + OkHttp for networking
- Coroutines + Flow
- Navigation Compose
- Follow Android best practices

Generate JSON with full app definition. Now generate for: `;

export async function generateWithOpenAI(
  prompt: string,
  config: GenerationConfig = {}
): Promise<AndroidAppDefinition> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: config.model || 'gpt-4o',
      max_tokens: config.maxTokens || 8000,
      temperature: config.temperature || 0.7,
      messages: [
        { 
          role: 'system', 
          content: ANDROID_PROMPT 
        },
        { 
          role: 'user', 
          content: prompt 
        }
      ]
    })
  });

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';
  
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response');
  }

  return JSON.parse(jsonMatch[0]);
}

export { generateWithOpenAI };
