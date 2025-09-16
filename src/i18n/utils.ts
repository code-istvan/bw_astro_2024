import { ui, defaultLang, showDefaultLang, type SupportedLanguage, type UITranslations } from './ui';

// Translation function type
export type TranslationFunction = (key: keyof UITranslations) => string;

// Path translation function type
export type PathTranslationFunction = (path: string, l?: SupportedLanguage) => string;

/**
 * Extracts the language from the URL pathname
 * @param url - The URL object containing the pathname
 * @returns The detected language or the default language
 */
export function getLangFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as SupportedLanguage;
  return defaultLang;
}

/**
 * Creates a translation function for the specified language
 * @param lang - The language to create translations for
 * @returns A function that translates keys to strings
 */
export function useTranslations(lang: SupportedLanguage): TranslationFunction {
  return function t(key: keyof UITranslations): string {
    const value = ui[lang][key] || ui[defaultLang][key];
    // Handle function values (like sectionAboutTraditionText)
    return typeof value === 'function' ? value() : value;
  };
}

/**
 * Creates a path translation function for the specified language
 * @param lang - The language to translate paths for
 * @returns A function that translates paths based on language
 */
export function useTranslatedPath(lang: SupportedLanguage): PathTranslationFunction {
  return function translatePath(path: string, l: SupportedLanguage = lang): string {
    return !showDefaultLang && l === defaultLang ? path.replace('/en', '') : `/${l}${path}`;
  };
}
