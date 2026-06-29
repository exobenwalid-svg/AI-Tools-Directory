# Supabase Integration Guide for AILIQ

Step-by-step instructions to connect AILIQ to Supabase production database.

## Prerequisites

- Supabase account (free at https://supabase.com)
- This AILIQ project with data architecture in place
- Text editor for SQL
- 15 minutes

---

## Step 1: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - **Project Name**: `ailiq-production` (or any name)
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users (US-East-1 for US)
4. Click "Create new project"
5. Wait 2-3 minutes for project to initialize

---

## Step 2: Get Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **Anon Public Key** (labeled "anon public")
3. Save these for Step 5

---

## Step 3: Create Database Tables

1. In Supabase, go to **SQL Editor**
2. Click "New Query"
3. Paste this SQL (creates all tables):

```sql
-- Create tools table
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT,
  rating NUMERIC(3, 2) NOT NULL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  pros TEXT[] DEFAULT ARRAY[]::TEXT[],
  cons TEXT[] DEFAULT ARRAY[]::TEXT[],
  affiliate_url TEXT,
  official_url TEXT,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  pricing_tiers JSONB DEFAULT '[]'::JSONB,
  faqs JSONB DEFAULT '[]'::JSONB,
  alternatives TEXT[] DEFAULT ARRAY[]::TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create blog_posts table (optional)
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  author TEXT NOT NULL,
  featured_image TEXT,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create comparisons table (optional)
CREATE TABLE comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  tool_ids TEXT[] NOT NULL,
  comparison_matrix JSONB,
  winner TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_tools_category ON tools(category);
CREATE INDEX idx_tools_featured ON tools(featured);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at);
CREATE INDEX idx_comparisons_slug ON comparisons(slug);

-- Optional: Enable RLS (Row Level Security)
-- Uncomment these to enable RLS:
-- ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "tools are public" ON tools FOR SELECT USING (true);
-- CREATE POLICY "categories are public" ON categories FOR SELECT USING (true);
```

4. Click "Run" (Play button)
5. Wait for success message

---

## Step 4: Load Initial Data

There are two options:

### Option A: Load Seed Data (Recommended for testing)

1. In Supabase, go to **SQL Editor** → **New Query**
2. Paste the seed data SQL below (prepared from `data/tools/seed/index.ts`)

```sql
-- Insert categories
INSERT INTO categories (id, name, slug, description) VALUES
('01ed34b5-9a8f-4bb9-b5f7-1234567890a1', 'Writing & Content', 'writing-content', 'AI tools for writing, copywriting, and content creation'),
('01ed34b5-9a8f-4bb9-b5f7-1234567890a2', 'Image Generation', 'image-generation', 'Create images, artwork, and visual content with AI'),
('01ed34b5-9a8f-4bb9-b5f7-1234567890a3', 'Coding & Development', 'coding-development', 'AI coding assistants and development tools'),
('01ed34b5-9a8f-4bb9-b5f7-1234567890a4', 'Productivity', 'productivity', 'Streamline workflows and boost productivity');

-- Insert tools (ChatGPT)
INSERT INTO tools (slug, name, category, price, short_description, full_description, rating, review_count, pros, cons, affiliate_url, official_url, images, pricing_tiers, faqs, alternatives, featured, tags, created_at, updated_at) VALUES
(
  'chatgpt',
  'ChatGPT',
  'Writing & Content',
  'freemium',
  'Advanced conversational AI for writing, analysis, and creative projects with natural language understanding.',
  'ChatGPT is an AI chatbot powered by GPT-4 that excels at writing, summarization, brainstorming, and coding assistance. It offers a free tier and premium plans with enhanced capabilities.',
  4.8,
  2541,
  ARRAY['Highly versatile across multiple tasks', 'Natural and coherent responses', 'Free tier available', 'Great for brainstorming and ideation'],
  ARRAY['Knowledge cutoff date limits', 'Sometimes produces hallucinated information', 'Premium subscription required for full features'],
  'https://platform.openai.com/signup',
  'https://chatgpt.com',
  ARRAY['/images/tools/chatgpt.jpg'],
  '[{"name": "Free", "price": "$0", "features": ["Access to GPT-3.5", "Basic conversation", "Limited usage"]}, {"name": "Plus", "price": "$20/month", "features": ["GPT-4 access", "Priority support", "Advanced features", "Higher usage limits"]}]'::JSONB,
  '[{"question": "Is ChatGPT free?", "answer": "Yes, ChatGPT offers a free tier powered by GPT-3.5. A paid Plus subscription ($20/month) provides access to GPT-4 and additional features."}, {"question": "Can I use ChatGPT for commercial purposes?", "answer": "Yes, both free and paid users can use ChatGPT for commercial purposes, subject to the terms of service."}, {"question": "How accurate is ChatGPT?", "answer": "ChatGPT is generally accurate but can sometimes produce hallucinations or outdated information. Always verify critical information."}]'::JSONB,
  ARRAY['claude-ai', 'google-gemini'],
  true,
  ARRAY['writing', 'coding', 'research', 'popular'],
  NOW(),
  NOW()
);

-- Add more tools as needed...
```

3. Click "Run"
4. Verify data appears in **Table Editor** → **tools**

### Option B: Use Your Own Data

1. Prepare tool data in JSON/SQL format
2. Insert using Supabase Table Editor UI:
   - Go to **Table Editor**
   - Select **tools** table
   - Click "Insert row"
   - Fill in fields
   - Repeat for each tool

---

## Step 5: Set Environment Variables

1. In v0, click Settings (top right) → "Vars"
2. Add these two variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Project URL (from Step 2) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Anon Public Key (from Step 2) |

3. Click "Save"

---

## Step 6: Test Connection

1. Go back to your v0 Preview
2. Refresh the page
3. Check the console for any errors:
   - Open DevTools (F12)
   - Look for `[AILIQ]` log messages
4. If connected correctly, you should see:
   - No "Supabase not configured" warnings
   - Tools loading from database instead of seed data

---

## Step 7: Verify Data

Test that everything is working:

1. **Homepage**: Should still render
2. **View page source**: Should show seed data or DB data (inspect HTML)
3. **Console**: Should show `[v0] Supabase connected` or similar

---

## Troubleshooting

### "Failed to load data"

- ✓ Check environment variables are set correctly (copy-paste exactly)
- ✓ Verify Project URL and API key match your Supabase project
- ✓ Check that tables exist: Go to Supabase → Table Editor
- ✓ Reload the page with hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### "Tables not found" error

- ✓ Go to Supabase → SQL Editor
- ✓ Verify all table creation queries ran successfully
- ✓ Check Table Editor shows `tools`, `categories`, `blog_posts`, `comparisons`

### Data not showing in preview

- ✓ Verify rows exist in Supabase Table Editor
- ✓ Check data matches schema (especially JSON fields like `pricing_tiers`)
- ✓ Try fetching from browser console:
  ```javascript
  fetch('https://your-project.supabase.co/rest/v1/tools', {
    headers: { 'apikey': 'your-anon-key' }
  }).then(r => r.json()).then(console.log)
  ```

### Still getting seed data?

- ✓ Environment variables not set? Go back to Step 5
- ✓ Typo in env var name? Must be exactly `NEXT_PUBLIC_SUPABASE_URL`
- ✓ App not restarted? Hard refresh or restart dev server

---

## Next Steps

1. **Add more tools**: Use Supabase Table Editor or SQL
2. **Add blog posts**: Insert into `blog_posts` table
3. **Create comparisons**: Add to `comparisons` table
4. **Enable RLS** (optional): Add row-level security policies

---

## Queries That Now Work

With Supabase connected, all these queries automatically use your database:

```typescript
// All from lib/tools/queries.ts
fetchTools()                    // All tools
fetchToolBySlug('chatgpt')      // Single tool
fetchToolsByCategory('Writing & Content')
searchTools('GPT')
getRelatedTools('chatgpt')
getFeaturedTools()
getCategories()
```

**Frontend code doesn't change** - it all just works!

---

## Reference

- **Supabase Docs**: https://supabase.com/docs
- **SQL Guide**: https://supabase.com/docs/reference/sql
- **API Guide**: https://supabase.com/docs/reference/javascript
- **DATA_ARCHITECTURE.md**: Full technical documentation in this project

