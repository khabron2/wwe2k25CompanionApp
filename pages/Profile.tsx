import React, { useState, useEffect } from 'react';
import { Settings, Heart, History, User, Moon, Sun } from 'lucide-react';

const Profile: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial state from html class
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <div className="p-6 min-h-screen">
       <div className="flex items-center gap-4 mb-8">
         <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors">
            <User size={32} />
         </div>
         <div>
           <h1 className="text-xl font-bold text-slate-900 dark:text-white">Jugador 1</h1>
           <p className="text-sm text-slate-500 dark:text-slate-400">Cuenta Pro</p>
         </div>
       </div>

       <div className="space-y-4">
        {/* Theme Toggle */}
        <div 
           onClick={toggleTheme}
           className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
         >
            <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                {isDark ? <Moon size={20} /> : <Sun size={20} />}
            </div>
            <div className="flex-1 font-bold text-slate-800 dark:text-white">Modo Oscuro</div>
            <div className={`w-10 h-6 rounded-full p-1 transition-colors ${isDark ? 'bg-purple-600' : 'bg-gray-200'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${isDark ? 'translate-x-4' : ''}`} />
            </div>
         </div>

         <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <div className="bg-red-50 dark:bg-red-900/30 p-2 rounded-lg text-red-500 dark:text-red-400"><Heart size={20} /></div>
            <div className="flex-1 font-bold text-slate-800 dark:text-white">Favoritos</div>
            <div className="text-slate-400 text-sm">12</div>
         </div>

         <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-blue-500 dark:text-blue-400"><History size={20} /></div>
            <div className="flex-1 font-bold text-slate-800 dark:text-white">Búsquedas Recientes</div>
         </div>

         <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <div className="bg-gray-100 dark:bg-slate-800 p-2 rounded-lg text-gray-500 dark:text-slate-400"><Settings size={20} /></div>
            <div className="flex-1 font-bold text-slate-800 dark:text-white">Configuración</div>
         </div>
       </div>

       <div className="mt-8 p-4 bg-slate-900 dark:bg-slate-800 rounded-2xl text-white text-center shadow-lg transition-colors">
         <h3 className="font-bold mb-2">Hazte Premium</h3>
         <p className="text-xs text-slate-400 mb-4">Desbloquea estadísticas avanzadas, datos de frames y coaching IA ilimitado.</p>
         <button className="w-full bg-white text-slate-900 font-bold py-2 rounded-lg text-sm hover:bg-gray-100">Mejorar Ahora</button>
       </div>
    </div>
  );
};

export default Profile;