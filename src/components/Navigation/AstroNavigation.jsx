import React, { useState } from "react";
import LogoBW from "./LogoBW";
import LogoBWtext from "./LogoBWtext";
import NavbarMenu from "./NavbarMenu";
import Hamburger from "./Hamburger";
import { CustomLink } from "../CustomLink";
import { LanguagePicker } from "../LanguagePicker";
import { useTranslatedPath } from "../../i18n/utils";
import "../../sass/components/_navigation.scss";

export default function AstroNavigation({ lang, pathname }) {
    const [isOpen, setIsOpen] = useState(false);

    const openAstroNavigation = () => {
        setIsOpen(!isOpen);
    };

    const translatePath = useTranslatedPath(lang);

    return (
        <nav className="navigation">
            <div className="container-fluid navbar-box">
                <CustomLink classNames="navbar-logo" link={translatePath(`/`)}>
                    <LogoBW />
                    <LogoBWtext />
                </CustomLink>

                {/* <a className="navbar-logo" href="/">
                    <LogoBW />
                    <LogoBWtext />
                </a> */}

                <div className="navigation-lang-section">
                    <LanguagePicker lang={lang} pathname={pathname} />
                </div>
                <div onClick={openAstroNavigation}>
                    <Hamburger open={isOpen} />
                </div>
            </div>
            <NavbarMenu open={isOpen} setOpen={setIsOpen} lang={lang} />
        </nav>
    );
}
