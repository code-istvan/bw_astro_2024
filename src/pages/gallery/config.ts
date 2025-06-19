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
];
