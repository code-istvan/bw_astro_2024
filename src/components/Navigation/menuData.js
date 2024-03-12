export const getMenuItemsJogaorak = (translatePath, t) => [
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

export const getMenuItemsTudnivalok = (translatePath, t) => [
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

export const getMenuGroupsFomenu = (translatePath, t) => [
    { title: t("jogaorak"), items: menuItemsJogaorak },
    { title: t("tudnivalok"), items: menuItemsTudnivalok },
];

export const getMenuItemsFomenu = (translatePath, t) => [
    { link: "/blog", label: "BLOG" },
    {
        link: "https://shop.bandha.works",
        label: "SHOP",
        isExternal: true,
    },
    { link: "/kapcsolat", label: t("kapcsolat") },
];
