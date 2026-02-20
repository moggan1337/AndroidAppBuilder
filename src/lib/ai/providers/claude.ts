/**
 * Claude AI Provider for Android App Generation
 */

import { AndroidAppDefinition } from '../../types/app';

export interface AIProvider {
  name: string;
  generate: (prompt: string, config: GenerationConfig) => Promise<AndroidAppDefinition>;
  stream?: (prompt: string, config: GenerationConfig) => AsyncGenerator<string>;
}

export interface GenerationConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

const ANDROID_PROMPT = `You are an Android app generator. Generate a complete Android application using Kotlin and Jetpack Compose.

Generate the app with these specifications:
- Package name format: com.appname
- Use Material Design 3
- Follow Android best practices
- Use Hilt for dependency injection
- Use MVVM architecture with Clean Architecture
- Use Room for local database if needed
- Use Retrofit for networking if needed
- Use Coroutines and Flow for async operations
- Use Navigation Compose for navigation

Respond with JSON in this format:
{
  "id": "unique-id",
  "name": "App Name",
  "packageName": "com.appname",
  "version": "1.0.0",
  "versionCode": 1,
  "description": "App description",
  "screens": [...],
  "navigation": {...},
  "theme": {...},
  "features": [...],
  "dataModels": [...],
  "permissions": [...],
  "dependencies": [...],
  "buildConfig": {...}
}

Now generate the app based on this description: `;

export async function generateWithClaude(
  prompt: string,
  config: GenerationConfig = {}
): Promise<AndroidAppDefinition> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY || '',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: config.model || 'claude-sonnet-4-20250514',
      max_tokens: config.maxTokens || 8000,
      temperature: config.temperature || 0.7,
      messages: [
        { role: 'user', content: ANDROID_PROMPT + prompt }
      ]
    })
  });

  const data = await response.json();
  const content = data.content?.[0]?.text || '';
  
  // Extract JSON from response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response');
  }

  return JSON.parse(jsonMatch[0]);
}

export { generateWithClaude };
