import { ui, defaultLang, showDefaultLang, type SupportedLanguage } from './ui';

// Simple any type to avoid TypeScript complications
export type TranslationFunction = (key: string) => any;

// Path translation function type
export type PathTranslationFunction = (path: string, l?: SupportedLanguage) => string;

/**
 * Extracts the language from the URL pathname
 */
export function getLangFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as SupportedLanguage;
  return defaultLang;
}

/**
 * Creates a translation function for the specified language
 */
export function useTranslations(lang: SupportedLanguage): TranslationFunction {
  return function t(key: string): any {
    return ui[lang as keyof typeof ui][key as keyof typeof ui.hu] || ui[defaultLang][key as keyof typeof ui.hu];
  };
}

/**
 * Creates a path translation function for the specified language
 */
export function useTranslatedPath(lang: SupportedLanguage): PathTranslationFunction {
  return function translatePath(path: string, l: SupportedLanguage = lang): string {
    return !showDefaultLang && l === defaultLang ? path.replace('/en', '') : `/${l}${path}`;
  };
}
