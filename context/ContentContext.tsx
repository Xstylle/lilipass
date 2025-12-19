
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TourPackage, Testimonial, SiteSettings, TourCategory } from '../types';
import { MOCK_TOURS, TESTIMONIALS } from '../constants';

interface ContentContextType {
  tours: TourPackage[];
  testimonials: Testimonial[];
  settings: SiteSettings;
  addTour: (tour: TourPackage) => void;
  deleteTour: (id: string) => void;
  editTour: (tour: TourPackage) => void;
  updateSettings: (settings: SiteSettings) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Lilipas Travel",
  siteSubtitle: "Travel",
  contactEmail: "info@lilipastravel.com",
  contactPhone: "+91 98765 43210",
  contactAddress: "123 Travel Lane, Bhowanipore, Kolkata, West Bengal - 700025",
  heroTitle: "Discover Your Next Grand Adventure",
  heroDescription: "From the misty peaks of Darjeeling to the turquoise waters of Andaman, Lilipas Travel creates memories that last a lifetime.",
  heroImageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  youtubeUrl: "https://youtube.com",
  aboutMission: "Founded with a passion for discovery, Lilipas Travel connects travelers with authentic local experiences while maintaining global standards of comfort and safety.",
  aboutTeamDesc: "Our team consists of travel consultants, ground operators, and hospitality experts who collectively have traveled to over 40 countries. We don't just plan tours; we plan adventures that we ourselves would love to go on."
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tours, setTours] = useState<TourPackage[]>(() => {
    const saved = localStorage.getItem('lilipas_tours_v1');
    return saved ? JSON.parse(saved) : MOCK_TOURS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('lilipas_testimonials_v1');
    return saved ? JSON.parse(saved) : TESTIMONIALS;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('lilipas_settings_v1');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('lilipas_tours_v1', JSON.stringify(tours));
  }, [tours]);

  useEffect(() => {
    localStorage.setItem('lilipas_testimonials_v1', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('lilipas_settings_v1', JSON.stringify(settings));
  }, [settings]);

  const addTour = (tour: TourPackage) => setTours(prev => [...prev, tour]);
  const deleteTour = (id: string) => setTours(prev => prev.filter(t => t.id !== id));
  const editTour = (updatedTour: TourPackage) => setTours(prev => prev.map(t => t.id === updatedTour.id ? updatedTour : t));

  return (
    <ContentContext.Provider value={{ 
      tours, testimonials, settings, 
      addTour, deleteTour, editTour,
      updateSettings: setSettings,
      updateTestimonials: setTestimonials
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
};
