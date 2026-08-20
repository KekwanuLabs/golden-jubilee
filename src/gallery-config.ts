export interface GalleryItem {
  id: number;
  src: string;
  year: string;
  title: string;
  caption: string;
  span?: 'wide' | 'tall' | 'normal';
  placeholderGradient: string;
}

const ARCHIVE_PHOTOS: GalleryItem[] = Array.from({ length: 28 }, (_, index) => ({
  id: index + 3,
  src: `/images/gallery/photo-${String(index + 1).padStart(2, '0')}.jpg`,
  year: 'Family Archives',
  title: 'A Memory Through the Years',
  caption: 'A treasured moment from our family story',
  span: index % 5 === 0 ? 'wide' : index % 3 === 0 ? 'tall' : 'normal',
  placeholderGradient: 'linear-gradient(135deg, #2a1800 0%, #7a5d10 50%, #e0bc50 100%)',
}));

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: '/images/couple.jpg',
    year: 'Our Parents',
    title: 'Together in Joy',
    caption: 'A beautiful life, built side by side',
    span: 'tall',
    placeholderGradient: 'linear-gradient(135deg, #1a1400 0%, #604800 50%, #b89630 100%)',
  },
  {
    id: 2,
    src: '/images/gallery/portrait.jpg',
    year: 'Golden Years',
    title: 'Grace Through the Years',
    caption: 'Fifty years of love, faith, sacrifice and togetherness',
    span: 'wide',
    placeholderGradient: 'linear-gradient(135deg, #2a1800 0%, #7a5d10 50%, #e0bc50 100%)',
  },
  ...ARCHIVE_PHOTOS,
];
