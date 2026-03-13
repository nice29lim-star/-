import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function generateResponse(prompt: string) {
  if (!ai) {
    throw new Error("Gemini API key is not configured.");
  }

  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  const response = await model;
  return response.text;
}
