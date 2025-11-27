import React, { useEffect, useState } from 'react';
import { CATEGORIES } from '../constants';
import { getTopWrestlers } from '../services/wweService';
import { WrestlerCard } from '../components/WrestlerCard';
import { ArrowRight, PlayCircle, Flame, FastForward, Map, Skull, Briefcase, Video, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Discover: React.FC = () => {
  const topWrestlers = getTopWrestlers(6);
  
  // MyRISE State
  const [progress, setProgress] = useState<{ started: boolean; chapter: number; title: string }>({
    started: false,
    chapter: 1,
    title: 'PARTNERS'
  });

  // The Island State
  const [islandProgress, setIslandProgress] = useState<{ started: boolean; chapter: number }>({
    started: false,
    chapter: 1
  });

  // MyGM State
  const [gmProgress, setGmProgress] = useState<{ started: boolean }>({
    started: false
  });

  // Showcase State
  const [showcaseProgress, setShowcaseProgress] = useState<{ started: boolean }>({
    started: false
  });

  // Achievements State
  const [achievementsProgress, setAchievementsProgress] = useState<{ count: number; total: number }>({
    count: 0,
    total: 31
  });

  useEffect(() => {
    // MyRISE Logic Update for 2K25 MUTINY Story
    const saved = localStorage.getItem('myrise-progress');
    if (saved) {
      const completed: Record<string, boolean> = JSON.parse(saved);
      const keys = Object.keys(completed);
      const hasStarted = keys.some(k => completed[k] === true);

      if (hasStarted) {
        let chapter = 1;
        let title = 'PARTNERS';

        // Check for latest chapter completed
        if (completed['mr-c1-1']) { chapter = 2; title = 'MUTINY'; }
        if (completed['mr-c2-1']) { chapter = 3; title = 'UNITE'; }
        if (completed['mr-c3-1']) { chapter = 4; title = 'INVESTIGATE'; }
        if (completed['mr-c4-m-1'] || completed['mr-c4-f-1']) { chapter = 5; title = 'DEFEND'; }
        if (completed['mr-c5-1']) { chapter = 6; title = 'RALLY'; }
        if (completed['mr-c6-1']) { chapter = 7; title = 'ATTACK'; }
        if (completed['mr-c7-1']) { chapter = 8; title = 'SURVIVE'; }
        if (completed['mr-c8-1']) { chapter = 9; title = 'FINAL'; }

        setProgress({ started: true, chapter, title });
      }
    }

    // Island Logic
    const savedIsland = localStorage.getItem('the_island-progress');
    if (savedIsland) {
      const islandCompleted: Record<string, boolean> = JSON.parse(savedIsland);
      const hasStarted = Object.keys(islandCompleted).some(k => islandCompleted[k]);
      
      if (hasStarted) {
        let chapter = 1;
        // Check completions for chapter advancement logic (simplified)
        // If all C1 tasks done -> Chap 2, etc.
        const c1Tasks = ['isl-c1-1', 'isl-c1-2', 'isl-c1-12']; // checking start/end of C1
        if (c1Tasks.every(t => islandCompleted[t])) chapter = 2;
        
        const c2Tasks = ['isl-c2-1', 'isl-c2-6'];
        if (c2Tasks.every(t => islandCompleted[t])) chapter = 3;

        setIslandProgress({ started: true, chapter });
      }
    }

    // MyGM Logic
    const savedGM = localStorage.getItem('mygm-progress');
    if (savedGM) {
      const gmCompleted: Record<string, boolean> = JSON.parse(savedGM);
      const hasStarted = Object.keys(gmCompleted).some(k => gmCompleted[k]);
      if (hasStarted) {
        setGmProgress({ started: true });
      }
    }

    // Showcase Logic
    const savedShowcase = localStorage.getItem('showcase-progress');
    if (savedShowcase) {
      const scCompleted: Record<string, boolean> = JSON.parse(savedShowcase);
      const hasStarted = Object.keys(scCompleted).some(k => scCompleted[k]);
      if (hasStarted) {
        setShowcaseProgress({ started: true });
      }
    }

    // Achievements Logic
    const savedAchievements = localStorage.getItem('achievements-progress');
    if (savedAchievements) {
      const achCompleted: Record<string, boolean> = JSON.parse(savedAchievements);
      const count = Object.values(achCompleted).filter(Boolean).length;
      setAchievementsProgress({ count, total: 31 });
    }
  }, []);

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <header className="flex justify-between items-start">
        <div className="max-w-2xl">
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-2">
            WWE 2K25 <span className="text-blue-600 dark:text-blue-500">COMPANION APP</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base leading-relaxed">
            La herramienta definitiva para dominar el ring. Accede al roster completo, explora movimientos detallados, completa cada capítulo del modo MyRISE paso a paso.
          </p>
        </div>
        <div className="hidden md:flex w-12 h-12 rounded-full bg-slate-900 dark:bg-slate-100 items-center justify-center shrink-0 ml-4">
            <span className="text-white dark:text-slate-900 text-sm font-bold">2K25</span>
        </div>
      </header>

      {/* Featured Banners Stack */}
      <section className="flex flex-col gap-6">
        {/* MyRISE Banner */}
        <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl group border border-slate-100 dark:border-slate-800">
          <div className="absolute inset-0 bg-slate-900" />
          <img 
            src="https://www.thesmackdownhotel.com/images/wwe2k25/articles/wwe-2k25-myrise-mode-unlockables-list.jpg" 
            alt="MyRISE Background" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 dark:opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-center p-8 z-10">
            <div className="flex items-center gap-2 mb-3">
              {progress.started ? (
                <span className="inline-block px-2 py-0.5 bg-green-500 text-white text-[10px] font-black uppercase tracking-wider rounded-sm shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                  En Progreso
                </span>
              ) : (
                <span className="inline-block px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider rounded-sm shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                  Nuevo
                </span>
              )}
              
              {progress.started ? (
                 <span className="text-blue-300 text-[10px] font-bold uppercase tracking-widest border-l border-blue-500/50 pl-2 truncate max-w-[200px]">
                   Capítulo {progress.chapter}: {progress.title}
                 </span>
              ) : (
                 <span className="text-blue-300/80 text-[10px] font-bold uppercase tracking-widest border-l border-blue-500/50 pl-2">
                   Modo Historia
                 </span>
              )}
            </div>
            
            <h2 className="text-5xl font-black text-white italic tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] transform -skew-x-12 leading-none mb-2">
              My<span className="text-transparent bg-clip-text bg-gradient-to-t from-blue-500 to-white">RISE</span>
            </h2>
            
            <p className="text-slate-300 text-xs font-medium mb-6 max-w-xs drop-shadow-md leading-relaxed border-l-2 border-blue-500 pl-3">
              Únete a la Rebelión. Historia Dual "MUTINY" con cientos de desbloqueables únicos.
            </p>
            
            <Link to="/myrise" className="group/btn relative px-6 py-2 bg-white text-slate-950 rounded-lg text-xs font-black uppercase tracking-widest w-fit overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transform hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              {progress.started ? (
                <>
                  <FastForward size={16} className="text-blue-600 relative z-10" fill="currentColor" />
                  <span className="relative z-10">Continuar</span>
                </>
              ) : (
                <>
                  <PlayCircle size={16} className="text-blue-600 relative z-10" />
                  <span className="relative z-10">Comenzar</span>
                </>
              )}
            </Link>
          </div>
        </div>

        {/* Showcase Banner */}
        <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl group border border-slate-100 dark:border-slate-800">
          <div className="absolute inset-0 bg-slate-900" />
          <img 
            src="https://image.pollinations.ai/prompt/roman%20reigns%20and%20the%20rock%20bloodline%20dynasty%20wwe%202k25%20showcase%20red%20lei%20ura%20dark%20background?width=800&height=400&nologo=true"
            alt="Showcase Background" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 dark:opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-slate-900/90 via-slate-900/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-center items-end p-8 z-10 text-right">
            <div className="flex items-center gap-2 mb-3 justify-end">
               {showcaseProgress.started ? (
                <span className="inline-block px-2 py-0.5 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider rounded-sm shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                  Jugando
                </span>
               ) : (
                 <span className="inline-block px-2 py-0.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider rounded-sm shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                    Modo Historia
                 </span>
               )}
            </div>
            
            <h2 className="text-5xl font-black text-white italic tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] transform -skew-x-12 leading-none mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-t from-red-500 to-white">DYNASTY</span>
            </h2>
            
            <p className="text-slate-200 text-xs font-medium mb-6 max-w-xs drop-shadow-md leading-relaxed border-r-2 border-red-500 pr-3">
              Revive, Cambia y Crea la historia de la familia Anoa'i.
            </p>
            
            <Link to="/showcase" className="group/btn relative px-6 py-2 bg-red-950 text-white border border-red-800 rounded-lg text-xs font-black uppercase tracking-widest w-fit overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transform hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3">
              <div className="absolute inset-0 bg-gradient-to-l from-red-800 to-slate-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              <>
                 <span className="relative z-10">Ver Combates</span>
                 <Video size={16} className="text-red-400 relative z-10" />
              </>
            </Link>
          </div>
        </div>

        {/* The Island Banner (ALIGNED LEFT) */}
        <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl group border border-slate-100 dark:border-slate-800">
          <div className="absolute inset-0 bg-slate-900" />
          <img 
            src="https://www.thesmackdownhotel.com/images/wwe2k25/articles/wwe-2k25-the-island-mode-guide.jpg" 
            alt="The Island Background" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 dark:opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-center items-start p-8 z-10 text-left">
            <div className="flex items-center gap-2 mb-3">
               {islandProgress.started ? (
                <span className="inline-block px-2 py-0.5 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider rounded-sm shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                  Capítulo {islandProgress.chapter}
                </span>
               ) : (
                 <span className="inline-block px-2 py-0.5 bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider rounded-sm shadow-[0_0_10px_rgba(217,119,6,0.5)]">
                    Nuevo Modo
                 </span>
               )}
            </div>
            
            <h2 className="text-5xl font-black text-white italic tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] transform -skew-x-12 leading-none mb-2">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-t from-red-500 to-amber-500">ISLAND</span>
            </h2>
            
            <p className="text-slate-200 text-xs font-medium mb-6 max-w-xs drop-shadow-md leading-relaxed border-l-2 border-amber-500 pl-3">
              Sobrevive al territorio de Samoa. Derrota a la Línea de Sangre y reclama el trono.
            </p>
            
            <Link to="/the-island" className="group/btn relative px-6 py-2 bg-slate-900 text-white border border-slate-700 rounded-lg text-xs font-black uppercase tracking-widest w-fit overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transform hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-900 to-slate-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              <>
                 <Map size={16} className="text-amber-500 relative z-10" />
                 <span className="relative z-10">Explorar Isla</span>
              </>
            </Link>
          </div>
        </div>

        {/* MyGM Banner (ALIGNED RIGHT) */}
        <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl group border border-slate-100 dark:border-slate-800">
          <div className="absolute inset-0 bg-slate-900" />
          <img 
            src="https://www.thesmackdownhotel.com/igallery/wwe-2k25-screens-293/draft-complete-wm-360.jpg" 
            alt="MyGM Background" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 dark:opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-emerald-950/80 via-emerald-900/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-center items-end p-8 z-10 text-right">
            <div className="flex items-center gap-2 mb-3 justify-end">
               {gmProgress.started ? (
                <span className="inline-block px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider rounded-sm shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                  Activo
                </span>
               ) : (
                 <span className="inline-block px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider rounded-sm shadow-[0_0_10px_rgba(5,150,105,0.5)]">
                    Modo Manager
                 </span>
               )}
            </div>
            
            <h2 className="text-5xl font-black text-white italic tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] transform -skew-x-12 leading-none mb-2">
              My<span className="text-transparent bg-clip-text bg-gradient-to-t from-emerald-400 to-white">GM</span>
            </h2>
            
            <p className="text-slate-200 text-xs font-medium mb-6 max-w-xs drop-shadow-md leading-relaxed border-r-2 border-emerald-500 pr-3">
              Construye la mejor marca. Gestiona contratos, ratings y presupuestos para entrar al Hall of Fame.
            </p>
            
            <Link to="/mygm" className="group/btn relative px-6 py-2 bg-emerald-950 text-white border border-emerald-700 rounded-lg text-xs font-black uppercase tracking-widest w-fit overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transform hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3">
              <div className="absolute inset-0 bg-gradient-to-l from-emerald-800 to-slate-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              <>
                 <span className="relative z-10">Gestionar</span>
                 <Briefcase size={16} className="text-emerald-400 relative z-10" />
              </>
            </Link>
          </div>
        </div>

        {/* Achievements Banner (Centered/Gold) */}
        <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl group border border-slate-100 dark:border-slate-800">
          <div className="absolute inset-0 bg-slate-900" />
          <img 
            src="https://image.pollinations.ai/prompt/wwe%20championship%20belts%20trophies%20gold%20background%20luxury?width=800&height=400&nologo=true"
            alt="Achievements Background" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-50 dark:opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-950/80 via-slate-900/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-center items-center p-8 z-10 text-center">
            <div className="flex items-center gap-2 mb-3">
               <span className="inline-block px-2 py-0.5 bg-yellow-500 text-yellow-950 text-[10px] font-black uppercase tracking-wider rounded-sm shadow-[0_0_15px_rgba(234,179,8,0.6)]">
                  {achievementsProgress.count}/{achievementsProgress.total} Desbloqueados
               </span>
            </div>
            
            <h2 className="text-5xl font-black text-white italic tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] transform -skew-x-12 leading-none mb-2">
              TROFEOS <span className="text-transparent bg-clip-text bg-gradient-to-t from-yellow-300 to-white">& LOGROS</span>
            </h2>
            
            <p className="text-slate-200 text-xs font-medium mb-6 max-w-sm drop-shadow-md leading-relaxed">
               Guía completa para obtener el 100% de logros. Platino, 1000G y recompensas exclusivas.
            </p>
            
            <Link to="/achievements" className="group/btn relative px-8 py-2 bg-yellow-500 text-yellow-950 rounded-lg text-xs font-black uppercase tracking-widest w-fit overflow-hidden shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] transform hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              <>
                 <Trophy size={16} className="text-yellow-900 relative z-10" />
                 <span className="relative z-10">Ver Lista</span>
              </>
            </Link>
          </div>
        </div>

      </section>

      {/* Top Wrestlers */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Flame size={20} className="text-orange-500" fill="currentColor" />
            Top Superestrellas
          </h2>
          <Link to="/wrestlers" className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center">
            Ver Todo <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
        
        {/* Cards Scroll Container */}
        <div className="flex overflow-x-auto gap-4 pb-8 -mx-6 px-6 no-scrollbar snap-x">
            {topWrestlers.map(w => (
                <div key={w.id} className="min-w-[200px] snap-center">
                    <WrestlerCard wrestler={w} layout="vertical" />
                </div>
            ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Categorías</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="snap-start shrink-0 w-32 h-24 relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all">
               <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover opacity-90 dark:opacity-80" />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                 <span className="text-white font-bold text-sm text-center px-1">{cat.name}</span>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Playlists / Shortcuts */}
      <section className="pb-8">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Guías Rápidas</h2>
        <div className="space-y-3">
          {['Mejores Remates para CAWs', 'Clase Maestra de Combos', 'Meta del Juego Online'].map((item, i) => (
             <div key={i} className="flex items-center p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 mr-3">
                    <PlayCircle size={20} />
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 dark:text-white text-sm">{item}</h4>
                    <p className="text-xs text-slate-400 dark:text-slate-500">5 min</p>
                </div>
                <ArrowRight size={16} className="text-slate-300 dark:text-slate-700" />
             </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Discover;