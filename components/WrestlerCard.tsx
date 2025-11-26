import React from 'react';
import { Wrestler, Brand } from '../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  wrestler: Wrestler;
  layout?: 'vertical' | 'horizontal';
}

export const WrestlerCard: React.FC<Props> = ({ wrestler, layout = 'vertical' }) => {
  const navigate = useNavigate();

  const getBrandColor = (brand: Brand) => {
    switch (brand) {
      case Brand.RAW: return 'text-red-600 bg-red-50 border-red-100 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400';
      case Brand.SMACKDOWN: return 'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400';
      case Brand.NXT: return 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400';
      case Brand.LEGEND: return 'text-yellow-600 bg-yellow-50 border-yellow-100 dark:bg-yellow-900/30 dark:border-yellow-800 dark:text-yellow-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const handleClick = () => {
    navigate(`/wrestler/${wrestler.id}`);
  };

  if (layout === 'horizontal') {
    return (
      <div 
        onClick={handleClick}
        className="flex items-center bg-white dark:bg-slate-900 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-slate-800 cursor-pointer hover:shadow-md transition-all"
      >
        <img src={wrestler.imageUrl} alt={wrestler.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 dark:border-slate-700" />
        <div className="ml-4 flex-1">
          <h3 className="font-bold text-slate-800 dark:text-white text-lg">{wrestler.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${getBrandColor(wrestler.brand)}`}>
            {wrestler.brand}
          </span>
        </div>
        <div className="text-right">
            <div className="text-2xl font-black text-slate-200 dark:text-slate-700">{wrestler.stats.overall}</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-slate-800"
    >
      <div className="aspect-[3/4] overflow-hidden relative">
        <img 
          src={wrestler.imageUrl} 
          alt={wrestler.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-lg font-black text-slate-900 dark:text-white shadow-sm">
          {wrestler.stats.overall}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4 pt-12">
            <h3 className="text-white font-bold text-xl leading-tight">{wrestler.name}</h3>
            <p className="text-slate-300 text-xs mt-1">{wrestler.alias}</p>
        </div>
      </div>
      <div className="p-3 flex justify-between items-center">
        <span className={`text-xs px-2 py-1 rounded-md font-semibold border ${getBrandColor(wrestler.brand)}`}>
            {wrestler.brand}
        </span>
         <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {wrestler.style}
        </span>
      </div>
    </div>
  );
};