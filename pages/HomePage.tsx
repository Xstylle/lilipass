
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
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000" 
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
                    <input placeholder="Search destination" className="text-sm font-bold text-slate-800 bg-transparent border-none focus:ring-0 p-0 placeholder:text-slate-300" />
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-3 flex items-center gap-3">
                  <Calendar className="text-teal-600 shrink-0" size={20} />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">When?</span>
                    <select className="text-sm font-bold text-slate-800 bg-transparent border-none focus:ring-0 p-0 appearance-none">
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
                    <select className="text-sm font-bold text-slate-800 bg-transparent border-none focus:ring-0 p-0 appearance-none">
                      <option>1-2 Persons</option>
                      <option>Group of 4+</option>
                      <option>Corporate</option>
                    </select>
                  </div>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl p-4 flex items-center justify-center gap-2 font-bold transition-all shadow-lg hover:shadow-orange-200">
                  <Search size={20} />
                  Search Tours
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Nav Categories */}
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
              <Link 
                key={idx} 
                to={cat.path}
                className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all flex flex-col items-center gap-3 border border-slate-100 group"
              >
                <div className="bg-slate-50 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <span className="text-sm font-bold text-slate-800">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-teal-600 font-extrabold tracking-widest uppercase text-xs mb-3 block">Top Rated</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-serif">Explore Our Best Sellers</h2>
            </div>
            <Link 
              to="/tours" 
              className="group flex items-center gap-2 text-teal-600 font-bold hover:text-teal-700 transition-colors"
            >
              View all packages
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800" alt="Plane" className="w-full h-full object-cover" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 font-serif leading-tight">
                Travel with Confidence. <br/>
                <span className="text-orange-400">Experience with {settings.siteName.split(' ')[0]}.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                At {settings.siteName}, we don't just sell tickets; we craft experiences. With 10+ years of expertise in handling group and custom tours across South Asia and beyond, your comfort is our mission.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: 'Best Price Guarantee', desc: 'Premium luxury at competitive local rates.' },
                  { title: 'Expert Planning', desc: 'Hand-picked hotels and experienced guides.' },
                  { title: '24/7 Support', desc: 'Emergency ground assistance wherever you are.' },
                  { title: 'Safe Travels', desc: 'Verified vendors and sanitized transportation.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="bg-teal-600 p-2 rounded-lg h-fit">
                      <ShieldCheck size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1519451241324-20b4ec2c4220?auto=format&fit=crop&q=80&w=400" alt="Travel 1" className="rounded-2xl h-64 w-full object-cover transform translate-y-8" />
                <img src="https://images.unsplash.com/photo-1540202404-a2f290328292?auto=format&fit=crop&q=80&w=400" alt="Travel 2" className="rounded-2xl h-64 w-full object-cover" />
                <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=400" alt="Travel 3" className="rounded-2xl h-64 w-full object-cover transform translate-y-8" />
                <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=400" alt="Travel 4" className="rounded-2xl h-64 w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-16 font-serif">What Our Travelers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 relative text-left">
                <div className="flex text-yellow-400 mb-6">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                </div>
                <p className="text-slate-600 italic mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-teal-100" />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-teal-600 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <img src="https://www.transparenttextures.com/patterns/cubes.png" alt="Pattern" className="w-full h-full" />
            </div>
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">Unlock Special Discounts</h2>
              <p className="text-teal-100 text-lg">Join 10,000+ travelers and get exclusive tour deals sent directly to your inbox.</p>
            </div>
            <div className="relative z-10 w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl md:rounded-full">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 px-6 py-3 placeholder:text-slate-400"
                />
                <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl md:rounded-full font-bold transition-all shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
