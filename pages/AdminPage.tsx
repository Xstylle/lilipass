
import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Plus, Trash2, Edit3, Save, X, Settings, 
  MapPin, Package, MessageSquare, Layout, 
  Check, Image as ImageIcon, LogOut,
  PlusCircle, MinusCircle, Clock, Star, Globe, Phone, Mail
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
            <h1 className="text-3xl font-bold text-slate-900">Admin Login</h1>
            <p className="text-slate-500 mt-2">Manage Lilipas Travel Content</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <input 
                type="password" 
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
              />
            </div>
            <button className="w-full bg-teal-600 text-white py-4 rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-xl shadow-teal-100 active:scale-[0.98]">
              Open Dashboard
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
      addTour({ ...tour, id: Date.now().toString(), rating: 5, reviewCount: 0 });
    }
    setEditingTour(null);
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

  const handleAddItineraryDay = () => {
    if (!editingTour) return;
    const current = editingTour.itinerary || [];
    const newDay: ItineraryDay = {
      day: current.length + 1,
      title: 'New Activity',
      description: '',
      meals: [],
      activities: []
    };
    setEditingTour({ ...editingTour, itinerary: [...current, newDay] });
  };

  const handleUpdateItineraryDay = (index: number, field: keyof ItineraryDay, value: any) => {
    if (!editingTour || !editingTour.itinerary) return;
    const newItinerary = [...editingTour.itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setEditingTour({ ...editingTour, itinerary: newItinerary });
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
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-4 p-4 w-full text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all">
            <LogOut size={22} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-[calc(100vh-64px)]">
        <div className="max-w-6xl mx-auto">
          
          {/* TOURS TAB */}
          {activeTab === 'tours' && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 font-serif">Tour Inventory</h2>
                  <p className="text-slate-500 mt-2">Manage your travel packages and itineraries</p>
                </div>
                <button 
                  onClick={() => setEditingTour({ 
                    title: '', price: 0, originalPrice: 0, category: TourCategory.DOMESTIC, 
                    location: '', duration: '', highlights: [], inclusions: [], exclusions: [], 
                    itinerary: [], slug: '', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' 
                  })}
                  className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-orange-600 shadow-xl transition-all"
                >
                  <Plus size={22} /> Add New Tour
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {tours.map(tour => (
                  <div key={tour.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center gap-8 hover:shadow-2xl transition-all group">
                    <img src={tour.imageUrl} className="w-full md:w-32 h-32 rounded-3xl object-cover" alt="" />
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="text-xl font-bold text-slate-900 mb-1">{tour.title}</h4>
                      <div className="text-sm text-slate-500 flex flex-wrap justify-center md:justify-start items-center gap-4">
                        <span className="flex items-center gap-1"><MapPin size={16} /> {tour.location}</span>
                        <span className="flex items-center gap-1"><Clock size={16} /> {tour.duration}</span>
                        <span className="text-teal-700 font-black">₹{tour.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setEditingTour(tour)} className="p-4 text-teal-600 hover:bg-teal-50 rounded-2xl transition-all shadow-sm"><Edit3 size={20} /></button>
                      <button onClick={() => deleteTour(tour.id)} className="p-4 text-red-400 hover:bg-red-50 rounded-2xl transition-all shadow-sm"><Trash2 size={20} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <h2 className="text-4xl font-black text-slate-900 font-serif mb-12">Site Configuration</h2>
              <div className="space-y-8">
                <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-400 uppercase tracking-widest"><Globe size={20} /> Branding & Hero</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Site Name</label>
                      <input className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none border-none focus:ring-2 focus:ring-teal-500" value={settings.siteName} onChange={e => updateSettings({...settings, siteName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Site Subtitle</label>
                      <input className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none" value={settings.siteSubtitle} onChange={e => updateSettings({...settings, siteSubtitle: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Hero Main Title</label>
                      <input className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none" value={settings.heroTitle} onChange={e => updateSettings({...settings, heroTitle: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Hero Description</label>
                      <textarea className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none" rows={3} value={settings.heroDescription} onChange={e => updateSettings({...settings, heroDescription: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Hero Image URL</label>
                      <input className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none" value={settings.heroImageUrl} onChange={e => updateSettings({...settings, heroImageUrl: e.target.value})} />
                    </div>
                  </div>
                </section>

                <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-400 uppercase tracking-widest"><Phone size={20} /> Contact Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                      <input className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none" value={settings.contactEmail} onChange={e => updateSettings({...settings, contactEmail: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                      <input className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none" value={settings.contactPhone} onChange={e => updateSettings({...settings, contactPhone: e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Full Address</label>
                      <input className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none" value={settings.contactAddress} onChange={e => updateSettings({...settings, contactAddress: e.target.value})} />
                    </div>
                  </div>
                </section>

                <div className="bg-teal-600 text-white p-6 rounded-3xl flex items-center gap-3 font-bold shadow-lg">
                  <Check size={24} /> Site settings are saved automatically to LocalStorage.
                </div>
              </div>
            </div>
          )}

          {/* TESTIMONIALS TAB */}
          {activeTab === 'testimonials' && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
               <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 font-serif">Testimonials</h2>
                  <p className="text-slate-500 mt-2">Manage customer reviews shown on the homepage</p>
                </div>
                <button 
                  onClick={() => setEditingTestimonial({ name: '', text: '', location: '', avatar: 'https://i.pravatar.cc/150?u=new' })}
                  className="bg-teal-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-teal-700 shadow-xl transition-all"
                >
                  <Plus size={22} /> Add Review
                </button>
              </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map(t => (
                  <div key={t.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 relative group hover:shadow-2xl transition-all">
                    <div className="flex gap-4 items-center mb-4">
                      <img src={t.avatar} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                      <div>
                        <h4 className="font-bold">{t.name}</h4>
                        <p className="text-xs text-slate-400">{t.location}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 italic">"{t.text}"</p>
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingTestimonial(t)} className="p-3 text-teal-600 bg-teal-50 rounded-xl"><Edit3 size={18} /></button>
                      <button onClick={() => updateTestimonials(testimonials.filter(x => x.id !== t.id))} className="p-3 text-red-500 bg-red-50 rounded-xl"><Trash2 size={18} /></button>
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
          <div className="bg-white w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-[3rem] shadow-2xl p-10 space-y-8 animate-in zoom-in">
            <div className="flex justify-between items-center border-b pb-6 sticky top-0 bg-white z-10">
              <h3 className="text-3xl font-black text-slate-900">Tour Editor</h3>
              <button onClick={() => setEditingTour(null)} className="p-3 hover:bg-slate-100 rounded-full transition-colors"><X size={32} /></button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Title</label>
                <input className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none" value={editingTour.title} onChange={e => setEditingTour({...editingTour, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Price (₹)</label>
                    <input type="number" className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none" value={editingTour.price} onChange={e => setEditingTour({...editingTour, price: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category</label>
                    <select className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none" value={editingTour.category} onChange={e => setEditingTour({...editingTour, category: e.target.value as TourCategory})}>
                      {Object.values(TourCategory).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                
                <label className="block text-xs font-bold text-slate-500 uppercase">Main Location</label>
                <input className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none" value={editingTour.location} onChange={e => setEditingTour({...editingTour, location: e.target.value})} />
                
                <label className="block text-xs font-bold text-slate-500 uppercase">Image URL</label>
                <input className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none" value={editingTour.imageUrl} onChange={e => setEditingTour({...editingTour, imageUrl: e.target.value})} />

                <div className="flex items-center gap-4">
                  <input type="checkbox" id="featured" checked={editingTour.featured} onChange={e => setEditingTour({...editingTour, featured: e.target.checked})} />
                  <label htmlFor="featured" className="text-sm font-bold text-slate-700">Display as Featured on Homepage</label>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Full Description</label>
                <textarea className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none" rows={8} value={editingTour.description} onChange={e => setEditingTour({...editingTour, description: e.target.value})} />
                
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Duration Tag</label>
                <input className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none" placeholder="e.g. 5 Nights / 6 Days" value={editingTour.duration} onChange={e => setEditingTour({...editingTour, duration: e.target.value})} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h4 className="text-xl font-bold text-slate-900">Itinerary</h4>
                <button onClick={handleAddItineraryDay} className="text-teal-600 font-bold flex items-center gap-2 hover:text-teal-700 transition-all">
                  <PlusCircle size={20} /> Add Day
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {editingTour.itinerary?.map((day, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold">Day {day.day}</span>
                      <button onClick={() => {
                        const newItinerary = editingTour.itinerary?.filter((_, i) => i !== idx).map((d, i) => ({...d, day: i + 1}));
                        setEditingTour({...editingTour, itinerary: newItinerary});
                      }} className="text-red-400 hover:text-red-600"><MinusCircle size={20} /></button>
                    </div>
                    <input className="w-full px-4 py-2 bg-white rounded-xl outline-none font-bold" placeholder="Day Title" value={day.title} onChange={e => handleUpdateItineraryDay(idx, 'title', e.target.value)} />
                    <textarea className="w-full px-4 py-2 bg-white rounded-xl outline-none text-sm" rows={2} placeholder="Description" value={day.description} onChange={e => handleUpdateItineraryDay(idx, 'description', e.target.value)} />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-8 flex justify-end gap-4">
              <button onClick={() => setEditingTour(null)} className="px-8 py-4 font-bold text-slate-400">Cancel</button>
              <button onClick={handleSaveTour} className="bg-teal-600 text-white px-12 py-4 rounded-2xl font-black hover:bg-teal-700 shadow-xl flex items-center gap-2">
                <Save size={20} /> Save Tour Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 space-y-6 animate-in zoom-in">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Review Editor</h3>
              <button onClick={() => setEditingTestimonial(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Customer Name</label>
                <input className="w-full px-5 py-3 bg-slate-50 rounded-xl outline-none" placeholder="e.g. Rahul Sharma" value={editingTestimonial.name} onChange={e => setEditingTestimonial({...editingTestimonial, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Location</label>
                <input className="w-full px-5 py-3 bg-slate-50 rounded-xl outline-none" placeholder="e.g. Kolkata, India" value={editingTestimonial.location} onChange={e => setEditingTestimonial({...editingTestimonial, location: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Review Text</label>
                <textarea className="w-full px-5 py-3 bg-slate-50 rounded-xl outline-none text-sm" placeholder="Paste feedback here..." rows={4} value={editingTestimonial.text} onChange={e => setEditingTestimonial({...editingTestimonial, text: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Avatar Image URL</label>
                <input className="w-full px-5 py-3 bg-slate-50 rounded-xl outline-none text-xs" placeholder="https://..." value={editingTestimonial.avatar} onChange={e => setEditingTestimonial({...editingTestimonial, avatar: e.target.value})} />
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4 border-t">
              <button onClick={() => setEditingTestimonial(null)} className="font-bold text-slate-400 text-sm">Cancel</button>
              <button onClick={handleSaveTestimonial} className="bg-teal-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-teal-700 transition-all">Save Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
