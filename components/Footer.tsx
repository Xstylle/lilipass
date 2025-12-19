
import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Facebook, Youtube, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Footer: React.FC = () => {
  const { settings } = useContent();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-teal-600 p-2 rounded-lg text-white">
                <Plane size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                {settings.siteName.split(' ')[0]}<span className="text-orange-500">{settings.siteSubtitle}</span>
              </span>
            </Link>
            <p className="mb-6 leading-relaxed">
              We create unforgettable travel experiences with a focus on comfort, safety, and unique destination insights. Join us to explore the world.
            </p>
            <div className="flex gap-4">
              <a href={settings.facebookUrl} className="hover:text-teal-500 transition-colors bg-slate-800 p-2 rounded-lg">
                <Facebook size={20} />
              </a>
              <a href={settings.instagramUrl} className="hover:text-teal-500 transition-colors bg-slate-800 p-2 rounded-lg">
                <Instagram size={20} />
              </a>
              <a href={settings.youtubeUrl} className="hover:text-teal-500 transition-colors bg-slate-800 p-2 rounded-lg">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
              <li><Link to="/tours" className="hover:text-orange-400 transition-colors">Explore Tours</Link></li>
              <li><Link to="/about" className="hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><Link to="/admin" className="hover:text-orange-400 transition-colors">Admin Dashboard</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">Top Destinations</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Darjeeling & Sikkim</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Andaman Islands</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Thailand & Vietnam</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Dubai City Tour</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Silk Route Zuluk</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-orange-500 shrink-0" size={20} />
                <span>{settings.contactAddress}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-orange-500 shrink-0" size={20} />
                <span>{settings.contactPhone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-orange-500 shrink-0" size={20} />
                <span>{settings.contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2024 {settings.siteName}. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="text-slate-500">Visa / Mastercard / UPI Accepted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
