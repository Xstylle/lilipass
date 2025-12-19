
import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Plus, Trash2, Edit3, Save, X, Settings, 
  MapPin, Package, MessageSquare, Layout, 
  Check, Image as ImageIcon, AlertCircle, LogOut,
  PlusCircle, MinusCircle, List, Clock, Coffee, Map,
  Star
} from 'lucide-react';
import { TourPackage, TourCategory, Testimonial, ItineraryDay } from '../types';

const AdminPage: React.FC = () => {
  const { 
    tours, testimonials, settings, 
    addTour, deleteTour, editTour, 
    updateSettings, updateTestimonials 
  } = useContent();
  
  const [activeTab, setActiveTab] = useState<'tours' | 'testimonials' | 'settings'>('tours');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [editingTour, setEditingTour] = useState<Partial<TourPackage> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsLoggedIn(true);
    else alert('Incorrect Password (hint: admin123)');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-slate-200">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="bg-teal-600 p-5 rounded-2xl text-white mb-4 shadow-lg shadow-teal-100">
              <Layout size={36} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 mt-2">Manage everything on Lilipas Travel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
              <input 
                type="password" 
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
              />
            </div>
            <button className="w-full bg-teal-600 text-white py-4 rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-xl shadow-teal-100 active:scale-[0.98]">
              Unlock Dashboard
            </button>
          </form>
          <p className="text-center text-[10px] text-slate-400 mt-8 uppercase tracking-widest font-bold">
            Lilipas Travel Control Center
          </p>
        </div>
      </div>
    );
  }

  const handleSaveTour = () => {
    if (!editingTour) return;
    const tour = editingTour as TourPackage;
    if (tours.find(t => t.id === tour.id)) {
      editTour(tour);
    } else {
      addTour({ ...tour, id: Date.now().toString() });
    }
    setEditingTour(null);
  };

  const handleAddListItem = (field: 'highlights' | 'inclusions' | 'exclusions') => {
    if (!editingTour) return;
    const current = editingTour[field] || [];
    setEditingTour({ ...editingTour, [field]: [...current, ''] });
  };

  const handleUpdateListItem = (field: 'highlights' | 'inclusions' | 'exclusions', index: number, value: string) => {
    if (!editingTour) return;
    const current = [...(editingTour[field] || [])];
    current[index] = value;
    setEditingTour({ ...editingTour, [field]: current });
  };

  const handleRemoveListItem = (field: 'highlights' | 'inclusions' | 'exclusions', index: number) => {
    if (!editingTour) return;
    const current = editingTour[field] || [];
    setEditingTour({ ...editingTour, [field]: current.filter((_, i) => i !== index) });
  };

  const handleAddItineraryDay = () => {
    if (!editingTour) return;
    const current = editingTour.itinerary || [];
    const nextDay = current.length + 1;
    const newDay: ItineraryDay = {
      day: nextDay,
      title: 'New Day Plan',
      description: '',
      meals: [],
      activities: []
    };
    setEditingTour({ ...editingTour, itinerary: [...current, newDay] });
  };

  const handleSaveTestimonial = () => {
    if (!editingTestimonial) return;
    const testimonial = editingTestimonial as Testimonial;
    if (testimonials.find(t => t.id === testimonial.id)) {
      updateTestimonials(testimonials.map(t => t.id === testimonial.id ? testimonial : t));
    } else {
      updateTestimonials([...testimonials, { ...testimonial, id: Date.now().toString() }]);
    }
    setEditingTestimonial(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row pt-16">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 p-8 flex flex-col gap-2">
        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-6">Management</div>
        <button 
          onClick={() => setActiveTab('tours')}
          className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'tours' ? 'bg-teal-600 text-white shadow-lg shadow-teal-100' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Package size={22} /> Tour Packages
        </button>
        <button 
          onClick={() => setActiveTab('testimonials')}
          className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'testimonials' ? 'bg-teal-600 text-white shadow-lg shadow-teal-100' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <MessageSquare size={22} /> Testimonials
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'settings' ? 'bg-teal-600 text-white shadow-lg shadow-teal-100' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Settings size={22} /> Site Settings
        </button>
        
        <div className="mt-auto pt-8 border-t space-y-4">
          <div className="p-4 bg-teal-50 rounded-2xl">
            <p className="text-[10px] text-teal-600 font-bold uppercase mb-1">Status</p>
            <div className="flex items-center gap-2 text-sm font-bold text-teal-900">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
              Admin Session Active
            </div>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-4 p-4 w-full text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all">
            <LogOut size={22} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-[calc(100vh-64px)]">
        <div className="max-w-6xl mx-auto">
          
          {/* TOURS TAB */}
          {activeTab === 'tours' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 font-serif">Tour Inventory</h2>
                  <p className="text-slate-500 mt-2">Edit package pricing, itineraries, and visibility</p>
                </div>
                <button 
                  onClick={() => setEditingTour({ 
                    title: '', price: 0, originalPrice: 0, 
                    category: TourCategory.DOMESTIC, location: '', 
                    duration: '', highlights: [], inclusions: [], 
                    exclusions: [], itinerary: [], slug: '',
                    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'
                  })}
                  className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-orange-600 shadow-xl shadow-orange-100 transition-all hover:-translate-y-1 active:translate-y-0"
                >
                  <Plus size={22} /> Launch New Tour
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {tours.map(tour => (
                  <div key={tour.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center gap-8 hover:shadow-2xl transition-all group">
                    <div className="relative w-full md:w-32 h-32 shrink-0 overflow-hidden rounded-3xl">
                      <img src={tour.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                      <div className="absolute top-2 left-2 bg-teal-600 text-white text-[8px] font-black uppercase px-2 py-1 rounded-full">
                        {tour.category}
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="text-xl font-bold text-slate-900 mb-1">{tour.title}</h4>
                      <div className="text-sm text-slate-500 flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2">
                        <span className="flex items-center gap-1.5"><MapPin size={16} className="text-orange-500" /> {tour.location}</span>
                        <span className="flex items-center gap-1.5"><Clock size={16} className="text-teal-600" /> {tour.duration}</span>
                        <span className="text-teal-700 font-black px-3 py-1 bg-teal-50 rounded-lg">₹{tour.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setEditingTour(tour)} className="p-4 text-teal-600 hover:text-white hover:bg-teal-600 bg-slate-50 rounded-2xl transition-all shadow-sm"><Edit3 size={20} /></button>
                      <button onClick={() => deleteTour(tour.id)} className="p-4 text-red-400 hover:text-white hover:bg-red-500 bg-slate-50 rounded-2xl transition-all shadow-sm"><Trash2 size={20} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
              <h2 className="text-4xl font-black text-slate-900 font-serif mb-12">Website Configuration</h2>
              <div className="space-y-8">
                <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl">
                  <h3 className="text-lg font-bold mb-8 flex items-center gap-3 text-slate-400 uppercase tracking-[0.1em]">
                    <Layout size={20} /> Basic Branding
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Main Site Title</label>
                      <input className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:bg-white transition-all outline-none" value={settings.siteName} onChange={e => updateSettings({...settings, siteName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Hero Accent Label</label>
                      <input className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:bg-white transition-all outline-none" value={settings.siteSubtitle} onChange={e => updateSettings({...settings, siteSubtitle: e.target.value})} />
                    </div>
                  </div>
                </section>

                <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl">
                  <h3 className="text-lg font-bold mb-8 flex items-center gap-3 text-slate-400 uppercase tracking-[0.1em]">
                    <MapPin size={20} /> Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Support Email</label>
                      <input className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:bg-white transition-all outline-none" value={settings.contactEmail} onChange={e => updateSettings({...settings, contactEmail: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Hotline Number</label>
                      <input className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:bg-white transition-all outline-none" value={settings.contactPhone} onChange={e => updateSettings({...settings, contactPhone: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">HQ Address</label>
                      <input className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:bg-white transition-all outline-none" value={settings.contactAddress} onChange={e => updateSettings({...settings, contactAddress: e.target.value})} />
                    </div>
                  </div>
                </section>

                <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl">
                  <h3 className="text-lg font-bold mb-8 flex items-center gap-3 text-slate-400 uppercase tracking-[0.1em]">
                    <Settings size={20} /> Social Presence
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Facebook URL</label>
                      <input className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none" value={settings.facebookUrl} onChange={e => updateSettings({...settings, facebookUrl: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Instagram URL</label>
                      <input className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none" value={settings.instagramUrl} onChange={e => updateSettings({...settings, instagramUrl: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Youtube URL</label>
                      <input className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none" value={settings.youtubeUrl} onChange={e => updateSettings({...settings, youtubeUrl: e.target.value})} />
                    </div>
                  </div>
                </section>
                
                <div className="flex justify-end p-4">
                  <div className="bg-teal-600 text-white px-8 py-4 rounded-2xl text-sm font-black flex items-center gap-3 shadow-xl shadow-teal-100">
                    <Check size={20} /> Auto-Saving to Local Storage
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TESTIMONIALS TAB */}
          {activeTab === 'testimonials' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
               <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 font-serif">Customer Feedback</h2>
                  <p className="text-slate-500 mt-2">Verified reviews from our global travelers</p>
                </div>
                <button 
                  onClick={() => setEditingTestimonial({ name: '', text: '', location: '', avatar: 'https://i.pravatar.cc/150?u=new' })}
                  className="bg-teal-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-teal-700 shadow-xl shadow-teal-100 transition-all"
                >
                  <Plus size={22} /> Add Review
                </button>
              </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map(t => (
                  <div key={t.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 relative group hover:shadow-2xl transition-all">
                    <div className="flex gap-6 items-center mb-6">
                      <img src={t.avatar} className="w-16 h-16 rounded-3xl object-cover ring-4 ring-slate-50" alt="" />
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{t.name}</h4>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t.location}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 italic leading-relaxed">"{t.text}"</p>
                    <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingTestimonial(t)} className="p-3 text-teal-600 hover:bg-teal-50 rounded-xl"><Edit3 size={18} /></button>
                      <button onClick={() => updateTestimonials(testimonials.filter(x => x.id !== t.id))} className="p-3 text-red-500 hover:bg-red-50 rounded-xl"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
               </div>
            </div>
          )}
        </div>
      </main>

      {/* Edit Tour Modal */}
      {editingTour && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-[3rem] shadow-2xl animate-in zoom-in slide-in-from-bottom-10 duration-300">
            <div className="p-10 border-b sticky top-0 bg-white/80 backdrop-blur-xl z-20 flex justify-between items-center">
              <div>
                <h3 className="text-3xl font-black text-slate-900">Configure Package</h3>
                <p className="text-sm text-slate-400 mt-1">Refine every aspect of your travel offering</p>
              </div>
              <button onClick={() => setEditingTour(null)} className="p-3 hover:bg-slate-100 text-slate-400 rounded-2xl transition-colors"><X size={32} /></button>
            </div>
            
            <div className="p-10 space-y-12">
              {/* Core Information Section */}
              <section className="space-y-8">
                <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] border-b pb-4">Essential Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Tour Headline</label>
                    <input className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-slate-800" value={editingTour.title} onChange={e => setEditingTour({...editingTour, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Destination Location</label>
                    <input className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all" value={editingTour.location} onChange={e => setEditingTour({...editingTour, location: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Package Pricing (INR)</label>
                    <input type="number" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-black text-teal-600" value={editingTour.price} onChange={e => setEditingTour({...editingTour, price: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Strike Price (INR)</label>
                    <input type="number" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all line-through text-slate-400" value={editingTour.originalPrice} onChange={e => setEditingTour({...editingTour, originalPrice: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Service Type</label>
                    <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all" value={editingTour.category} onChange={e => setEditingTour({...editingTour, category: e.target.value as TourCategory})}>
                      {Object.values(TourCategory).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Duration Tag</label>
                    <input className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all" placeholder="5N / 6D" value={editingTour.duration} onChange={e => setEditingTour({...editingTour, duration: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Featured Placement</label>
                    <button 
                      onClick={() => setEditingTour({...editingTour, featured: !editingTour.featured})}
                      className={`w-full py-4 rounded-2xl font-bold transition-all border-2 ${editingTour.featured ? 'bg-orange-50 border-orange-500 text-orange-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                    >
                      {editingTour.featured ? '★ Featured on Home' : 'Not Featured'}
                    </button>
                  </div>
                </div>
              </section>

              {/* Lists Management Section */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Highlights */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                      <Star size={16} /> Highlights
                    </h5>
                    <button onClick={() => handleAddListItem('highlights')} className="text-teal-600 hover:text-teal-700 transition-colors"><PlusCircle size={20}/></button>
                  </div>
                  <div className="space-y-2">
                    {editingTour.highlights?.map((h, i) => (
                      <div key={i} className="flex gap-2">
                        <input className="flex-1 px-4 py-2 bg-slate-50 rounded-xl text-sm" value={h} onChange={e => handleUpdateListItem('highlights', i, e.target.value)} />
                        <button onClick={() => handleRemoveListItem('highlights', i)} className="text-slate-300 hover:text-red-500"><MinusCircle size={18}/></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-black uppercase text-teal-500 tracking-widest flex items-center gap-2">
                      <Check size={16} /> Inclusions
                    </h5>
                    <button onClick={() => handleAddListItem('inclusions')} className="text-teal-600 hover:text-teal-700 transition-colors"><PlusCircle size={20}/></button>
                  </div>
                  <div className="space-y-2">
                    {editingTour.inclusions?.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <input className="flex-1 px-4 py-2 bg-slate-50 rounded-xl text-sm" value={item} onChange={e => handleUpdateListItem('inclusions', i, e.target.value)} />
                        <button onClick={() => handleRemoveListItem('inclusions', i)} className="text-slate-300 hover:text-red-500"><MinusCircle size={18}/></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exclusions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-black uppercase text-red-400 tracking-widest flex items-center gap-2">
                      <X size={16} /> Exclusions
                    </h5>
                    <button onClick={() => handleAddListItem('exclusions')} className="text-teal-600 hover:text-teal-700 transition-colors"><PlusCircle size={20}/></button>
                  </div>
                  <div className="space-y-2">
                    {editingTour.exclusions?.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <input className="flex-1 px-4 py-2 bg-slate-50 rounded-xl text-sm" value={item} onChange={e => handleUpdateListItem('exclusions', i, e.target.value)} />
                        <button onClick={() => handleRemoveListItem('exclusions', i)} className="text-slate-300 hover:text-red-500"><MinusCircle size={18}/></button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Itinerary Management Section */}
              <section className="space-y-8">
                <div className="flex items-center justify-between border-b pb-4">
                  <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Detailed Itinerary</h4>
                  <button onClick={handleAddItineraryDay} className="flex items-center gap-2 text-teal-600 font-bold hover:bg-teal-50 px-4 py-2 rounded-xl transition-all">
                    <Plus size={18} /> Add Day Plan
                  </button>
                </div>
                <div className="space-y-6">
                  {editingTour.itinerary?.map((day, idx) => (
                    <div key={idx} className="bg-slate-50 p-8 rounded-3xl space-y-4 border border-slate-100 relative group">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center shrink-0 h-fit">
                          <span className="text-[10px] font-black text-slate-300 uppercase">Day</span>
                          <span className="text-3xl font-black text-teal-600 leading-none">{day.day}</span>
                        </div>
                        <div className="flex-1 space-y-4">
                          <input className="w-full px-5 py-3 bg-white border-none rounded-xl font-bold shadow-sm" placeholder="Activity Headline" value={day.title} onChange={e => {
                            const newItin = [...(editingTour.itinerary || [])];
                            newItin[idx] = {...day, title: e.target.value};
                            setEditingTour({...editingTour, itinerary: newItin});
                          }} />
                          <textarea className="w-full px-5 py-3 bg-white border-none rounded-xl text-sm shadow-sm" rows={3} placeholder="Describe the day's journey..." value={day.description} onChange={e => {
                            const newItin = [...(editingTour.itinerary || [])];
                            newItin[idx] = {...day, description: e.target.value};
                            setEditingTour({...editingTour, itinerary: newItin});
                          }} />
                        </div>
                        <div className="w-full md:w-64 space-y-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-slate-400">Meals Included</label>
                             <input className="w-full px-4 py-2 bg-white rounded-xl text-xs" placeholder="e.g. Breakfast, Dinner" value={day.meals.join(', ')} onChange={e => {
                               const newItin = [...(editingTour.itinerary || [])];
                               newItin[idx] = {...day, meals: e.target.value.split(',').map(s => s.trim()).filter(Boolean)};
                               setEditingTour({...editingTour, itinerary: newItin});
                             }} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-slate-400">Main Activities</label>
                             <input className="w-full px-4 py-2 bg-white rounded-xl text-xs" placeholder="e.g. Hiking, Boat Ride" value={day.activities.join(', ')} onChange={e => {
                               const newItin = [...(editingTour.itinerary || [])];
                               newItin[idx] = {...day, activities: e.target.value.split(',').map(s => s.trim()).filter(Boolean)};
                               setEditingTour({...editingTour, itinerary: newItin});
                             }} />
                          </div>
                        </div>
                      </div>
                      <button onClick={() => {
                        const newItin = editingTour.itinerary?.filter((_, i) => i !== idx).map((d, i) => ({...d, day: i+1}));
                        setEditingTour({...editingTour, itinerary: newItin});
                      }} className="absolute -top-3 -right-3 p-2 bg-white text-red-400 hover:text-red-600 rounded-full shadow-md border border-red-50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MinusCircle size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Visual Presentation Section */}
              <section className="space-y-8">
                <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] border-b pb-4">Gallery & Media</h4>
                <div className="bg-slate-50 p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center border border-slate-100">
                  <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white shrink-0">
                    <img src={editingTour.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <label className="text-xs font-bold text-slate-500 uppercase block ml-1">Cover Image Source (Unsplash/Direct)</label>
                    <div className="relative">
                      <input className="w-full px-12 py-4 bg-white border-none rounded-2xl shadow-sm outline-none text-sm" value={editingTour.imageUrl} onChange={e => setEditingTour({...editingTour, imageUrl: e.target.value})} />
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    </div>
                    <p className="text-[10px] text-slate-400 italic">Use high-resolution scenic images for better conversion rates.</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="p-10 border-t bg-slate-50/50 flex flex-col sm:flex-row justify-end gap-6 items-center">
              <button onClick={() => setEditingTour(null)} className="px-10 py-4 font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest text-xs">Discard Changes</button>
              <button onClick={handleSaveTour} className="w-full sm:w-auto bg-teal-600 text-white px-12 py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 hover:bg-teal-700 transition-all shadow-2xl shadow-teal-100 hover:-translate-y-1 active:translate-y-0">
                <Save size={24} /> Sync & Update Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl animate-in zoom-in duration-200 overflow-hidden">
            <div className="p-8 border-b bg-white/50 backdrop-blur flex justify-between items-center">
              <h3 className="text-2xl font-black text-slate-900">Review Editor</h3>
              <button onClick={() => setEditingTestimonial(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Traveler Avatar URL</label>
                <div className="flex items-center gap-4">
                  <img src={editingTestimonial.avatar} className="w-12 h-12 rounded-2xl bg-slate-100" />
                  <input className="flex-1 px-5 py-3 bg-slate-50 border-none rounded-xl text-sm" value={editingTestimonial.avatar} onChange={e => setEditingTestimonial({...editingTestimonial, avatar: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                <input className="w-full px-5 py-3 bg-slate-50 border-none rounded-xl" value={editingTestimonial.name} onChange={e => setEditingTestimonial({...editingTestimonial, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Base Location</label>
                <input className="w-full px-5 py-3 bg-slate-50 border-none rounded-xl" placeholder="e.g. Kolkata, India" value={editingTestimonial.location} onChange={e => setEditingTestimonial({...editingTestimonial, location: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Customer Story</label>
                <textarea rows={4} className="w-full px-5 py-3 bg-slate-50 border-none rounded-xl text-sm" placeholder="Paste feedback here..." value={editingTestimonial.text} onChange={e => setEditingTestimonial({...editingTestimonial, text: e.target.value})} />
              </div>
            </div>
            <div className="p-8 bg-slate-50 border-t flex justify-end gap-4">
              <button onClick={() => setEditingTestimonial(null)} className="px-6 py-3 font-bold text-slate-400 text-sm uppercase">Cancel</button>
              <button onClick={handleSaveTestimonial} className="bg-teal-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-teal-700 shadow-lg shadow-teal-100">Publish Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
