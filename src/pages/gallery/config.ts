export type GalleryWithImages = {
  id: number;
  year: number;
  titleHu: string;
  titleEn: string;
  sourceUrl: string;
  highlighted: boolean;
  images: string[];
};

export const galleries: GalleryWithImages[] = [
  {
    id: 1,
    year: 2024,
    titleHu: 'Mysore Képek',
    titleEn: 'Mysore Images',
    sourceUrl: 'https://mula.bandha.works/images/test/',
    highlighted: false,
    images: [],
  },
  {
    id: 2,
    year: 2016,
    titleHu: 'David Robson Mysore Terem',
    titleEn: 'David Robson Mysore Room',
    sourceUrl: 'https://mula.bandha.works/images/2016-DAVID-ROBSON_MYSORE-ROOM/',
    highlighted: true,
    images: [],
  },
  {
    id: 3,
    year: 2017,
    titleHu: 'Harmony Mysore Hét',
    titleEn: 'Harmony Mysore Week',
    sourceUrl: 'https://mula.bandha.works/images/2017-HARMONY-MYSORE-WEEK/',
    highlighted: false,
    images: [],
  },
  {
    id: 4,
    year: 2018,
    titleHu: 'Harmony Mysore Hét',
    titleEn: 'Harmony Mysore Week',
    sourceUrl: 'https://mula.bandha.works/images/2018-HARMONY-MYSORE-WEEK/',
    highlighted: false,
    images: [],
  },
];
