export interface TimelineMilestone {
  id: string;
  year: number;
  title: string;
  description: string;
  location?: string;
  igboTitle?: string;
  image?: string;
}

export interface Tribute {
  id: string;
  author: string;
  relation: 'Children' | 'Sibling' | 'Extended Family' | 'Friend' | 'Grandchild';
  message: string;
  createdAt: string;
  avatarColor: string;
}

export interface RSVPGuest {
  id: string;
  name: string;
  email: string;
  attending: boolean;
  guestsCount: number;
  asoEbiOrdered: boolean;
  asoEbiSize?: 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Other';
  notes?: string;
  timestamp: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  beadColor: string;
}

export interface TailoringGuideStep {
  title: string;
  description: string;
  measurement: string;
}
