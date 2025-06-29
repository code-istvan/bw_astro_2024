export type GalleryWithImages = {
  id: number;
  year: number;
  titleHu: string;
  titleEn: string;
  sourceUrl: string;
  highlighted: boolean;
  images: string[];
  tags: string[];
};

export const galleries: GalleryWithImages[] = [
  {
    id: 2,
    year: 2016,
    titleHu: 'David Robson Mysore Terem',
    titleEn: 'David Robson Mysore Room',
    sourceUrl: 'https://mula.bandha.works/images/2016-DAVID-ROBSON_MYSORE-ROOM/',
    highlighted: true,
    images: [],
    tags: ['oldshala', 'mysore', 'davidrobson'],
  },
  {
    id: 2,
    year: 2016,
    titleHu: 'David Robson Astanga Workshop - 2016',
    titleEn: 'David Robson Workshop',
    sourceUrl: 'https://mula.bandha.works/images/2016-DAVID-ROBSON-WORKSHOP/',
    highlighted: true,
    images: [],
    tags: ['oldshala', 'mysore', 'davidrobson'],
  },
  {
    id: 3,
    year: 2017,
    titleHu: 'Harmony Mysore Hét',
    titleEn: 'Harmony Mysore Week',
    sourceUrl: 'https://mula.bandha.works/images/2017-HARMONY-MYSORE-WEEK/',
    highlighted: false,
    images: [],
    tags: ['newshala', 'mysore', 'harmony'],
  },
  {
    id: 4,
    year: 2018,
    titleHu: 'Harmony Mysore Hét',
    titleEn: 'Harmony Mysore Week',
    sourceUrl: 'https://mula.bandha.works/images/2018-HARMONY-MYSORE-WEEK/',
    highlighted: false,
    images: [],
    tags: ['newshala', 'mysore', 'harmony'],
  },
  {
    id: 5,
    year: 2018,
    titleHu: 'Új Shala Tűz Ceremónia',
    titleEn: 'New Shala Fire Ceremony',
    sourceUrl: 'https://mula.bandha.works/images/2018-FIRE-CEREMONY/',
    highlighted: false,
    images: [],
    tags: ['newshala', 'fireceremony'],
  },
  {
    id: 6,
    year: 2018,
    titleHu: 'Santina Mysore Hét',
    titleEn: 'Santina Mysore Week',
    sourceUrl: 'https://mula.bandha.works/images/2018-SANTINA-MYSORE-WEEK/',
    highlighted: false,
    images: [],
    tags: ['newshala', 'mysore', 'santina'],
  },
  {
    id: 7,
    year: 2014,
    titleHu: 'Laruga Astanga Hétvége',
    titleEn: 'Laruga Ashtanga Weekend',
    sourceUrl: 'https://mula.bandha.works/images/2014-LARUGA-ASHTANGA-WEEKEND/',
    highlighted: false,
    images: [],
    tags: ['oldshala', 'mysore', 'workshop', 'laruga'],
  },
  {
    id: 8,
    year: 2014,
    titleHu: 'Petros Jivamukti workshop',
    titleEn: 'Petros Jivamukti Workshop',
    sourceUrl: 'https://mula.bandha.works/images/2014-PETROS-JIVAMUKTI-WEEKEND/',
    highlighted: false,
    images: [],
    tags: ['oldshala', 'mysore', 'workshop', 'laruga'],
  },
];
