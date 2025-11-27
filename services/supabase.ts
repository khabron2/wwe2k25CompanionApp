import { createClient } from '@supabase/supabase-js';

// Configuration from user prompt
const SUPABASE_URL = 'https://lgxbyhwzmciqoqnvfapr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxneGJ5aHd6bWNpcW9xbnZmYXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMTgwMTgsImV4cCI6MjA3OTc5NDAxOH0.ZLFdy12ZCRN1kopi0qp786yRTFZExexKxv4Fiz71CQU, service_role';

// Clean key if needed (remove service role suffix if present in prompt copy/paste)
const CLEAN_KEY = SUPABASE_ANON_KEY.split(',')[0].trim();

export const supabase = createClient(SUPABASE_URL, CLEAN_KEY);

/**
 * IMPORTANTE: CONFIGURACIÓN DE BASE DE DATOS
 * 
 * Para que el guardado funcione, debes ejecutar el contenido del archivo 
 * 'SUPABASE_SETUP.sql' en el Editor SQL de tu panel de Supabase.
 * 
 * Esto creará las tablas 'user_progress' y 'custom_wrestlers' necesarias.
 */

// --- DATA PERSISTENCE HELPERS ---

export const saveProgress = async (category: string, data: any) => {
  // Always save to localStorage first for offline/instant access
  localStorage.setItem(`${category}-progress`, JSON.stringify(data));

  // If user is logged in, sync to Supabase
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({ 
          user_id: user.id, 
          category, 
          data,
          updated_at: new Date()
        });
      
      if (error) {
        console.error(`Error saving ${category} to Supabase. Make sure tables exist (see SUPABASE_SETUP.sql):`, JSON.stringify(error, null, 2));
      }
    } catch (e) {
      console.error('Supabase exception:', e);
    }
  }
};

export const loadProgress = async (category: string): Promise<any> => {
  // 1. Try to get from Supabase if logged in
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('data')
        .eq('user_id', user.id)
        .eq('category', category)
        .single();
      
      if (data && data.data) {
        // Update local storage with fresh cloud data
        localStorage.setItem(`${category}-progress`, JSON.stringify(data.data));
        return data.data;
      }
    } catch (e) {
      // Silent fail, use local storage
      // console.error('Supabase load exception:', e);
    }
  }

  // 2. Fallback to localStorage
  const local = localStorage.getItem(`${category}-progress`);
  return local ? JSON.parse(local) : null;
};

// --- WRESTLER SYNC ---

export const syncCustomWrestlers = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // 1. Load cloud wrestlers
  const { data: cloudWrestlers, error } = await supabase
    .from('custom_wrestlers')
    .select('id, wrestler_data')
    .eq('user_id', user.id);

  if (cloudWrestlers) {
     // Convert to array of wrestlers
     const wrestlers = cloudWrestlers.map(row => row.wrestler_data);
     localStorage.setItem('custom_wrestlers', JSON.stringify(wrestlers));
  }
};

export const saveCustomWrestlerToCloud = async (wrestler: any) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  try {
    const { error } = await supabase
      .from('custom_wrestlers')
      .upsert({
        id: wrestler.id,
        user_id: user.id,
        wrestler_data: wrestler
      });
    
    if (error) console.error("Error saving wrestler to Supabase:", JSON.stringify(error, null, 2));
  } catch (e) {
    console.error("Supabase exception:", e);
  }
};

export const deleteCustomWrestlerFromCloud = async (wrestlerId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  try {
    const { error } = await supabase
      .from('custom_wrestlers')
      .delete()
      .eq('id', wrestlerId)
      .eq('user_id', user.id);
    
    if (error) console.error("Error deleting wrestler from Supabase:", JSON.stringify(error, null, 2));
  } catch (e) {
    console.error("Supabase exception:", e);
  }
};