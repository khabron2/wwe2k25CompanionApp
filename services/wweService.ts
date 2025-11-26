import { MOCK_WRESTLERS, MOCK_MOVES } from '../constants';
import { Wrestler, Move, Brand, WrestlerStyle } from '../types';

export const getWrestlers = (
  search: string = '',
  filterBrand: Brand | 'All' = 'All',
  filterStyle: WrestlerStyle | 'All' = 'All'
): Wrestler[] => {
  return MOCK_WRESTLERS.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase()) || 
                          (w.alias && w.alias.toLowerCase().includes(search.toLowerCase()));
    const matchesBrand = filterBrand === 'All' || w.brand === filterBrand;
    const matchesStyle = filterStyle === 'All' || w.style === filterStyle;
    return matchesSearch && matchesBrand && matchesStyle;
  });
};

export const getWrestlerById = (id: string): Wrestler | undefined => {
  return MOCK_WRESTLERS.find(w => w.id === id);
};

export const getWrestlerMoves = (wrestlerId: string): Move[] => {
  return MOCK_MOVES.filter(m => m.wrestlerId === wrestlerId);
};

export const getAllMoves = (search: string = ''): (Move & { wrestlerName: string })[] => {
  const allMoves = MOCK_MOVES.map(m => {
    const w = MOCK_WRESTLERS.find(wr => wr.id === m.wrestlerId);
    return { ...m, wrestlerName: w ? w.name : 'Desconocido' };
  });

  if (!search) return allMoves;
  return allMoves.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));
};

export const getTopWrestlers = (limit: number = 3): Wrestler[] => {
  // Sort by overall desc
  return [...MOCK_WRESTLERS].sort((a, b) => b.stats.overall - a.stats.overall).slice(0, limit);
};