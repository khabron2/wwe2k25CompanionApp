import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Trophy, Lock, Briefcase, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadProgress, saveProgress } from '../services/supabase';

interface PhaseBlockProps {
  title: string;
  number: number;
  unlocked: boolean;
  completed: boolean;
  children?: React.ReactNode;
}

const PhaseBlock: React.FC<PhaseBlockProps> = ({ 
  title, 
  number,
  unlocked, 
  completed: isDone,
  children 
}) => (
  <div className={`relative rounded-xl overflow-hidden shadow-sm border transition-all duration-500 ${unlocked ? 'bg-white dark:bg-slate-900 border-emerald-100 dark:border-emerald-900/30 opacity-100' : 'bg-gray-100 dark:bg-slate-900 border-transparent opacity-60 grayscale'}`}>
    {!unlocked && (
      <div className="absolute inset-0 z-20 bg-gray-200/50 dark:bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
         <div className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg font-bold text-sm">
           <Lock size={16} /> Fase Bloqueada
         </div>
      </div>
    )}
    <div className="p-4 border-b border-emerald-100 dark:border-emerald-900/30 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/10 flex justify-between items-center">
      <h2 className="font-black text-lg text-slate-800 dark:text-white uppercase tracking-wide flex items-center gap-2">
        Fase {number}: <span className="text-emerald-600 dark:text-emerald-500">{title}</span>
      </h2>
      {isDone ? (
         <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
           <CheckCircle2 size={12} /> Completado
         </span>
      ) : unlocked ? (
         <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded dark:bg-emerald-900/30 dark:text-emerald-400">
           Gestionando
         </span>
      ) : null}
    </div>
    <div className="divide-y divide-gray-100 dark:divide-slate-800">
      {children}
    </div>
  </div>
);

interface TaskItemProps {
  id: string;
  title: string;
  desc: string;
  rewards?: React.ReactNode;
}

const MyGMGuide: React.FC = () => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const load = async () => {
      const data = await loadProgress('mygm');
      if (data) setCompleted(data);
    };
    load();
  }, []);

  const toggleTask = (taskId: string) => {
    const newCompleted = { ...completed, [taskId]: !completed[taskId] };
    setCompleted(newCompleted);
    saveProgress('mygm', newCompleted);
  };

  const areAllCompleted = (ids: string[]) => ids.every(id => completed[id]);

  // --- PROGRESS LOGIC ---
  
  // Phase 1: Setup
  const p1Tasks = ['gm-p1-1', 'gm-p1-2', 'gm-p1-3'];
  const isP1Done = areAllCompleted(p1Tasks);

  // Phase 2: Season 1
  const p2Tasks = ['gm-p2-1', 'gm-p2-2', 'gm-p2-3'];
  const isP2Done = areAllCompleted(p2Tasks);
  const isP2Unlocked = isP1Done;

  // Phase 3: Expansion
  const p3Tasks = ['gm-p3-1', 'gm-p3-2'];
  const isP3Done = areAllCompleted(p3Tasks);
  const isP3Unlocked = isP2Done;

  // Phase 4: Hall of Fame
  const p4Tasks = ['gm-p4-hof'];
  const isP4Done = areAllCompleted(p4Tasks);
  const isP4Unlocked = isP3Done;


  const TaskItem: React.FC<TaskItemProps> = ({ 
    id, 
    title, 
    desc, 
    rewards, 
  }) => {
    const isChecked = completed[id];

    return (
      <div className={`p-4 transition-all duration-300 ${isChecked ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''}`}>
        <div className="flex items-start gap-4">
          <button 
            onClick={() => toggleTask(id)}
            className={`mt-1 flex-shrink-0 transition-all ${isChecked ? 'text-emerald-600 dark:text-emerald-500' : 'text-gray-300 dark:text-slate-600 hover:text-emerald-400'}`}
          >
            {isChecked ? <CheckCircle2 size={24} fill="currentColor" className="text-white dark:text-slate-900" /> : <Circle size={24} />}
          </button>
          <div className="flex-1">
            <h3 className={`font-bold text-lg mb-1 ${isChecked ? 'text-slate-500 line-through decoration-2 decoration-emerald-500/50' : 'text-slate-900 dark:text-white'}`}>
              {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
              {desc}
            </p>
            
            {rewards && (
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-400 uppercase mb-2">
                  <Trophy size={14} /> Logro de Carrera
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
        <div className="absolute inset-0 opacity-30">
           <img src="https://www.thesmackdownhotel.com/igallery/wwe-2k25-screens-293/draft-complete-wm-360.jpg" className="w-full h-full object-cover" alt="MyGM Header" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center text-slate-300 hover:text-white mb-4 transition-colors">
            <ArrowLeft size={18} className="mr-1" /> Volver
          </Link>
          <div className="flex items-center gap-2 mb-2">
             <Briefcase className="text-emerald-400" />
             <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs">Modo Manager</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter mb-2">MyGM</h1>
          <p className="text-slate-300 font-medium max-w-md">Toma el control de la marca. Gestiona presupuestos, contrata superestrellas y derrota a los GMs rivales en la guerra de ratings.</p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-4 -mt-6 relative z-20">
        
        {/* Intro Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-800 mb-6">
           <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                 <TrendingUp size={24} />
              </div>
              <div>
                 <h3 className="font-bold text-slate-800 dark:text-white mb-1">Estrategia de Negocios</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Para ganar, debes equilibrar el presupuesto, la moral de los luchadores y la calidad de los combates. Combina estilos opuestos (Gigante vs Volador) para obtener mejores puntuaciones.
                 </p>
              </div>
           </div>
        </div>

        <div className="space-y-6 pb-12">
          
          {/* Phase 1 */}
          <PhaseBlock title="EL DRAFT Y SETUP" number={1} unlocked={true} completed={isP1Done}>
             <TaskItem 
                id="gm-p1-1" 
                title="Selección de Mando" 
                desc="Elige a tu GM y Marca. Recomendado: Teddy Long (SmackDown) para bonificaciones pasivas."
                rewards="Bono de Moral Inicial"
             />
             <TaskItem 
                id="gm-p1-2" 
                title="Draft Inteligente" 
                desc="Contrata al menos 2 Gigantes y 2 Voladores. Mantén $500k de presupuesto inicial."
             />
             <TaskItem 
                id="gm-p1-3" 
                title="Contratos Iniciales" 
                desc="Firma Agentes Libres por 5 semanas para ahorrar costos a corto plazo."
             />
          </PhaseBlock>

          {/* Phase 2 */}
          <PhaseBlock title="TEMPORADA 1" number={2} unlocked={isP2Unlocked} completed={isP2Done}>
             <TaskItem 
                id="gm-p2-1" 
                title="Rivalidades Nivel 4" 
                desc="Desarrolla una rivalidad hasta nivel 4 para el primer PLE."
                rewards="Bonificación de Match Rating"
             />
             <TaskItem 
                id="gm-p2-2" 
                title="Cartas de Poder" 
                desc="Usa 'Spa de Salud' para recuperar resistencia de tus estrellas principales."
             />
             <TaskItem 
                id="gm-p2-3" 
                title="Guerra de Ratings" 
                desc="Termina la temporada en la posición #1 del ranking."
                rewards="Trofeo: Top of the Mountain"
             />
          </PhaseBlock>

          {/* Phase 3 */}
          <PhaseBlock title="EXPANSIÓN GLOBAL" number={3} unlocked={isP3Unlocked} completed={isP3Done}>
             <TaskItem 
                id="gm-p3-1" 
                title="Draft de Leyendas" 
                desc="Contrata una Leyenda post-WrestleMania para aumentar la popularidad de la marca."
             />
             <TaskItem 
                id="gm-p3-2" 
                title="Mejoras de Logística" 
                desc="Mejora el Estadio al Nivel 3 para maximizar ingresos."
             />
          </PhaseBlock>

           {/* Phase 4 */}
           <PhaseBlock title="SALÓN DE LA FAMA" number={4} unlocked={isP4Unlocked} completed={isP4Done}>
             <TaskItem 
                id="gm-p4-hof" 
                title="Carrera Legendaria" 
                desc="Completa los 10 objetivos de carrera para entrar al Hall of Fame."
                rewards={<ul className="list-disc space-y-1"><li>Logro: GM Inmortal</li><li>Desbloqueo: Custom GM Slot</li></ul>}
             />
          </PhaseBlock>

        </div>
      </div>
    </div>
  );
};

export default MyGMGuide;