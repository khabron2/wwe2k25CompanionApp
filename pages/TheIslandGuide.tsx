import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Trophy, Lock, Skull, Map, ShieldAlert, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadProgress, saveProgress } from '../services/supabase';

interface ChapterBlockProps {
  title: string;
  chapter: number;
  unlocked: boolean;
  completed: boolean;
  children?: React.ReactNode;
}

const ChapterBlock: React.FC<ChapterBlockProps> = ({ 
  title, 
  chapter,
  unlocked, 
  completed: isDone,
  children 
}) => (
  <div className={`relative rounded-xl overflow-hidden shadow-sm border transition-all duration-500 ${unlocked ? 'bg-white dark:bg-slate-900 border-amber-100 dark:border-amber-900/30 opacity-100' : 'bg-gray-100 dark:bg-slate-900 border-transparent opacity-60 grayscale'}`}>
    {!unlocked && (
      <div className="absolute inset-0 z-20 bg-gray-200/50 dark:bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
         <div className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg font-bold text-sm">
           <Lock size={16} /> Capítulo Bloqueado
         </div>
      </div>
    )}
    <div className="p-4 border-b border-amber-100 dark:border-amber-900/30 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10 flex justify-between items-center">
      <h2 className="font-black text-lg text-slate-800 dark:text-white uppercase tracking-wide flex items-center gap-2">
        Capítulo {chapter}: <span className="text-amber-600 dark:text-amber-500">{title}</span>
      </h2>
      {isDone ? (
         <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
           <CheckCircle2 size={12} /> Completado
         </span>
      ) : unlocked ? (
         <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded dark:bg-amber-900/30 dark:text-amber-400">
           En Progreso
         </span>
      ) : null}
    </div>
    <div className="divide-y divide-gray-100 dark:divide-slate-800">
      {children}
    </div>
  </div>
);

interface QuestItemProps {
  id: string;
  title: string;
  desc: string;
  rewards?: React.ReactNode;
}

const TheIslandGuide: React.FC = () => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const load = async () => {
      const data = await loadProgress('the_island');
      if (data) setCompleted(data);
    };
    load();
  }, []);

  const toggleTask = (taskId: string) => {
    const newCompleted = { ...completed, [taskId]: !completed[taskId] };
    setCompleted(newCompleted);
    saveProgress('the_island', newCompleted);
  };

  const areAllCompleted = (ids: string[]) => ids.every(id => completed[id]);

  // --- PROGRESS LOGIC ---
  
  // Chapter 1
  const c1Tasks = ['isl-c1-1', 'isl-c1-2', 'isl-c1-3', 'isl-c1-4', 'isl-c1-5', 'isl-c1-6', 'isl-c1-7', 'isl-c1-8', 'isl-c1-9', 'isl-c1-10', 'isl-c1-11', 'isl-c1-12'];
  const isC1Done = areAllCompleted(c1Tasks);

  // Chapter 2
  const c2Tasks = ['isl-c2-1', 'isl-c2-2', 'isl-c2-3', 'isl-c2-4', 'isl-c2-5', 'isl-c2-6'];
  const isC2Done = areAllCompleted(c2Tasks);
  const isC2Unlocked = isC1Done;

  // Chapter 3
  const c3Tasks = ['isl-c3-1', 'isl-c3-2', 'isl-c3-3', 'isl-c3-4', 'isl-c3-5', 'isl-c3-6'];
  const isC3Done = areAllCompleted(c3Tasks);
  const isC3Unlocked = isC2Done;

  // Chapter 4
  const c4Tasks = ['isl-c4-1', 'isl-c4-2', 'isl-c4-3', 'isl-c4-4', 'isl-c4-5', 'isl-c4-6'];
  const isC4Done = areAllCompleted(c4Tasks);
  const isC4Unlocked = isC3Done;

  // Chapter 5
  const c5Tasks = ['isl-c5-1', 'isl-c5-2', 'isl-c5-3', 'isl-c5-4'];
  const isC5Done = areAllCompleted(c5Tasks);
  const isC5Unlocked = isC4Done;


  const QuestItem: React.FC<QuestItemProps> = ({ 
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
            <h3 className={`font-bold text-sm md:text-base mb-1 ${isChecked ? 'text-slate-500 line-through decoration-2 decoration-amber-500/50' : 'text-slate-900 dark:text-white'}`}>
              {title}
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
              {desc}
            </p>
            
            {rewards && (
              <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700 inline-block">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase mb-1">
                  <Star size={10} className="text-yellow-500" fill="currentColor" /> Recompensas
                </div>
                <div className="text-[10px] md:text-xs text-slate-700 dark:text-slate-300 font-medium">
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
          <p className="text-slate-300 font-medium max-w-md">Guía completa de misiones PvE. Historia de Roman Reigns, secretos y desbloqueables.</p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-4 -mt-6 relative z-20">
        
        {/* Intro Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-800 mb-6">
           <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                 <BookOpen size={24} />
              </div>
              <div>
                 <h3 className="font-bold text-slate-800 dark:text-white mb-1">Misiones Principales</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Sigue esta lista para desbloquear todos los personajes, armas y arenas. Completar los 5 capítulos al 100% otorga la recompensa final definitiva.
                 </p>
              </div>
           </div>
        </div>

        <div className="space-y-6 pb-12">
          
          {/* Chapter 1 */}
          <ChapterBlock title="Introducción a la Isla" chapter={1} unlocked={true} completed={isC1Done}>
             <QuestItem id="isl-c1-1" title="R-Tutor" desc="Paul Heyman y R-Truth te enseñan las mecánicas y el uso de MyBooth." />
             <QuestItem id="isl-c1-2" title="Welcome to My Island" desc="Combates 1v1, Battle Royal y 6-Man Tag." rewards="Roman Reigns anuncia torneo." />
             <QuestItem id="isl-c1-3" title="A Real Life Video Game!" desc="Xavier Woods te recluta para construir una armadura." rewards="Armadura de Videojuego." />
             <QuestItem id="isl-c1-4" title="OVRcoming the Odds" desc="Derrota secuaces blindados y enfréntate a Zero en Casket Match." />
             <QuestItem id="isl-c1-5" title="An Authentic WWE Broken Vase" desc="Recupera el jarrón robado por Austin Theory en el cementerio." />
             <QuestItem id="isl-c1-6" title="Interdimensional Scotch Tape" desc="Ayuda al fantasma de Paul Bearer a restaurar la Urna. Hell in a Cell vs Undertaker." />
             <QuestItem id="isl-c1-7" title="Keys to the Kingdom" desc="Ladder Match contra Judgment Day por las llaves de Hero HQ." />
             <QuestItem id="isl-c1-8" title="The Queen's Favor" desc="Detén a Alba Fyre e Isla Dawn para ayudar a Charlotte." />
             <QuestItem id="isl-c1-9" title="Who is La Paradoja" desc="Usa la máscara 'La Paradoja' y viaja en el tiempo con LWO." />
             <QuestItem id="isl-c1-10" title="What's In The Past" desc="Viaja al pasado con Jodie Garcia." />
             <QuestItem id="isl-c1-11" title="Take Me For A Ride" desc="Busca la montaña rusa de R-Truth." />
             <QuestItem id="isl-c1-12" title="Prove Yourself" desc="Torneo de 6-Man Tag para impresionar a Roman." />
          </ChapterBlock>

          {/* Chapter 2 */}
          <ChapterBlock title="Lealtades" chapter={2} unlocked={isC2Unlocked} completed={isC2Done}>
             <QuestItem id="isl-c2-1" title="Who Do You Serve?" desc="Elige a quién servir en la isla." />
             <QuestItem id="isl-c2-2" title="The Hammer of Hammers" desc="Misión principal de combate." rewards="Mazo de Triple H." />
             <QuestItem id="isl-c2-3" title="Trash TV" desc="Completa Hammer of Hammers." rewards="Manager: Fantasma de Paul Bearer." />
             <QuestItem id="isl-c2-4" title="Big Time Deal" desc="Derrota al jefe de zona." rewards="Personaje: Zero." />
             <QuestItem id="isl-c2-5" title="Mascot Prime" desc="Misión secundaria tras Big Time Deal." rewards="Prime Bottle Mascot." />
             <QuestItem id="isl-c2-6" title="Misiones de Exploración" desc="Ulterior Motives, Pinned By Fear, ARRR-Truth!, Test Your Limits." />
          </ChapterBlock>

          {/* Chapter 3 */}
          <ChapterBlock title="Expansión" chapter={3} unlocked={isC3Unlocked} completed={isC3Done}>
             <QuestItem id="isl-c3-1" title="The Heyman Touch" desc="Inicio del capítulo 3." />
             <QuestItem id="isl-c3-2" title="Fight Like A Gamer!" desc="Combate estilo arcade." rewards="Espada del Futuro." />
             <QuestItem id="isl-c3-3" title="We're Really Glad That You're Our Friend" desc="Misión Firefly Fun House." rewards="Lilly, Nikki Cross '20, Alexa Bliss FFH." />
             <QuestItem id="isl-c3-4" title="The Theory of Tranquility" desc="Derrota a la facción de Theory." rewards="Cody Rhod35-BOT." />
             <QuestItem id="isl-c3-5" title="Poisoning the Well" desc="Enfréntate a los Dudleyz." rewards="Partes CAS Dudley Boyz." />
             <QuestItem id="isl-c3-6" title="What's Left Behind" desc="Wyatt Sicks Expansion." rewards="Partes CAS Disfraz de Lilly." />
          </ChapterBlock>

          {/* Chapter 4 */}
          <ChapterBlock title="La Verdad" chapter={4} unlocked={isC4Unlocked} completed={isC4Done}>
             <QuestItem id="isl-c4-1" title="The Truth is Out There" desc="Investiga los secretos finales." />
             <QuestItem id="isl-c4-2" title="Building An Empire" desc="Ayuda a construir el nuevo reino." rewards="King Corbin, Roman Reigns '19." />
             <QuestItem id="isl-c4-3" title="Everyone Loves a Wrestling Wedding" desc="Drama nupcial en el ring." />
             <QuestItem id="isl-c4-4" title="Hell in the High Desert" desc="Misiones de exploración avanzada." />
             <QuestItem id="isl-c4-5" title="The WWE Superstar Tournament" desc="Gana el torneo final del capítulo." />
             <QuestItem id="isl-c4-6" title="Historia Principal" desc="One Last Hurrah!, Brutality Born, Grit and Authority." />
          </ChapterBlock>

           {/* Chapter 5 */}
           <ChapterBlock title="El Desafío Final" chapter={5} unlocked={isC5Unlocked} completed={isC5Done}>
             <QuestItem 
                id="isl-c5-1" 
                title="The Final Confrontation" 
                desc="Enfrentamiento épico contra todos los antagonistas." 
                rewards="Arena Final, Nuevas Entradas."
             />
             <QuestItem 
                id="isl-c5-2" 
                title="Rescue the Tribe" 
                desc="Libera a los aliados capturados." 
                rewards="Atuendos exclusivos para compañeros."
             />
             <QuestItem 
                id="isl-c5-3" 
                title="Secrets of The Island" 
                desc="Explora zonas ocultas y vence a mini-jefes leyenda." 
                rewards="Personajes exclusivos, Cosméticos raros."
             />
             <QuestItem 
                id="isl-c5-4" 
                title="ULTIMATE CHALLENGE" 
                desc="6-Man Tag Team Match final." 
                rewards={<ul className="list-disc ml-1"><li>Personaje Legendario</li><li>Atuendos Raros</li><li>Managers Históricos</li><li>Todas las Arenas (100%)</li></ul>}
             />
          </ChapterBlock>

        </div>
      </div>
    </div>
  );
};

export default TheIslandGuide;