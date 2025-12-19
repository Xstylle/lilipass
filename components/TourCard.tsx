
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { TourPackage } from '../types';

interface TourCardProps {
  tour: TourPackage;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const discount = Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-slate-100">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={tour.imageUrl} 
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-white/90 backdrop-blur-md text-teal-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {tour.category}
          </span>
          {discount > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              {discount}% OFF
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-black/20 backdrop-blur-sm text-white flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            {tour.rating}
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-slate-400 text-xs mb-2">
          <MapPin size={14} />
          {tour.location}
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-1">
          {tour.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-teal-500" />
            {tour.duration}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs line-through">₹{tour.originalPrice.toLocaleString()}</div>
            <div className="text-teal-700 text-xl font-extrabold">₹{tour.price.toLocaleString()}</div>
          </div>
          <Link 
            to={`/tour/${tour.slug}`}
            className="bg-slate-900 hover:bg-teal-600 text-white p-3 rounded-xl transition-all shadow-lg hover:shadow-teal-200"
          >
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
