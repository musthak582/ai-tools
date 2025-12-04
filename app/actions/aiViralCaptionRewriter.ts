'use server'

import { CaptionStyle, Platform } from "@/types";
import { GoogleGenAI } from "@google/genai";


const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

export const rewriteCaption = async (
  caption: string,
  style: CaptionStyle,
  platform: Platform
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your configuration.");
  }

  const systemInstruction = `You are a world-class social media manager and copywriter.
Your task is to rewrite the provided caption to maximize engagement, virality, and clarity.

Guidelines:
- Maintain the core meaning of the original message.
- Adapt the tone to fit the selected platform (e.g., professional for LinkedIn, casual for TikTok).
- If the style is "Short & Punchy", keep it very brief.
- If the style is "Viral", use hooks or psychological triggers suitable for the platform.
- Do NOT add hashtags unless absolutely necessary for the context.
- Return ONLY the rewritten caption text. Do not include quotes or introductory text.`;

  const prompt = `
    Platform: ${platform}
    Style/Tone: ${style}
    Original Caption: "${caption}"
    
    Rewrite this caption.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      },
    });

    const resultText = response.text;
    if (!resultText) {
      console.error("Gemini Response is empty:", JSON.stringify(response, null, 2));
      throw new Error("No caption generated. The model might have filtered the response.");
    }

    return resultText.trim();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Propagate the actual error message if available, otherwise generic
    throw new Error(error.message || "Failed to rewrite caption. Please try again.");
  }
};