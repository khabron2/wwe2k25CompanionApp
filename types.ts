export enum Brand {
  RAW = 'RAW',
  SMACKDOWN = 'SmackDown',
  NXT = 'NXT',
  LEGEND = 'Leyenda'
}

export enum WrestlerStyle {
  STRIKER = 'Golpeador',
  POWERHOUSE = 'Poderoso',
  TECHNICIAN = 'Técnico',
  HIGH_FLYER = 'Volador',
  MANAGER = 'Mánager'
}

export interface Stats {
  overall: number;
  strength: number;
  agility: number;
  technique: number;
  speed: number;
  defense: number;
  resilience: number;
}

export interface Wrestler {
  id: string;
  name: string;
  alias?: string;
  brand: Brand;
  style: WrestlerStyle;
  imageUrl: string;
  country: string;
  heightCm: number;
  weightKg: number;
  bio: string;
  stats: Stats;
}

export enum MoveCategory {
  FINISHER = 'Remate',
  SIGNATURE = 'Personal',
  COMBO = 'Combo',
  GRAPPLE_FRONT = 'Agarre Frontal',
  GRAPPLE_BACK = 'Agarre Trasero',
  RUNNING = 'En Carrera',
  DIVING = 'Aéreo',
  GROUND = 'Suelo'
}

export interface Move {
  id: string;
  wrestlerId: string;
  name: string;
  category: MoveCategory;
  input: string[]; // Xbox inputs e.g., ['X', 'A', 'Y']
  description?: string;
  damage: number;
}

export interface CategoryCard {
  id: string;
  name: string;
  imageUrl: string;
}