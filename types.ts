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

export interface RewriteRequest {
  caption: string;
  style: CaptionStyle;
  platform: Platform;
}

export interface RewriteResponse {
  rewrittenCaption: string;
  error?: string;
}
