/**
 * Seed data for AILIQ
 * This is the initial dataset for local development and early testing
 * When Supabase is connected, this will be superseded by database data
 */

import { Tool, ToolCategory } from '@/lib/tools/types'

export const categories: ToolCategory[] = [
  {
    id: '1',
    name: 'Writing & Content',
    slug: 'writing-content',
    description: 'AI tools for writing, copywriting, and content creation',
    count: 3,
  },
  {
    id: '2',
    name: 'Image Generation',
    slug: 'image-generation',
    description: 'Create images, artwork, and visual content with AI',
    count: 2,
  },
  {
    id: '3',
    name: 'Coding & Development',
    slug: 'coding-development',
    description: 'AI coding assistants and development tools',
    count: 2,
  },
  {
    id: '4',
    name: 'Productivity',
    slug: 'productivity',
    description: 'Streamline workflows and boost productivity',
    count: 1,
  },
]

export const tools: Tool[] = [
  // Writing & Content
  {
    id: '1',
    slug: 'chatgpt',
    name: 'ChatGPT',
    category: 'Writing & Content',
    price: 'freemium',
    short_description:
      'Advanced conversational AI for writing, analysis, and creative projects with natural language understanding.',
    full_description:
      'ChatGPT is an AI chatbot powered by GPT-4 that excels at writing, summarization, brainstorming, and coding assistance. It offers a free tier and premium plans with enhanced capabilities.',
    rating: 4.8,
    review_count: 2541,
    pros: [
      'Highly versatile across multiple tasks',
      'Natural and coherent responses',
      'Free tier available',
      'Great for brainstorming and ideation',
    ],
    cons: [
      'Knowledge cutoff date limits',
      'Sometimes produces hallucinated information',
      'Premium subscription required for full features',
    ],
    official_url: 'https://chatgpt.com',
    affiliate_url: 'https://platform.openai.com/signup',
    images: ['/images/tools/chatgpt.jpg'],
    pricing_tiers: [
      {
        name: 'Free',
        price: '$0',
        features: ['Access to GPT-3.5', 'Basic conversation', 'Limited usage'],
      },
      {
        name: 'Plus',
        price: '$20/month',
        features: ['GPT-4 access', 'Priority support', 'Advanced features', 'Higher usage limits'],
      },
    ],
    faqs: [
      {
        question: 'Is ChatGPT free?',
        answer: 'Yes, ChatGPT offers a free tier powered by GPT-3.5. A paid Plus subscription ($20/month) provides access to GPT-4 and additional features.',
      },
      {
        question: 'Can I use ChatGPT for commercial purposes?',
        answer: 'Yes, both free and paid users can use ChatGPT for commercial purposes, subject to the terms of service.',
      },
      {
        question: 'How accurate is ChatGPT?',
        answer: 'ChatGPT is generally accurate but can sometimes produce hallucinations or outdated information. Always verify critical information.',
      },
    ],
    alternatives: ['claude-ai', 'google-gemini'],
    featured: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2025-06-15T14:30:00Z',
    tags: ['writing', 'coding', 'research', 'popular'],
  },
  {
    id: '2',
    slug: 'claude-ai',
    name: 'Claude',
    category: 'Writing & Content',
    price: 'freemium',
    short_description:
      'Anthropic\'s AI assistant focused on helpful, harmless, and honest responses with advanced reasoning capabilities.',
    full_description:
      'Claude is an AI assistant by Anthropic known for nuanced understanding, detailed analysis, and ethical reasoning. Available through Claude.ai and API.',
    rating: 4.7,
    review_count: 1820,
    pros: [
      'Thoughtful and nuanced responses',
      'Strong writing and analysis',
      'Ethical AI design',
      'Large context window (200k tokens)',
    ],
    cons: ['Smaller community compared to ChatGPT', 'Fewer third-party integrations', 'Limited free tier access'],
    official_url: 'https://claude.ai',
    affiliate_url: 'https://console.anthropic.com',
    images: ['/images/tools/claude.jpg'],
    pricing_tiers: [
      {
        name: 'Free',
        price: '$0',
        features: ['Limited daily messages', 'Claude 3 Sonnet access', 'Basic features'],
      },
      {
        name: 'Claude Pro',
        price: '$20/month',
        features: ['Unlimited messages', 'Higher quality models', 'API access'],
      },
    ],
    faqs: [
      {
        question: 'What makes Claude different from ChatGPT?',
        answer: 'Claude emphasizes ethical AI, offers larger context windows, and provides more nuanced reasoning. It excels at analysis and writing.',
      },
      {
        question: 'Can I use Claude API commercially?',
        answer: 'Yes, Claude API is available for commercial use through Anthropic\'s console with appropriate pricing.',
      },
    ],
    alternatives: ['chatgpt', 'google-gemini'],
    featured: true,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2025-06-15T14:30:00Z',
    tags: ['writing', 'analysis', 'ethical-ai'],
  },
  {
    id: '3',
    slug: 'copy-ai',
    name: 'Copy.ai',
    category: 'Writing & Content',
    price: 'freemium',
    short_description: 'AI copywriting tool that generates marketing copy, product descriptions, and creative content instantly.',
    full_description:
      'Copy.ai is a specialized AI writing assistant designed for marketing teams and content creators. It generates high-converting copy and marketing materials.',
    rating: 4.5,
    review_count: 945,
    pros: [
      'Focused on marketing and sales copy',
      'Template-based workflow',
      'Fast content generation',
      'Affordable pricing',
    ],
    cons: ['Less versatile than general AI assistants', 'Quality varies by template', 'Limited customization'],
    official_url: 'https://copy.ai',
    images: ['/images/tools/copyai.jpg'],
    pricing_tiers: [
      {
        name: 'Free',
        price: '$0',
        features: ['Limited credits', 'Basic templates'],
      },
      {
        name: 'Pro',
        price: '$49/month',
        features: ['Unlimited credits', 'All templates', 'Priority support'],
      },
    ],
    faqs: [
      {
        question: 'How many words can I generate monthly?',
        answer: 'The Free plan includes limited credits. Pro plan offers unlimited generation.',
      },
    ],
    alternatives: ['jasper-ai', 'writesonic'],
    featured: false,
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2025-06-10T14:30:00Z',
    tags: ['copywriting', 'marketing', 'content-creation'],
  },

  // Image Generation
  {
    id: '4',
    slug: 'midjourney',
    name: 'Midjourney',
    category: 'Image Generation',
    price: 'paid',
    short_description: 'AI art generator creating stunning visuals from text descriptions with exceptional quality and artistic style.',
    full_description: 'Midjourney is a leading AI image generation tool known for creating high-quality, artistic images. Used by designers, artists, and creative professionals.',
    rating: 4.9,
    review_count: 3200,
    pros: [
      'Exceptional image quality',
      'Great for artistic styles',
      'Easy to use Discord interface',
      'Active community and inspiration',
    ],
    cons: ['Requires Discord', 'Subscription-only (no free tier)', 'Limited free trial'],
    official_url: 'https://www.midjourney.com',
    images: ['/images/tools/midjourney.jpg'],
    pricing_tiers: [
      {
        name: 'Basic',
        price: '$10/month',
        features: ['3.33 hours GPU', 'Relax mode'],
      },
      {
        name: 'Standard',
        price: '$30/month',
        features: ['15 hours GPU', 'Relax and Fast modes'],
      },
      {
        name: 'Pro',
        price: '$60/month',
        features: ['30 hours GPU', 'All modes', 'Private images'],
      },
    ],
    faqs: [
      {
        question: 'Is there a free trial?',
        answer: 'Midjourney offers a limited free trial with a few free generations to test the service.',
      },
      {
        question: 'Can I use generated images commercially?',
        answer: 'Yes, users on Standard and Pro plans can use images commercially. Free trial users cannot.',
      },
    ],
    alternatives: ['dall-e-3', 'stablediffusion'],
    featured: true,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2025-06-15T14:30:00Z',
    tags: ['image-generation', 'art', 'design', 'popular'],
  },
  {
    id: '5',
    slug: 'dall-e-3',
    name: 'DALL-E 3',
    category: 'Image Generation',
    price: 'freemium',
    short_description: 'OpenAI\'s advanced image generation model creating detailed, accurate images from text descriptions.',
    full_description:
      'DALL-E 3 is OpenAI\'s latest image generation model offering improved accuracy and understanding of complex prompts. Available through ChatGPT Plus and API.',
    rating: 4.7,
    review_count: 1560,
    pros: [
      'High quality realistic images',
      'Better prompt understanding',
      'Integrated with ChatGPT',
      'Commercial use allowed for subscribers',
    ],
    cons: ['Limited free access', 'Requires ChatGPT Plus subscription', 'API costs can add up'],
    official_url: 'https://openai.com/dall-e-3',
    images: ['/images/tools/dalle.jpg'],
    pricing_tiers: [
      {
        name: 'ChatGPT Plus',
        price: '$20/month',
        features: ['DALL-E 3 included', '50 images/month', 'Image editing'],
      },
      {
        name: 'API',
        price: '$0.040 - $0.020/image',
        features: ['Pay per image', 'Commercial use', 'Higher volumes'],
        best_for: 'Developers and businesses',
      },
    ],
    faqs: [
      {
        question: 'How many images can I generate?',
        answer: 'ChatGPT Plus includes 50 images per month. API users pay per image.',
      },
    ],
    alternatives: ['midjourney', 'stablediffusion'],
    featured: false,
    created_at: '2024-02-15T10:00:00Z',
    updated_at: '2025-06-12T14:30:00Z',
    tags: ['image-generation', 'openai'],
  },

  // Coding
  {
    id: '6',
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'Coding & Development',
    price: 'paid',
    short_description: 'AI code assistant powered by Codex that suggests code completions and helps with development tasks inside your editor.',
    full_description:
      'GitHub Copilot is an AI pair programmer that helps developers write code faster by suggesting completions and solutions in real-time within their IDE.',
    rating: 4.8,
    review_count: 2100,
    pros: [
      'Integrates with popular editors',
      'Speeds up coding significantly',
      'Great for learning new languages',
      'Handles multiple programming languages',
    ],
    cons: ['Monthly subscription required', 'Quality suggestions vary', 'Learning curve for prompting effectively'],
    official_url: 'https://github.com/features/copilot',
    images: ['/images/tools/copilot.jpg'],
    pricing_tiers: [
      {
        name: 'Individual',
        price: '$10/month',
        features: ['Code completions', 'Chat support', 'VSCode and JetBrains IDEs'],
      },
      {
        name: 'Business',
        price: '$19/user/month',
        features: ['Organization management', 'Admin controls', 'Priority support'],
        best_for: 'Teams and enterprises',
      },
    ],
    faqs: [
      {
        question: 'What IDEs does Copilot support?',
        answer: 'GitHub Copilot supports VSCode, JetBrains IDEs, Visual Studio, Vim, and Neovim.',
      },
    ],
    alternatives: ['tabnine', 'amazon-codewhisperer'],
    featured: true,
    created_at: '2024-01-05T10:00:00Z',
    updated_at: '2025-06-15T14:30:00Z',
    tags: ['coding', 'development', 'productivity'],
  },
  {
    id: '7',
    slug: 'tabnine',
    name: 'Tabnine',
    category: 'Coding & Development',
    price: 'freemium',
    short_description: 'AI code completion engine supporting 30+ languages with both cloud and local deployment options.',
    full_description: 'Tabnine is an AI coding assistant offering intelligent code completions with privacy options for local deployment.',
    rating: 4.6,
    review_count: 1340,
    pros: [
      'Supports 30+ programming languages',
      'Local deployment for privacy',
      'Free tier available',
      'Works with most IDEs',
    ],
    cons: ['Local model is less powerful than cloud', 'Occasional irrelevant suggestions', 'Setup can be complex'],
    official_url: 'https://www.tabnine.com',
    images: ['/images/tools/tabnine.jpg'],
    pricing_tiers: [
      {
        name: 'Free',
        price: '$0',
        features: ['Cloud completions', 'Single IDE'],
      },
      {
        name: 'Pro',
        price: '$15/month',
        features: ['Advanced completions', 'Local models', 'Multiple IDEs', 'Priority support'],
      },
    ],
    faqs: [
      {
        question: 'Can Tabnine work offline?',
        answer: 'Yes, Tabnine Pro includes local model options for offline use and improved privacy.',
      },
    ],
    alternatives: ['github-copilot', 'amazon-codewhisperer'],
    featured: false,
    created_at: '2024-02-20T10:00:00Z',
    updated_at: '2025-06-14T14:30:00Z',
    tags: ['coding', 'development', 'open-source'],
  },

  // Productivity
  {
    id: '8',
    slug: 'notion-ai',
    name: 'Notion AI',
    category: 'Productivity',
    price: 'paid',
    short_description: 'AI features built into Notion for writing assistance, brainstorming, and content optimization within your workspace.',
    full_description: 'Notion AI integrates artificial intelligence directly into Notion workspaces, helping users write, brainstorm, and organize better.',
    rating: 4.6,
    review_count: 890,
    pros: [
      'Seamlessly integrated with Notion',
      'Helps with writing and editing',
      'Brainstorming features',
      'Works across Notion database',
    ],
    cons: ['Only available to Notion paid plans', 'Additional $10/month cost', 'Limited compared to dedicated AI tools'],
    official_url: 'https://www.notion.so/product/ai',
    images: ['/images/tools/notion-ai.jpg'],
    pricing_tiers: [
      {
        name: 'Add-on to Notion Pro',
        price: '$10/month (+ Notion subscription)',
        features: ['AI features', 'Unlimited tokens', 'All Notion AI tools'],
      },
    ],
    faqs: [
      {
        question: 'Do I need Notion Pro to use Notion AI?',
        answer: 'Yes, Notion AI requires an active Notion paid plan (Pro or Team).',
      },
    ],
    alternatives: ['chatgpt', 'writerduet'],
    featured: false,
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2025-06-13T14:30:00Z',
    tags: ['productivity', 'writing', 'notion'],
  },
]
