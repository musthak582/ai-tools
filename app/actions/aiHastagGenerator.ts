'use server'
import { HashtagStyle, Platform } from "@/types";
import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateHashtags = async (
  caption: string,
  platform: Platform,
  style: HashtagStyle
): Promise<string> => {
  
  let platformInstructions = "";
  
  switch (platform) {
    case Platform.INSTAGRAM:
      platformInstructions = "Generate 15-30 mixed popularity tags.";
      break;
    case Platform.TIKTOK:
      platformInstructions = "Generate trending, catchy, high-velocity tags. Mix of broad and niche.";
      break;
    case Platform.YOUTUBE:
      platformInstructions = "Generate SEO keyword-focused tags relevant for search.";
      break;
    case Platform.TWITTER:
      platformInstructions = "Generate exactly 5-10 short, punchy, high-impact tags.";
      break;
    case Platform.LINKEDIN:
      platformInstructions = "Generate professional, industry-specific, corporate-friendly tags.";
      break;
    case Platform.FACEBOOK:
      platformInstructions = "Generate a balanced mix of broad and niche tags.";
      break;
  }

  const prompt = `
    You are an expert social media strategist.
    Generate a list of hashtags for the following input text.
    
    Input Text: "${caption}"
    Target Platform: ${platform}
    Style Goal: ${style}
    
    Rules:
    1. ${platformInstructions}
    2. Adhere strictly to the requested Style Goal.
    3. Return ONLY the hashtags separated by spaces.
    4. Do NOT include any introductory text, explanations, or bullet points.
    5. Do NOT number the tags.
    6. Ensure every tag starts with #.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text!.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate hashtags. Please check your API key or try again.");
  }
};