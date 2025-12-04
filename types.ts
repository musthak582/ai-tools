export enum CaptionStyle {
  VIRAL = "Viral/Trending",
  EMOTIONAL = "Emotional/Storytelling",
  PUNCHY = "Short & Punchy",
  FUNNY = "Humorous/Funny",
  PROFESSIONAL = "Professional/Clean",
  GEN_Z = "Slang/Gen Z",
}

export enum Platform {
  INSTAGRAM = "Instagram",
  TIKTOK = "TikTok",
  YOUTUBE = "YouTube",
  FACEBOOK = "Facebook",
  TWITTER = "Twitter/X",
  LINKEDIN = "LinkedIn",
}

export enum HashtagStyle {
  TRENDING = 'Trending/Viral',
  SEO = 'SEO Optimized',
  NICHE = 'Niche Specific',
  SHORT = 'Short & Minimal',
  LONG_TAIL = 'Long-tail Discovery',
  MIXED = 'Mixed Balanced'
}

export interface RewriteRequest {
  caption: string;
  style: CaptionStyle;
  platform: Platform;
}

export interface GenerationRequest {
  caption: string;
  platform: Platform;
  style: HashtagStyle;
}

export interface RewriteResponse {
  rewrittenCaption: string;
  error?: string;
}