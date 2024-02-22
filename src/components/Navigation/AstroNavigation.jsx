import React, { useState } from "react";
import LogoBW from "./LogoBW";
import LogoBWtext from "./LogoBWtext";
import NavbarMenu from "./NavbarMenu";
import Hamburger from "./Hamburger";
import { LanguagePicker } from "../LanguagePicker";
import "../../sass/components/_navigation.scss";

export default function AstroNavigation({ lang, pathname }) {
    const [isOpen, setIsOpen] = useState(false);

    const openAstroNavigation = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navigation">
            <div className="container-fluid navbar-box">
                <a className="navbar-logo" href="/">
                    <LogoBW />
                    <LogoBWtext />
                </a>

                <div onClick={openAstroNavigation}>
                    <LanguagePicker lang={lang} pathname={pathname} />
                    <Hamburger open={isOpen} />
                </div>
            </div>
            <NavbarMenu open={isOpen} setOpen={setIsOpen} lang={lang} />
        </nav>
    );
}
