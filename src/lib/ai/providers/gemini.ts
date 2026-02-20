/**
 * Google Gemini Provider for Android App Generation
 */

import { AndroidAppDefinition } from '../../types/app';

export interface GenerationConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export async function generateWithGemini(
  prompt: string,
  config: GenerationConfig = {}
): Promise<AndroidAppDefinition> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = config.model || 'gemini-2.0-flash';
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a complete Android app with Kotlin and Jetpack Compose. Respond with JSON only. ${prompt}`
          }]
        }],
        generationConfig: {
          temperature: config.temperature || 0.7,
          maxOutputTokens: config.maxTokens || 8000
        }
      })
    }
  );

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response');
  }

  return JSON.parse(jsonMatch[0]);
}

export { generateWithGemini };
