import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { getWrestlers } from '../services/wweService';
import { WrestlerCard } from '../components/WrestlerCard';
import { Brand, WrestlerStyle } from '../types';
import { Link } from 'react-router-dom';

const WrestlerList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState<Brand | 'All'>('All');
  const [showFilters, setShowFilters] = useState(false);

  const wrestlers = getWrestlers(searchTerm, brandFilter, 'All');

  return (
    <div className="p-4 min-h-screen">
      <div className="sticky top-0 bg-gray-50 dark:bg-slate-950 pt-2 pb-4 z-10 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
           <h1 className="text-2xl font-black text-slate-900 dark:text-white">Plantel</h1>
           <Link 
             to="/create-wrestler"
             className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
             title="Crear Luchador"
           >
             <Plus size={24} />
           </Link>
        </div>
        
        {/* Search & Filter Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar superestrella..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:text-white shadow-sm placeholder:text-slate-400"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl border transition-colors ${showFilters ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-gray-200 dark:border-slate-800'}`}
          >
            <Filter size={18} />
          </button>
        </div>

        {/* Filter Chips */}
        {showFilters && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['All', ...Object.values(Brand)].map(b => (
              <button
                key={b}
                onClick={() => setBrandFilter(b as Brand | 'All')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${brandFilter === b ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                {b === 'All' ? 'Todos' : b}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      {wrestlers.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-20 text-center opacity-50 dark:text-slate-400">
           <Filter size={48} className="mb-4" />
           <p>No se encontraron superestrellas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
          {wrestlers.map(w => (
            <WrestlerCard key={w.id} wrestler={w} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WrestlerList;