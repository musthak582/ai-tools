'use server'
import { Tone } from "@/types";
import { GoogleGenAI, Type, Schema } from "@google/genai";


// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    ctas: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "A list of high-converting call-to-action button texts.",
    },
  },
  required: ["ctas"],
};

export const generateCTAs = async (
  product: string,
  niche: string,
  tone: Tone
): Promise<string[]> => {
  try {
    const prompt = `
      You are an expert conversion rate optimization (CRO) copywriter.
      Generate 8 distinct, high-converting Call-to-Action (CTA) button texts.
      
      Context:
      - Product/Goal: ${product}
      - Target Audience/Niche: ${niche || "General Audience"}
      - Tone: ${tone}

      Ensure the CTAs are concise (2-5 words), action-oriented, and persuasive.
      Return the result as a JSON object containing an array of strings.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8, // Slightly creative
      },
    });

    const jsonText = response.text || "";
    if (!jsonText) return [];

    const parsed = JSON.parse(jsonText);
    return parsed.ctas || [];
  } catch (error) {
    console.error("Error generating CTAs:", error);
    throw error;
  }
};