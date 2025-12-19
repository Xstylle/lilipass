
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, ChevronRight, ShieldCheck, BadgePercent, Map, Star, Plane } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import TourCard from '../components/TourCard';

const HomePage: React.FC = () => {
  const { tours, testimonials, settings } = useContent();
  const featuredTours = tours.filter(t => t.featured);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={settings.heroImageUrl} 
            alt="Hero Background"
            className="w-full h-full object-cover brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-black/30"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-in slide-in-from-left duration-700">
            <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 font-serif leading-tight">
              {settings.heroTitle}
            </h1>
            <p className="text-xl text-slate-100 mb-10 leading-relaxed max-w-2xl font-medium drop-shadow-md">
              {settings.heroDescription}
            </p>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-xl p-3 md:p-4 rounded-3xl md:rounded-[2rem] border border-white/20 shadow-2xl max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                <div className="bg-white rounded-2xl p-3 flex items-center gap-3">
                  <MapPin className="text-teal-600 shrink-0" size={20} />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Where to?</span>
                    <input placeholder="Search destination" className="text-sm font-bold text-slate-800 bg-transparent border-none focus:ring-0 p-0 placeholder:text-slate-300 w-full" />
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-3 flex items-center gap-3">
                  <Calendar className="text-teal-600 shrink-0" size={20} />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">When?</span>
                    <select className="text-sm font-bold text-slate-800 bg-transparent border-none focus:ring-0 p-0 appearance-none w-full">
                      <option>Any Month</option>
                      <option>January 2025</option>
                      <option>March 2025</option>
                    </select>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-3 flex items-center gap-3">
                  <Users className="text-teal-600 shrink-0" size={20} />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Travelers</span>
                    <select className="text-sm font-bold text-slate-800 bg-transparent border-none focus:ring-0 p-0 appearance-none w-full">
                      <option>1-2 Persons</option>
                      <option>Group of 4+</option>
                    </select>
                  </div>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl p-4 flex items-center justify-center gap-2 font-bold transition-all shadow-lg">
                  <Search size={20} />
                  Find Tours
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: <Map className="text-teal-600" />, label: 'Domestic', path: '/tours?cat=domestic' },
              { icon: <Plane className="text-orange-500" />, label: 'International', path: '/tours?cat=international' },
              { icon: <Users className="text-blue-600" />, label: 'Group Tours', path: '/tours?cat=group' },
              { icon: <Star className="text-yellow-500" />, label: 'Corporate', path: '/tours?cat=corporate' },
              { icon: <BadgePercent className="text-red-500" />, label: 'Hot Deals', path: '/tours?cat=deals' },
              { icon: <ShieldCheck className="text-green-600" />, label: 'Insurance', path: '/about' },
            ].map((cat, idx) => (
              <Link key={idx} to={cat.path} className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all flex flex-col items-center gap-3 border border-slate-100 group">
                <div className="bg-slate-50 p-4 rounded-2xl group-hover:scale-110 transition-transform">{cat.icon}</div>
                <span className="text-sm font-bold text-slate-800">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-teal-600 font-extrabold tracking-widest uppercase text-xs mb-3 block">Top Rated</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-serif">Our Best Selling Packages</h2>
            </div>
            <Link to="/tours" className="group flex items-center gap-2 text-teal-600 font-bold hover:text-teal-700 transition-colors">
              Browse All
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map(tour => <TourCard key={tour.id} tour={tour} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 font-serif">Traveler Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-left">
                <p className="text-slate-300 italic mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full ring-2 ring-teal-500" />
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <span className="text-xs text-slate-400">{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
