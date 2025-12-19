
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, Search, User, Heart, Settings } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tour Packages', path: '/tours' },
    { name: 'About Us', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-teal-600 p-2 rounded-lg text-white transform group-hover:rotate-12 transition-transform">
              <Plane size={24} />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-teal-900' : 'text-white drop-shadow-md'}`}>
              {settings.siteName.split(' ')[0]}<span className="text-orange-500">{settings.siteSubtitle}</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-orange-500 ${
                  isScrolled 
                    ? isActive(link.path) ? 'text-teal-600' : 'text-slate-600'
                    : 'text-white hover:text-orange-300 drop-shadow-sm'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/admin" title="Admin Panel" className={`${isScrolled ? 'text-slate-300 hover:text-teal-600' : 'text-white/30 hover:text-white'} transition-colors`}>
              <Settings size={18} />
            </Link>
            <button className={`${isScrolled ? 'text-slate-600' : 'text-white'} hover:text-orange-500 transition-colors`}>
              <Search size={20} />
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-orange-200">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 ${isScrolled ? 'text-slate-900' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl animate-in slide-in-from-top duration-300 border-t">
          <div className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-semibold p-3 rounded-lg ${
                  isActive(link.path) ? 'bg-teal-50 text-teal-600' : 'text-slate-700'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admin" className="text-lg font-semibold p-3 rounded-lg text-slate-400 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
              <Settings size={20} /> Admin Dashboard
            </Link>
            <div className="flex gap-4 pt-4 border-t mt-2">
              <button className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold">Sign In</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
