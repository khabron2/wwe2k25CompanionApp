import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Trophy, Lock, Skull, Map, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ZoneBlockProps {
  title: string;
  level: number;
  unlocked: boolean;
  completed: boolean;
  children?: React.ReactNode;
}

const ZoneBlock: React.FC<ZoneBlockProps> = ({ 
  title, 
  level,
  unlocked, 
  completed: isDone,
  children 
}) => (
  <div className={`relative rounded-xl overflow-hidden shadow-sm border transition-all duration-500 ${unlocked ? 'bg-white dark:bg-slate-900 border-amber-100 dark:border-amber-900/30 opacity-100' : 'bg-gray-100 dark:bg-slate-900 border-transparent opacity-60 grayscale'}`}>
    {!unlocked && (
      <div className="absolute inset-0 z-20 bg-gray-200/50 dark:bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
         <div className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg font-bold text-sm">
           <Lock size={16} /> Zona Bloqueada
         </div>
      </div>
    )}
    <div className="p-4 border-b border-amber-100 dark:border-amber-900/30 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10 flex justify-between items-center">
      <h2 className="font-black text-lg text-slate-800 dark:text-white uppercase tracking-wide flex items-center gap-2">
        Nivel {level}: <span className="text-amber-600 dark:text-amber-500">{title}</span>
      </h2>
      {isDone ? (
         <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
           <CheckCircle2 size={12} /> Conquistado
         </span>
      ) : unlocked ? (
         <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded dark:bg-amber-900/30 dark:text-amber-400">
           Explorando
         </span>
      ) : null}
    </div>
    <div className="divide-y divide-gray-100 dark:divide-slate-800">
      {children}
    </div>
  </div>
);

interface MatchItemProps {
  id: string;
  title: string;
  desc: string;
  rewards?: React.ReactNode;
}

const TheIslandGuide: React.FC = () => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('island-progress');
    if (saved) {
      setCompleted(JSON.parse(saved));
    }
  }, []);

  const toggleTask = (taskId: string) => {
    const newCompleted = { ...completed, [taskId]: !completed[taskId] };
    setCompleted(newCompleted);
    localStorage.setItem('island-progress', JSON.stringify(newCompleted));
  };

  const areAllCompleted = (ids: string[]) => ids.every(id => completed[id]);

  // --- PROGRESS LOGIC (Simulated Structure) ---
  
  // Zone 1: The Beach
  const z1Tasks = ['i-z1-1', 'i-z1-2', 'i-z1-3'];
  const isZ1Done = areAllCompleted(z1Tasks);

  // Zone 2: The Jungle
  const z2Tasks = ['i-z2-1', 'i-z2-2', 'i-z2-3'];
  const isZ2Done = areAllCompleted(z2Tasks);
  const isZ2Unlocked = isZ1Done;

  // Zone 3: The Volcano
  const z3Tasks = ['i-z3-1', 'i-z3-2', 'i-z3-3'];
  const isZ3Done = areAllCompleted(z3Tasks);
  const isZ3Unlocked = isZ2Done;

  // Zone 4: The Throne
  const z4Tasks = ['i-z4-boss'];
  const isZ4Done = areAllCompleted(z4Tasks);
  const isZ4Unlocked = isZ3Done;


  const MatchItem: React.FC<MatchItemProps> = ({ 
    id, 
    title, 
    desc, 
    rewards, 
  }) => {
    const isChecked = completed[id];

    return (
      <div className={`p-4 transition-all duration-300 ${isChecked ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''}`}>
        <div className="flex items-start gap-4">
          <button 
            onClick={() => toggleTask(id)}
            className={`mt-1 flex-shrink-0 transition-all ${isChecked ? 'text-amber-600 dark:text-amber-500' : 'text-gray-300 dark:text-slate-600 hover:text-amber-400'}`}
          >
            {isChecked ? <CheckCircle2 size={24} fill="currentColor" className="text-white dark:text-slate-900" /> : <Circle size={24} />}
          </button>
          <div className="flex-1">
            <h3 className={`font-bold text-lg mb-1 ${isChecked ? 'text-slate-500 line-through decoration-2 decoration-amber-500/50' : 'text-slate-900 dark:text-white'}`}>
              {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
              {desc}
            </p>
            
            {rewards && (
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-400 uppercase mb-2">
                  <Trophy size={14} /> Botín de Guerra
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 pl-4">
                  {rewards}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img src="https://www.thesmackdownhotel.com/images/wwe2k25/articles/wwe-2k25-the-island-mode-guide.jpg" className="w-full h-full object-cover" alt="The Island Header" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center text-slate-300 hover:text-white mb-4 transition-colors">
            <ArrowLeft size={18} className="mr-1" /> Volver
          </Link>
          <div className="flex items-center gap-2 mb-2">
             <Skull className="text-amber-500" />
             <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Nuevo Modo</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">THE ISLAND</h1>
          <p className="text-slate-300 font-medium max-w-md">Sobrevive a la trampa turística más peligrosa del mundo. Enfréntate a la familia y conquista la isla.</p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-4 -mt-6 relative z-20">
        
        {/* Intro Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-800 mb-6">
           <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                 <ShieldAlert size={24} />
              </div>
              <div>
                 <h3 className="font-bold text-slate-800 dark:text-white mb-1">Reglas de la Isla</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Derrota a tus oponentes en combates consecutivos. La salud no se regenera completamente entre rondas. Desbloquea recompensas exclusivas al completar cada zona.
                 </p>
              </div>
           </div>
        </div>

        <div className="space-y-6 pb-12">
          
          {/* Zone 1 */}
          <ZoneBlock title="LA PLAYA (THE BEACH)" level={1} unlocked={true} completed={isZ1Done}>
             <MatchItem 
                id="i-z1-1" 
                title="Combate 1: La Bienvenida" 
                desc="Vs. Superestrella NXT Aleatoria."
                rewards="200 VC"
             />
             <MatchItem 
                id="i-z1-2" 
                title="Combate 2: Arena movediza" 
                desc="Vs. Otis & Akira Tozawa (Handicap)."
                rewards="300 VC"
             />
             <MatchItem 
                id="i-z1-3" 
                title="Jefe de Zona: El Guardián" 
                desc="Vs. Solo Sikoa '22."
                rewards={<ul className="list-disc space-y-1"><li>Arena: The Island Beach</li><li>Atuendo: Island Tourist</li></ul>}
             />
          </ZoneBlock>

          {/* Zone 2 */}
          <ZoneBlock title="LA JUNGLA (THE JUNGLE)" level={2} unlocked={isZ2Unlocked} completed={isZ2Done}>
             <MatchItem 
                id="i-z2-1" 
                title="Combate 1: Depredadores" 
                desc="Vs. Viking Raiders (Tag Team con compañero aleatorio)."
                rewards="400 VC"
             />
             <MatchItem 
                id="i-z2-2" 
                title="Combate 2: La Caza" 
                desc="Fatal 4-Way Eliminación."
                rewards="500 VC"
             />
             <MatchItem 
                id="i-z2-3" 
                title="Jefe de Zona: La Bestia" 
                desc="Vs. Bron Breakker."
                rewards={<ul className="list-disc space-y-1"><li>Arena: Deep Jungle</li><li>Arma: Tribal Spear</li></ul>}
             />
          </ZoneBlock>

          {/* Zone 3 */}
          <ZoneBlock title="EL VOLCÁN (THE VOLCANO)" level={3} unlocked={isZ3Unlocked} completed={isZ3Done}>
             <MatchItem 
                id="i-z3-1" 
                title="Combate 1: Calor Extremo" 
                desc="Inferno Match vs Kane '03."
                rewards="600 VC"
             />
             <MatchItem 
                id="i-z3-2" 
                title="Combate 2: Erupción" 
                desc="Gauntlet Match (3 Oponentes)."
                rewards="800 VC"
             />
             <MatchItem 
                id="i-z3-3" 
                title="Jefe de Zona: El Demonio" 
                desc="Vs. Finn Bálor (Demon)."
                rewards={<ul className="list-disc space-y-1"><li>Arena: Volcano Peak</li><li>Atuendo: Magma Skin</li></ul>}
             />
          </ZoneBlock>

           {/* Zone 4 */}
           <ZoneBlock title="EL TRONO (THE THRONE)" level={4} unlocked={isZ4Unlocked} completed={isZ4Done}>
             <MatchItem 
                id="i-z4-boss" 
                title="BATALLA FINAL: TRIBAL CHIEF" 
                desc="Vs. Roman Reigns (Bloodline Rules). Debes ganar por sumisión o KO."
                rewards={<ul className="list-disc space-y-1"><li>Personaje: Roman Reigns '25 (Island God)</li><li>Título: Crown of the Island</li><li>10,000 VC</li></ul>}
             />
          </ZoneBlock>

        </div>
      </div>
    </div>
  );
};

export default TheIslandGuide;