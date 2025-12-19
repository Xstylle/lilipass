
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Heart, Users, Globe, MapPin, ArrowLeft } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const AboutPage: React.FC = () => {
  const { settings } = useContent();
  
  return (
    <div className="pt-24 min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600" alt="Mountain" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-orange-400 font-bold mb-8 hover:text-orange-300 transition-all group"
          >
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl group-hover:-translate-x-1 transition-transform border border-white/20">
              <ArrowLeft size={18} />
            </div>
            Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-black font-serif mb-6 leading-tight">Our Mission is to <br/><span className="text-orange-400">Make Travel Easy.</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {settings.aboutMission}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Heart className="text-teal-600" size={32} />, title: "Customer Obsessed", desc: "Every tour is crafted keeping your comfort and joy as our primary goal." },
              { icon: <Globe className="text-orange-500" size={32} />, title: "Local Expertise", desc: "We partner with local guides who know every hidden gem and secret trail." },
              { icon: <ShieldCheck className="text-teal-600" size={32} />, title: "Safe & Reliable", desc: "From sanitized vehicles to verified hotel partners, your safety is non-negotiable." }
            ].map((v, i) => (
              <div key={i} className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 hover:shadow-xl transition-all">
                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-8">{v.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
                <p className="text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="text-teal-600 font-extrabold text-xs uppercase tracking-widest mb-4 block">Meet the Team</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-serif">A Group of Passionate Globetrotters</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {settings.aboutTeamDesc}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-black text-teal-600">10k+</h4>
                  <p className="text-sm font-bold text-slate-400 uppercase">Happy Travelers</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-orange-500">500+</h4>
                  <p className="text-sm font-bold text-slate-400 uppercase">Custom Itineraries</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team" className="rounded-[3rem] shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Location Map Placeholder */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Headquarters</h2>
          <div className="bg-white p-4 rounded-[2.5rem] shadow-xl max-w-4xl mx-auto border border-slate-100 overflow-hidden aspect-video relative group">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" 
              alt="Map" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl flex items-center gap-4 border border-teal-100">
                <MapPin className="text-orange-500" size={32} />
                <div className="text-left">
                  <h4 className="font-bold text-slate-900">Kolkata Office</h4>
                  <p className="text-sm text-slate-500">{settings.contactAddress}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
