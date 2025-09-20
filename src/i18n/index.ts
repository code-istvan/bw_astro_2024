// Re-export everything from the TypeScript files
export * from './ui';
export * from './utils';

// Export types from utils.ts for explicit access
export type { TranslationFunction, PathTranslationFunction } from './utils';

// Export types from ui.ts for explicit access
export type { SupportedLanguage, UITranslations, Language, Languages, UI } from './ui';
