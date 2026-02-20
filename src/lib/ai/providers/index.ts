/**
 * AI Providers Index
 */

export { generateWithClaude } from './claude';
export { generateWithOpenAI } from './openai';
export { generateWithGemini } from './gemini';

export type AIProvider = 'claude' | 'openai' | 'gemini' | 'minimax' | 'zai';

export const AI_PROVIDERS = [
  { id: 'claude', name: 'Claude', models: ['sonnet', 'opus'] },
  { id: 'openai', name: 'OpenAI', models: ['gpt-4o', 'gpt-4o-mini'] },
  { id: 'gemini', name: 'Google Gemini', models: ['gemini-2.0-flash', 'gemini-pro'] },
  { id: 'minimax', name: 'MiniMax', models: ['abab6.5s'] },
  { id: 'zai', name: 'Z.ai', models: ['glm-4'] }
] as const;
