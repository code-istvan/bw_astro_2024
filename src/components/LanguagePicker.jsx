import { languages } from "../i18n/ui";
import { useTranslatedPath } from "../i18n/utils";
import { CustomLink } from "./CustomLink";

export const LanguagePicker = ({ lang: currentLanguage, pathname }) => {
    const translatePath = useTranslatedPath(currentLanguage);

    return (
        <ul>
            {Object.entries(languages).map(([lang, { name, shortName }]) => {
                if (currentLanguage === lang) return;
                const path = translatePath(pathname, lang);
                return (
                    <li key={lang}>
                        <CustomLink link={path} classNames="link-class">
                            <h4>{shortName}</h4>
                        </CustomLink>
                    </li>
                );
            })}
        </ul>
    );
};
