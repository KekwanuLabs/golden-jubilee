export interface GalleryItem {
  id: number;
  src?: string;          // path relative to public/, e.g. "/images/gallery/photo-01.jpg"
  year: string;
  title: string;
  caption: string;
  span?: 'wide' | 'tall' | 'normal';
  placeholderGradient: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: '/images/gallery/photo-01.jpg',
    year: '1976',
    title: 'Wedding Day',
    caption: 'The day it all began',
    span: 'wide',
    placeholderGradient: 'linear-gradient(135deg, #3d2600 0%, #8b6914 50%, #d4af37 100%)',
  },
  {
    id: 2,
    src: '/images/gallery/photo-02.jpg',
    year: '1976',
    title: 'Traditional Ceremony',
    caption: 'Igba Nkwu — the palm wine',
    placeholderGradient: 'linear-gradient(135deg, #2d1a00 0%, #7a5500 60%, #c9922a 100%)',
  },
  {
    id: 3,
    src: '/images/gallery/photo-03.jpg',
    year: '1978',
    title: 'First Family Portrait',
    caption: 'A new chapter begins',
    placeholderGradient: 'linear-gradient(160deg, #3a2200 0%, #9a7000 70%, #e0b84a 100%)',
  },
  {
    id: 4,
    src: '/images/gallery/photo-04.jpg',
    year: '1980s',
    title: 'Family Life in Lagos',
    caption: 'Building a home full of love',
    span: 'tall',
    placeholderGradient: 'linear-gradient(135deg, #1a1400 0%, #604800 50%, #b89630 100%)',
  },
  {
    id: 5,
    src: '/images/gallery/photo-05.jpg',
    year: '1985',
    title: 'The Children Grow',
    caption: 'Six blessings and counting',
    placeholderGradient: 'linear-gradient(145deg, #2c1800 0%, #704800 55%, #c8a02a 100%)',
  },
  {
    id: 6,
    src: '/images/gallery/photo-06.jpg',
    year: '1990s',
    title: 'School Celebrations',
    caption: 'Watching every achievement',
    placeholderGradient: 'linear-gradient(135deg, #300e00 0%, #7b5010 60%, #d4a432 100%)',
  },
  {
    id: 7,
    src: '/images/gallery/photo-07.jpg',
    year: '2000s',
    title: 'Milestones & Graduations',
    caption: 'The harvest of their sacrifice',
    span: 'wide',
    placeholderGradient: 'linear-gradient(150deg, #261200 0%, #6c5200 50%, #d0aa36 100%)',
  },
  {
    id: 8,
    src: '/images/gallery/photo-08.jpg',
    year: '2010s',
    title: 'Grandchildren Arrive',
    caption: 'The greatest reward of all',
    placeholderGradient: 'linear-gradient(135deg, #1e1000 0%, #624500 55%, #c4a030 100%)',
  },
  {
    id: 9,
    src: '/images/gallery/photo-09.jpg',
    year: '2020s',
    title: 'Still Together, Still Strong',
    caption: 'Choosing each other every day',
    placeholderGradient: 'linear-gradient(135deg, #2a1800 0%, #7a5d10 50%, #e0bc50 100%)',
  },
  {
    id: 10,
    src: '/images/gallery/photo-10.jpg',
    year: '2024',
    title: 'Golden Years',
    caption: 'A love that shines brighter with time',
    span: 'tall',
    placeholderGradient: 'linear-gradient(145deg, #1a1000 0%, #5a4200 45%, #d4af37 85%, #ffe082 100%)',
  },
  {
    id: 11,
    src: '/images/gallery/photo-11.jpg',
    year: '2025',
    title: 'Family Reunion',
    caption: 'Six children, one beautiful legacy',
    placeholderGradient: 'linear-gradient(135deg, #2c1800 0%, #6a4f0a 55%, #c8a226 100%)',
  },
  {
    id: 12,
    src: '/images/gallery/photo-12.jpg',
    year: '2026',
    title: 'The Golden Jubilee',
    caption: "50 years of God's faithfulness",
    span: 'wide',
    placeholderGradient: 'linear-gradient(135deg, #3a2600 0%, #8b6c00 40%, #d4af37 70%, #ffe082 100%)',
  },
];
