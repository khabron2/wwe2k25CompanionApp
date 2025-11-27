import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Trophy, Lock, Split, Users, Crown, Star, UserPlus, Swords } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadProgress, saveProgress } from '../services/supabase';

interface ChapterBlockProps {
  title: string;
  number: number;
  unlocked: boolean;
  completed: boolean;
  colorClass: string;
  children?: React.ReactNode;
}

const ChapterBlock: React.FC<ChapterBlockProps> = ({ 
  title, 
  number,
  unlocked, 
  completed: isDone,
  colorClass,
  children 
}) => (
  <div className={`relative rounded-xl overflow-hidden shadow-sm border transition-all duration-500 ${unlocked ? `bg-white dark:bg-slate-900 ${colorClass} opacity-100` : 'bg-gray-100 dark:bg-slate-900 border-transparent opacity-60 grayscale'}`}>
    {!unlocked && (
      <div className="absolute inset-0 z-20 bg-gray-200/50 dark:bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
         <div className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg font-bold text-sm">
           <Lock size={16} /> Bloqueado
         </div>
      </div>
    )}
    <div className={`p-4 border-b ${unlocked ? colorClass : 'border-transparent'} bg-gradient-to-r from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 flex justify-between items-center`}>
      <h2 className="font-black text-lg text-slate-800 dark:text-white uppercase tracking-wide">
        Capítulo {number}: <span className={unlocked ? 'text-slate-900 dark:text-white' : 'text-slate-500'}>{title}</span>
      </h2>
      {isDone ? (
         <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
           <CheckCircle2 size={12} /> Completo
         </span>
      ) : unlocked ? (
         <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded dark:bg-blue-900/30 dark:text-blue-400">
           En Progreso
         </span>
      ) : null}
    </div>
    <div className="divide-y divide-gray-100 dark:divide-slate-800">
      {children}
    </div>
  </div>
);

interface MissionItemProps {
  id: string;
  title: string;
  desc: string;
  rewards?: React.ReactNode;
  tags?: React.ReactNode;
}

const MyRiseGuide: React.FC = () => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const load = async () => {
      const data = await loadProgress('myrise');
      if (data) setCompleted(data);
    };
    load();
  }, []);

  const toggleTask = (taskId: string) => {
    const newCompleted = { ...completed, [taskId]: !completed[taskId] };
    setCompleted(newCompleted);
    saveProgress('myrise', newCompleted);
  };

  const areAllCompleted = (ids: string[]) => ids.every(id => completed[id]);

  // --- PROGRESS LOGIC: MUTINY ---
  const c1 = ['mr-c1-1'];
  const c2 = ['mr-c2-1'];
  const c3 = ['mr-c3-1'];
  const c4 = ['mr-c4-m-1', 'mr-c4-f-1']; 
  const c5 = ['mr-c5-1'];
  const c6 = ['mr-c6-1'];
  const c7 = ['mr-c7-1'];
  const c8 = ['mr-c8-1'];
  const c9 = ['mr-c9-reclaim', 'mr-c9-conquer'];

  const isUnlocked = (prevChapterIds: string[]) => prevChapterIds.some(id => completed[id]);

  const MissionItem: React.FC<MissionItemProps> = ({ 
    id, 
    title, 
    desc, 
    rewards,
    tags
  }) => {
    const isChecked = completed[id];

    return (
      <div className={`p-4 transition-all duration-300 ${isChecked ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
        <div className="flex items-start gap-4">
          <button 
            onClick={() => toggleTask(id)}
            className={`mt-1 flex-shrink-0 transition-all ${isChecked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-300 dark:text-slate-600 hover:text-blue-400'}`}
          >
            {isChecked ? <CheckCircle2 size={24} fill="currentColor" className="text-white dark:text-slate-900" /> : <Circle size={24} />}
          </button>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-1 items-center">
                <h3 className={`font-bold text-lg ${isChecked ? 'text-slate-500 line-through decoration-2 decoration-blue-500/50' : 'text-slate-900 dark:text-white'}`}>
                {title}
                </h3>
                {tags}
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
              {desc}
            </p>
            
            {rewards && (
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-900/30">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase mb-2">
                  <Trophy size={14} /> Recompensas
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

  const Tag = ({ text, color = 'blue' }: { text: string, color?: string }) => (
    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-${color}-100 text-${color}-700 dark:bg-${color}-900/40 dark:text-${color}-300 border border-${color}-200 dark:border-${color}-800`}>
        {text}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://image.pollinations.ai/prompt/wrestling%20ring%20mutiny%20rebellion%20crowd%20signs%20dark%20atmosphere?width=800&height=400&nologo=true')] bg-cover bg-center" />
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center text-slate-300 hover:text-white mb-4 transition-colors">
            <ArrowLeft size={18} className="mr-1" /> Volver
          </Link>
          <h1 className="text-3xl font-black italic tracking-tighter mb-2">MyRISE: MUTINY</h1>
          <p className="text-slate-400 font-medium max-w-lg">Guía de desbloqueables por capítulo. Descubre cómo conseguir todas las arenas, atuendos y personajes ocultos.</p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-4 -mt-6 relative z-20 space-y-6">
        
        {/* Intro Info */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-4 items-start">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                <Users size={24} />
            </div>
            <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Historia Dual</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Esta historia requiere dos personajes creados (Hombre y Mujer). Las recompensas varían drásticamente según el <strong>Trasfondo</strong> (Background) y la <strong>Personalidad</strong> que elijas para ellos.
                </p>
            </div>
        </div>

        <ChapterBlock title="PARTNERS" number={1} unlocked={true} completed={areAllCompleted(c1)} colorClass="border-slate-200 dark:border-slate-700">
            <MissionItem 
                id="mr-c1-1" 
                title="Elección de Personalidades" 
                desc="Completa el capítulo inicial. Las recompensas dependen de las elecciones de diálogo." 
                rewards={<ul className="list-disc space-y-1"><li>Traje Triple H</li><li>Traje Nick Aldis</li></ul>}
            />
        </ChapterBlock>

        <ChapterBlock title="MUTINY" number={2} unlocked={isUnlocked(c1)} completed={areAllCompleted(c2)} colorClass="border-red-200 dark:border-red-900">
            <MissionItem 
                id="mr-c2-1" 
                title="El Pasado del Compañero" 
                desc="Este desbloqueable depende exclusivamente del trasfondo (Background) que elegiste para tu 2do personaje." 
                rewards={
                    <div className="mt-1 space-y-1">
                        <div className="flex justify-between border-b border-amber-200/50 pb-1"><span>Si es "Rival Promotion"</span> <span className="font-bold">Arena Japan Dome</span></div>
                        <div className="flex justify-between text-slate-400"><span>Si es Indies/MMA</span> <span>Sin Recompensa</span></div>
                    </div>
                }
            />
        </ChapterBlock>

        <ChapterBlock title="UNITE" number={3} unlocked={isUnlocked(c2)} completed={areAllCompleted(c3)} colorClass="border-amber-200 dark:border-amber-900">
            <MissionItem 
                id="mr-c3-1" 
                title="Unificación de Marcas" 
                desc="Todos los jugadores obtienen las recompensas base. Los extras dependen de la personalidad del Personaje 2." 
                rewards={
                    <ul className="list-disc space-y-1">
                        <li><strong>Base:</strong> Arena NXT Mutiny, Títulos Pareja NXT Unity, Movimiento Doble "Whirlwind Splash"</li>
                        <li><strong>Bold & Brash:</strong> Entrada "Kidnapped Manager"</li>
                        <li><strong>Comedic & Fun:</strong> Unify Tag Titles (Cosmético)</li>
                    </ul>
                }
            />
        </ChapterBlock>

        <ChapterBlock title="INVESTIGATE" number={4} unlocked={isUnlocked(c3)} completed={areAllCompleted(c4)} colorClass="border-blue-200 dark:border-blue-900">
            <div className="px-4 pb-2 text-xs font-bold text-slate-500 uppercase">Rutas Específicas por Género</div>
            
            <MissionItem 
                id="mr-c4-m-1" 
                title="Ruta Masculina" 
                tags={<Tag text="Hombre" color="blue" />}
                desc="Recompensas basadas en la personalidad de tu luchador masculino." 
                rewards={
                    <ul className="list-disc space-y-1">
                        <li><strong>Bold:</strong> NXT Mutiny Championship (+ versión destruida)</li>
                        <li><strong>Comedic:</strong> Pack de Armas de Payaso (6 armas nuevas)</li>
                        <li><strong>Calculated:</strong> Arena WCW nWo Souled Out 1997, Camiseta nWo (Mujer)</li>
                    </ul>
                }
            />
            <MissionItem 
                id="mr-c4-f-1" 
                title="Ruta Femenina" 
                tags={<Tag text="Mujer" color="pink" />}
                desc="Recompensas basadas en la personalidad de tu luchadora femenina." 
                rewards={
                    <ul className="list-disc space-y-1">
                        <li><strong>Bold:</strong> Personaje "Chosen", Arena Estatal, Japan Hall, Entrada Monster Truck</li>
                        <li><strong>Comedic:</strong> Pack de Bruja (3 prendas + chaqueta)</li>
                        <li><strong>Calculated:</strong> Máscaras Mutiny (Hombre y Mujer)</li>
                    </ul>
                }
            />
        </ChapterBlock>

        <ChapterBlock title="DEFEND" number={5} unlocked={isUnlocked(c4)} completed={areAllCompleted(c5)} colorClass="border-emerald-200 dark:border-emerald-900">
            <MissionItem 
                id="mr-c5-1" 
                title="Defensa del Territorio" 
                desc="Completa el capítulo para obtener recompensas universales." 
                rewards={<ul className="list-disc space-y-1"><li>Arena NXT No Mercy Mutiny</li><li>Atuendo CM Punk Mutiny Alt.</li></ul>}
            />
        </ChapterBlock>

        <ChapterBlock title="RALLY" number={6} unlocked={isUnlocked(c5)} completed={areAllCompleted(c6)} colorClass="border-indigo-200 dark:border-indigo-900">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 mx-4 mb-2 rounded border border-indigo-100 dark:border-indigo-800 text-xs text-indigo-800 dark:text-indigo-300">
               <strong className="block mb-1">Elección de Aliados:</strong>
               Debes elegir 1 Hombre y 1 Mujer para ayudarte. Solo obtendrás las recompensas de los que elijas.
            </div>

            <MissionItem 
                id="mr-c6-1" 
                title="Reclutamiento" 
                desc="Lista de recompensas por aliado elegido." 
                rewards={
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                            <strong className="text-slate-900 dark:text-white block mb-1 border-b border-slate-200 dark:border-slate-700">Aliados Hombres</strong>
                            <ul className="list-disc space-y-1 pl-1">
                                <li><span className="font-semibold">Seth Rollins:</span> Ropa The Shield, Pack Casual</li>
                                <li><span className="font-semibold">Cody Rhodes (2da Partida):</span> "Undashing" Cody, Stardust, Cena '12, Orton '15, Arenas RAW '11 & WM31, R-Truth '11 Alt.</li>
                                <li className="text-slate-400">Drew McIntyre / Jey Uso: Sin recompensas</li>
                            </ul>
                        </div>
                        <div>
                            <strong className="text-slate-900 dark:text-white block mb-1 border-b border-slate-200 dark:border-slate-700">Aliadas Mujeres</strong>
                            <ul className="list-disc space-y-1 pl-1">
                                <li><span className="font-semibold">Becky Lynch:</span> Asuka Alt, Bayley '15 Pack, Entrada Irish Dance, Pack Casual</li>
                                <li><span className="font-semibold">Charlotte Flair:</span> Flair '14/'17/'19 Packs, Natalya '14</li>
                                <li><span className="font-semibold">Rhea Ripley (2da Partida):</span> Rhea '17 y Rhea '20</li>
                                <li><span className="font-semibold">Jade Cargill:</span> Pack Casual</li>
                            </ul>
                        </div>
                    </div>
                }
            />
        </ChapterBlock>

        <ChapterBlock title="ATTACK" number={7} unlocked={isUnlocked(c6)} completed={areAllCompleted(c7)} colorClass="border-slate-200 dark:border-slate-700">
            <MissionItem 
                id="mr-c7-1" 
                title="La Ofensiva" 
                desc="Un capítulo centrado en la historia sin desbloqueables significativos." 
                rewards="Progreso de Historia"
            />
        </ChapterBlock>

        <ChapterBlock title="SURVIVE" number={8} unlocked={isUnlocked(c7)} completed={areAllCompleted(c8)} colorClass="border-yellow-200 dark:border-yellow-900">
            <MissionItem 
                id="mr-c8-1" 
                title="Survivor Series" 
                desc="El evento principal antes de la bifurcación final." 
                rewards="Arena Survivor Series MyRISE"
            />
            <div className="px-4 pt-2">
               <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white mb-2">
                  <Split size={16} /> EL FINAL: Elige tu Camino
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700 text-center">
                     <div className="text-xs text-slate-500 uppercase font-bold">Continuar con Personaje 1</div>
                     <div className="font-black text-blue-600 dark:text-blue-400">RECLAIM</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700 text-center">
                     <div className="text-xs text-slate-500 uppercase font-bold">Continuar con Personaje 2</div>
                     <div className="font-black text-red-600 dark:text-red-400">CONQUER</div>
                  </div>
               </div>
            </div>
        </ChapterBlock>

        {/* Chapter 9: FINAL */}
        <ChapterBlock title="THE FINAL" number={9} unlocked={isUnlocked(c8)} completed={areAllCompleted(c9)} colorClass="border-purple-200 dark:border-purple-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 pt-0">
                {/* RECLAIM PATH */}
                <div className={`rounded-xl p-4 border ${completed['mr-c9-reclaim'] ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-black text-blue-800 dark:text-blue-300">RUTA: RECLAIM (P1)</h3>
                        <button onClick={() => toggleTask('mr-c9-reclaim')} className={completed['mr-c9-reclaim'] ? 'text-blue-600' : 'text-slate-300 hover:text-blue-500'}>
                            {completed['mr-c9-reclaim'] ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                        </button>
                    </div>
                    <div className="space-y-2 text-xs">
                        <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                            <strong className="block text-slate-500 uppercase text-[10px]">Opción: Leyendas</strong>
                            Scott Steiner '03, Alundra Blayze, DDP, Arena Wrestling Convention
                        </div>
                        <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                            <strong className="block text-slate-500 uppercase text-[10px]">Opción: Indies</strong>
                            Arena TBD, Josie Jane, Paragon Jay Pierce
                        </div>
                        <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                            <strong className="block text-slate-500 uppercase text-[10px]">Opción: MyPlayers</strong>
                            Motion Capture Studio, Buzz (2K19), Red & Tre (2K20), LJ (2K23), Captain (2K24)
                        </div>
                        <div className="mt-1 font-bold text-blue-600 dark:text-blue-400">+ Arena WM MyRISE 2K25</div>
                    </div>
                </div>

                {/* CONQUER PATH */}
                <div className={`rounded-xl p-4 border ${completed['mr-c9-conquer'] ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-black text-red-800 dark:text-red-300">RUTA: CONQUER (P2)</h3>
                        <button onClick={() => toggleTask('mr-c9-conquer')} className={completed['mr-c9-conquer'] ? 'text-red-600' : 'text-slate-300 hover:text-red-500'}>
                            {completed['mr-c9-conquer'] ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                        </button>
                    </div>
                    <div className="space-y-2 text-xs">
                        <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                            <strong className="block text-slate-500 uppercase text-[10px]">Opción: Welcome to Mutiny</strong>
                            Arena RAW Mutiny, Arena SmackDown Mutiny
                        </div>
                        <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                            <strong className="block text-slate-500 uppercase text-[10px]">Opción: MutinyMania</strong>
                            Arena MutinyMania, Entrada "Throne Smash", Kevin Owens Mutiny, Bayley Mutiny
                        </div>
                    </div>
                </div>
            </div>
        </ChapterBlock>

      </div>
    </div>
  );
};

export default MyRiseGuide;