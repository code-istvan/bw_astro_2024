import { ui, defaultLang, showDefaultLang } from "./ui";

export function getLangFromUrl(url) {
    const [, lang] = url.pathname.split("/");
    if (lang in ui) return lang;
    return defaultLang;
}

export function useTranslations(lang) {
    return function t(key) {
        return ui[lang][key] || ui[defaultLang][key];
    };
}

export function useTranslatedPath(lang) {
    return function translatePath(path, l = lang) {
        console.log("path:", path, lang);
        console.log("path2", defaultLang, defaultLang === lang);

        return !showDefaultLang && l === defaultLang
            ? path.replace("/en", "")
            : `/${l}${path}`;
    };
}
