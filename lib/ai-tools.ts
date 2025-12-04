export interface AITool {
  id: string;
  title: string;
  description: string;
  href: string;
  status: 'live' | 'coming-soon' | 'beta';
  category: string;
  icon?: string;
}

export const aiTools: AITool[] = [
  {
    id: 'caption_rewriter',
    title: 'AI Viral Caption Rewriter',
    description: 'Transform boring text into engaging social media gold. Optimize for any platform in seconds using AI.',
    href: '/ai-viral-caption-rewriter',
    status: 'live',
    category: 'Content Creation'
  },
  {
    id: 'hashtag-generator',
    title: 'AI Hashtag Generator',
    description: 'Boost your social media reach with AI-powered hashtag suggestions tailored for your content.',
    href: '/ai-hashtag-generator',
    status: 'live',
    category: 'Content Creation'
  },
  {
    id: 'interview-prep',
    title: 'AI Interview Coach',
    description: 'Practice interviews with AI-generated questions and feedback',
    href: '/interview',
    status: 'coming-soon',
    category: 'Career'
  },
  {
    id: 'content-rewriter',
    title: 'Content Rewriter',
    description: 'Rephrase and improve your content while maintaining meaning',
    href: '/content',
    status: 'coming-soon',
    category: 'Writing'
  },
  {
    id: 'email-writer',
    title: 'Professional Email Writer',
    description: 'Craft professional emails for various business scenarios',
    href: '/email',
    status: 'coming-soon',
    category: 'Writing'
  }
];

export const categories = Array.from(new Set(aiTools.map(tool => tool.category)));

export function getToolsByCategory(category: string): AITool[] {
  return aiTools.filter(tool => tool.category === category);
}

export function getLiveTools(): AITool[] {
  return aiTools.filter(tool => tool.status === 'live');
}