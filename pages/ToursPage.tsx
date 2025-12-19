
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, Grid, List, ChevronDown, Plane, ArrowLeft } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import TourCard from '../components/TourCard';
import { TourCategory } from '../types';

const ToursPage: React.FC = () => {
  const { tours } = useContent();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(150000);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTours = useMemo(() => {
    return tours.filter(tour => {
      const matchesCat = activeCategory === 'All' || tour.category === activeCategory;
      const matchesPrice = tour.price <= priceRange;
      const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tour.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesPrice && matchesSearch;
    });
  }, [tours, activeCategory, priceRange, searchQuery]);

  const categories = ['All', ...Object.values(TourCategory)];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-teal-600 font-bold mb-6 hover:text-teal-700 transition-all group"
          >
            <div className="bg-white p-2 rounded-xl shadow-sm group-hover:-translate-x-1 transition-transform">
              <ArrowLeft size={18} />
            </div>
            Back to Home
          </Link>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 font-serif">Tour Packages</h1>
          <p className="text-slate-600">Explore our curated selection of domestic and international destinations.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4 flex flex-col gap-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b">
                <SlidersHorizontal size={20} className="text-teal-600" />
                <h3 className="font-bold text-lg">Filters</h3>
              </div>

              {/* Search */}
              <div className="mb-8">
                <label className="text-xs uppercase font-bold text-slate-400 mb-3 block">Search Tours</label>
                <div className="relative">
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="E.g. Darjeeling, Dubai"
                    className="w-full bg-slate-50 border-slate-200 rounded-xl py-3 pl-10 text-sm focus:ring-teal-500 focus:border-teal-500"
                  />
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Category */}
              <div className="mb-8">
                <label className="text-xs uppercase font-bold text-slate-400 mb-3 block">Tour Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeCategory === cat 
                          ? 'bg-teal-600 text-white shadow-md' 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs uppercase font-bold text-slate-400 block">Max Budget</label>
                  <span className="text-teal-700 font-bold">₹{priceRange.toLocaleString()}</span>
                </div>
                <input 
                  type="range"
                  min="5000"
                  max="150000"
                  step="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-bold">
                  <span>₹5,000</span>
                  <span>₹1.5L+</span>
                </div>
              </div>
            </div>

            {/* Promo Card */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-2">Exclusive Offer!</h4>
                <p className="text-teal-100 text-sm mb-6">Book any group tour of 6+ people and get 15% flat discount.</p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl text-xs font-bold transition-all shadow-lg">
                  Grab Deal
                </button>
              </div>
              <Plane className="absolute -bottom-8 -right-8 opacity-10 rotate-12 group-hover:scale-125 transition-transform duration-500" size={160} />
            </div>
          </aside>

          {/* Listings Grid */}
          <main className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <span className="text-slate-500 text-sm">
                Showing <span className="font-bold text-slate-900">{filteredTours.length}</span> tours
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-sm border">
                  <button className="p-2 bg-slate-50 rounded-lg text-teal-600"><Grid size={18} /></button>
                  <button className="p-2 text-slate-400"><List size={18} /></button>
                </div>
                <select className="bg-white border-slate-200 rounded-xl text-xs font-bold px-4 py-2 pr-10 focus:ring-teal-500 appearance-none shadow-sm">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                </select>
              </div>
            </div>

            {filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTours.map(tour => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-20 rounded-3xl border border-dashed border-slate-300 flex flex-col items-center text-center gap-4">
                <div className="bg-slate-50 p-6 rounded-full text-slate-300">
                  <Search size={48} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">No tours found</h3>
                  <p className="text-slate-500">Try adjusting your filters or search query to find more options.</p>
                </div>
                <button 
                  onClick={() => { setActiveCategory('All'); setPriceRange(150000); setSearchQuery(''); }}
                  className="text-teal-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ToursPage;
