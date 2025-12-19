
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Star, Check, X, Calendar, Users, Heart, Share2, Info, ChevronRight, Phone, ArrowLeft } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const TourDetailPage: React.FC = () => {
  const { tours } = useContent();
  const { slug } = useParams<{ slug: string }>();
  const tour = tours.find(t => t.slug === slug);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'reviews'>('itinerary');

  if (!tour) return <div className="pt-40 text-center">Tour not found. <Link to="/tours" className="text-teal-600">Browse tours</Link></div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[60vh] md:h-[70vh]">
        <img src={tour.imageUrl} alt={tour.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-12 left-0 w-full">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-4">
                  <Link 
                    to="/tours" 
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition-all group"
                  >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Tours
                  </Link>
                  <nav className="flex items-center gap-2 text-white/70 text-sm">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <span className="text-white font-bold">{tour.title}</span>
                  </nav>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-teal-600 text-white text-[10px] uppercase font-extrabold px-3 py-1 rounded-full">{tour.category}</span>
                  {tour.featured && <span className="bg-orange-500 text-white text-[10px] uppercase font-extrabold px-3 py-1 rounded-full">Featured</span>}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-4 leading-tight">{tour.title}</h1>
                <div className="flex items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-teal-400" />
                    <span className="font-bold">{tour.location}</span>
                  </div>
                  <div className="flex items-center gap-2 border-l border-white/20 pl-6">
                    <Clock size={20} className="text-teal-400" />
                    <span className="font-bold">{tour.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="bg-white/10 backdrop-blur-md p-3 rounded-2xl text-white hover:bg-white/20 transition-all border border-white/20">
                  <Heart size={24} />
                </button>
                <button className="bg-white/10 backdrop-blur-md p-3 rounded-2xl text-white hover:bg-white/20 transition-all border border-white/20">
                  <Share2 size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Summary Tabs */}
            <div className="flex items-center gap-8 border-b mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {['itinerary', 'inclusions', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-4 text-sm font-extrabold uppercase tracking-widest transition-all relative ${
                    activeTab === tab ? 'text-teal-600' : 'text-slate-400'
                  }`}
                >
                  {tab}
                  {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-1 bg-teal-600 rounded-t-full"></span>}
                </button>
              ))}
            </div>

            {activeTab === 'itinerary' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="prose prose-slate max-w-none">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Tour Overview</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{tour.description}</p>
                </div>

                <div className="bg-slate-50 p-6 md:p-10 rounded-[2rem] border border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <Info className="text-teal-600" />
                    Day-by-Day Itinerary
                  </h3>
                  <div className="space-y-8 relative before:absolute before:left-4 md:before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {tour.itinerary && tour.itinerary.length > 0 ? tour.itinerary.map((day, idx) => (
                      <div key={idx} className="relative pl-12 md:pl-20 group">
                        <div className="absolute left-0 md:left-2 top-0 bg-white border-2 border-teal-600 text-teal-600 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black z-10 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-md">
                          {day.day}
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group-hover:shadow-lg transition-all">
                          <h4 className="text-xl font-bold text-slate-900 mb-4">{day.title}</h4>
                          <p className="text-slate-600 mb-6 leading-relaxed">{day.description}</p>
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg">
                              <span className="text-orange-500">MEALS:</span> {day.meals.join(', ')}
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg">
                              <span className="text-teal-500">ACTIVITIES:</span> {day.activities.join(' • ')}
                            </div>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <p className="text-slate-500">Full itinerary details are being updated. Contact us for custom plan.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inclusions' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
                <div className="bg-teal-50/30 p-8 rounded-3xl border border-teal-100">
                  <h3 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-2">
                    <Check className="bg-teal-600 text-white rounded-full p-1" size={24} />
                    What's Included
                  </h3>
                  <ul className="space-y-4">
                    {tour.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 font-medium">
                        <Check size={18} className="text-teal-600 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-orange-50/30 p-8 rounded-3xl border border-orange-100">
                  <h3 className="text-xl font-bold text-orange-900 mb-6 flex items-center gap-2">
                    <X className="bg-orange-500 text-white rounded-full p-1" size={24} />
                    What's Excluded
                  </h3>
                  <ul className="space-y-4">
                    {tour.exclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 font-medium opacity-80">
                        <X size={18} className="text-orange-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Booking Panel */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 ring-1 ring-slate-900/5">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-slate-400 text-sm line-through">₹{tour.originalPrice.toLocaleString()}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900">₹{tour.price.toLocaleString()}</span>
                      <span className="text-slate-500 text-sm font-bold">/ person</span>
                    </div>
                  </div>
                  <div className="bg-teal-50 text-teal-700 px-3 py-2 rounded-2xl flex flex-col items-center">
                    <Star size={18} className="fill-teal-600 mb-1" />
                    <span className="text-lg font-black leading-none">{tour.rating}</span>
                    <span className="text-[10px] uppercase font-bold text-teal-600/60 mt-1">{tour.reviewCount} Reviews</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 border border-slate-100">
                    <Calendar className="text-teal-600" size={20} />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Departure Date</span>
                      <span className="text-sm font-bold text-slate-800">Select Date</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 border border-slate-100">
                    <Users className="text-teal-600" size={20} />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Travelers</span>
                      <span className="text-sm font-bold text-slate-800">2 Persons</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl hover:shadow-orange-200 active:scale-95 mb-4">
                  Book This Tour
                </button>
                <button className="w-full bg-white border-2 border-slate-900 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <Phone size={18} />
                  Call for Inquiry
                </button>
                
                <p className="text-center text-xs text-slate-400 mt-6 font-medium">
                  Free cancellation up to 72 hours before departure. No booking fees.
                </p>
              </div>

              {/* Promo Widget */}
              <div className="bg-slate-900 p-6 rounded-[2rem] text-white flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-2xl">
                  <BadgePercent className="text-orange-400" size={32} />
                </div>
                <div>
                  <h4 className="font-bold">Group Discount!</h4>
                  <p className="text-slate-400 text-xs">Save 10% on bookings for 6+ people.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;

const BadgePercent = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} height={size || 24} 
    viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="m3 11 18-5"/><path d="m3 18 18-5"/><path d="M12 12h.01"/><path d="M12 18h.01"/><path d="M12 6h.01"/><path d="M18 12h.01"/><path d="M18 18h.01"/><path d="M18 6h.01"/><path d="M6 12h.01"/><path d="M6 18h.01"/><path d="M6 6h.01"/>
  </svg>
);
