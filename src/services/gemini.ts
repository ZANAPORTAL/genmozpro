import { GoogleGenAI, Type } from "@google/genai";

// Ensure we handle the missing key gracefully in the UI, but here we assume it's set or we catch errors.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export interface BinInfo {
  bank: string;
  country: string;
  type: string;
  brand: string;
  level: string;
}

export const analyzeBinWithAI = async (bin: string): Promise<BinInfo | null> => {
  if (!apiKey || bin.length < 6) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analise o BIN (Bank Identification Number) "${bin}". 
      Retorne um JSON com os campos: bank (Nome do banco provável), country (País), type (Crédito/Débito), brand (Visa/Master etc), e level (Gold, Platinum, etc). 
      Se não souber com certeza, faça a melhor estimativa baseada em padrões. Responda APENAS o JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bank: { type: Type.STRING },
            country: { type: Type.STRING },
            type: { type: Type.STRING },
            brand: { type: Type.STRING },
            level: { type: Type.STRING },
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as BinInfo;
    }
    return null;
  } catch (error) {
    console.error("Erro ao analisar BIN com IA:", error);
    return null;
  }
};
