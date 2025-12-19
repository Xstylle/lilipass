
export enum TourCategory {
  DOMESTIC = 'Domestic',
  INTERNATIONAL = 'International',
  GROUP = 'Group',
  FAMILY = 'Family',
  CORPORATE = 'Corporate',
  SEASONAL = 'Seasonal'
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: string[];
  activities: string[];
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  category: TourCategory;
  location: string;
  duration: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  avatar: string;
}

export interface SiteSettings {
  siteName: string;
  siteSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  heroTitle: string;
  heroDescription: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  aboutMission: string;
  aboutTeamDesc: string;
}
