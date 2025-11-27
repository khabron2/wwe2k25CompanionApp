import React, { useState, useEffect } from 'react';
import { Settings, Heart, History, User, Moon, Sun, Smartphone, LogOut, Mail, Shield, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { supabase, syncCustomWrestlers } from '../services/supabase';

const Profile: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  
  // Auth State
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    // Theme Init
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setIsDark(true);
    } else {
        setIsDark(false);
    }
    
    // Check Session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) syncCustomWrestlers();
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) syncCustomWrestlers();
      setLoading(false);
    });

    // PWA Install Prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });

    return () => subscription.unsubscribe();
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

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setErrorMsg('');

    try {
      if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        // Auto login usually happens, but sometimes requires email confirmation depending on settings
        if (data.user && !data.session) {
           setErrorMsg('Registro exitoso. Por favor revisa tu correo para confirmar.');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      setErrorMsg(error.message || 'Error de autenticación');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
      await supabase.auth.signOut();
      localStorage.removeItem('custom_wrestlers'); // Clear private data
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center dark:text-white"><Loader2 className="animate-spin" /></div>;
  }

  if (!session) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
            <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-slate-800">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <User size={32} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                      {authMode === 'signin' ? 'Iniciar Sesión' : 'Crear Cuenta'}
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Guarda tu progreso en la nube y accede desde cualquier dispositivo.
                    </p>
                </div>

                {errorMsg && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-lg flex items-center gap-2">
                    <AlertCircle size={16} /> {errorMsg}
                  </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Correo Electrónico</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input 
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm font-medium dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all placeholder:text-slate-400"
                            placeholder="nombre@ejemplo.com"
                          />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Contraseña</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input 
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm font-medium dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none transition-all placeholder:text-slate-400"
                            placeholder="••••••••"
                            minLength={6}
                          />
                        </div>
                    </div>
                    
                    <Button type="submit" fullWidth className="mt-6 py-3 text-sm font-bold shadow-lg shadow-blue-900/10 flex justify-center items-center gap-2" disabled={authLoading}>
                        {authLoading && <Loader2 size={16} className="animate-spin" />}
                        {authMode === 'signin' ? 'Entrar' : 'Registrarse'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                  <button 
                    onClick={() => { setAuthMode(authMode === 'signin' ? 'signup' : 'signin'); setErrorMsg(''); }}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {authMode === 'signin' ? '¿No tienes cuenta? Regístrate gratis' : '¿Ya tienes cuenta? Inicia sesión'}
                  </button>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="p-6 min-h-screen">
       <div className="flex items-center gap-4 mb-8">
         <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors shrink-0 border-2 border-white dark:border-slate-700 shadow-md">
            <User size={32} />
         </div>
         <div className="flex-1 overflow-hidden">
             <h1 className="text-xl font-bold text-slate-900 dark:text-white truncate">
               {session.user.email?.split('@')[0]}
             </h1>
             <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate">
                <Mail size={12} /> {session.user.email}
             </div>
             <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider border border-green-100 dark:border-green-900/50">
                <Shield size={10} fill="currentColor" /> Sincronizado
             </div>
         </div>
       </div>

       {/* Install Banner */}
       {isInstallable && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg text-white flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                   <Smartphone size={24} />
                </div>
                <div>
                   <h3 className="font-bold text-sm">Instalar App</h3>
                   <p className="text-xs text-blue-100">Añadir a pantalla de inicio</p>
                </div>
             </div>
             <button 
               onClick={handleInstallClick}
               className="bg-white text-blue-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-transform"
             >
               Instalar
             </button>
          </div>
       )}

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

         <button 
           onClick={handleLogout}
           className="w-full bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group mt-6"
         >
            <div className="bg-gray-100 dark:bg-slate-800 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 p-2 rounded-lg text-gray-500 dark:text-slate-400 group-hover:text-red-500 transition-colors">
                <LogOut size={20} />
            </div>
            <div className="flex-1 font-bold text-slate-800 dark:text-white text-left group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                Cerrar Sesión
            </div>
         </button>
       </div>
    </div>
  );
};

export default Profile;