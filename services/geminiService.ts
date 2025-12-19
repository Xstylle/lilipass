
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini with API key from environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTravelAdvice = async (userQuery: string, context?: string) => {
  try {
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `You are a professional travel consultant for Lilipas Travel. 
    You provide expert advice on tour destinations, best times to visit, packing tips, and itinerary suggestions.
    Be friendly, enthusiastic, and helpful. Keep responses concise but informative.
    Current context: ${context || 'General travel inquiry'}`;

    const response = await ai.models.generateContent({
      model,
      contents: userQuery,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our AI consultant is currently taking a short break. Please contact our support team directly!";
  }
};
