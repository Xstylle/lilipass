
import { TourCategory, TourPackage, Testimonial } from './types';

export const MOCK_TOURS: TourPackage[] = [
  {
    id: '1',
    slug: 'darjeeling-gangtok-delight',
    title: 'Darjeeling & Gangtok Delight',
    category: TourCategory.DOMESTIC,
    location: 'West Bengal & Sikkim',
    duration: '5 Nights / 6 Days',
    price: 18500,
    originalPrice: 22000,
    rating: 4.8,
    reviewCount: 124,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
    description: 'Experience the breathtaking views of the Himalayas and lush tea gardens of Darjeeling followed by the mystic beauty of Gangtok.',
    highlights: ['Sunrise at Tiger Hill', 'Tsomgo Lake & Baba Mandir', 'Rumtek Monastery', 'Batasia Loop'],
    inclusions: ['Accommodation in 3* Hotels', 'Breakfast & Dinner', 'Private Cab for Transfers', 'All Permit Fees'],
    exclusions: ['Airfare/Train Tickets', 'Lunch', 'Entry fees at monuments', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Arrival in NJP/Bagdogra - Transfer to Darjeeling', description: 'Meet our representative and transfer to Darjeeling. Check-in and relax.', meals: ['Dinner'], activities: ['Arrival', 'Leisure'] },
      { day: 2, title: 'Darjeeling Full Day Sightseeing', description: 'Early morning Tiger Hill sunrise. Visit Batasia Loop, Ghoom Monastery.', meals: ['Breakfast', 'Dinner'], activities: ['Tiger Hill', 'Japanese Temple'] },
      { day: 3, title: 'Transfer to Gangtok', description: 'Scenic drive along Teesta river towards Gangtok.', meals: ['Breakfast', 'Dinner'], activities: ['Teesta River View', 'Gangtok Arrival'] }
    ],
    featured: true
  },
  {
    id: '2',
    slug: 'andaman-paradise',
    title: 'Andaman Paradise Island Tour',
    category: TourCategory.DOMESTIC,
    location: 'Andaman & Nicobar Islands',
    duration: '4 Nights / 5 Days',
    price: 32000,
    originalPrice: 40000,
    rating: 4.9,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1589136142558-18c52a7fde91?auto=format&fit=crop&q=80&w=800',
    description: 'Explore the crystal clear waters, white sandy beaches, and historical landmarks of the Andaman Islands.',
    highlights: ['Radhanagar Beach', 'Cellular Jail Light & Sound Show', 'Ross Island', 'Elephant Beach'],
    inclusions: ['Inter-island Ferry', 'Breakfast', 'Airport Transfers', 'Guided Tours'],
    exclusions: ['Airfare', 'Water Sports (Scuba, Snorkeling)', 'Laundry', 'Travel Insurance'],
    itinerary: [
      { day: 1, title: 'Arrival at Port Blair', description: 'Transfer to hotel. Visit Cellular Jail in the evening.', meals: ['Dinner'], activities: ['Light & Sound Show'] }
    ],
    featured: true
  },
  {
    id: '3',
    slug: 'thailand-escapade',
    title: 'Thailand Escapade: Bangkok & Pattaya',
    category: TourCategory.INTERNATIONAL,
    location: 'Thailand',
    duration: '4 Nights / 5 Days',
    price: 45000,
    originalPrice: 55000,
    rating: 4.7,
    reviewCount: 215,
    imageUrl: 'https://images.unsplash.com/photo-1528181304800-2f140819898c?auto=format&fit=crop&q=80&w=800',
    description: 'Enjoy the vibrant nightlife of Pattaya and the cultural richness and shopping paradises of Bangkok.',
    highlights: ['Coral Island Tour', 'Wat Arun & Wat Pho', 'Safari World & Marine Park', 'Chao Phraya Dinner Cruise'],
    inclusions: ['4-star Hotel Accommodation', 'Daily Breakfast', 'Visa Assistance', 'Return Airport Transfers'],
    exclusions: ['International Airfare', 'Visa Fees (if applicable)', 'Personal Tipping', 'Early check-in'],
    itinerary: [],
    featured: true
  },
  {
    id: '4',
    slug: 'silk-route-adventure',
    title: 'Silk Route: Zuluk & Nathang Valley',
    category: TourCategory.DOMESTIC,
    location: 'East Sikkim',
    duration: '3 Nights / 4 Days',
    price: 12500,
    originalPrice: 15000,
    rating: 4.6,
    reviewCount: 56,
    imageUrl: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=800',
    description: 'Travel through the historic Silk Route, experiencing high-altitude loops and breathtaking Himalayan panoramas.',
    highlights: ['Zuluk Loops', 'Thambi View Point', 'Old Baba Mandir', 'Kupup Lake'],
    inclusions: ['Homestay Accommodation', 'All Meals', 'Permit Assistance', 'Reserved Vehicle'],
    exclusions: ['Train/Airfare', 'Insurance', 'Alcoholic Beverages'],
    itinerary: [],
    featured: false
  },
  {
    id: '5',
    slug: 'dubai-luxury-experience',
    title: 'Dubai Luxury Experience',
    category: TourCategory.INTERNATIONAL,
    location: 'UAE',
    duration: '5 Nights / 6 Days',
    price: 88000,
    originalPrice: 95000,
    rating: 4.9,
    reviewCount: 312,
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    description: 'Witness the architectural marvels, world-class shopping, and desert adventures of Dubai.',
    highlights: ['Burj Khalifa 124th Floor', 'Desert Safari with BBQ Dinner', 'Dubai Mall Aquarium', 'Global Village'],
    inclusions: ['5-star Stay', 'All Sightseeing Entry Tickets', 'Desert Safari', 'Dhow Cruise'],
    exclusions: ['Airfare', 'UAE Visa', 'Tourism Dirham Fee', 'Personal Expenses'],
    itinerary: [],
    featured: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Anirban Das',
    location: 'Kolkata, India',
    text: 'Lilipas Travel organized our Darjeeling trip perfectly. The driver was professional and the hotels were top-notch. Highly recommended!',
    avatar: 'https://i.pravatar.cc/150?u=anirban'
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    location: 'London, UK',
    text: 'Our Thailand group tour was seamless. Expert planning and great value for money. Can\'t wait to book my next adventure.',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '3',
    name: 'Rahul Sharma',
    location: 'Delhi, India',
    text: 'Best rates for Andaman packages! The team helped us customize the itinerary exactly how we wanted.',
    avatar: 'https://i.pravatar.cc/150?u=rahul'
  }
];
