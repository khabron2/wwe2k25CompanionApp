import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Trophy, Lock, Video, Play, Star, Crown, History, Sparkles, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadProgress, saveProgress } from '../services/supabase';

interface MatchBlockProps {
  title: string;
  matchNumber: number;
  unlocked: boolean;
  completed: boolean;
  type: 'relive' | 'change' | 'create' | 'bonus';
  children?: React.ReactNode;
}

const MatchBlock: React.FC<MatchBlockProps> = ({ 
  title, 
  matchNumber,
  unlocked, 
  completed: isDone,
  type,
  children 
}) => {
  let colorClass = "";
  let icon = <Video size={12} />;
  
  switch (type) {
    case 'relive': 
      colorClass = "border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10";
      icon = <History size={12} />;
      break;
    case 'change': 
      colorClass = "border-purple-100 dark:border-purple-900/30 bg-purple-50 dark:bg-purple-900/10";
      icon = <RefreshCcw size={12} />;
      break;
    case 'create': 
      colorClass = "border-amber-100 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-900/10";
      icon = <Sparkles size={12} />;
      break;
    default:
      colorClass = "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900";
  }

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-sm border transition-all duration-500 mb-4 ${unlocked ? 'bg-white dark:bg-slate-900 opacity-100' : 'bg-gray-100 dark:bg-slate-900 border-transparent opacity-60 grayscale'}`}>
      {!unlocked && (
        <div className="absolute inset-0 z-20 bg-gray-200/50 dark:bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
           <div className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg font-bold text-sm">
             <Lock size={16} /> Bloqueado
           </div>
        </div>
      )}
      <div className={`p-4 border-b ${unlocked ? colorClass : 'border-transparent'} flex justify-between items-center`}>
        <h2 className="font-black text-lg text-slate-800 dark:text-white uppercase tracking-wide flex items-center gap-2">
          <span className={`text-${type === 'relive' ? 'red' : type === 'change' ? 'purple' : 'amber'}-600 dark:text-${type === 'relive' ? 'red' : type === 'change' ? 'purple' : 'amber'}-500`}>#{matchNumber}</span> {title}
        </h2>
        {isDone ? (
           <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
             <CheckCircle2 size={12} /> Completado
           </span>
        ) : unlocked ? (
           <span className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${type === 'relive' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : type === 'change' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
             {icon} Disponible
           </span>
        ) : null}
      </div>
      <div className="divide-y divide-gray-100 dark:divide-slate-800">
        {children}
      </div>
    </div>
  );
};

interface ObjectiveItemProps {
  id: string;
  desc: string;
  rewards?: React.ReactNode;
}

const ShowcaseGuide: React.FC = () => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const load = async () => {
      const data = await loadProgress('showcase');
      if (data) setCompleted(data);
    };
    load();
  }, []);

  const toggleTask = (taskId: string) => {
    const newCompleted = { ...completed, [taskId]: !completed[taskId] };
    setCompleted(newCompleted);
    saveProgress('showcase', newCompleted);
  };

  const areAllCompleted = (ids: string[]) => ids.every(id => completed[id]);

  // --- PROGRESS LOGIC ---
  const matches = [
    // Relive
    { id: 'bl-m1', tasks: ['bl-m1-obj'] },
    { id: 'bl-m2', tasks: ['bl-m2-obj'] },
    { id: 'bl-m3', tasks: ['bl-m3-obj'] },
    { id: 'bl-m4', tasks: ['bl-m4-obj'] },
    { id: 'bl-m5', tasks: ['bl-m5-obj'] },
    // Change
    { id: 'bl-m6', tasks: ['bl-m6-obj'] },
    { id: 'bl-m7', tasks: ['bl-m7-obj'] },
    { id: 'bl-m8', tasks: ['bl-m8-obj'] },
    { id: 'bl-m9', tasks: ['bl-m9-obj'] },
    { id: 'bl-m10', tasks: ['bl-m10-obj'] },
    { id: 'bl-m11', tasks: ['bl-m11-obj'] },
    // Create
    { id: 'bl-m12', tasks: ['bl-m12-obj'] },
    { id: 'bl-m13', tasks: ['bl-m13-obj'] },
    { id: 'bl-m14', tasks: ['bl-m14-obj'] },
    { id: 'bl-m15', tasks: ['bl-m15-obj'] },
    { id: 'bl-m16', tasks: ['bl-m16-obj'] },
    // Bonus
    { id: 'bl-m17', tasks: ['bl-m17-obj'] },
  ];

  const ObjectiveItem: React.FC<ObjectiveItemProps> = ({ 
    id, 
    desc, 
    rewards, 
  }) => {
    const isChecked = completed[id];

    return (
      <div className={`p-4 transition-all duration-300 ${isChecked ? 'bg-slate-50 dark:bg-slate-800/30' : ''}`}>
        <div className="flex items-start gap-4">
          <button 
            onClick={() => toggleTask(id)}
            className={`mt-1 flex-shrink-0 transition-all ${isChecked ? 'text-green-600 dark:text-green-500' : 'text-gray-300 dark:text-slate-600 hover:text-slate-500'}`}
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

  const isUnlocked = (index: number) => {
    if (index === 0) return true;
    return areAllCompleted(matches[index - 1].tasks);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img src="https://image.pollinations.ai/prompt/roman%20reigns%20and%20the%20rock%20bloodline%20dynasty%20wwe%202k25%20showcase%20red%20lei%20ura%20dark%20background?width=800&height=400&nologo=true" className="w-full h-full object-cover" alt="Showcase Header" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center text-slate-300 hover:text-white mb-4 transition-colors">
            <ArrowLeft size={18} className="mr-1" /> Volver
          </Link>
          <div className="flex items-center gap-2 mb-2">
             <Crown className="text-red-500" />
             <span className="text-red-500 font-bold uppercase tracking-widest text-xs">Showcase</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">BLOODLINE'S DYNASTY</h1>
          <p className="text-slate-300 font-medium max-w-md">Revive, Cambia y Crea la historia de la familia más dominante del entretenimiento deportivo.</p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-4 -mt-6 relative z-20">
        
        <div className="space-y-8 pb-12">
          
          {/* SECTION 1: RELIVE HISTORY */}
          <div>
            <div className="flex items-center gap-2 mb-4 px-2">
               <History className="text-red-600" size={24} />
               <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic">Revive la Historia</h2>
            </div>
            
            <MatchBlock title="King of the Ring '93: Yokozuna vs Hogan" matchNumber={1} type="relive" unlocked={isUnlocked(0)} completed={areAllCompleted(matches[0].tasks)}>
               <ObjectiveItem 
                  id="bl-m1-obj" 
                  desc="Derrota a Hulk Hogan con Yokozuna usando el Banzai Drop."
                  rewards={<ul className="list-disc space-y-1"><li>Yokozuna (Champion)</li><li>Mr. Fuji (Manager)</li><li>Arena King of the Ring '93</li><li>Hulk Hogan '93</li></ul>}
               />
            </MatchBlock>

            <MatchBlock title="RAW '97: Rocky Maivia vs HHH" matchNumber={2} type="relive" unlocked={isUnlocked(1)} completed={areAllCompleted(matches[1].tasks)}>
               <ObjectiveItem 
                  id="bl-m2-obj" 
                  desc="Gana con Rocky Maivia para defender el Campeonato Intercontinental."
                  rewards={<ul className="list-disc space-y-1"><li>Rocky Maivia</li><li>Hunter Hearst Helmsley</li><li>Arena RAW 1997</li></ul>}
               />
            </MatchBlock>

            <MatchBlock title="HIAC '17: The Usos vs The New Day" matchNumber={3} type="relive" unlocked={isUnlocked(2)} completed={areAllCompleted(matches[2].tasks)}>
               <ObjectiveItem 
                  id="bl-m3-obj" 
                  desc="Gana el Hell in a Cell Match con Jey & Jimmy Uso."
                  rewards={<ul className="list-disc space-y-1"><li>Jey Uso '17</li><li>Jimmy Uso '17</li><li>Arena Hell in a Cell '17</li><li>Big E (Manager)</li></ul>}
               />
            </MatchBlock>

            <MatchBlock title="NXT 2.0: Solo Sikoa vs Carmelo Hayes" matchNumber={4} type="relive" unlocked={isUnlocked(3)} completed={areAllCompleted(matches[3].tasks)}>
               <ObjectiveItem 
                  id="bl-m4-obj" 
                  desc="Gana el Campeonato Norteamericano con Solo Sikoa."
                  rewards={<ul className="list-disc space-y-1"><li>Solo Sikoa (NXT)</li><li>Carmelo Hayes '22</li><li>Trick Williams '22 (Manager)</li><li>Arena NXT 2.0</li></ul>}
               />
            </MatchBlock>

            <MatchBlock title="QOTR '24: Nia Jax vs Lyra Valkyria" matchNumber={5} type="relive" unlocked={isUnlocked(4)} completed={areAllCompleted(matches[4].tasks)}>
               <ObjectiveItem 
                  id="bl-m5-obj" 
                  desc="Gana la final del torneo con Nia Jax."
                  rewards={<ul className="list-disc space-y-1"><li>Nia Jax (Queen)</li><li>Lyra Valkyria</li><li>Arena King & Queen of the Ring</li></ul>}
               />
            </MatchBlock>
          </div>

          {/* SECTION 2: CHANGE HISTORY */}
          <div>
            <div className="flex items-center gap-2 mb-4 px-2 pt-4 border-t border-slate-200 dark:border-slate-800">
               <RefreshCcw className="text-purple-600" size={24} />
               <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic">Cambia la Historia</h2>
            </div>

            <MatchBlock title="WM IX: Headshrinkers vs Steiners" matchNumber={6} type="change" unlocked={isUnlocked(5)} completed={areAllCompleted(matches[5].tasks)}>
               <ObjectiveItem 
                  id="bl-m6-obj" 
                  desc="Gana con Samu & Fatu cambiando el resultado histórico."
                  rewards={<ul className="list-disc space-y-1"><li>Headshrinker Samu</li><li>Headshrinker Fatu</li><li>Rick Steiner</li><li>Scott Steiner '93</li><li>Arena WrestleMania IX</li></ul>}
               />
            </MatchBlock>

            <MatchBlock title="No Mercy '00: Rikishi vs Stone Cold" matchNumber={7} type="change" unlocked={isUnlocked(6)} completed={areAllCompleted(matches[6].tasks)}>
               <ObjectiveItem 
                  id="bl-m7-obj" 
                  desc="Atropella a Stone Cold (Cinemática) y gana el combate No Holds Barred."
                  rewards={<ul className="list-disc space-y-1"><li>Rikishi</li><li>Stone Cold '00</li><li>Arena No Mercy 2000</li></ul>}
               />
            </MatchBlock>

            <MatchBlock title="NYR '07: Umaga vs John Cena" matchNumber={8} type="change" unlocked={isUnlocked(7)} completed={areAllCompleted(matches[7].tasks)}>
               <ObjectiveItem 
                  id="bl-m8-obj" 
                  desc="Destruye a Cena y gana el Campeonato WWE con el Samoan Spike."
                  rewards={<ul className="list-disc space-y-1"><li>Umaga</li><li>Armando Estrada (Manager)</li><li>John Cena '07</li><li>Arena New Year's Revolution</li></ul>}
               />
            </MatchBlock>

            <MatchBlock title="MITB '17: Tamina vs The Field" matchNumber={9} type="change" unlocked={isUnlocked(8)} completed={areAllCompleted(matches[8].tasks)}>
               <ObjectiveItem 
                  id="bl-m9-obj" 
                  desc="Sube la escalera y gana el maletín con Tamina."
                  rewards={<ul className="list-disc space-y-1"><li>Tamina '17</li><li>Carmella '17</li><li>Natalya '17</li><li>Arena Money in the Bank '17</li></ul>}
               />
            </MatchBlock>

            <MatchBlock title="Super ShowDown: Naomi vs Bayley" matchNumber={10} type="change" unlocked={isUnlocked(9)} completed={areAllCompleted(matches[9].tasks)}>
               <ObjectiveItem 
                  id="bl-m10-obj" 
                  desc="Gana el Campeonato Femenino de SmackDown con Naomi."
                  rewards={<ul className="list-disc space-y-1"><li>Naomi '20</li><li>Bayley '20</li><li>Arena Super ShowDown</li></ul>}
               />
            </MatchBlock>

            <MatchBlock title="Royal Rumble '22: Roman vs Seth" matchNumber={11} type="change" unlocked={isUnlocked(10)} completed={areAllCompleted(matches[10].tasks)}>
               <ObjectiveItem 
                  id="bl-m11-obj" 
                  desc="Gana por cuenta de 3 o sumisión, evitando la descalificación."
                  rewards={<ul className="list-disc space-y-1"><li>Roman Reigns '22</li><li>Seth Rollins '22 (Shield Gear)</li><li>Arena Royal Rumble 2022</li></ul>}
               />
            </MatchBlock>
          </div>

          {/* SECTION 3: CREATE HISTORY */}
          <div>
            <div className="flex items-center gap-2 mb-4 px-2 pt-4 border-t border-slate-200 dark:border-slate-800">
               <Sparkles className="text-amber-500" size={24} />
               <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic">Crea Historia</h2>
            </div>

            <MatchBlock title="Fantasy: High Chief vs The Animal" matchNumber={12} type="create" unlocked={isUnlocked(11)} completed={areAllCompleted(matches[11].tasks)}>
               <ObjectiveItem 
                  id="bl-m12-obj" 
                  desc="Gana el combate de ensueño con Peter Maivia."
                  rewards={<ul className="list-disc space-y-1"><li>High Chief Peter Maivia</li><li>George 'The Animal' Steele</li><li>Arena Wrestling Classic</li></ul>}
               />
            </MatchBlock>

            <MatchBlock title="Fantasy: Wild Samoans vs Dudleyz" matchNumber={13} type="create" unlocked={isUnlocked(12)} completed={areAllCompleted(matches[12].tasks)}>
               <ObjectiveItem 
                  id="bl-m13-obj" 
                  desc="Gana el Tables Match con Afa & Sika."
                  rewards={<ul className="list-disc space-y-1"><li>Afa & Sika (Wild Samoans)</li><li>Bubba Ray & D-Von (Dudley Boyz)</li></ul>}
               />
            </MatchBlock>

            <MatchBlock title="Fantasy: 3MW vs AOP" matchNumber={14} type="create" unlocked={isUnlocked(13)} completed={areAllCompleted(matches[13].tasks)}>
               <ObjectiveItem 
                  id="bl-m14-obj" 
                  desc="Derrota a los Autores del Dolor con Rosey & Jamal."
                  rewards={<ul className="list-disc space-y-1"><li>Rosey & Jamal (3 Minute Warning)</li><li>Akam & Rezar</li><li>Paul Ellering (Manager)</li></ul>}
               />
            </MatchBlock>

            <MatchBlock title="Fantasy: Islanders vs Street Profits" matchNumber={15} type="create" unlocked={isUnlocked(14)} completed={areAllCompleted(matches[14].tasks)}>
               <ObjectiveItem 
                  id="bl-m15-obj" 
                  desc="Gana el Tornado Tag Match con Haku & Tama."
                  rewards={<ul className="list-disc space-y-1"><li>Haku & Tama (The Islanders)</li><li>Angelo Dawkins & Montez Ford (Street Profits)</li></ul>}
               />
            </MatchBlock>

            <MatchBlock title="WARGAMES: OG Bloodline vs New Bloodline" matchNumber={16} type="create" unlocked={isUnlocked(15)} completed={areAllCompleted(matches[15].tasks)}>
               <ObjectiveItem 
                  id="bl-m16-obj" 
                  desc="Gana el WarGames Match con el equipo de Roman Reigns (OG)."
                  rewards={<ul className="list-disc space-y-1"><li>Roman Reigns (OTC)</li><li>The Rock (Final Boss)</li><li>Solo Sikoa (Tribal Chief)</li><li>Jacob Fatu</li><li>Tama Tonga & Tonga Loa</li><li>Arena WarGames</li></ul>}
               />
            </MatchBlock>
          </div>

          {/* BONUS */}
          <div>
            <MatchBlock title="BONUS: The Tribal Gauntlet" matchNumber={17} type="bonus" unlocked={isUnlocked(16)} completed={areAllCompleted(matches[16].tasks)}>
               <ObjectiveItem 
                  id="bl-m17-obj" 
                  desc="Sobrevive al Gauntlet Match enfrentando a todas las generaciones."
                  rewards={<ul className="list-disc space-y-1"><li>Logro: Head of the Table</li><li>Atuendo: Tribal Chief Gold</li><li>Arena: The Tribal Hall</li><li>10,000 VC</li></ul>}
               />
            </MatchBlock>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShowcaseGuide;