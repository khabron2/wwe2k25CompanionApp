import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Users, Swords, User } from 'lucide-react';
import Discover from './pages/Discover';
import WrestlerList from './pages/WrestlerList';
import WrestlerDetail from './pages/WrestlerDetail';
import MovesLibrary from './pages/MovesLibrary';
import Profile from './pages/Profile';
import MyRiseGuide from './pages/MyRiseGuide';
import TheIslandGuide from './pages/TheIslandGuide';
import MyGMGuide from './pages/MyGMGuide';
import ShowcaseGuide from './pages/ShowcaseGuide';
import AchievementsGuide from './pages/AchievementsGuide';

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 pb-safe pt-2 px-6 z-50 flex justify-between items-center h-16 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-colors duration-300">
      <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/')}`}>
        <Home size={24} strokeWidth={isActive('/') ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Home</span>
      </Link>
      <Link to="/wrestlers" className={`flex flex-col items-center gap-1 ${isActive('/wrestlers')}`}>
        <Users size={24} strokeWidth={isActive('/wrestlers') ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Luchadores</span>
      </Link>
      <Link to="/moves" className={`flex flex-col items-center gap-1 ${isActive('/moves')}`}>
        <Swords size={24} strokeWidth={isActive('/moves') ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Movimientos</span>
      </Link>
      <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile')}`}>
        <User size={24} strokeWidth={isActive('/profile') ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Perfil</span>
      </Link>
    </nav>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // Initialize theme based on preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen pb-20 max-w-screen-xl mx-auto bg-gray-50 dark:bg-slate-950 overflow-x-hidden transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/wrestlers" element={<WrestlerList />} />
          <Route path="/wrestler/:id" element={<WrestlerDetail />} />
          <Route path="/moves" element={<MovesLibrary />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myrise" element={<MyRiseGuide />} />
          <Route path="/the-island" element={<TheIslandGuide />} />
          <Route path="/mygm" element={<MyGMGuide />} />
          <Route path="/showcase" element={<ShowcaseGuide />} />
          <Route path="/achievements" element={<AchievementsGuide />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
};

export default App;