import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Trophy, Medal, Gamepad2, Globe, Users, Briefcase, Map, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AchievementCategoryProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const AchievementCategory: React.FC<AchievementCategoryProps> = ({ title, icon, children }) => (
  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden mb-6">
    <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800 flex items-center gap-3">
      <div className="p-2 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-500 rounded-lg">
        {icon}
      </div>
      <h2 className="font-bold text-lg text-slate-900 dark:text-white uppercase tracking-wide">
        {title}
      </h2>
    </div>
    <div className="divide-y divide-gray-100 dark:divide-slate-800">
      {children}
    </div>
  </div>
);

interface AchievementItemProps {
  id: string;
  title: string;
  desc: string;
  isCompleted: boolean;
  onToggle: () => void;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ id, title, desc, isCompleted, onToggle }) => (
  <div 
    onClick={onToggle}
    className={`p-4 flex items-start gap-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-slate-800 ${isCompleted ? 'bg-yellow-50/50 dark:bg-yellow-900/10' : ''}`}
  >
    <button className={`mt-1 flex-shrink-0 transition-colors ${isCompleted ? 'text-yellow-600 dark:text-yellow-500' : 'text-gray-300 dark:text-slate-600'}`}>
      {isCompleted ? <CheckCircle2 size={24} fill="currentColor" className="text-white dark:text-slate-900" /> : <Circle size={24} />}
    </button>
    <div>
      <h3 className={`font-bold text-sm mb-1 ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-white'}`}>
        {title}
      </h3>
      <p className={`text-xs leading-relaxed ${isCompleted ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
        {desc}
      </p>
    </div>
  </div>
);

const AchievementsGuide: React.FC = () => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('achievements-progress');
    if (saved) {
      setCompleted(JSON.parse(saved));
    }
  }, []);

  const toggleAchievement = (id: string) => {
    const newCompleted = { ...completed, [id]: !completed[id] };
    setCompleted(newCompleted);
    localStorage.setItem('achievements-progress', JSON.stringify(newCompleted));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  // Total approximation based on the list provided
  const totalCount = 31; 
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://image.pollinations.ai/prompt/wwe%20championship%20belts%20trophies%20gold%20background%20luxury?width=800&height=400&nologo=true')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center text-slate-300 hover:text-white mb-4 transition-colors">
            <ArrowLeft size={18} className="mr-1" /> Volver
          </Link>
          <div className="flex items-center gap-2 mb-2">
             <Trophy className="text-yellow-400" />
             <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs">Trofeos y Logros</span>
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter mb-2">ROAD TO PLATINUM</h1>
          <p className="text-slate-300 font-medium text-sm max-w-md">Guía completa para desbloquear el 100% de los logros y trofeos de WWE 2K25.</p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-4 -mt-8 relative z-20">
        
        {/* Progress Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-800 mb-8 flex items-center gap-6">
           <div className="relative w-16 h-16 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100 dark:text-slate-800" />
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-yellow-500" strokeDasharray={175} strokeDashoffset={175 - (175 * percentage) / 100} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-black text-slate-800 dark:text-white text-sm">
                {percentage}%
              </div>
           </div>
           <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Progreso Total</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{completedCount} de {totalCount} trofeos conseguidos</p>
           </div>
        </div>

        {/* Showcase */}
        <AchievementCategory title="Showcase Mode" icon={<Star size={20} />}>
          <AchievementItem id="ach-show-1" title="Day 1 Ish" desc="Completa el primer objetivo en el modo Showcase." isCompleted={completed['ach-show-1']} onToggle={() => toggleAchievement('ach-show-1')} />
          <AchievementItem id="ach-show-2" title="BANZAI!" desc="Derrota a Hulk Hogan en el King of the Ring 1993 con Yokozuna." isCompleted={completed['ach-show-2']} onToggle={() => toggleAchievement('ach-show-2')} />
          <AchievementItem id="ach-show-3" title="I Did It For The People" desc="Deja inconsciente a «Stone Cold» en No Mercy 2000 con Rikishi." isCompleted={completed['ach-show-3']} onToggle={() => toggleAchievement('ach-show-3')} />
          <AchievementItem id="ach-show-4" title="The N.T.C" desc="Gana el WarGames de The Bloodline con el equipo de Solo Sikoa." isCompleted={completed['ach-show-4']} onToggle={() => toggleAchievement('ach-show-4')} />
          <AchievementItem id="ach-show-5" title="The O.T.C" desc="Gana el WarGames de The Bloodline con el equipo de Roman Reigns." isCompleted={completed['ach-show-5']} onToggle={() => toggleAchievement('ach-show-5')} />
          <AchievementItem id="ach-show-6" title="Head of the Table" desc="Gana el Tribal Gauntlet Match como cualquier personaje al final del modo Showcase." isCompleted={completed['ach-show-6']} onToggle={() => toggleAchievement('ach-show-6')} />
        </AchievementCategory>

        {/* Universe */}
        <AchievementCategory title="Universe Mode" icon={<Globe size={20} />}>
          <AchievementItem id="ach-uni-1" title="Mic’ Up" desc="Completa una acción de rivalidad de auto-promoción." isCompleted={completed['ach-uni-1']} onToggle={() => toggleAchievement('ach-uni-1')} />
          <AchievementItem id="ach-uni-2" title="Enough Talk" desc="Inicia una pelea o un combate inmediato desde una acción de rivalidad de promo." isCompleted={completed['ach-uni-2']} onToggle={() => toggleAchievement('ach-uni-2')} />
          <AchievementItem id="ach-uni-3" title="Open Season" desc="Completa una acción de rivalidad de Desafío Abierto o Aceptar Desafío Abierto." isCompleted={completed['ach-uni-3']} onToggle={() => toggleAchievement('ach-uni-3')} />
          <AchievementItem id="ach-uni-4" title="Wrestling Royalty" desc="Corona a un nuevo Rey o Reina del Ring." isCompleted={completed['ach-uni-4']} onToggle={() => toggleAchievement('ach-uni-4')} />
          <AchievementItem id="ach-uni-5" title="Biggest Nights of the Year" desc="Completa ambas noches de WrestleMania en Universe Mode." isCompleted={completed['ach-uni-5']} onToggle={() => toggleAchievement('ach-uni-5')} />
        </AchievementCategory>

        {/* Play Mode */}
        <AchievementCategory title="Play Mode (Exhibición)" icon={<Gamepad2 size={20} />}>
          <AchievementItem id="ach-play-1" title="Going Solo" desc="Derrota a Roman Reigns en un Bloodline Rules Match sin aliados en dificultad Leyenda." isCompleted={completed['ach-play-1']} onToggle={() => toggleAchievement('ach-play-1')} />
          <AchievementItem id="ach-play-2" title="Underground Reign" desc="Gana 25 combates consecutivos en Underground en dificultad Leyenda." isCompleted={completed['ach-play-2']} onToggle={() => toggleAchievement('ach-play-2')} />
          <AchievementItem id="ach-play-3" title="Back By Popular Demand" desc="Completa una secuencia de lucha encadenada." isCompleted={completed['ach-play-3']} onToggle={() => toggleAchievement('ach-play-3')} />
          <AchievementItem id="ach-play-4" title="This Is New" desc="Realiza un ataque aéreo desde la barricada con éxito." isCompleted={completed['ach-play-4']} onToggle={() => toggleAchievement('ach-play-4')} />
          <AchievementItem id="ach-play-5" title="Miraculous Comeback" desc="Gana un combate vía KO tras estar en estado de KO crítico." isCompleted={completed['ach-play-5']} onToggle={() => toggleAchievement('ach-play-5')} />
          <AchievementItem id="ach-play-6" title="Impeccable Ring Awareness" desc="Gana por pin o sumisión sin que ocurra un rope break en dificultad Leyenda." isCompleted={completed['ach-play-6']} onToggle={() => toggleAchievement('ach-play-6')} />
          <AchievementItem id="ach-play-7" title="Recovery Deferred" desc="Gana 25 combates en dificultad Leyenda sin usar la Recuperación Instantánea." isCompleted={completed['ach-play-7']} onToggle={() => toggleAchievement('ach-play-7')} />
        </AchievementCategory>

        {/* MyFaction */}
        <AchievementCategory title="MyFaction" icon={<Users size={20} />}>
          <AchievementItem id="ach-fac-1" title="Faction Wars Champion" desc="Derrota a 30 jefes de guerra en MyFaction." isCompleted={completed['ach-fac-1']} onToggle={() => toggleAchievement('ach-fac-1')} />
          <AchievementItem id="ach-fac-2" title="Rise through the Ranks" desc="Gana una recompensa de clasificación en una temporada de Ranked Play." isCompleted={completed['ach-fac-2']} onToggle={() => toggleAchievement('ach-fac-2')} />
          <AchievementItem id="ach-fac-3" title="Loyalty Confirmed" desc="Obtén una recompensa de lealtad." isCompleted={completed['ach-fac-3']} onToggle={() => toggleAchievement('ach-fac-3')} />
          <AchievementItem id="ach-fac-4" title="Taste of Victory" desc="Gana un combate en MyFaction." isCompleted={completed['ach-fac-4']} onToggle={() => toggleAchievement('ach-fac-4')} />
          <AchievementItem id="ach-fac-5" title="Journey of a Lifetime" desc="Completa 15 desafíos de por vida en MyFaction." isCompleted={completed['ach-fac-5']} onToggle={() => toggleAchievement('ach-fac-5')} />
          <AchievementItem id="ach-fac-6" title="United States Champion" desc="Completa todos los combates de USA en World Tour en MyFaction." isCompleted={completed['ach-fac-6']} onToggle={() => toggleAchievement('ach-fac-6')} />
          <AchievementItem id="ach-fac-7" title="Live Event Legend" desc="Consigue 100 estrellas en eventos en vivo." isCompleted={completed['ach-fac-7']} onToggle={() => toggleAchievement('ach-fac-7')} />
        </AchievementCategory>

        {/* MyGM */}
        <AchievementCategory title="MyGM Mode" icon={<Briefcase size={20} />}>
          <AchievementItem id="ach-gm-1" title="Host With The Most" desc="Organiza y completa un WrestleMania en MyGM Online con 3 amigos." isCompleted={completed['ach-gm-1']} onToggle={() => toggleAchievement('ach-gm-1')} />
          <AchievementItem id="ach-gm-2" title="GM Punk" desc="Entra al Salón de la Fama en primer lugar con CM Punk como GM." isCompleted={completed['ach-gm-2']} onToggle={() => toggleAchievement('ach-gm-2')} />
          <AchievementItem id="ach-gm-3" title="Medical Bill" desc="Gana $150,000 liberando a un luchador lesionado." isCompleted={completed['ach-gm-3']} onToggle={() => toggleAchievement('ach-gm-3')} />
          <AchievementItem id="ach-gm-4" title="The 1%" desc="Gana el evento principal de cada PLE jugando como la marca Mutiny." isCompleted={completed['ach-gm-4']} onToggle={() => toggleAchievement('ach-gm-4')} />
        </AchievementCategory>

        {/* The Island */}
        <AchievementCategory title="The Island" icon={<Map size={20} />}>
          <AchievementItem id="ach-isl-1" title="Let’s Go!" desc="Completa la misión «Welcome to My Island»." isCompleted={completed['ach-isl-1']} onToggle={() => toggleAchievement('ach-isl-1')} />
          <AchievementItem id="ach-isl-2" title="The Road to Glory" desc="Completa un desafío del Salón de la Fama." isCompleted={completed['ach-isl-2']} onToggle={() => toggleAchievement('ach-isl-2')} />
          <AchievementItem id="ach-isl-3" title="Terminally Online" desc="Juega un combate PvP en The Island." isCompleted={completed['ach-isl-3']} onToggle={() => toggleAchievement('ach-isl-3')} />
        </AchievementCategory>

        {/* MyRISE */}
        <AchievementCategory title="MyRISE" icon={<Medal size={20} />}>
          <AchievementItem id="ach-rise-1" title="The Draft and the Furious" desc="Ser seleccionado como el #1 en el Draft de MyRise." isCompleted={completed['ach-rise-1']} onToggle={() => toggleAchievement('ach-rise-1')} />
          <AchievementItem id="ach-rise-2" title="Bold Moves" desc="Juega una historia con personalidad audaz." isCompleted={completed['ach-rise-2']} onToggle={() => toggleAchievement('ach-rise-2')} />
          <AchievementItem id="ach-rise-3" title="Legends Assemble" desc="Elige la rama «Legendary Help» en el final de MyRise." isCompleted={completed['ach-rise-3']} onToggle={() => toggleAchievement('ach-rise-3')} />
          <AchievementItem id="ach-rise-4" title="Mutiny Mastermind" desc="Completa la historia con el final de «Conquer»." isCompleted={completed['ach-rise-4']} onToggle={() => toggleAchievement('ach-rise-4')} />
        </AchievementCategory>

      </div>
    </div>
  );
};

export default AchievementsGuide;