import { Brand, WrestlerStyle, Wrestler, Move, MoveCategory, CategoryCard } from './types';

export const CATEGORIES: CategoryCard[] = [
  { id: 'c1', name: 'Golpeador', imageUrl: 'https://image.pollinations.ai/prompt/WWE%20wrestler%20striker%20punching%20action%20shot?width=400&height=300&nologo=true' },
  { id: 'c2', name: 'Poderoso', imageUrl: 'https://image.pollinations.ai/prompt/WWE%20wrestler%20powerhouse%20lifting%20opponent?width=400&height=300&nologo=true' },
  { id: 'c3', name: 'Técnico', imageUrl: 'https://image.pollinations.ai/prompt/WWE%20wrestler%20technical%20submission%20hold?width=400&height=300&nologo=true' },
  { id: 'c4', name: 'Volador', imageUrl: 'https://image.pollinations.ai/prompt/WWE%20wrestler%20high%20flyer%20jumping%20top%20rope?width=400&height=300&nologo=true' },
  { id: 'c5', name: 'Leyenda', imageUrl: 'https://image.pollinations.ai/prompt/WWE%20hall%20of%20fame%20legend%20wrestler%20gold%20lighting?width=400&height=300&nologo=true' },
];

export const getWrestlerImage = (name: string, style: string = '') => {
  return `https://image.pollinations.ai/prompt/WWE%202K25%20game%20render%20portrait%20of%20${encodeURIComponent(name)}%20${style}%20hyperrealistic%20unreal%20engine%205%20lighting?width=400&height=533&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;
};

// Helper consts
const RAW = Brand.RAW;
const SD = Brand.SMACKDOWN;
const NXT = Brand.NXT;
const LEG = Brand.LEGEND;

const STRIKER = WrestlerStyle.STRIKER;
const POWER = WrestlerStyle.POWERHOUSE;
const TECH = WrestlerStyle.TECHNICIAN;
const FLYER = WrestlerStyle.HIGH_FLYER;
const MGR = WrestlerStyle.MANAGER;

// Base Raw Roster (Previous)
const RAW_ROSTER: Wrestler[] = [
  { id: 'raw_001', name: 'Scarlett', brand: RAW, style: MGR, imageUrl: getWrestlerImage('Scarlett WWE'), country: 'USA', heightCm: 165, weightKg: 55, bio: 'Vidente del apocalipsis.', stats: { overall: 74, strength: 55, agility: 70, technique: 75, speed: 70, defense: 65, resilience: 70 } },
  { id: 'raw_002', name: 'Seth "Freakin" Rollins', alias: 'The Visionary', brand: RAW, style: TECH, imageUrl: getWrestlerImage('Seth Rollins Visionary'), country: 'USA', heightCm: 185, weightKg: 98, bio: 'El Visionario y Revolucionario.', stats: { overall: 95, strength: 82, agility: 92, technique: 96, speed: 88, defense: 85, resilience: 95 } },
  { id: 'raw_003', name: 'Shayna Baszler', brand: RAW, style: TECH, imageUrl: getWrestlerImage('Shayna Baszler'), country: 'USA', heightCm: 170, weightKg: 62, bio: 'Reina de Picas.', stats: { overall: 84, strength: 80, agility: 75, technique: 94, speed: 75, defense: 80, resilience: 85 } },
  { id: 'raw_004', name: 'Sheamus', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Sheamus'), country: 'Irlanda', heightCm: 193, weightKg: 121, bio: 'Guerrero Celta.', stats: { overall: 88, strength: 92, agility: 70, technique: 80, speed: 70, defense: 90, resilience: 92 } },
  { id: 'raw_005', name: 'Sonya Deville', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Sonya Deville'), country: 'USA', heightCm: 170, weightKg: 59, bio: 'Oficial de WWE.', stats: { overall: 79, strength: 70, agility: 80, technique: 82, speed: 80, defense: 75, resilience: 78 } },
  { id: 'raw_006', name: 'Tyler Bate', brand: RAW, style: TECH, imageUrl: getWrestlerImage('Tyler Bate'), country: 'Inglaterra', heightCm: 170, weightKg: 79, bio: 'Big Strong Boi.', stats: { overall: 81, strength: 85, agility: 88, technique: 92, speed: 85, defense: 80, resilience: 85 } },
  { id: 'raw_007', name: 'Valhalla', brand: RAW, style: POWER, imageUrl: getWrestlerImage('Valhalla WWE'), country: 'USA', heightCm: 173, weightKg: 65, bio: 'Voz de los Vikingos.', stats: { overall: 75, strength: 78, agility: 65, technique: 60, speed: 65, defense: 70, resilience: 75 } },
  { id: 'raw_008', name: 'Xavier Woods', brand: RAW, style: FLYER, imageUrl: getWrestlerImage('Xavier Woods'), country: 'USA', heightCm: 180, weightKg: 93, bio: 'Rey del Ring.', stats: { overall: 82, strength: 72, agility: 88, technique: 80, speed: 85, defense: 75, resilience: 82 } },
  { id: 'raw_009', name: 'Zoey Stark', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Zoey Stark'), country: 'USA', heightCm: 173, weightKg: 64, bio: 'Atleta inigualable.', stats: { overall: 80, strength: 82, agility: 85, technique: 78, speed: 82, defense: 78, resilience: 80 } },
  { id: 'raw_010', name: 'Adam Pearce', brand: RAW, style: MGR, imageUrl: 'https://www.thesmackdownhotel.com/images/wwe2k25/roster/adam-pearce-2.png', country: 'USA', heightCm: 188, weightKg: 110, bio: 'General Manager.', stats: { overall: 72, strength: 70, agility: 60, technique: 80, speed: 55, defense: 65, resilience: 65 } },
  { id: 'raw_011', name: 'AJ Styles', brand: RAW, style: TECH, imageUrl: getWrestlerImage('AJ Styles'), country: 'USA', heightCm: 180, weightKg: 99, bio: 'Fenomenal.', stats: { overall: 89, strength: 78, agility: 90, technique: 95, speed: 88, defense: 84, resilience: 88 } },
  { id: 'raw_012', name: 'Akam', brand: RAW, style: POWER, imageUrl: getWrestlerImage('Akam AOP'), country: 'Canadá', heightCm: 191, weightKg: 130, bio: 'Autor del Dolor.', stats: { overall: 78, strength: 90, agility: 60, technique: 65, speed: 60, defense: 80, resilience: 85 } },
  { id: 'raw_013', name: 'Akira Tozawa', brand: RAW, style: FLYER, imageUrl: getWrestlerImage('Akira Tozawa'), country: 'Japón', heightCm: 170, weightKg: 71, bio: 'Alpha Academy.', stats: { overall: 74, strength: 60, agility: 88, technique: 75, speed: 85, defense: 65, resilience: 75 } },
  { id: 'raw_014', name: 'Alba Fyre', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Alba Fyre'), country: 'Escocia', heightCm: 173, weightKg: 65, bio: 'Firekeeper.', stats: { overall: 79, strength: 70, agility: 80, technique: 75, speed: 80, defense: 72, resilience: 78 } },
  { id: 'raw_015', name: 'Asuka', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Asuka'), country: 'Japón', heightCm: 160, weightKg: 62, bio: 'Emperatriz del Mañana.', stats: { overall: 90, strength: 75, agility: 88, technique: 92, speed: 85, defense: 85, resilience: 90 } },
  { id: 'raw_016', name: 'Austin Theory', brand: RAW, style: TECH, imageUrl: getWrestlerImage('Austin Theory'), country: 'USA', heightCm: 185, weightKg: 100, bio: 'A-Town Down.', stats: { overall: 83, strength: 80, agility: 85, technique: 82, speed: 80, defense: 78, resilience: 82 } },
  { id: 'raw_017', name: 'Bayley', brand: RAW, style: TECH, imageUrl: getWrestlerImage('Bayley'), country: 'USA', heightCm: 168, weightKg: 54, bio: 'Role Model.', stats: { overall: 89, strength: 72, agility: 80, technique: 88, speed: 78, defense: 85, resilience: 90 } },
  { id: 'raw_018', name: 'Becky Lynch', brand: RAW, style: TECH, imageUrl: getWrestlerImage('Becky Lynch'), country: 'Irlanda', heightCm: 168, weightKg: 61, bio: 'The Man.', stats: { overall: 93, strength: 76, agility: 82, technique: 94, speed: 80, defense: 88, resilience: 98 } },
  { id: 'raw_019', name: 'Bron Breakker', brand: RAW, style: POWER, imageUrl: getWrestlerImage('Bron Breakker'), country: 'USA', heightCm: 183, weightKg: 104, bio: 'Badass.', stats: { overall: 87, strength: 94, agility: 85, technique: 75, speed: 90, defense: 80, resilience: 85 } },
  { id: 'raw_020', name: 'Bronson Reed', brand: RAW, style: POWER, imageUrl: getWrestlerImage('Bronson Reed'), country: 'Australia', heightCm: 183, weightKg: 150, bio: 'Colossal.', stats: { overall: 84, strength: 92, agility: 65, technique: 70, speed: 65, defense: 82, resilience: 88 } },
  { id: 'raw_021', name: 'Brutus Creed', brand: RAW, style: POWER, imageUrl: getWrestlerImage('Brutus Creed'), country: 'USA', heightCm: 180, weightKg: 129, bio: 'Diamond Mine.', stats: { overall: 80, strength: 90, agility: 75, technique: 75, speed: 70, defense: 78, resilience: 82 } },
  { id: 'raw_022', name: 'Carlito', brand: RAW, style: TECH, imageUrl: getWrestlerImage('Carlito'), country: 'Puerto Rico', heightCm: 178, weightKg: 100, bio: 'Caribbean Cool.', stats: { overall: 78, strength: 75, agility: 80, technique: 82, speed: 75, defense: 75, resilience: 78 } },
  { id: 'raw_023', name: 'Carmella', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Carmella'), country: 'USA', heightCm: 165, weightKg: 50, bio: 'Mella is Money.', stats: { overall: 77, strength: 60, agility: 82, technique: 78, speed: 80, defense: 70, resilience: 75 } },
  { id: 'raw_024', name: 'Chad Gable', brand: RAW, style: TECH, imageUrl: getWrestlerImage('Chad Gable'), country: 'USA', heightCm: 173, weightKg: 92, bio: 'Master Gable.', stats: { overall: 85, strength: 85, agility: 88, technique: 98, speed: 85, defense: 82, resilience: 85 } },
  { id: 'raw_025', name: 'CM Punk', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('CM Punk'), country: 'USA', heightCm: 188, weightKg: 99, bio: 'Best in the World.', stats: { overall: 94, strength: 80, agility: 82, technique: 92, speed: 78, defense: 88, resilience: 96 } },
  { id: 'raw_026', name: 'Cruz Del Toro', brand: RAW, style: FLYER, imageUrl: getWrestlerImage('Cruz Del Toro'), country: 'México', heightCm: 175, weightKg: 84, bio: 'LWO.', stats: { overall: 76, strength: 70, agility: 90, technique: 75, speed: 88, defense: 70, resilience: 75 } },
  { id: 'raw_027', name: 'Dakota Kai', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Dakota Kai'), country: 'NZ', heightCm: 168, weightKg: 55, bio: 'Team Kick.', stats: { overall: 81, strength: 65, agility: 85, technique: 82, speed: 85, defense: 75, resilience: 80 } },
  { id: 'raw_028', name: 'Dominik Mysterio', brand: RAW, style: FLYER, imageUrl: getWrestlerImage('Dominik Mysterio'), country: 'USA', heightCm: 185, weightKg: 91, bio: 'Dirty Dom.', stats: { overall: 82, strength: 70, agility: 88, technique: 75, speed: 85, defense: 72, resilience: 85 } },
  { id: 'raw_029', name: 'Dragon Lee', brand: RAW, style: FLYER, imageUrl: getWrestlerImage('Dragon Lee'), country: 'México', heightCm: 170, weightKg: 75, bio: 'Futuro de la Lucha.', stats: { overall: 79, strength: 65, agility: 94, technique: 80, speed: 92, defense: 70, resilience: 78 } },
  { id: 'raw_030', name: 'El Grande Americano', brand: RAW, style: FLYER, imageUrl: getWrestlerImage('Luchador Mask'), country: 'USA', heightCm: 178, weightKg: 90, bio: 'Misterio Patriótico.', stats: { overall: 75, strength: 70, agility: 85, technique: 75, speed: 85, defense: 70, resilience: 75 } },
  { id: 'raw_031', name: 'Erik', brand: RAW, style: POWER, imageUrl: getWrestlerImage('Erik Viking'), country: 'USA', heightCm: 185, weightKg: 111, bio: 'Viking Raider.', stats: { overall: 78, strength: 88, agility: 75, technique: 70, speed: 70, defense: 80, resilience: 82 } },
  { id: 'raw_032', name: 'Finn Bálor', brand: RAW, style: TECH, imageUrl: getWrestlerImage('Finn Balor'), country: 'Irlanda', heightCm: 180, weightKg: 86, bio: 'The Prince.', stats: { overall: 88, strength: 75, agility: 88, technique: 90, speed: 85, defense: 82, resilience: 85 } },
  { id: 'raw_033', name: 'Grayson Waller', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Grayson Waller'), country: 'Australia', heightCm: 191, weightKg: 93, bio: 'Aussie Icon.', stats: { overall: 80, strength: 75, agility: 82, technique: 78, speed: 80, defense: 75, resilience: 80 } },
  { id: 'raw_034', name: 'Gunther', brand: RAW, style: POWER, imageUrl: 'https://www.wrestlezone.com/wp-content/uploads/sites/8/2023/04/gunther.jpg?resize=300', country: 'Austria', heightCm: 193, weightKg: 113, bio: 'Ring General.', stats: { overall: 96, strength: 95, agility: 70, technique: 94, speed: 75, defense: 95, resilience: 98 } },
  { id: 'raw_035', name: 'Ilja Dragunov', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Ilja Dragunov'), country: 'Rusia', heightCm: 178, weightKg: 89, bio: 'Mad Dragon.', stats: { overall: 85, strength: 82, agility: 80, technique: 85, speed: 82, defense: 80, resilience: 95 } },
  { id: 'raw_036', name: 'Isla Dawn', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Isla Dawn'), country: 'Escocia', heightCm: 170, weightKg: 60, bio: 'Modern Witch.', stats: { overall: 77, strength: 65, agility: 75, technique: 78, speed: 75, defense: 70, resilience: 75 } },
  { id: 'raw_037', name: 'Ivar', brand: RAW, style: FLYER, imageUrl: getWrestlerImage('Ivar Viking'), country: 'USA', heightCm: 188, weightKg: 138, bio: 'Viking Raider Ágil.', stats: { overall: 80, strength: 90, agility: 80, technique: 70, speed: 75, defense: 78, resilience: 85 } },
  { id: 'raw_038', name: 'Ivy Nile', brand: RAW, style: POWER, imageUrl: getWrestlerImage('Ivy Nile'), country: 'USA', heightCm: 160, weightKg: 60, bio: 'The Pitbull.', stats: { overall: 78, strength: 85, agility: 80, technique: 75, speed: 78, defense: 75, resilience: 80 } },
  { id: 'raw_039', name: 'Iyo Sky', brand: RAW, style: FLYER, imageUrl: getWrestlerImage('Iyo Sky'), country: 'Japón', heightCm: 156, weightKg: 52, bio: 'Genius of the Sky.', stats: { overall: 88, strength: 65, agility: 96, technique: 88, speed: 92, defense: 78, resilience: 82 } },
  { id: 'raw_040', name: 'JD McDonagh', brand: RAW, style: TECH, imageUrl: getWrestlerImage('JD McDonagh'), country: 'Irlanda', heightCm: 178, weightKg: 82, bio: 'Irish Ace.', stats: { overall: 79, strength: 70, agility: 85, technique: 88, speed: 82, defense: 75, resilience: 80 } },
  { id: 'raw_041', name: 'Jey Uso', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Jey Uso'), country: 'USA', heightCm: 188, weightKg: 110, bio: 'Main Event Jey Uso.', stats: { overall: 91, strength: 82, agility: 85, technique: 80, speed: 82, defense: 82, resilience: 90 } },
  { id: 'raw_042', name: 'Jey Uso (WM41)', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Jey Uso White Gear'), country: 'USA', heightCm: 188, weightKg: 110, bio: 'Versión WrestleMania 41.', stats: { overall: 92, strength: 83, agility: 86, technique: 81, speed: 83, defense: 83, resilience: 91 } },
  { id: 'raw_043', name: 'Joaquin Wilde', brand: RAW, style: FLYER, imageUrl: getWrestlerImage('Joaquin Wilde'), country: 'USA', heightCm: 175, weightKg: 82, bio: 'LWO DJ.', stats: { overall: 76, strength: 68, agility: 90, technique: 75, speed: 88, defense: 70, resilience: 75 } },
  { id: 'raw_044', name: 'Julius Creed', brand: RAW, style: POWER, imageUrl: getWrestlerImage('Julius Creed'), country: 'USA', heightCm: 191, weightKg: 104, bio: 'Creed Brother.', stats: { overall: 82, strength: 92, agility: 82, technique: 78, speed: 80, defense: 80, resilience: 85 } },
  { id: 'raw_045', name: 'Kairi Sane', brand: RAW, style: FLYER, imageUrl: getWrestlerImage('Kairi Sane'), country: 'Japón', heightCm: 155, weightKg: 52, bio: 'Pirate Princess.', stats: { overall: 84, strength: 60, agility: 88, technique: 82, speed: 85, defense: 75, resilience: 80 } },
  { id: 'raw_046', name: 'Karrion Kross', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Karrion Kross'), country: 'USA', heightCm: 193, weightKg: 120, bio: 'Tick Tock.', stats: { overall: 84, strength: 88, agility: 75, technique: 80, speed: 75, defense: 82, resilience: 88 } },
  { id: 'raw_047', name: 'Kiana James', brand: RAW, style: TECH, imageUrl: getWrestlerImage('Kiana James'), country: 'USA', heightCm: 168, weightKg: 60, bio: 'Femme Fatale.', stats: { overall: 77, strength: 65, agility: 78, technique: 80, speed: 75, defense: 72, resilience: 75 } },
  { id: 'raw_048', name: 'Kofi Kingston', brand: RAW, style: FLYER, imageUrl: getWrestlerImage('Kofi Kingston'), country: 'Ghana', heightCm: 183, weightKg: 96, bio: 'New Day Rocks.', stats: { overall: 85, strength: 75, agility: 90, technique: 82, speed: 88, defense: 78, resilience: 85 } },
  { id: 'raw_049', name: 'Liv Morgan', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Liv Morgan'), country: 'USA', heightCm: 160, weightKg: 50, bio: 'Watch Me.', stats: { overall: 86, strength: 65, agility: 85, technique: 78, speed: 82, defense: 75, resilience: 92 } },
  { id: 'raw_050', name: 'Logan Paul', brand: RAW, style: FLYER, imageUrl: getWrestlerImage('Logan Paul'), country: 'USA', heightCm: 188, weightKg: 95, bio: 'The Maverick.', stats: { overall: 89, strength: 75, agility: 92, technique: 80, speed: 90, defense: 78, resilience: 85 } },
  { id: 'raw_051', name: 'Ludwig Kaiser', brand: RAW, style: TECH, imageUrl: getWrestlerImage('Ludwig Kaiser'), country: 'Alemania', heightCm: 191, weightKg: 100, bio: 'Imperium.', stats: { overall: 80, strength: 78, agility: 80, technique: 88, speed: 78, defense: 80, resilience: 82 } },
  { id: 'raw_052', name: 'Lyra Valkyria', brand: RAW, style: FLYER, imageUrl: getWrestlerImage('Lyra Valkyria'), country: 'Irlanda', heightCm: 170, weightKg: 60, bio: 'The Morrigan.', stats: { overall: 81, strength: 70, agility: 85, technique: 80, speed: 85, defense: 75, resilience: 80 } },
  { id: 'raw_053', name: 'Maxxine Dupri', brand: RAW, style: MGR, imageUrl: getWrestlerImage('Maxxine Dupri'), country: 'USA', heightCm: 173, weightKg: 58, bio: 'Alpha Queen.', stats: { overall: 70, strength: 55, agility: 75, technique: 65, speed: 70, defense: 60, resilience: 65 } },
  { id: 'raw_054', name: 'Natalya', brand: RAW, style: TECH, imageUrl: getWrestlerImage('Natalya'), country: 'Canadá', heightCm: 165, weightKg: 61, bio: 'B.O.A.T.', stats: { overall: 82, strength: 75, agility: 75, technique: 90, speed: 72, defense: 80, resilience: 85 } },
  { id: 'raw_055', name: 'Otis', brand: RAW, style: POWER, imageUrl: getWrestlerImage('Otis'), country: 'USA', heightCm: 178, weightKg: 150, bio: 'Alpha Academy.', stats: { overall: 79, strength: 92, agility: 60, technique: 70, speed: 60, defense: 80, resilience: 85 } },
  { id: 'raw_056', name: 'Pat McAfee', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Pat McAfee'), country: 'USA', heightCm: 185, weightKg: 105, bio: 'Para los Brand.', stats: { overall: 78, strength: 75, agility: 80, technique: 70, speed: 78, defense: 70, resilience: 80 } },
  { id: 'raw_057', name: 'Penta El Zero Miedo', brand: RAW, style: FLYER, imageUrl: getWrestlerImage('Penta El Zero Miedo'), country: 'México', heightCm: 180, weightKg: 94, bio: 'Cero Miedo.', stats: { overall: 84, strength: 75, agility: 88, technique: 80, speed: 85, defense: 75, resilience: 90 } },
  { id: 'raw_058', name: 'Pete Dunne', brand: RAW, style: TECH, imageUrl: getWrestlerImage('Pete Dunne'), country: 'Inglaterra', heightCm: 178, weightKg: 93, bio: 'Bruiserweight.', stats: { overall: 83, strength: 78, agility: 80, technique: 92, speed: 80, defense: 82, resilience: 88 } },
  { id: 'raw_059', name: 'Raquel Rodriguez', brand: RAW, style: POWER, imageUrl: getWrestlerImage('Raquel Rodriguez'), country: 'USA', heightCm: 183, weightKg: 80, bio: 'Big Mami Cool.', stats: { overall: 85, strength: 90, agility: 75, technique: 75, speed: 72, defense: 85, resilience: 85 } },
  { id: 'raw_060', name: 'Rey Mysterio', brand: RAW, style: FLYER, imageUrl: getWrestlerImage('Rey Mysterio'), country: 'USA', heightCm: 168, weightKg: 79, bio: '619.', stats: { overall: 88, strength: 60, agility: 95, technique: 90, speed: 92, defense: 75, resilience: 85 } },
  { id: 'raw_061', name: 'Rezar', brand: RAW, style: POWER, imageUrl: getWrestlerImage('Rezar AOP'), country: 'Albania', heightCm: 193, weightKg: 150, bio: 'Autor del Dolor.', stats: { overall: 78, strength: 91, agility: 60, technique: 65, speed: 60, defense: 80, resilience: 85 } },
  { id: 'raw_062', name: 'Rhea Ripley', brand: RAW, style: STRIKER, imageUrl: getWrestlerImage('Rhea Ripley'), country: 'Australia', heightCm: 171, weightKg: 75, bio: 'Mami.', stats: { overall: 96, strength: 94, agility: 80, technique: 85, speed: 80, defense: 90, resilience: 95 } },
  { id: 'raw_063', name: 'Sami Zayn', brand: RAW, style: TECH, imageUrl: getWrestlerImage('Sami Zayn'), country: 'Canadá', heightCm: 185, weightKg: 96, bio: 'Underdog.', stats: { overall: 87, strength: 75, agility: 85, technique: 88, speed: 82, defense: 80, resilience: 95 } },
];

const ADDED_ROSTER_NAMES = [
  "Theodore Long", "Tito Santana", "Trick Williams '22", "Triple H", "Triple H '08", "Triple H '14", "Triple H '99",
  "Trish Stratus", "Trish Stratus '03", "Tyler Breeze", "Ultimate Warrior", "Ultimate Warrior (No Paint)", "Umaga",
  "Uncle Howdy '23", "Undertaker", "Undertaker '03", "Undertaker '20", "Undertaker '90", "Undertaker '98", "Vader",
  "Victoria", "Wade Barrett", "William Regal", "X-Pac", "Xavier Woods '17", "Yokozuna", "Scott Hall", "Scott Steiner '03",
  "Scott Steiner '93", "Sensational Sherri", "Seth Rollins '14", "Seth Rollins '15", "Seth Rollins '22", "Shawn Michaels",
  "Shawn Michaels '05", "Shawn Michaels '94", "Sid Justice", "Sika", "Solo Sikoa '22", "Solo Sikoa", "Solo Sikoa (Tribal Chief)",
  "Stacy Keibler", "Stardust", "Stephanie McMahon", "Ravishing Rick Rude", "Razor Ramon", "Rhea Ripley '17", "Rhea Ripley '20",
  "Rick Steiner", "Ricky Steamboat", "Rikishi", "Road Dogg", "Rob Van Dam", "Rob Van Dam '97", "Rocky Maivia", "Roman Reigns '19",
  "Roman Reigns '22", "Roman Reigns '24", "Roman Reigns '25", "Rosey", "Rowdy Roddy Piper", "Sandman", "John Cena (WM41)",
  "Junkyard Dog", "Kane", "Kane '03", "Kane '08", "Ken Shamrock", "Kevin Nash", "King Booker", "King Corbin", "Kofi Kingston '17",
  "Kurt Angle", "Kurt Angle '00", "Lex Luger", "Lita", "Macho Man Randy Savage", "Mankind", "Mark Henry", "Maryse", "Michelle McCool",
  "Mick Foley", "Mighty Molly", "Miss Elizabeth", "Molly Holly", "Mr. Fuji", "Mr. Perfect", "Mr. Wonderful Paul Orndorff",
  "Naomi '20", "New Jack", "Nikki Bella", "Paul Bearer", "Paul Bearer Ghost", "Paul Ellering", "Peter Maivia", "Prototype",
  "Randy Orton '09", "Randy Orton '15", "Elite Undertaker", "Eric Bischoff", "Eve Torres", "Faarooq", "George \"The Animal\" Steele",
  "Goldberg", "Harley Race", "Headbanger Mosh", "Headbanger Thrasher", "Headshrinker Fatu", "Headshrinker Samu", "Hollywood Hogan",
  "Honky Tonk Man", "Hulk Hogan", "Hulk Hogan '02", "Hunter Hearst Helmsley", "Islander Haku", "Islander Samu", "Chyna",
  "CM Punk '10", "CM Punk '10 (Masked)", "CM Punk (S.E.S.)", "Cody Rhodes '22", "Cody Rhodes Undashing", "D-Von Dudley",
  "D'Lo Brown", "DDP", "DDP '98", "Diesel", "Doink The Clown", "Drew McIntyre '10", "Dude Love", "Dusty Rhodes", "Eddie Guerrero",
  "Eddie Guerrero '97", "Stephanie McMahon (Manager)", "Stone Cold Steve Austin", "Stone Cold Steve Austin '00", "Superstar Billy Graham",
  "Syxx", "Tamina", "Tamina '10", "Terry Funk", "The Fiend Bray Wyatt", "The Fiend Bray Wyatt '23", "The Great Khali",
  "The Great Muta", "The Hurricane", "The Iron Sheik", "The Miz (A-Lister)", "The Rock", "The Rock '01", "The Rock '24",
  "Jake \"The Snake\" Roberts", "Jamal", "JBL", "Jean-Paul Levesque", "Jesse Ventura", "Jey Uso '10", "Jey Uso '17",
  "Jim \"The Anvil\" Neidhart", "Jimmy Hart", "Jimmy Uso '10", "Jimmy Uso '17", "John Cena", "John Cena '03", "John Cena '07",
  "John Cena '10", "John Cena '12", "John Cena '20 (NWO)", "John Cena '25"
];

const generateWrestler = (name: string): Wrestler => {
  let brand = LEG;
  let style = STRIKER;
  const n = name.toLowerCase();

  // Brand Logic
  if (name.includes('Solo Sikoa') || name.includes('Roman Reigns')) {
     if (name.includes('\'')) { 
        if(name.includes('\'25') || name.includes('Tribal') || name === 'Solo Sikoa') brand = SD;
        else brand = LEG; 
     } else {
        brand = SD;
     }
  }

  // Style Logic
  if (n.includes('undertaker') || n.includes('kane') || n.includes('nash') || n.includes('diesel') || n.includes('khali') || n.includes('yokozuna') || n.includes('vader') || n.includes('umaga') || n.includes('andre') || n.includes('big show') || n.includes('roman') || n.includes('solo') || n.includes('batista') || n.includes('lesnar') || n.includes('goldberg') || n.includes('gunther') || n.includes('bron')) {
    style = POWER;
  } else if (n.includes('mysterio') || n.includes('lee') || n.includes('ricochet') || n.includes('rvd') || n.includes('dam') || n.includes('eddie') || n.includes('fly') || n.includes('sky') || n.includes('kofi') || n.includes('woods') || n.includes('ford') || n.includes('gargano') || n.includes('ciampa')) {
    style = FLYER;
  } else if (n.includes('bret') || n.includes('angle') || n.includes('perfect') || n.includes('db') || n.includes('bryan') || n.includes('benoit') || n.includes('dynamite') || n.includes('styles') || n.includes('gable') || n.includes('gunther') || n.includes('dunne') || n.includes('bate') || n.includes('flair') || n.includes('steamboat')) {
    style = TECH;
  } else if (n.includes('manager') || n.includes('heyman') || n.includes('bearer') || n.includes('hart') || n.includes('fuji') || n.includes('elizabeth') || n.includes('ellering') || n.includes('long') || n.includes('bischoff')) {
    style = MGR;
  }

  // Stats Randomizer based on implied tier (Legend > Regular)
  const isLegend = brand === LEG;
  const baseStat = isLegend ? 85 : 78;
  const rnd = () => Math.floor(Math.random() * 10) + baseStat;

  return {
    id: `w_${name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()}`,
    name: name,
    brand: brand,
    style: style,
    imageUrl: getWrestlerImage(name, isLegend ? 'Legend' : 'WWE'),
    country: 'USA',
    heightCm: 180 + Math.floor(Math.random() * 20),
    weightKg: 90 + Math.floor(Math.random() * 40),
    bio: `Legendaria superestrella ${name}. Conocido por su impacto en la industria.`,
    stats: {
      overall: Math.min(99, rnd()),
      strength: Math.min(99, rnd()),
      agility: Math.min(99, rnd() - 5),
      technique: Math.min(99, rnd()),
      speed: Math.min(99, rnd() - 5),
      defense: Math.min(99, rnd()),
      resilience: Math.min(99, rnd())
    }
  };
};

const ADDED_ROSTER = ADDED_ROSTER_NAMES.map(generateWrestler);

// Merge and Sort
export const MOCK_WRESTLERS: Wrestler[] = [
  ...RAW_ROSTER,
  ...ADDED_ROSTER
].sort((a, b) => a.name.localeCompare(b.name));

// Generate Moves
export const createBasicMoves = (wrestlerId: string, name: string): Move[] => {
  return [
    { id: `m_${wrestlerId}_f`, wrestlerId, name: `${name} Finisher`, category: MoveCategory.FINISHER, input: ['RT', 'A'], damage: 90 },
    { id: `m_${wrestlerId}_s`, wrestlerId, name: `${name} Signature`, category: MoveCategory.SIGNATURE, input: ['RT', 'X'], damage: 85 },
    { id: `m_${wrestlerId}_c`, wrestlerId, name: 'Combo Striking', category: MoveCategory.COMBO, input: ['X', 'X', 'X', 'A'], damage: 70 }
  ];
};

export const MOCK_MOVES: Move[] = MOCK_WRESTLERS.flatMap(w => createBasicMoves(w.id, w.name));