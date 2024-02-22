import { languages } from "../i18n/ui";
import { useTranslatedPath } from "../i18n/utils";

export const LanguagePicker = ({ lang: currentLanguage, pathname }) => {
    const translatePath = useTranslatedPath(currentLanguage);

    console.log("va", pathname);

    return (
        <ul>
            {Object.entries(languages).map(([lang, label]) => {
                if (currentLanguage === lang) return;
                return (
                    <li>
                        <a href={translatePath(pathname, lang)}>{label}</a>
                    </li>
                );
            })}
        </ul>
    );
};
