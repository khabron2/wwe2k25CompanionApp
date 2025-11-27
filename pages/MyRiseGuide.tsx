import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Trophy, Lock, Split } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadProgress, saveProgress } from '../services/supabase';

interface ChapterBlockProps {
  title: string;
  number: number;
  unlocked: boolean;
  completed: boolean;
  children?: React.ReactNode;
}

const ChapterBlock: React.FC<ChapterBlockProps> = ({ 
  title, 
  number,
  unlocked, 
  completed: isDone,
  children 
}) => (
  <div className={`relative rounded-xl overflow-hidden shadow-sm border transition-all duration-500 ${unlocked ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 opacity-100' : 'bg-gray-100 dark:bg-slate-900 border-transparent opacity-60 grayscale'}`}>
    {!unlocked && (
      <div className="absolute inset-0 z-20 bg-gray-200/50 dark:bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
         <div className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg font-bold text-sm">
           <Lock size={16} /> Bloqueado
         </div>
      </div>
    )}
    <div className="p-4 border-b border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50 flex justify-between items-center">
      <h2 className="font-black text-lg text-slate-800 dark:text-white uppercase tracking-wide">
        Capítulo {number}: <span className="text-blue-600 dark:text-blue-400">{title}</span>
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
  group?: string[];
  lockedByPath?: boolean;
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

  const toggleTask = (taskId: string, group: string[] = []) => {
    // Check if locked by exclusivity
    if (isTaskDisabled(taskId, group)) return;

    const newCompleted = { ...completed, [taskId]: !completed[taskId] };
    setCompleted(newCompleted);
    saveProgress('myrise', newCompleted);
  };

  const isTaskDisabled = (taskId: string, group: string[]) => {
    if (completed[taskId]) return false; // Can always uncheck self
    return group.some(id => completed[id]); // Disabled if another in group is checked
  };

  const isAnyCompleted = (ids: string[]) => ids.some(id => completed[id]);
  const areAllCompleted = (ids: string[]) => ids.every(id => completed[id]);

  // --- PROGRESS LOGIC ---

  // Chapter 1: Needs both missions
  const ch1Tasks = ['c1-m1', 'c1-m2'];
  const isCh1Done = areAllCompleted(ch1Tasks);

  // Chapter 2: Needs 1 of 3 paths
  const ch2Group = ['c2-m1', 'c2-m2', 'c2-m3'];
  const isCh2Done = isAnyCompleted(ch2Group);
  const isCh2Unlocked = isCh1Done;

  // Chapter 3: Needs 1 of 3 paths
  const ch3Group = ['c3-m1', 'c3-m2', 'c3-m3'];
  const isCh3Done = isAnyCompleted(ch3Group);
  const isCh3Unlocked = isCh2Unlocked && isCh2Done;

  // Chapter 4: Needs 1 Male path OR 1 Female path
  const ch4MaleGroup = ['c4-ma', 'c4-mb', 'c4-mc'];
  const ch4FemaleGroup = ['c4-fa', 'c4-fb', 'c4-fc'];
  const isCh4Done = isAnyCompleted(ch4MaleGroup) || isAnyCompleted(ch4FemaleGroup);
  const isCh4Unlocked = isCh3Unlocked && isCh3Done;

  // Chapter 5: Needs 1 mission
  const ch5Tasks = ['c5-m1'];
  const isCh5Done = areAllCompleted(ch5Tasks);
  const isCh5Unlocked = isCh4Unlocked && isCh4Done;

  // Chapter 6: Needs 1 Male Helper AND 1 Female Helper
  const ch6MaleGroup = ['c6-m1', 'c6-m2', 'c6-m3', 'c6-m4'];
  const ch6FemaleGroup = ['c6-f1', 'c6-f2', 'c6-f3', 'c6-f4'];
  const isCh6Done = isAnyCompleted(ch6MaleGroup) && isAnyCompleted(ch6FemaleGroup);
  const isCh6Unlocked = isCh5Unlocked && isCh5Done;

  // Chapter 7: Needs 1 mission
  const ch7Tasks = ['c7-m1'];
  const isCh7Done = areAllCompleted(ch7Tasks);
  const isCh7Unlocked = isCh6Unlocked && isCh6Done;

  // Chapter 8: Needs 1 mission
  const ch8Tasks = ['c8-m1'];
  const isCh8Done = areAllCompleted(ch8Tasks);
  const isCh8Unlocked = isCh7Unlocked && isCh7Done;

  // Chapter 9: Reclaim vs Conquer
  // Reclaim Logic: 1 Ally Path + Finale
  const ch9ReclaimAllyGroup = ['c9r-a', 'c9r-b', 'c9r-c'];
  const isReclaimPathActive = isAnyCompleted(ch9ReclaimAllyGroup);
  
  // Conquer Logic: 2 Linear missions
  const ch9ConquerTasks = ['c9c-m1', 'c9c-m2'];
  const isConquerPathActive = isAnyCompleted(ch9ConquerTasks);

  const isCh9Unlocked = isCh8Unlocked && isCh8Done;

  const currentChapter = () => {
    if (!isCh1Done) return 1;
    if (!isCh2Done) return 2;
    if (!isCh3Done) return 3;
    if (!isCh4Done) return 4;
    if (!isCh5Done) return 5;
    if (!isCh6Done) return 6;
    if (!isCh7Done) return 7;
    if (!isCh8Done) return 8;
    return 9;
  };

  const MissionItem: React.FC<MissionItemProps> = ({ 
    id, 
    title, 
    desc, 
    rewards, 
    group = [],
    lockedByPath = false 
  }) => {
    const isChecked = completed[id];
    const isDisabled = isTaskDisabled(id, group) || lockedByPath;

    return (
      <div className={`p-4 transition-all duration-300 ${isChecked ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''} ${isDisabled ? 'opacity-40 bg-gray-50 dark:bg-slate-950' : ''}`}>
        <div className="flex items-start gap-4">
          <button 
            onClick={() => toggleTask(id, group)}
            disabled={isDisabled}
            className={`mt-1 flex-shrink-0 transition-all ${isChecked ? 'text-blue-600 dark:text-blue-400' : isDisabled ? 'text-gray-300 dark:text-slate-800 cursor-not-allowed' : 'text-gray-300 dark:text-slate-600 hover:text-blue-400'}`}
          >
            {isChecked ? <CheckCircle2 size={24} fill="currentColor" className="text-white dark:text-slate-900" /> : <Circle size={24} />}
          </button>
          <div className="flex-1">
            <h3 className={`font-bold text-lg mb-1 ${isChecked ? 'text-slate-500 line-through decoration-2 decoration-blue-500/50' : isDisabled ? 'text-slate-400 dark:text-slate-600' : 'text-slate-900 dark:text-white'}`}>
              {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
              {desc}
            </p>
            
            {rewards && (
              <div className={`bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-900/30 transition-opacity ${isDisabled ? 'opacity-50' : ''}`}>
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://image.pollinations.ai/prompt/wwe%20wrestling%20ring%20ropes%20blue%20neon%20lights%20smoky%20arena%20background%20dark%20cinematic?width=800&height=400&nologo=true')] bg-cover bg-center" />
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center text-slate-300 hover:text-white mb-4 transition-colors">
            <ArrowLeft size={18} className="mr-1" /> Volver
          </Link>
          <h1 className="text-3xl font-black italic tracking-tighter mb-2">MyRISE</h1>
          <p className="text-slate-400 font-medium">Guía Completa Paso a Paso</p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-4 -mt-6 relative z-20">
        
        {/* Progress Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-lg border border-slate-100 dark:border-slate-800 mb-6 flex items-center justify-between">
           <div>
             <h3 className="font-bold text-slate-800 dark:text-white">Capítulo Actual</h3>
             <p className="text-xs text-slate-500">
                {currentChapter() === 9 ? 'Final del Juego' : `Estás en el Capítulo ${currentChapter()}`}
             </p>
           </div>
           <div className="flex items-end gap-1">
              <span className="text-4xl font-black text-blue-600">{currentChapter() - 1}</span>
              <span className="text-sm font-bold text-slate-400 mb-1">/ 9</span>
           </div>
        </div>

        <div className="space-y-6 pb-12">
          
          {/* Chapter 1 */}
          <ChapterBlock title="UNA NUEVA ERA" number={1} unlocked={true} completed={isCh1Done}>
             <MissionItem 
                id="c1-m1" 
                title="Noche del Draft" 
                desc="Elige la personalidad de tu primer personaje (conversación con Cathy Kelley)."
                rewards={<ul className="list-disc space-y-1"><li>Conjunto Triple H</li><li>Conjunto Nick Aldis</li></ul>}
             />
             <MissionItem 
                id="c1-m2" 
                title="Objetivo: Número Uno" 
                desc='Elige "Promoción Rival" con Adam Pearce para desbloquear Japan Dome.'
                rewards={<ul className="list-disc space-y-1"><li>Remera Mutiny (Hombre/Mujer)</li></ul>}
             />
          </ChapterBlock>

          {/* Chapter 2 */}
          <ChapterBlock title="MOTÍN" number={2} unlocked={isCh2Unlocked} completed={isCh2Done}>
             <div className="p-3 bg-blue-50 dark:bg-slate-800 text-xs text-blue-600 dark:text-blue-400 font-bold border-b border-blue-100 dark:border-slate-700 flex items-center gap-2">
               <Split size={14} /> Elige un camino (Bloquea los otros)
             </div>
             <MissionItem 
                id="c2-m1" 
                group={ch2Group}
                title="Historia A: Llegada del Rival" 
                desc='Elegir "Promoción Rival" como trasfondo.'
                rewards={<ul className="list-disc"><li>Arena Japan Dome</li></ul>}
             />
             <MissionItem 
                id="c2-m2"
                group={ch2Group}
                title="Historia B: Cómplice Independiente" 
                desc='Elegir "Indies" como trasfondo.'
                rewards={<span className="italic opacity-70">Sin recompensas extra</span>}
             />
             <MissionItem 
                id="c2-m3"
                group={ch2Group}
                title="Historia C: Asistencia MMA" 
                desc='Elegir "MMA" como trasfondo.'
                rewards={<span className="italic opacity-70">Sin recompensas extra</span>}
             />
          </ChapterBlock>

          {/* Chapter 3 */}
          <ChapterBlock title="UNIR" number={3} unlocked={isCh3Unlocked} completed={isCh3Done}>
             <div className="p-3 bg-blue-50 dark:bg-slate-800 text-xs text-blue-600 dark:text-blue-400 font-bold border-b border-blue-100 dark:border-slate-700 flex items-center gap-2">
               <Split size={14} /> Elige personalidad de 2do personaje
             </div>
             <MissionItem 
                id="c3-m1"
                group={ch3Group}
                title="Historia A: NX-Secuestrados" 
                desc='Personalidad: Atrevido y Descarado.'
                rewards={<ul className="list-disc"><li>Arena NXT Mutiny</li><li>Títulos NXT Unity</li><li>Mánager Secuestrado</li></ul>}
             />
             <MissionItem 
                id="c3-m2"
                group={ch3Group}
                title="Historia B: Unificar y Unirse" 
                desc='Personalidad: Cómico y Divertido.'
                rewards={<ul className="list-disc"><li>Arena NXT Mutiny</li><li>Títulos NXT Unity</li><li>Títulos Unificados</li></ul>}
             />
             <MissionItem 
                id="c3-m3"
                group={ch3Group}
                title="Historia C: Haz el Truco" 
                desc='Personalidad: Calculador y Estratégico.'
                rewards={<ul className="list-disc"><li>Arena NXT Mutiny</li><li>Títulos NXT Unity</li></ul>}
             />
          </ChapterBlock>

          {/* Chapter 4 */}
          <ChapterBlock title="INVESTIGAR" number={4} unlocked={isCh4Unlocked} completed={isCh4Done}>
             <div className="bg-slate-100 dark:bg-slate-800 p-2 text-xs font-black uppercase text-slate-500 text-center">Historias Masculinas (Elige 1)</div>
             {ch4MaleGroup.map((id, idx) => (
               <MissionItem
                 key={id}
                 id={id}
                 group={[...ch4MaleGroup, ...ch4FemaleGroup]} 
                 title={["A: Rompiendo la Competencia", "B: Payaseando", "C: Candidato de Terceros"][idx]}
                 desc={["Personalidad: Atrevido", "Personalidad: Cómico", "Personalidad: Calculador"][idx]}
                 rewards={idx === 1 ? "Armas de Payaso (Bocina, Zapato, Martillo...)" : idx === 2 ? "Arena WCW nWo + Remera" : "Campeonato NXT Mutiny (Roto)"}
               />
             ))}
             
             <div className="bg-slate-100 dark:bg-slate-800 p-2 text-xs font-black uppercase text-slate-500 text-center border-t border-slate-200 dark:border-slate-700">Historias Femeninas (Elige 1)</div>
             {ch4FemaleGroup.map((id, idx) => (
               <MissionItem
                 key={id}
                 id={id}
                 group={[...ch4MaleGroup, ...ch4FemaleGroup]}
                 title={["A: El Trabajo en el Archivo", "B: La Trinidad Profana", "C: Falsa Bandera"][idx]}
                 desc={["Personalidad: Atrevida", "Personalidad: Cómica", "Personalidad: Calculadora"][idx]}
                 rewards={idx === 0 ? "Chosen, Arena Estatal" : idx === 1 ? "Conjuntos de Bruja" : "Máscaras Mutiny"}
               />
             ))}
          </ChapterBlock>

          {/* Chapter 5 */}
          <ChapterBlock title="DEFENDER" number={5} unlocked={isCh5Unlocked} completed={isCh5Done}>
            <MissionItem 
                id="c5-m1"
                title="¿Estás listo?" 
                desc="Se desbloquea con cualquier personalidad."
                rewards={<ul className="list-disc"><li>Arena NXT No Mercy Mutiny</li><li>Atuendo CM Punk Mutiny</li></ul>}
             />
          </ChapterBlock>

          {/* Chapter 6 */}
          <ChapterBlock title="REUNIR" number={6} unlocked={isCh6Unlocked} completed={isCh6Done}>
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-xs text-amber-700 dark:text-amber-400 font-bold border-b border-amber-100 dark:border-amber-900/30">
               ⚠️ Elige 1 Hombre Y 1 Mujer
             </div>
             
             <div className="bg-slate-100 dark:bg-slate-800 p-2 text-xs font-black uppercase text-slate-500 text-center">Ayuda Masculina (Elige 1)</div>
             <MissionItem id="c6-m1" group={ch6MaleGroup} title="Drew McIntyre" desc="Army of Punkness" rewards="Sin extra" />
             <MissionItem id="c6-m2" group={ch6MaleGroup} title="Jey Uso" desc="Blood Money" rewards="Sin extra" />
             <MissionItem id="c6-m3" group={ch6MaleGroup} title="Seth Rollins" desc="Shielded From Mutiny" rewards="Ropa The Shield, Seth Casual" />
             <MissionItem id="c6-m4" group={ch6MaleGroup} title="Cody Rhodes (2da Partida)" desc="Temporal Legacy" rewards="Arenas WM31, RAW 2011, Stardust..." />

             <div className="bg-slate-100 dark:bg-slate-800 p-2 text-xs font-black uppercase text-slate-500 text-center border-t border-slate-200 dark:border-slate-700">Ayuda Femenina (Elige 1)</div>
             <MissionItem id="c6-f1" group={ch6FemaleGroup} title="Becky Lynch" desc="Mending Fences" rewards="Ropa Asuka Mutiny, Bayley '15" />
             <MissionItem id="c6-f2" group={ch6FemaleGroup} title="Jade Cargill" desc="The Recruit" rewards="Jade Casual" />
             <MissionItem id="c6-f3" group={ch6FemaleGroup} title="Charlotte Flair" desc="Influence The Influencer" rewards="Ropa Charlotte '14/'17/'19" />
             <MissionItem id="c6-f4" group={ch6FemaleGroup} title="Rhea Ripley (2da Partida)" desc="Mami’s On Top Again" rewards="Rhea '17/'20" />
          </ChapterBlock>

          {/* Chapter 7 */}
          <ChapterBlock title="ATACAR" number={7} unlocked={isCh7Unlocked} completed={isCh7Done}>
             <MissionItem 
                id="c7-m1"
                title="Alianza en Marcha" 
                desc="Cualquier personalidad."
                rewards={<span className="italic opacity-70">Sin recompensas extra</span>}
             />
          </ChapterBlock>

          {/* Chapter 8 */}
          <ChapterBlock title="SOBREVIVIR" number={8} unlocked={isCh8Unlocked} completed={isCh8Done}>
             <MissionItem 
                id="c8-m1"
                title="Supervivencia del Más Apto" 
                desc="Completa Survivor Series."
                rewards={<ul className="list-disc"><li>Arena Survivor Series MyRISE</li></ul>}
             />
          </ChapterBlock>

          {/* Chapter 9 */}
          <ChapterBlock title="FINAL (DECISIÓN)" number={9} unlocked={isCh9Unlocked} completed={isReclaimPathActive || isConquerPathActive}>
            <div className="p-4 bg-slate-900 text-white text-center">
               <Split className="mx-auto mb-2 text-blue-400" />
               <h3 className="font-bold text-lg uppercase mb-2">Elige tu Destino</h3>
               <p className="text-xs text-slate-400 mb-4">Esta decisión bloqueará permanentemente el otro camino en esta partida.</p>
            </div>

            {/* Reclaim Path */}
            <div className={`border-b-4 border-blue-500 ${isConquerPathActive ? 'opacity-30 pointer-events-none grayscale' : ''}`}>
               <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-black text-center uppercase tracking-widest text-xs">
                 Camino: Recuperar (1er Personaje)
               </div>
               <div className="p-2 text-xs text-center text-slate-500 bg-gray-50 dark:bg-slate-800">Elige un aliado (Bloquea otros)</div>
               <MissionItem id="c9r-a" group={ch9ReclaimAllyGroup} title="A: Leyendas" desc="Scott Steiner, Alundra Blayze..." rewards="Personajes Leyenda, Arena Convention" lockedByPath={isConquerPathActive} />
               <MissionItem id="c9r-b" group={ch9ReclaimAllyGroup} title="B: Indies" desc="Josie Jane, Paragon Jay Pierce" rewards="Personajes Indie, Arena TBD" lockedByPath={isConquerPathActive} />
               <MissionItem id="c9r-c" group={ch9ReclaimAllyGroup} title="C: Pasado 2K" desc="Buzz, Red, Tre..." rewards="MyPlayers Anteriores, Estudio MoCap" lockedByPath={isConquerPathActive} />
               
               {isReclaimPathActive && (
                  <MissionItem id="c9r-final" title="WrestleMania Revenge" desc="Misión Final de Recuperar" rewards="Arena WM MyRISE 2K25" />
               )}
            </div>

            {/* Conquer Path */}
            <div className={`border-t-4 border-red-500 ${isReclaimPathActive ? 'opacity-30 pointer-events-none grayscale' : ''}`}>
               <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 font-black text-center uppercase tracking-widest text-xs">
                 Camino: Conquistar (2do Personaje)
               </div>
               <MissionItem id="c9c-m1" group={ch9ConquerTasks} title="Bienvenido al Motín" desc="Continuar con 2do personaje" rewards="Arenas Mutiny" lockedByPath={isReclaimPathActive} />
               <MissionItem id="c9c-m2" group={ch9ConquerTasks} title="MutinyMania" desc="Misión Final de Conquistar" rewards="Arena MutinyMania, Ropa KO/Bayley" lockedByPath={isReclaimPathActive} />
            </div>

          </ChapterBlock>

        </div>
      </div>
    </div>
  );
};

export default MyRiseGuide;