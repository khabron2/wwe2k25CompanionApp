import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWrestlerById, getWrestlerMoves } from '../services/wweService';
import { getStrategyAdvice } from '../services/aiService';
import { ArrowLeft, Sparkles, Shield, ChevronRight, Zap, Star, Swords } from 'lucide-react';
import { StatsRadar } from '../components/StatsRadar';
import { InputKey } from '../components/InputKey';
import { Button } from '../components/Button';
import { MoveCategory, Move } from '../types';

const WrestlerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const wrestler = getWrestlerById(id || '');
  const moves = getWrestlerMoves(id || '');
  
  const [activeTab, setActiveTab] = useState<'stats' | 'moves' | 'strategy'>('stats');
  const [moveFilter, setMoveFilter] = useState<MoveCategory | 'All'>('All');
  const [strategy, setStrategy] = useState<string | null>(null);
  const [loadingStrategy, setLoadingStrategy] = useState(false);

  if (!wrestler) return <div className="p-4 text-center dark:text-white">Luchador no encontrado</div>;

  const handleStrategy = async () => {
    if (strategy) return;
    setLoadingStrategy(true);
    const advice = await getStrategyAdvice(wrestler, moves);
    setStrategy(advice);
    setLoadingStrategy(false);
  };

  // Group moves for display
  const finishers = moves.filter(m => m.category === MoveCategory.FINISHER);
  const signatures = moves.filter(m => m.category === MoveCategory.SIGNATURE);
  const otherMoves = moves.filter(m => m.category !== MoveCategory.FINISHER && m.category !== MoveCategory.SIGNATURE);

  const filteredOtherMoves = moveFilter === 'All' 
    ? otherMoves 
    : otherMoves.filter(m => m.category === moveFilter);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20 transition-colors duration-300">
      {/* Header Image */}
      <div className="relative h-80 w-full">
        <img src={wrestler.imageUrl} className="w-full h-full object-cover" alt={wrestler.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 z-10"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
             <span className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">{wrestler.brand}</span>
             <span className="bg-slate-700/50 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-white/20">{wrestler.style}</span>
          </div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-1 drop-shadow-lg">{wrestler.name}</h1>
          <p className="text-slate-300 font-medium text-sm drop-shadow-md">{wrestler.alias}</p>
        </div>
      </div>

      {/* Stats Summary Strip */}
      <div className="flex justify-between px-6 py-4 bg-slate-900 dark:bg-slate-900 text-white border-t border-slate-800">
        <div className="text-center">
          <div className="text-xs text-slate-400 font-bold uppercase">Media</div>
          <div className="text-2xl font-black text-yellow-400">{wrestler.stats.overall}</div>
        </div>
        <div className="text-center border-l border-slate-700 pl-4">
          <div className="text-xs text-slate-400 font-bold uppercase">Peso</div>
          <div className="text-lg font-bold">{wrestler.weightKg} <span className="text-xs">kg</span></div>
        </div>
        <div className="text-center border-l border-slate-700 pl-4">
          <div className="text-xs text-slate-400 font-bold uppercase">Altura</div>
          <div className="text-lg font-bold">{wrestler.heightCm} <span className="text-xs">cm</span></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 dark:border-slate-800 mt-2 px-4 sticky top-0 bg-white dark:bg-slate-950 z-20 transition-colors duration-300 shadow-sm">
        {[
          { id: 'stats', label: 'Estadísticas' },
          { id: 'moves', label: 'Movimientos' },
          { id: 'strategy', label: 'Estrategia' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors ${activeTab === tab.id ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white' : 'border-transparent text-gray-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'stats' && (
          <div className="space-y-6 animate-fade-in">
             <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm border-l-4 border-slate-900 dark:border-slate-100 pl-4 bg-gray-50 dark:bg-slate-900 py-3 rounded-r-lg transition-colors">
                {wrestler.bio}
             </p>
             
             <div>
               <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                 <Shield size={18} /> Radar de Atributos
               </h3>
               <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-4 transition-colors">
                 <StatsRadar stats={wrestler.stats} />
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase mb-1">País</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{wrestler.country}</div>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                  <div className="text-amber-600 dark:text-amber-400 font-bold text-xs uppercase mb-1">Clase</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{wrestler.style}</div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'moves' && (
          <div className="space-y-6 animate-fade-in">
             
             {/* Section: Finishers (Remates) */}
             {finishers.length > 0 && (
               <section>
                 <h3 className="flex items-center gap-2 font-black text-red-600 dark:text-red-400 uppercase text-sm mb-3 tracking-wider">
                   <Zap size={16} fill="currentColor" /> Remates
                 </h3>
                 <div className="space-y-3">
                   {finishers.map(move => (
                     <div key={move.id} className="relative overflow-hidden bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-4 shadow-sm">
                       <div className="absolute top-0 right-0 p-2 opacity-10">
                         <Zap size={48} className="text-red-600" />
                       </div>
                       <div className="relative z-10 flex justify-between items-start">
                         <div>
                           <div className="font-bold text-slate-900 dark:text-white text-lg">{move.name}</div>
                           <div className="text-xs text-red-600 dark:text-red-400 font-bold uppercase mt-1">Daño Crítico</div>
                         </div>
                         <div className="flex items-center gap-1 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg shadow-sm border border-red-100 dark:border-red-900/30">
                           {move.input.map((k, i) => (
                              <React.Fragment key={i}>
                                <InputKey k={k} />
                                {i < move.input.length - 1 && <span className="text-slate-300 text-[10px]">+</span>}
                              </React.Fragment>
                           ))}
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </section>
             )}

             {/* Section: Signatures (Personales) */}
             {signatures.length > 0 && (
               <section>
                 <h3 className="flex items-center gap-2 font-black text-blue-600 dark:text-blue-400 uppercase text-sm mb-3 tracking-wider">
                   <Star size={16} fill="currentColor" /> Movimientos Personales
                 </h3>
                 <div className="space-y-3">
                   {signatures.map(move => (
                     <div key={move.id} className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 shadow-sm flex justify-between items-center">
                       <div>
                         <div className="font-bold text-slate-900 dark:text-white">{move.name}</div>
                       </div>
                       <div className="flex items-center gap-1">
                          {move.input.map((k, i) => (
                              <React.Fragment key={i}>
                                <InputKey k={k} />
                                {i < move.input.length - 1 && <span className="text-slate-300 text-[10px]">+</span>}
                              </React.Fragment>
                           ))}
                       </div>
                     </div>
                   ))}
                 </div>
               </section>
             )}

             <hr className="border-gray-100 dark:border-slate-800" />

             {/* Section: Other Moves */}
             <section>
               <div className="flex justify-between items-center mb-4">
                  <h3 className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300 uppercase text-sm tracking-wider">
                    <Swords size={16} /> Arsenal Completo
                  </h3>
               </div>
               
               {/* Filter Chips */}
               <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mb-4">
                  {['All', MoveCategory.COMBO, MoveCategory.RUNNING, MoveCategory.DIVING, MoveCategory.GROUND].map(c => (
                     <button 
                       key={c}
                       onClick={() => setMoveFilter(c as any)}
                       className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${moveFilter === c ? 'bg-slate-800 text-white border-slate-800 dark:bg-slate-200 dark:text-slate-900' : 'bg-white dark:bg-slate-900 text-slate-500 border-gray-200 dark:border-slate-800 dark:text-slate-400'}`}
                     >
                       {c === 'All' ? 'Todos' : c}
                     </button>
                  ))}
               </div>

               <div className="space-y-2">
                 {filteredOtherMoves.length === 0 ? (
                    <div className="text-center py-4 text-slate-400 text-xs italic">No hay movimientos en esta categoría para este luchador.</div>
                 ) : (
                   filteredOtherMoves.map(move => (
                     <div key={move.id} className="flex justify-between items-center p-3 bg-white dark:bg-slate-900 rounded-lg border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                        <div className="flex flex-col">
                           <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">{move.name}</span>
                           <span className="text-[10px] text-slate-400">{move.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {move.input.map((k, i) => (
                            <React.Fragment key={i}>
                              <InputKey k={k} />
                              {i < move.input.length - 1 && <span className="text-gray-300 dark:text-slate-700 text-[10px]">+</span>}
                            </React.Fragment>
                          ))}
                        </div>
                     </div>
                   ))
                 )}
               </div>
             </section>
          </div>
        )}

        {activeTab === 'strategy' && (
          <div className="animate-fade-in flex flex-col items-center">
            {!strategy ? (
               <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-blue-200 dark:shadow-none">
                    <Sparkles size={32} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Entrenador IA</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-xs mx-auto">
                    Obtén una estrategia ganadora personalizada por Gemini AI basada en las estadísticas y movimientos de {wrestler.name}.
                  </p>
                  <Button 
                    onClick={handleStrategy} 
                    disabled={loadingStrategy}
                    className="flex items-center gap-2 mx-auto"
                  >
                    {loadingStrategy ? 'Analizando...' : 'Generar Estrategia'} 
                    {!loadingStrategy && <ChevronRight size={16} />}
                  </Button>
               </div>
            ) : (
              <div className="bg-slate-900 dark:bg-slate-800 text-slate-200 p-6 rounded-2xl shadow-xl w-full">
                 <div className="flex items-center gap-2 text-yellow-400 font-bold uppercase tracking-wider text-xs mb-4">
                    <Sparkles size={14} /> Análisis del Entrenador
                 </div>
                 <div className="prose prose-invert text-sm leading-relaxed text-slate-300">
                    {strategy.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                 </div>
                 <div className="mt-6 pt-4 border-t border-slate-700 flex justify-end">
                    <button onClick={() => setStrategy(null)} className="text-xs text-slate-400 hover:text-white font-medium">Reset</button>
                 </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WrestlerDetail;