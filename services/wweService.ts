import { MOCK_WRESTLERS, MOCK_MOVES, createBasicMoves } from '../constants';
import { Wrestler, Move, Brand, WrestlerStyle } from '../types';
import { saveCustomWrestlerToCloud, deleteCustomWrestlerFromCloud } from './supabase';

export const getWrestlers = (
  search: string = '',
  filterBrand: Brand | 'All' = 'All',
  filterStyle: WrestlerStyle | 'All' = 'All'
): Wrestler[] => {
  // Load custom wrestlers from localStorage
  const stored = localStorage.getItem('custom_wrestlers');
  const customWrestlers: Wrestler[] = stored ? JSON.parse(stored) : [];

  const allWrestlers = [...customWrestlers, ...MOCK_WRESTLERS];

  return allWrestlers.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase()) || 
                          (w.alias && w.alias.toLowerCase().includes(search.toLowerCase()));
    const matchesBrand = filterBrand === 'All' || w.brand === filterBrand;
    const matchesStyle = filterStyle === 'All' || w.style === filterStyle;
    return matchesSearch && matchesBrand && matchesStyle;
  });
};

export const getWrestlerById = (id: string): Wrestler | undefined => {
  const stored = localStorage.getItem('custom_wrestlers');
  const customWrestlers: Wrestler[] = stored ? JSON.parse(stored) : [];
  const allWrestlers = [...customWrestlers, ...MOCK_WRESTLERS];

  return allWrestlers.find(w => w.id === id);
};

export const getWrestlerMoves = (wrestlerId: string): Move[] => {
  const staticMoves = MOCK_MOVES.filter(m => m.wrestlerId === wrestlerId);
  if (staticMoves.length > 0) return staticMoves;

  // If no static moves found (likely a custom wrestler), generate basic moves dynamically
  const wrestler = getWrestlerById(wrestlerId);
  if (wrestler) {
    return createBasicMoves(wrestler.id, wrestler.name);
  }
  
  return [];
};

export const getAllMoves = (search: string = ''): (Move & { wrestlerName: string })[] => {
  const stored = localStorage.getItem('custom_wrestlers');
  const customWrestlers: Wrestler[] = stored ? JSON.parse(stored) : [];
  const allWrestlers = [...customWrestlers, ...MOCK_WRESTLERS];

  const allMoves = MOCK_MOVES.map(m => {
    const w = allWrestlers.find(wr => wr.id === m.wrestlerId);
    return { ...m, wrestlerName: w ? w.name : 'Desconocido' };
  });

  if (!search) return allMoves;
  return allMoves.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));
};

export const getTopWrestlers = (limit: number = 3): Wrestler[] => {
  const stored = localStorage.getItem('custom_wrestlers');
  const customWrestlers: Wrestler[] = stored ? JSON.parse(stored) : [];
  const allWrestlers = [...customWrestlers, ...MOCK_WRESTLERS];

  return allWrestlers.sort((a, b) => b.stats.overall - a.stats.overall).slice(0, limit);
};

export const addCustomWrestler = (wrestler: Wrestler) => {
  const stored = localStorage.getItem('custom_wrestlers');
  const customWrestlers: Wrestler[] = stored ? JSON.parse(stored) : [];
  customWrestlers.push(wrestler);
  localStorage.setItem('custom_wrestlers', JSON.stringify(customWrestlers));
  
  // Sync to cloud
  saveCustomWrestlerToCloud(wrestler);
};

export const deleteCustomWrestler = (id: string) => {
  const stored = localStorage.getItem('custom_wrestlers');
  if (!stored) return;
  const customWrestlers: Wrestler[] = JSON.parse(stored);
  const updated = customWrestlers.filter(w => w.id !== id);
  localStorage.setItem('custom_wrestlers', JSON.stringify(updated));

  // Sync to cloud
  deleteCustomWrestlerFromCloud(id);
};