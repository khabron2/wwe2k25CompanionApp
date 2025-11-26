import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { getAllMoves } from '../services/wweService';
import { InputKey } from '../components/InputKey';

const MovesLibrary: React.FC = () => {
  const [search, setSearch] = useState('');
  const moves = getAllMoves(search);

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Biblioteca de Movimientos</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Buscar cualquier movimiento..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:text-white shadow-sm placeholder:text-slate-400"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors">
        {moves.length === 0 ? (
           <div className="p-8 text-center text-slate-400 text-sm">No se encontraron movimientos para "{search}"</div>
        ) : (
          moves.map((move, index) => (
            <div key={index} className="p-4 border-b border-gray-100 dark:border-slate-800 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{move.name}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{move.wrestlerName}</span>
              </div>
              <div className="flex items-center gap-1">
                 {move.input.map((k, i) => <InputKey key={i} k={k} />)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovesLibrary;