import { CustomLink } from "../CustomLink";
import React, { useState } from "react";
import NavbarDesktopFeatured from "./NavbarDesktopFeatured";
import NavbarMenuMobilHeader from "./NavbarMenuMobilHeader";
import NavbarMenuMobilFeatured from "./NavbarMenuMobilFeatured";
import useBreakpoints from "../../hooks/useBreakpoints";
import { useTranslations, useTranslatedPath } from "../../i18n/utils";
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
    const translatePath = useTranslatedPath(lang);

    const menuItemsJogaorak = [
        { link: translatePath(`/orarend/`), label: t("orarend") },
        { link: translatePath(`/arak/`), label: t("arak") },
        {
            link: translatePath(`/astanga-mysore-program/`),
            label: t("mysoreprogram"),
        },
        { link: translatePath(`/tanfolyam/`), label: t("tanfolyamok") },
        { link: translatePath(`/csapatunk/`), label: t("csapatunk") },
        {
            link: translatePath(`/vinyasza-jogairanyzatok/`),
            label: t("jógairányzatok"),
        },
        { link: translatePath(`/letoltesek/`), label: t("letoltesek") },
        // { link: "/galeria", label: "GALÉRIA", extraClass: "" },
    ];

    const menuItemsTudnivalok = [
        { link: translatePath(`/rolunk/`), label: t("rolunk") },
        { link: translatePath(`/elso-alkalom/`), label: t("elsoalkalom") },
        { link: translatePath(`/hazirend/`), label: t("hazirend") },
        { link: translatePath(`/mantra/`), label: t("mantra") },
        { link: translatePath(`/holdnapok/`), label: t("holdnapok") },
        {
            link: translatePath(`/osztondij/`),
            label: t("osztondij"),
            extraClass: "",
        },
        // { link: "/taplalkozas", label: "TÁPLÁLKOZÁS" },
        {
            link: translatePath(`/ajanlott-olvasmanyok/`),
            label: t("olvasmanyok"),
        },
    ];

    const menuGroupsFomenu = [
        { title: t("jogaorak"), items: menuItemsJogaorak },
        { title: t("tudnivalok"), items: menuItemsTudnivalok },
    ];

    const menuItemsFomenu = [
        { link: "/blog", label: "BLOG" },
        { link: "https://shop.bandha.works", label: "SHOP", isExternal: true },
        { link: "/kapcsolat", label: t("kapcsolat") },
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
                                return (
                                    <li
                                        className="nav-item"
                                        as="li"
                                        key={label}
                                    >
                                        <CustomLink
                                            className="dropdown-item clr-shades-white"
                                            link={`${link}`}
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
                                to={`/${translatePath}` / `${link}`}
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </CustomLink>
                        )}
                    </li>
                ))}
                {/* <li className="nav-item">
                    {breakpoints.lg ? null : <NavbarDesktopFeatured />}
                </li> */}
            </ul>
            {/* {breakpoints.l ? <NavbarMenuMobilFeatured /> : null} */}
        </div>
    );
};

export default NavbarMenu;
