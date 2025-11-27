import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Save, User } from 'lucide-react';
import { Brand, WrestlerStyle, Wrestler, Stats } from '../types';
import { addCustomWrestler } from '../services/wweService';
import { getWrestlerImage } from '../constants';
import { Button } from '../components/Button';
import { WrestlerCard } from '../components/WrestlerCard';

const CreateWrestler: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<Wrestler>>({
    name: '',
    alias: '',
    brand: Brand.RAW,
    style: WrestlerStyle.STRIKER,
    country: 'Desconocido',
    heightCm: 180,
    weightKg: 90,
    bio: '',
    imageUrl: '',
    stats: {
      overall: 75,
      strength: 70,
      agility: 70,
      technique: 70,
      speed: 70,
      defense: 70,
      resilience: 70
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatChange = (statName: keyof Stats, value: number) => {
    if (!formData.stats) return;
    const newStats = { ...formData.stats, [statName]: value } as Stats;
    
    // Auto calculate overall roughly
    const sum = (Object.values(newStats) as number[]).reduce((a, b) => a + b, 0) - newStats.overall;
    const avg = Math.round(sum / 6);
    newStats.overall = avg;

    setFormData(prev => ({ ...prev, stats: newStats }));
  };

  const generateImage = () => {
    if (!formData.name) return;
    const url = getWrestlerImage(formData.name!, formData.style || '');
    setFormData(prev => ({ ...prev, imageUrl: url }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newWrestler: Wrestler = {
      ...formData as Wrestler,
      id: `custom_${Date.now()}`,
      imageUrl: formData.imageUrl || getWrestlerImage(formData.name!, 'Generic')
    };

    addCustomWrestler(newWrestler);
    navigate('/wrestlers');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-slate-900" />
        <div className="relative z-10">
          <button 
             onClick={() => navigate(-1)} 
             className="inline-flex items-center text-slate-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" /> Cancelar
          </button>
          <div className="flex items-center gap-2 mb-2">
             <User className="text-purple-400" />
             <span className="text-purple-400 font-bold uppercase tracking-widest text-xs">Creation Suite</span>
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter mb-2">CREAR LUCHADOR</h1>
          <p className="text-slate-300 font-medium text-sm max-w-md">Diseña tu propia superestrella y añádela al roster.</p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-4 -mt-8 relative z-20 flex flex-col md:flex-row gap-8">
        
        {/* Preview Card */}
        <div className="md:w-1/3 flex flex-col gap-4">
           <h3 className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider">Vista Previa</h3>
           <div className="w-full max-w-[280px] mx-auto md:mx-0">
             <WrestlerCard wrestler={{
               ...formData as Wrestler,
               id: 'preview',
               imageUrl: formData.imageUrl || 'https://image.pollinations.ai/prompt/silhouette%20mystery%20wrestler?width=400&height=533&nologo=true'
             }} />
           </div>
        </div>

        {/* Form */}
        <div className="md:w-2/3 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-100 dark:border-slate-800 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-2">Datos Personales</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre</label>
                  <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-2.5 text-sm dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Ej. El Mesías" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Alias (Apodo)</label>
                  <input name="alias" value={formData.alias} onChange={handleChange} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-2.5 text-sm dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Ej. The Saviour" />
                </div>
              </div>

              <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Biografía</label>
                  <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-2.5 text-sm dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Historia del luchador..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Marca</label>
                    <select name="brand" value={formData.brand} onChange={handleChange} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-2.5 text-sm dark:text-white outline-none">
                      {Object.values(Brand).map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Estilo</label>
                    <select name="style" value={formData.style} onChange={handleChange} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-2.5 text-sm dark:text-white outline-none">
                      {Object.values(WrestlerStyle).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                 </div>
              </div>

               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">País</label>
                    <input name="country" value={formData.country} onChange={handleChange} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-2.5 text-sm dark:text-white outline-none" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Altura (cm)</label>
                    <input type="number" name="heightCm" value={formData.heightCm} onChange={handleChange} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-2.5 text-sm dark:text-white outline-none" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Peso (kg)</label>
                    <input type="number" name="weightKg" value={formData.weightKg} onChange={handleChange} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-2.5 text-sm dark:text-white outline-none" />
                 </div>
              </div>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-800 pb-2">
                 <h3 className="font-bold text-lg text-slate-900 dark:text-white">Estadísticas</h3>
                 <span className="text-xl font-black text-yellow-500 bg-slate-900 px-3 py-1 rounded-lg">{formData.stats?.overall} OVR</span>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {Object.keys(formData.stats || {}).filter(k => k !== 'overall').map(key => (
                   <div key={key}>
                     <div className="flex justify-between mb-1">
                       <label className="text-xs font-bold text-slate-500 uppercase">{key}</label>
                       <span className="text-xs font-bold text-slate-900 dark:text-white">{(formData.stats as any)[key]}</span>
                     </div>
                     <input 
                       type="range" 
                       min="30" 
                       max="100" 
                       value={(formData.stats as any)[key]} 
                       onChange={(e) => handleStatChange(key as keyof Stats, parseInt(e.target.value))}
                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-600"
                     />
                   </div>
                 ))}
               </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-2">Imagen</h3>
              <div className="flex gap-2">
                 <input 
                   name="imageUrl" 
                   value={formData.imageUrl} 
                   onChange={handleChange} 
                   placeholder="URL de imagen (opcional)" 
                   className="flex-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-2.5 text-sm dark:text-white outline-none" 
                 />
                 <button 
                   type="button"
                   onClick={generateImage}
                   className="px-4 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                 >
                   <RefreshCw size={16} /> <span className="hidden md:inline">Generar AI</span>
                 </button>
              </div>
              <p className="text-[10px] text-slate-400">Deja vacío o usa el botón para generar una imagen basada en el nombre.</p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
               <Button type="submit" fullWidth className="flex items-center justify-center gap-2 py-3 text-base">
                 <Save size={20} /> Guardar Luchador
               </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateWrestler;