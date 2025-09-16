// Re-export everything from the TypeScript versions
export * from './ui';
export * from './utils';

// You can also create specific exports for easier imports
export { getLangFromUrl, useTranslations, useTranslatedPath } from './utils';
export { ui, defaultLang, showDefaultLang, languages } from './ui';
export type { SupportedLanguage, UITranslations, Language, Languages, UI } from './ui';
