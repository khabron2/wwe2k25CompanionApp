import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Trophy, Lock, Briefcase, TrendingUp, Users, Settings, Target, Zap, DollarSign, Star, Flag } from 'lucide-react';
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
  icon?: React.ReactNode;
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

  // Phase 2: Draft
  const p2Tasks = ['gm-p2-1', 'gm-p2-2', 'gm-p2-3'];
  const isP2Done = areAllCompleted(p2Tasks);
  const isP2Unlocked = isP1Done;

  // Phase 3: Booking
  const p3Tasks = ['gm-p3-1', 'gm-p3-2', 'gm-p3-3'];
  const isP3Done = areAllCompleted(p3Tasks);
  const isP3Unlocked = isP2Done;

  // Phase 4: Management & HOF
  const p4Tasks = ['gm-p4-1', 'gm-p4-2'];
  const isP4Done = areAllCompleted(p4Tasks);
  const isP4Unlocked = isP3Done;


  const TaskItem: React.FC<TaskItemProps> = ({ 
    id, 
    title, 
    desc, 
    rewards, 
    icon
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
            <h3 className={`font-bold text-lg mb-1 flex items-center gap-2 ${isChecked ? 'text-slate-500 line-through decoration-2 decoration-emerald-500/50' : 'text-slate-900 dark:text-white'}`}>
              {icon} {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
              {desc}
            </p>
            
            {rewards && (
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-400 uppercase mb-2">
                  <Zap size={14} className="text-yellow-500" /> Datos Clave
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
          <p className="text-slate-300 font-medium max-w-md">Guía completa: Draft, Presupuesto, Booking y el camino al Hall of Fame.</p>
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
                 <h3 className="font-bold text-slate-800 dark:text-white mb-1">Tu Objetivo</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Gestiona contratos, organiza shows y gana la batalla de marcas hasta WrestleMania. 
                    Juega local o online (hasta 4 jugadores). Los Custom GMs y combates jugables solo están disponibles offline.
                 </p>
              </div>
           </div>
        </div>

        <div className="space-y-6 pb-12">
          
          {/* Phase 1 */}
          <PhaseBlock title="CONFIGURACIÓN" number={1} unlocked={true} completed={isP1Done}>
             <TaskItem 
                id="gm-p1-1" 
                title="Elegir Gerente General"
                icon={<Users size={18} className="text-blue-500" />}
                desc="Cada GM tiene una 'Power Card' exclusiva. Elige sabiamente según tu estrategia."
                rewards={
                    <ul className="list-disc space-y-1">
                        <li><strong>Leyendas:</strong> Shawn Michaels, CM Punk, Miss Elizabeth, Mick Foley, Eric Bischoff.</li>
                        <li><strong>Actuales:</strong> Adam Pearce, Sonya Deville, William Regal, Paul Heyman, Tyler Breeze, Xavier Woods.</li>
                        <li><strong>Custom GM:</strong> Crea tu propio personaje con bonificaciones a medida.</li>
                    </ul>
                }
             />
             <TaskItem 
                id="gm-p1-2" 
                title="Selección de Marca" 
                icon={<Target size={18} className="text-red-500" />}
                desc="La marca define tu ventaja competitiva semanal. 'NXT Mutiny' es la nueva adición exclusiva."
                rewards={
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] md:text-xs">
                        <div><strong className="text-red-500">RAW:</strong> Impide que el rival use 3 superestrellas la próxima semana.</div>
                        <div><strong className="text-blue-500">SmackDown:</strong> Aumenta popularidad de 6 superestrellas (+6).</div>
                        <div><strong className="text-yellow-500">NXT:</strong> Boost significativo en calificación de matches titulares.</div>
                        <div><strong className="text-purple-500">WCW:</strong> Extiende contratos de leyendas 3 semanas.</div>
                        <div><strong className="text-emerald-500">ECW:</strong> Bloquea 3 campeones del rival.</div>
                        <div className="col-span-1 md:col-span-2 bg-emerald-50 dark:bg-emerald-900/30 p-1 rounded border border-emerald-200"><strong className="text-emerald-600 dark:text-emerald-400">NXT Mutiny (Nuevo):</strong> Cobras el valor total ($) por despedir a 3 superestrellas.</div>
                    </div>
                }
             />
             <TaskItem 
                id="gm-p1-3" 
                title="Ajustes de Partida" 
                icon={<Settings size={18} className="text-slate-500" />}
                desc="Dificultad IA (Fácil a Extremo), Presupuesto ($2.75M - $4M) y Shake Ups."
                rewards="Recomendado: Presupuesto alto para principiantes. Activa Shake Ups para eventos aleatorios."
             />
          </PhaseBlock>

          {/* Phase 2 */}
          <PhaseBlock title="DRAFT Y ROSTER" number={2} unlocked={isP2Unlocked} completed={isP2Done}>
             <TaskItem 
                id="gm-p2-1" 
                title="Estrategia del Draft" 
                icon={<Users size={18} className="text-purple-500" />}
                desc="Mínimo 9 rondas. Guarda presupuesto (mínimo $500k) para la temporada. Revisa la Stamina y Popularidad."
             />
             <TaskItem 
                id="gm-p2-2" 
                title="Clases y Matchmaking" 
                icon={<TrendingUp size={18} className="text-green-500" />}
                desc="La química de combate es vital para obtener 5 estrellas. Combina clases opuestas."
                rewards={
                    <ul className="list-disc space-y-1">
                        <li><strong>Gigante vs Crucero:</strong> La mejor bonificación.</li>
                        <li><strong>Luchador (Fighter) vs Matón (Bruiser):</strong> Excelente química.</li>
                        <li><strong>Especialista:</strong> Funciona bien con cualquier clase.</li>
                    </ul>
                }
             />
             <TaskItem 
                id="gm-p2-3" 
                title="Roles (Face vs Heel)" 
                icon={<Star size={18} className="text-yellow-500" />}
                desc="Siempre enfrenta a Buenos (Face) contra Malos (Heel). Face vs Face o Heel vs Heel reduce la calificación."
             />
          </PhaseBlock>

          {/* Phase 3 */}
          <PhaseBlock title="BOOKING Y LOGÍSTICA" number={3} unlocked={isP3Unlocked} completed={isP3Done}>
             <TaskItem 
                id="gm-p3-1" 
                title="Organización del Show" 
                icon={<Briefcase size={18} className="text-blue-500" />}
                desc="Curva Dramática: Opener fuerte, mitad floja, Main Event espectacular. Usa Auto-book para combates, pero reserva las promos manualmente."
             />
             <TaskItem 
                id="gm-p3-2" 
                title="Tipos de Promos" 
                desc="Esenciales para gestionar moral y rivalidades."
                rewards={
                    <ul className="list-disc space-y-1">
                        <li><strong>Call-Out:</strong> Inicia rivalidad nivel 1.</li>
                        <li><strong>Self-Promo:</strong> Sube popularidad propia.</li>
                        <li><strong>Charity:</strong> Sube moral (y popularidad Face).</li>
                        <li><strong>Advertising:</strong> Genera dinero extra ($).</li>
                        <li><strong>Role/Class Change:</strong> Cambia a Face/Heel o estilo de lucha.</li>
                    </ul>
                }
             />
             <TaskItem 
                id="gm-p3-3" 
                title="Arenas y Logística" 
                icon={<DollarSign size={18} className="text-emerald-500" />}
                desc="Invierte en mejores arenas para aumentar ingresos por entrada, pero cuidado con el costo semanal."
                rewards={
                    <ul className="list-disc space-y-1">
                        <li><strong>Gimnasio Escolar:</strong> Costo $0 (Cap: 2,000)</li>
                        <li><strong>Sala de Eventos:</strong> Costo bajo (Cap: 5,000)</li>
                        <li><strong>Estadio Grande:</strong> Costo $30,000 (Cap: 30,000)</li>
                        <li><strong>Colosseum:</strong> Costo $50,000 (Cap: 50,000)</li>
                    </ul>
                }
             />
          </PhaseBlock>

           {/* Phase 4 */}
           <PhaseBlock title="GESTIÓN Y HALL OF FAME" number={4} unlocked={isP4Unlocked} completed={isP4Done}>
             <TaskItem 
                id="gm-p4-1" 
                title="Gestión Avanzada" 
                icon={<Flag size={18} className="text-red-500" />}
                desc="Controla la Moral, Stamina (evita lesiones con 'Spa de Salud') y usa Power Cards para sabotear rivales."
                rewards={
                   <div className="space-y-1 text-[10px]">
                      <div><strong>PLE (PPV):</strong> Cada 5 semanas. Combates Cross-Brand otorgan cartas raras.</div>
                      <div><strong>Shake Ups:</strong> Eventos aleatorios que cambian reglas temporalmente.</div>
                   </div>
                }
             />
             <TaskItem 
                id="gm-p4-2" 
                title="Camino al Hall of Fame" 
                icon={<Trophy size={18} className="text-yellow-500" />}
                desc="Para ganar el juego y entrar al HOF, debes cumplir hitos de carrera acumulativos."
                rewards={
                    <ul className="list-disc space-y-1">
                        <li><strong className="text-emerald-600">Dinero:</strong> Generar $100 Millones.</li>
                        <li><strong className="text-blue-600">Fans:</strong> Alcanzar 10 Millones de fans.</li>
                        <li><strong className="text-purple-600">Ranking:</strong> Terminar temporada en puesto #1.</li>
                        <li>Desbloqueo: <strong>Logro de Carrera</strong> y Slot de GM Personalizado.</li>
                    </ul>
                }
             />
          </PhaseBlock>

        </div>
      </div>
    </div>
  );
};

export default MyGMGuide;