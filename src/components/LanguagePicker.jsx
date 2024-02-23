import { languages } from "../i18n/ui";
import { useTranslatedPath } from "../i18n/utils";

export const LanguagePicker = ({ lang: currentLanguage, pathname }) => {
    const translatePath = useTranslatedPath(currentLanguage);

    return (
        <ul>
            {Object.entries(languages).map(([lang, { name, shortName }]) => {
                if (currentLanguage === lang) return;
                return (
                    <li key={lang}>
                        <a href={translatePath(pathname, lang)}>{shortName}</a>
                    </li>
                );
            })}
        </ul>
    );
};
