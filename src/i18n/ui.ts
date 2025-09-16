// Language configuration types
export interface Language {
  name: string;
  shortName: string;
}

export interface Languages {
  en: Language;
  hu: Language;
}

// UI translation types
export interface UITranslations {
  // Menu
  orarend: string;
  orarendLink: string;
  arak: string;
  arakLink: string;
  mysoreprogram: string;
  mysoreprogramLink: string;
  tanfolyamok: string;
  tanfolyamokLink: string;
  csapatunk: string;
  csapatunkLink: string;
  jogairanyzatok: string;
  jogairanyzatokLink: string;
  letoltesek: string;
  letoltesekLink: string;
  rolunk: string;
  rolunkLink: string;
  elsoalkalom: string;
  elsoalkalomLink: string;
  hazirend: string;
  hazirendLink: string;
  mantra: string;
  mantraLink: string;
  holdnapok: string;
  holdnapokLink: string;
  osztondij: string;
  osztondijLink: string;
  olvasmanyok: string;
  olvasmanyokLink: string;
  jogaorak: string;
  tudnivalok: string;
  kapcsolat: string;
  kapcsolatLink: string;
  galeria: string;
  galeriaLink: string;
  blog: string;
  blogLink: string;

  // KapcsolatForm
  kapcsolatFormName: string;
  kapcsolatFormEmail: string;
  kapcsolatFormMessage: string;
  kapcsolatFormButton: string;

  // Footer
  footerBrandTextLine1: string;
  footerBrandTextLine2: string;
  footerBrandTextLine3: string;
  footerNewsletterTitle: string;
  footerNewsletterText: string;
  footerNewsletterButton: string;
  footerNewsletterLink: string;
  footerPrivacyText: string;
  footerPrivacyLink: string;

  // Sections
  sectionAboutText: string;
  sectionAboutButton: string;
  sectionAboutLink: string;
  sectionAboutTradition: string;
  sectionAboutTraditionText: () => string;
  sectionParamparaText: string;
  sectionParamparaButton: string;
  sectionParamparaLink: string;
  sectionMysoreProgramTitle: string;
  sectionMysoreProgramText: string;
  sectionMysoreProgramButton: string;
  sectionMysoreProgramLink: string;
  sectionEventsTitle: string;
  sectionEventsButton: string;
  sectionEventsLink: string;
  sectionScholarshipTitle: string;
  sectionScholarshipButton: string;
  sectionScholarshipLink: string;
  sectionScholarshipText: string;
  sectionSocialProofsTitle: string;

  // Button names
  previousMonth: string;
  nextMonth: string;

  // MoonDays Card
  noDataAvailable: string;
  newMoon: string;
  fullMoon: string;
  ekadasi: string;

  // CTA buttons
  orarendCta: string;
  orarendCtaAriaLabel: string;
  mysoreprogramCta: string;
  mysoreprogramCtaAriaLabel: string;
  tanfolyamokCta: string;
  tanfolyamokCtaAriaLabel: string;
}

export interface UI {
  hu: UITranslations;
  en: UITranslations;
}

// Language keys type
export type SupportedLanguage = keyof Languages;

// Configuration
export const languages: Languages = {
  en: { name: 'English', shortName: 'EN' },
  hu: { name: 'Hungarian', shortName: 'HU' },
};

export const defaultLang: SupportedLanguage = 'hu';
export const showDefaultLang: boolean = false;

export const ui: UI = {
  hu: {
    // Menu
    orarend: 'Órarend',
    orarendLink: '/orarend',
    arak: 'Árak',
    arakLink: '/arak',
    mysoreprogram: 'Mysore-program',
    mysoreprogramLink: '/astanga-mysore-program',
    tanfolyamok: 'Tanfolyamok',
    tanfolyamokLink: '/tanfolyam',
    csapatunk: 'Csapatunk',
    csapatunkLink: '/csapatunk',
    jogairanyzatok: 'Jógairányzatok',
    jogairanyzatokLink: '/vinyasza-jogairanyzatok',
    letoltesek: 'Letöltések',
    letoltesekLink: '/letoltesek',
    rolunk: 'Rólunk',
    rolunkLink: '/rolunk',
    elsoalkalom: 'Első alkalom',
    elsoalkalomLink: '/elsoalkalom',
    hazirend: 'Házirend',
    hazirendLink: '/hazirend',
    mantra: 'Mantrák',
    mantraLink: '/mantra',
    holdnapok: 'Holdnapok',
    holdnapokLink: '/holdnapok',
    osztondij: 'Ösztöndij',
    osztondijLink: '/osztondij',
    olvasmanyok: 'Olvasmányok',
    olvasmanyokLink: '/ajanlott-olvasmanyok',
    jogaorak: 'JÓGAÓRÁK',
    tudnivalok: 'TUDNIVALÓK',
    kapcsolat: 'KAPCSOLAT',
    kapcsolatLink: '/kapcsolat',
    galeria: 'GALÉRIA',
    galeriaLink: '/galeria',
    blog: 'BLOG',
    blogLink: '/blog',

    // KapcsolatForm
    kapcsolatFormName: 'Név',
    kapcsolatFormEmail: 'Email',
    kapcsolatFormMessage: 'Üzenet',
    kapcsolatFormButton: 'Küldés',

    // Footer
    footerBrandTextLine1: 'Astanga Jógaiskola',
    footerBrandTextLine2: 'Paramaguru Sharath Jois',
    footerBrandTextLine3: 'áldásával',
    footerNewsletterTitle: 'IRATKOZZ FEL HÍRLEVELÜNKRE',
    footerNewsletterText: 'Értesülj a legfrissebb eseményeinkről és egyéb jógás hírekről elsőkézből.',
    footerNewsletterButton: 'Feliratkozás',
    footerNewsletterLink: '/hirlevel',
    footerPrivacyText: 'Adatvédelmi tájékoztató',
    footerPrivacyLink: '/adatvedelmi-tajekoztato',

    // Sections
    sectionAboutText:
      'A Bandha Works Jógaiskolát 2013-ban három mérnök alapította, akiket összekötött azon törekvés, hogy a tradicionális astanga vinyásza jógát népszerűsítsék, oktassák Magyarországon. Több mint tíz év elteltével a helyzet mit sem változott, oktatóink elkötelezett gyakorlói az irányzatnak, és rendszeresen, az astanga jóga fővárosába, a dél-indiai Mysore-ba utaznak, hogy tovább mélyítsék tudásuk, megértésük.',
    sectionAboutButton: 'Tudj meg többet rólunk',
    sectionAboutLink: '/rolunk',
    sectionAboutTradition: 'Tradíció',
    sectionAboutTraditionText: (): string => `
      Magyarország legrégebbi <br/>astanga Mysore-programja<br/>
      <strong>Paramaguru Sharath Jois</strong> áldásával`,
    sectionParamparaText:
      'A parampara a tudás, amelyet a tanár a tanítványára hagyományoz. A parampara szanszkrit szó jelentése a tudás átadásának legértékesebb formáját, a közvetlen és tapasztalati tudás átadását fejezi ki. A jógatanításnak a paramparaból kell származnia ahhoz, hogy hatékony, igaz és teljes legyen. ',
    sectionParamparaButton: 'Tanítói láncolatunk',
    sectionParamparaLink: '/parampara',
    sectionMysoreProgramTitle: 'Astanga Mysore-program',
    sectionMysoreProgramText:
      'A Mysore-stílusú astanga jóga gyakorlás hatékony és személyre szabott módszer, amely fizikai erőt, rugalmasságot és belső nyugalmat hoz. Az általa kínált folyamatos fejlődés és az oktató-tanítvány kapcsolat lehetőséget ad a mélyebb megértésre és a személyes fejlődésre.',
    sectionMysoreProgramButton: 'Mysore-programról bővebben',
    sectionMysoreProgramLink: '/astanga-mysore-program',
    sectionEventsTitle: 'Események',
    sectionEventsButton: 'További események',
    sectionEventsLink: '/esemenyek',
    sectionScholarshipTitle: 'Jóga ösztöndíj',
    sectionScholarshipButton: 'Jóga ösztöndíj',
    sectionScholarshipLink: '/osztondij',
    sectionScholarshipText: `A jóga mindenki életében gyökeres változásokat hozhat, gyakorlását bármely élethelyzetben érdemes
                elkezdeni. Előfordulhat azonban, hogy anyagi körülményeink nem teszik lehetővé hogy tapasztalt és
                hiteles jógatanároktól tanulhassunk. A Bandha Works Ösztöndíj éppen az ilyen helyzetekben nyújthat
                segítséget, jógaiskolánk a nyertesnek három hónapra korlátlan Mysore-jógabérletet biztosít.`,
    sectionSocialProofsTitle: 'Rólunk mondták',

    // Button names
    previousMonth: 'Előző hónap',
    nextMonth: 'Következő hónap',

    // MoonDays Card
    noDataAvailable: 'Nincs elérhető adat.',
    newMoon: 'ÚJ',
    fullMoon: 'TELI',
    ekadasi: 'ÉKÁDASI',

    // CTA gombok
    orarendCta: 'Órarend',
    orarendCtaAriaLabel: 'Astanga jóga órarend gomb',
    mysoreprogramCta: 'Mysore-program',
    mysoreprogramCtaAriaLabel: 'Astanga mysore program gomb',
    tanfolyamokCta: 'Tanfolyamok',
    tanfolyamokCtaAriaLabel: 'Astanga jóga tanfolyamok gomb',
  },

  en: {
    // Menu
    orarend: 'Schedule',
    orarendLink: '/en/orarend',
    arak: 'Prices',
    arakLink: '/en/arak',
    mysoreprogram: 'Mysore-program',
    mysoreprogramLink: '/en/astanga-mysore-program',
    tanfolyamok: 'Courses',
    tanfolyamokLink: '/en/tanfolyam',
    csapatunk: 'Our team',
    csapatunkLink: '/en/csapatunk',
    jogairanyzatok: 'Yoga styles',
    jogairanyzatokLink: '/en/vinyasza-jogairanyzatok',
    letoltesek: 'Downloads',
    letoltesekLink: '/en/letoltesek',
    rolunk: 'About',
    rolunkLink: '/en/rolunk',
    elsoalkalom: 'First time',
    elsoalkalomLink: '/en/elsoalkalom',
    hazirend: 'House rules',
    hazirendLink: '/en/hazirend',
    mantra: 'Mantras',
    mantraLink: '/en/mantra',
    holdnapok: 'Moondays',
    holdnapokLink: '/en/holdnapok',
    osztondij: 'Scholarship',
    osztondijLink: '/en/osztondij',
    olvasmanyok: 'Readings',
    olvasmanyokLink: '/en/ajanlott-olvasmanyok',
    jogaorak: 'YOGA CLASSES',
    tudnivalok: 'INFORMATION',
    kapcsolat: 'CONTACT',
    kapcsolatLink: '/en/kapcsolat',
    galeria: 'GALLERY',
    galeriaLink: '/en/galeria',
    blog: 'BLOG',
    blogLink: '/en/blog',

    // KapcsolatForm
    kapcsolatFormName: 'Name',
    kapcsolatFormEmail: 'Email',
    kapcsolatFormMessage: 'Message',
    kapcsolatFormButton: 'Send',

    // Footer
    footerBrandTextLine1: 'Ashtanga Yoga Shala',
    footerBrandTextLine2: 'With the Blessings of',
    footerBrandTextLine3: 'Paramaguru Sharath Jois',
    footerNewsletterTitle: 'SUBSCRIBE TO OUR NEWSLETTER',
    footerNewsletterText: 'Stay up to date with our latest news and events',
    footerNewsletterButton: 'Subscribe',
    footerNewsletterLink: '/en/hirlevel',
    footerPrivacyText: 'Privacy policy',
    footerPrivacyLink: '/en/adatvedelmi-tajekoztato',

    // Sections
    sectionAboutText:
      'The Bandha Works Yoga School was founded in 2013 by three engineers who were united by their desire to promote and teach traditional ashtanga vinyasa yoga in Hungary. After more than ten years, the situation has not changed, our teachers are dedicated practitioners of the tradition and regularly travel to the capital of ashtanga yoga, Mysore, South India, to further deepen their knowledge and understanding by drawing from the lineage. ',
    sectionAboutButton: 'Find out more about us',
    sectionAboutLink: '/en/rolunk',
    sectionAboutTradition: 'Tradition',
    sectionAboutTraditionText: (): string => `
    Hungary's oldest <br/>Ashtanga Mysore program<br/>
    with the blessing of <strong>Paramaguru Sharath Jois</strong>`,
    sectionParamparaText: `Parampara is the knowledge that the teacher passes on to the student. The word parampara in Sanskrit expresses the most valuable form of knowledge transfer, the direct and experiential transfer of knowledge. Yoga teaching must come from the parampara to be effective, true and complete.`,
    sectionParamparaButton: 'Our lineage',
    sectionParamparaLink: '/en/parampara',
    sectionMysoreProgramTitle: 'Ashanga Mysore program',
    sectionMysoreProgramText:
      'The Mysore-style Astanga yoga practice is an effective and personalized method that brings physical strength, flexibility and inner calm. The continuous development it offers and the teacher-student relationship provide an opportunity for deeper understanding and personal development.',
    sectionMysoreProgramButton: 'Ashtanga Mysore program',
    sectionMysoreProgramLink: '/en/astanga-mysore-program',
    sectionEventsTitle: 'Events',
    sectionEventsButton: 'More events',
    sectionEventsLink: '/en/esemenyek',
    sectionScholarshipTitle: 'Scholarship',
    sectionScholarshipButton: 'Scholarship details',
    sectionScholarshipLink: '/en/osztondij',
    sectionScholarshipText: `Yoga can bring radical changes in everyone's life, and it is worth starting at any stage of life. However, sometimes our financial circumstances do not allow us to buy a yoga pass, and we may not yet have the routine to start practising at home. The Bandha Works Scholarship can help in exactly such situations, with our yoga school providing the winner with unlimited yoga pass for three months.`,
    sectionSocialProofsTitle: 'Testimonials',

    // Button names
    previousMonth: 'Previous Month',
    nextMonth: 'Next Month',

    // MoonDays Card
    noDataAvailable: 'No data available.',
    newMoon: 'NEW',
    fullMoon: 'FULL',
    ekadasi: 'EKADASI',

    // CTA buttons
    orarendCta: 'Schedule',
    orarendCtaAriaLabel: 'Ashtanga yoga schedule button',
    mysoreprogramCta: 'Mysore-program',
    mysoreprogramCtaAriaLabel: 'Ashtanga mysore program button',
    tanfolyamokCta: 'Courses',
    tanfolyamokCtaAriaLabel: 'Ashtanga yoga courses button',
  },
};
