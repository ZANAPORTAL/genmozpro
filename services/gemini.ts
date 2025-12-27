
import { GoogleGenAI, Type } from "@google/genai";

export interface BinInfo {
  bank: string;
  country: string;
  country_flag: string;
  level: string;
  brand: string;
}

export const analyzeBinWithAI = async (bin: string): Promise<BinInfo | null> => {
  if (!process.env.API_KEY || bin.length < 6) return null;
  
  // Initialize GoogleGenAI instance right before the request as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a detailed technical audit for BIN/IIN prefix: "${bin}". 
      Provide the full name of the issuing bank/financial institution, the full country name, the ISO flag emoji for that country, the card brand (e.g. Visa, Mastercard), and the product level (e.g. Platinum, Infinite, Corporate).
      Return exclusively a valid JSON object.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bank: { 
              type: Type.STRING,
              description: "The full name of the issuing financial institution."
            },
            country: { 
              type: Type.STRING,
              description: "The full name of the country where the BIN is registered."
            },
            country_flag: {
              type: Type.STRING,
              description: "The emoji flag representing the country."
            },
            level: { 
              type: Type.STRING,
              description: "The product level or tier (e.g., Gold, Business, Classic)."
            },
            brand: {
              type: Type.STRING,
              description: "The card network brand."
            }
          },
          required: ["bank", "country", "country_flag", "level", "brand"]
        }
      }
    });
    
    // Access the text property directly on the response object.
    const responseText = response.text;
    if (responseText) {
      return JSON.parse(responseText.trim());
    }
    return null;
  } catch (error) {
    console.error("AI BIN Analysis Error:", error);
    return null;
  }
};
