export const getMenuItemsJogaorak = (translatePath, t) => [
  { link: translatePath(`/orarend/`), label: t('orarend') },
  { link: translatePath(`/arak/`), label: t('arak') },
  {
    link: translatePath(`/astanga-mysore-program/`),
    label: t('mysoreprogram'),
  },
  { link: translatePath(`/tanfolyam/`), label: t('tanfolyamok') },
  { link: translatePath(`/csapatunk/`), label: t('csapatunk') },
  {
    link: translatePath(`/vinyasza-jogairanyzatok/`),
    label: t('jogairanyzatok'),
  },
  { link: translatePath(`/letoltesek/`), label: t('letoltesek') },
  // { link: "/galeria", label: "GALÉRIA", extraClass: "" },
];

export const getMenuItemsTudnivalok = (translatePath, t) => [
  { link: translatePath(`/rolunk/`), label: t('rolunk') },
  { link: translatePath(`/elso-alkalom/`), label: t('elsoalkalom') },
  { link: translatePath(`/hazirend/`), label: t('hazirend') },
  { link: translatePath(`/mantra/`), label: t('mantra') },
  { link: translatePath(`/holdnapok/`), label: t('holdnapok') },
  {
    link: translatePath(`/osztondij/`),
    label: t('osztondij'),
  },
  // { link: "/taplalkozas", label: "TÁPLÁLKOZÁS" },
  {
    link: translatePath(`/ajanlott-olvasmanyok/`),
    label: t('olvasmanyok'),
  },
];

export const getMenuItemsFomenu = (translatePath, t) => [
  { link: translatePath(`/blog/`), label: t('blog') },
  {
    link: 'https://shop.bandha.works',
    label: 'SHOP',
  },
  { link: translatePath(`/kapcsolat/`), label: t('kapcsolat') },
];

export const getMobileMenuHeader = (translatePath, t) => [
  { link: translatePath(`/orarend/`), label: t('orarend') },
  {
    link: translatePath(`/astanga-mysore-program/`),
    label: t('mysoreprogram'),
  },
];

export const getMobileMenuFooter = (translatePath, t) => [
  { link: translatePath(`/tanfolyam/`), label: t('tanfolyamok') },
  {
    link: translatePath(`/osztondij/`),
    label: t('osztondij'),
  },
];
