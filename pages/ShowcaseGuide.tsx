import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Trophy, Lock, Video, Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MatchBlockProps {
  title: string;
  matchNumber: number;
  unlocked: boolean;
  completed: boolean;
  children?: React.ReactNode;
}

const MatchBlock: React.FC<MatchBlockProps> = ({ 
  title, 
  matchNumber,
  unlocked, 
  completed: isDone,
  children 
}) => (
  <div className={`relative rounded-xl overflow-hidden shadow-sm border transition-all duration-500 ${unlocked ? 'bg-white dark:bg-slate-900 border-red-100 dark:border-red-900/30 opacity-100' : 'bg-gray-100 dark:bg-slate-900 border-transparent opacity-60 grayscale'}`}>
    {!unlocked && (
      <div className="absolute inset-0 z-20 bg-gray-200/50 dark:bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
         <div className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg font-bold text-sm">
           <Lock size={16} /> Bloqueado
         </div>
      </div>
    )}
    <div className="p-4 border-b border-red-100 dark:border-red-900/30 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/10 flex justify-between items-center">
      <h2 className="font-black text-lg text-slate-800 dark:text-white uppercase tracking-wide flex items-center gap-2">
        <span className="text-red-600 dark:text-red-500">#{matchNumber}</span> {title}
      </h2>
      {isDone ? (
         <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
           <CheckCircle2 size={12} /> Completado
         </span>
      ) : unlocked ? (
         <span className="text-xs font-bold px-2 py-1 bg-red-100 text-red-700 rounded dark:bg-red-900/30 dark:text-red-400 flex items-center gap-1">
           <Video size={12} /> Disponible
         </span>
      ) : null}
    </div>
    <div className="divide-y divide-gray-100 dark:divide-slate-800">
      {children}
    </div>
  </div>
);

interface ObjectiveItemProps {
  id: string;
  desc: string;
  rewards?: React.ReactNode;
}

const ShowcaseGuide: React.FC = () => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('showcase-progress');
    if (saved) {
      setCompleted(JSON.parse(saved));
    }
  }, []);

  const toggleTask = (taskId: string) => {
    const newCompleted = { ...completed, [taskId]: !completed[taskId] };
    setCompleted(newCompleted);
    localStorage.setItem('showcase-progress', JSON.stringify(newCompleted));
  };

  const areAllCompleted = (ids: string[]) => ids.every(id => completed[id]);

  // --- PROGRESS LOGIC ---
  // Assuming a linear progression of matches
  
  // Match 1
  const m1Tasks = ['sh-m1-obj'];
  const isM1Done = areAllCompleted(m1Tasks);

  // Match 2
  const m2Tasks = ['sh-m2-obj'];
  const isM2Done = areAllCompleted(m2Tasks);
  const isM2Unlocked = isM1Done;

  // Match 3
  const m3Tasks = ['sh-m3-obj'];
  const isM3Done = areAllCompleted(m3Tasks);
  const isM3Unlocked = isM2Done;

  // Match 4
  const m4Tasks = ['sh-m4-obj'];
  const isM4Done = areAllCompleted(m4Tasks);
  const isM4Unlocked = isM3Done;

  // Match 5
  const m5Tasks = ['sh-m5-obj'];
  const isM5Done = areAllCompleted(m5Tasks);
  const isM5Unlocked = isM4Done;
  
  // Match 6 (Bonus)
  const m6Tasks = ['sh-m6-obj'];
  const isM6Done = areAllCompleted(m6Tasks);
  const isM6Unlocked = isM5Done;


  const ObjectiveItem: React.FC<ObjectiveItemProps> = ({ 
    id, 
    desc, 
    rewards, 
  }) => {
    const isChecked = completed[id];

    return (
      <div className={`p-4 transition-all duration-300 ${isChecked ? 'bg-red-50/50 dark:bg-red-900/10' : ''}`}>
        <div className="flex items-start gap-4">
          <button 
            onClick={() => toggleTask(id)}
            className={`mt-1 flex-shrink-0 transition-all ${isChecked ? 'text-red-600 dark:text-red-500' : 'text-gray-300 dark:text-slate-600 hover:text-red-400'}`}
          >
            {isChecked ? <CheckCircle2 size={24} fill="currentColor" className="text-white dark:text-slate-900" /> : <Circle size={24} />}
          </button>
          <div className="flex-1">
            <h3 className={`font-bold text-sm uppercase tracking-wider mb-2 ${isChecked ? 'text-slate-500' : 'text-slate-400 dark:text-slate-500'}`}>
              Objetivos del Combate
            </h3>
            <p className={`text-base font-medium mb-3 leading-relaxed ${isChecked ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-white'}`}>
              {desc}
            </p>
            
            {rewards && (
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-400 uppercase mb-2">
                  <Star size={14} className="text-yellow-500" fill="currentColor" /> Desbloqueables
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
           <img src="https://www.thesmackdownhotel.com/images/wwe2k25/articles/wwe-2k25-showcase-match-list.jpg" className="w-full h-full object-cover" alt="Showcase Header" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center text-slate-300 hover:text-white mb-4 transition-colors">
            <ArrowLeft size={18} className="mr-1" /> Volver
          </Link>
          <div className="flex items-center gap-2 mb-2">
             <Video className="text-red-500" />
             <span className="text-red-500 font-bold uppercase tracking-widest text-xs">Modo Historia</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter mb-2">SHOWCASE</h1>
          <p className="text-slate-300 font-medium max-w-md">Revive los momentos más icónicos. Completa los objetivos históricos para desbloquear leyendas, arenas y atuendos clásicos.</p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-4 -mt-6 relative z-20">
        
        <div className="space-y-6 pb-12">
          
          {/* Match 1 */}
          <MatchBlock title="WrestleMania I: Hogan vs. Piper" matchNumber={1} unlocked={true} completed={isM1Done}>
             <ObjectiveItem 
                id="sh-m1-obj" 
                desc="Completa todos los objetivos históricos y gana el combate."
                rewards={<ul className="list-disc space-y-1"><li>Hulk Hogan '85</li><li>Roddy Piper '85</li><li>Arena WrestleMania I</li></ul>}
             />
          </MatchBlock>

          {/* Match 2 */}
          <MatchBlock title="WrestleMania III: Hogan vs. Andre" matchNumber={2} unlocked={isM2Unlocked} completed={isM2Done}>
             <ObjectiveItem 
                id="sh-m2-obj" 
                desc="Realiza el Body Slam a Andre y gana con el Leg Drop."
                rewards={<ul className="list-disc space-y-1"><li>Andre The Giant '87</li><li>Arena WrestleMania III</li><li>Bobby Heenan (Manager)</li></ul>}
             />
          </MatchBlock>

          {/* Match 3 */}
          <MatchBlock title="WrestleMania X: Razor vs. Shawn" matchNumber={3} unlocked={isM3Unlocked} completed={isM3Done}>
             <ObjectiveItem 
                id="sh-m3-obj" 
                desc="Gana el Ladder Match recuperando los títulos."
                rewards={<ul className="list-disc space-y-1"><li>Razor Ramon '94</li><li>Shawn Michaels '94</li><li>Arena WrestleMania X</li><li>Escalera Zebra</li></ul>}
             />
          </MatchBlock>

           {/* Match 4 */}
           <MatchBlock title="WrestleMania 13: Austin vs. Bret" matchNumber={4} unlocked={isM4Unlocked} completed={isM4Done}>
             <ObjectiveItem 
                id="sh-m4-obj" 
                desc="Sobrevive al Sharpshooter sin rendirte hasta desmayarte."
                rewards={<ul className="list-disc space-y-1"><li>Stone Cold '97</li><li>Bret Hart '97</li><li>Arena WrestleMania 13</li></ul>}
             />
          </MatchBlock>

          {/* Match 5 */}
          <MatchBlock title="WrestleMania X-Seven: Rock vs. Austin" matchNumber={5} unlocked={isM5Unlocked} completed={isM5Done}>
             <ObjectiveItem 
                id="sh-m5-obj" 
                desc="Golpea a The Rock con la silla múltiples veces y gana el combate."
                rewards={<ul className="list-disc space-y-1"><li>The Rock '01</li><li>Stone Cold '01</li><li>Arena WrestleMania X-Seven</li><li>MyFACTION: McMahon Card</li></ul>}
             />
          </MatchBlock>

          {/* Match 6 */}
          <MatchBlock title="Bonus: The Streak Ends" matchNumber={6} unlocked={isM6Unlocked} completed={isM6Done}>
             <ObjectiveItem 
                id="sh-m6-obj" 
                desc="Derrota a The Undertaker con Brock Lesnar en WrestleMania XXX."
                rewards={<ul className="list-disc space-y-1"><li>Brock Lesnar '14</li><li>Undertaker '14</li><li>Arena WrestleMania XXX</li><li>Paul Heyman '14</li></ul>}
             />
          </MatchBlock>

        </div>
      </div>
    </div>
  );
};

export default ShowcaseGuide;