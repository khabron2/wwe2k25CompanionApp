import { GoogleGenAI } from "@google/genai";
import { Wrestler, Move } from "../types";

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getStrategyAdvice = async (wrestler: Wrestler, moves: Move[], opponentType?: string): Promise<string> => {
  if (!ai) {
    return "API Key no configurada. No se puede obtener la estrategia de IA.";
  }

  const movesList = moves.map(m => `${m.name} (${m.category})`).join(', ');

  const prompt = `
    Eres un entrenador profesional de eSports de WWE 2K25.
    
    Analiza al siguiente luchador:
    Nombre: ${wrestler.name} (${wrestler.alias})
    Estilo: ${wrestler.style}
    Estadísticas: Media ${wrestler.stats.overall}, Fuerza ${wrestler.stats.strength}, Velocidad ${wrestler.stats.speed}, Técnica ${wrestler.stats.technique}.
    Movimientos Clave: ${movesList}

    Proporciona un plan de juego estratégico conciso (máximo 150 palabras) en español sobre cómo ganar usando a este luchador.
    Enfócate en qué estadísticas abusar (ej. si tiene alta velocidad, golpear y correr) y qué movimientos priorizar para llenar el medidor.
    ${opponentType ? `Consejo específico contra un oponente tipo ${opponentType}.` : ''}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No hay estrategia disponible en este momento.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "El entrenador IA está fuera de línea. Intenta de nuevo más tarde.";
  }
};