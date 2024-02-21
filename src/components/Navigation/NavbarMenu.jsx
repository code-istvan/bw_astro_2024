import { CustomLink } from "../CustomLink";
import React, { useState } from "react";
import NavbarDesktopFeatured from "./NavbarDesktopFeatured";
import NavbarMenuMobilHeader from "./NavbarMenuMobilHeader";
import NavbarMenuMobilFeatured from "./NavbarMenuMobilFeatured";
import useBreakpoints from "../../hooks/useBreakpoints";
import { getLangFromUrl, useTranslations } from "../../i18n/utils";
import "../../sass/components/_navbarmenu.scss";

const NavbarMenu = ({ open, setOpen, lang }) => {
    const breakpoints = useBreakpoints();
    const [isSubmenuOpen, setSubmenuOpen] = useState({
        JOGAORAK: false,
        TUDNIVALOK: false,
    });
    const handleSubmenuOpen = (title) => {
        setSubmenuOpen((prevState) => ({
            ...prevState,
            [title.toUpperCase()]: !prevState[title.toUpperCase()],
        }));
    };

    const t = useTranslations(lang);

    const menuItemsJogaorak = [
        { link: "/orarend", label: t("orarend") },
        { link: "/arak", label: t("arak") },
        { link: "/astanga-mysore-program", label: t("mysoreprogram") },
        { link: "/tanfolyam", label: t("tanfolyamok") },
        { link: "/csapatunk", label: t("csapatunk") },
        { link: "/vinyasza-jogairanyzatok", label: t("jógairányzatok") },
        { link: "/letoltesek", label: t("letoltesek") },
        // { link: "/galeria", label: "GALÉRIA", extraClass: "" },
    ];

    const menuItemsTudnivalok = [
        { link: "/rolunk", label: t("rolunk") },
        { link: "/elso-alkalom", label: t("elsoalkalom") },
        { link: "/hazirend", label: t("hazirend") },
        { link: "/mantra", label: t("mantra") },
        { link: "/holdnapok", label: t("holdnapok") },
        { link: "/osztondij", label: t("osztondij"), extraClass: "" },
        // { link: "/taplalkozas", label: "TÁPLÁLKOZÁS" },
        { link: "/ajanlott-olvasmanyok", label: t("olvasmanyok") },
    ];

    const menuGroupsFomenu = [
        { title: "JÓGAÓRÁK", items: menuItemsJogaorak },
        { title: "TUDNIVALÓK", items: menuItemsTudnivalok },
    ];

    const menuItemsFomenu = [
        { link: "/blog", label: "BLOG" },
        { link: "https://shop.bandha.works", label: "SHOP", isExternal: true },
        { link: "/kapcsolat", label: "KAPCSOLAT" },
    ];

    return (
        <div
            className={`${open ? "mobil-menu" : "mobil-menu mobil-menu--closed"}`}
        >
            {/* {breakpoints.l ? <NavbarMenuMobilHeader /> : null} */}
            <ul className="nav-links">
                {menuGroupsFomenu.map(({ title, items }) => (
                    <li
                        className="nav-item dropdown"
                        key={title}
                        onClick={() => handleSubmenuOpen(title)}
                    >
                        <div
                            className="nav-link dropdown-toggle clr-shades-white"
                            // href="#"
                            // id={`navbarDropdown-${index}`}
                            id="navbarDropdown"
                            // role="button"
                            data-bs-toggle="dropdown"
                            // aria-expanded="false"
                        >
                            {title}
                        </div>
                        <ul
                            className={`dropdown-menu ${isSubmenuOpen[title] ? "show" : ""}`}
                            aria-labelledby="navbarDropdown"
                            // aria-labelledby={`navbarDropdown-${index}`}
                        >
                            {items.map(({ link, label }) => {
                                console.log(link, label);
                                return (
                                    <li
                                        className="nav-item"
                                        as="li"
                                        key={label}
                                    >
                                        <CustomLink
                                            className="dropdown-item clr-shades-white"
                                            link={`/${lang}${link}`}
                                            onClick={() => setOpen(false)}
                                        >
                                            {label}
                                        </CustomLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                ))}
                {menuItemsFomenu.map(({ link, label, isExternal }) => (
                    <li className="nav-item" as="li" key={label}>
                        {isExternal ? (
                            <a
                                className="nav-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`/${lang}` / `${link}`}
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </a>
                        ) : (
                            <CustomLink
                                className="nav-link clr-shades-white menuItemsFomenu"
                                to={`/${lang}` / `${link}`}
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </CustomLink>
                        )}
                    </li>
                ))}
                {/* <li className="nav-item">
                    {breakpoints.l ? null : <NavbarDesktopFeatured />}
                </li> */}
            </ul>
            {/* {breakpoints.l ? <NavbarMenuMobilFeatured /> : null} */}
        </div>
    );
};

export default NavbarMenu;
