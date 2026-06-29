# AILIQ Data Architecture

Complete guide to the AILIQ data layer and Supabase integration strategy.

## Overview

AILIQ uses a **layered data access pattern** that allows seamless switching between seed data (development) and Supabase (production) without changing any frontend code.

### Key Principles

1. **Single Point of Access**: All data queries go through `lib/tools/queries.ts`
2. **Type Normalization**: Frontend types are independent of data source
3. **Graceful Fallback**: Seed data works immediately; Supabase activates when configured
4. **No Breaking Changes**: Frontend components never care about data source
5. **Easy Scaling**: Move from 8 seed tools to 500+ without refactoring

---

## File Structure

```
lib/tools/
├── types.ts                 # Normalized frontend types
├── supabase-client.ts       # Singleton Supabase client
├── queries.ts               # All data access functions
└── mappers.ts               # Supabase row → Tool type converters

data/tools/
└── seed/
    └── index.ts             # Starter dataset (8 tools, 4 categories)
```

---

## Type System

### Core Types (`lib/tools/types.ts`)

All frontend code uses these normalized types. They're completely independent of Supabase schema:

```typescript
type Tool = {
  id: string
  slug: string
  name: string
  category: string
  price: 'free' | 'freemium' | 'paid' | 'enterprise'
  short_description: string
  full_description?: string
  rating: number // 0-5
  review_count?: number
  pros: string[]
  cons: string[]
  affiliate_url?: string
  official_url?: string
  images: string[]
  pricing_tiers: PricingTier[]
  faqs: ToolFAQ[]
  alternatives: string[] // Slugs
  featured: boolean
  created_at: string
  updated_at: string
  tags?: string[]
}

type ToolCategory = {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  count?: number
}
```

---

## Data Access Layer

### Available Functions

#### Fetch Functions

```typescript
// Fetch all tools with optional filters
fetchTools(filters?: FilterParams): Promise<Tool[]>

// Fetch single tool by slug
fetchToolBySlug(slug: string): Promise<Tool | null>

// Fetch tools by category
fetchToolsByCategory(category: string, limit?: number): Promise<Tool[]>

// Search tools by query
searchTools(query: string, limit?: number): Promise<Tool[]>

// Get related tools (alternatives)
getRelatedTools(slug: string, limit?: number): Promise<Tool[]>

// Get featured tools
getFeaturedTools(limit?: number): Promise<Tool[]>

// Get all categories
getCategories(): Promise<ToolCategory[]>
```

#### Filter Options

```typescript
type FilterParams = {
  category?: string
  price_range?: 'free' | 'freemium' | 'paid'
  min_rating?: number
  sort?: 'newest' | 'rating' | 'name'
  page?: number
  per_page?: number
}
```

---

## Current State: Seed Data Mode

### When Supabase is NOT configured:

1. **Startup**: `queries.ts` loads `data/tools/seed/index.ts` (8 tools, 4 categories)
2. **Filtering**: All filters work client-side using array methods
3. **Search**: In-memory string matching
4. **Performance**: Instant (no network calls)

### Seed Tools (Starter Dataset)

The seed includes 8 representative tools across 4 categories:

| Tool | Category | Price | Rating | Featured |
|------|----------|-------|--------|----------|
| ChatGPT | Writing & Content | Freemium | 4.8 | ✓ |
| Claude | Writing & Content | Freemium | 4.7 | ✓ |
| Copy.ai | Writing & Content | Freemium | 4.5 | |
| Midjourney | Image Generation | Paid | 4.9 | ✓ |
| DALL-E 3 | Image Generation | Freemium | 4.7 | |
| GitHub Copilot | Coding & Development | Paid | 4.8 | ✓ |
| Tabnine | Coding & Development | Freemium | 4.6 | |
| Notion AI | Productivity | Paid | 4.6 | |

Each tool includes:
- Complete pricing tiers with descriptions
- 2-4 detailed FAQs (not empty arrays)
- Pros/cons lists
- Links (affiliate, official)
- Images
- Realistic review counts
- Related tools

---

## Future State: Supabase Integration

### To Enable Supabase:

1. **Create Supabase Project** at supabase.com
2. **Set Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. **Create Tables** (see schema below)
4. **Seed Database** with production data
5. **Restart App** - No code changes needed!

### Activation Flow

When env vars are set:

```
queries.ts → isSupabaseEnabled() → true
         ↓
    getSupabaseClient() (returns client)
         ↓
    Queries run against Supabase
         ↓
    mapSupabaseToolToTool() normalizes rows
         ↓
    Frontend receives Tool[] (same as seed mode)
```

---

## Supabase Schema

### tables table

```sql
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL, -- 'free', 'freemium', 'paid', 'enterprise'
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

CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_tools_category ON tools(category);
CREATE INDEX idx_tools_featured ON tools(featured);
```

### categories table

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
```

### Optional: blog_posts table

```sql
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

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at);
```

### Optional: comparisons table

```sql
CREATE TABLE comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  tool_ids TEXT[] NOT NULL, -- Array of tool IDs being compared
  comparison_matrix JSONB, -- Structured comparison data
  winner TEXT, -- Slug of recommended tool
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comparisons_slug ON comparisons(slug);
```

---

## Usage Examples

### In a Server Component

```typescript
// app/tools/page.tsx
import { fetchTools } from '@/lib/tools/queries'

export default async function ToolsPage() {
  const tools = await fetchTools({
    category: 'Writing & Content',
    sort: 'rating',
    page: 1,
    per_page: 20,
  })

  return (
    <div>
      {tools.map((tool) => (
        <div key={tool.id}>
          <h3>{tool.name}</h3>
          <p>{tool.short_description}</p>
          <p>Rating: {tool.rating}/5</p>
        </div>
      ))}
    </div>
  )
}
```

### In a Tool Detail Page

```typescript
// app/tools/[slug]/page.tsx
import { fetchToolBySlug, getRelatedTools } from '@/lib/tools/queries'

export default async function ToolPage({ params }) {
  const tool = await fetchToolBySlug(params.slug)
  
  if (!tool) {
    notFound()
  }

  const related = await getRelatedTools(params.slug, 5)

  return (
    <div>
      <h1>{tool.name}</h1>
      <p>{tool.full_description}</p>
      
      <section>
        <h2>Pricing</h2>
        {tool.pricing_tiers.map((tier) => (
          <div key={tier.name}>{tier.name}: {tier.price}</div>
        ))}
      </section>

      <section>
        <h2>FAQs</h2>
        {tool.faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>

      <section>
        <h2>Related Tools</h2>
        {related.map((t) => (
          <Link key={t.slug} href={`/tools/${t.slug}`}>
            {t.name}
          </Link>
        ))}
      </section>
    </div>
  )
}
```

### Search

```typescript
// app/search/page.tsx
import { searchTools } from '@/lib/tools/queries'

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || ''
  const results = await searchTools(query, 50)

  return (
    <div>
      <h1>Search results for "{query}"</h1>
      <p>Found {results.length} tools</p>
      {results.map((tool) => (
        <div key={tool.id}>{tool.name}</div>
      ))}
    </div>
  )
}
```

---

## Migration Path

### Phase 1: Seed Data (Current)
- 8 representative tools
- All queries work
- Filters, search, sorting work
- Perfect for UI development and testing

### Phase 2: Supabase Integration
- Set environment variables
- Create Supabase project
- Create tables (SQL provided)
- Load seed data into database
- Restart application
- No code changes - everything still works!

### Phase 3: Expand Dataset
- Add more tools to database
- Update categories
- Add blog posts
- Add comparison pages
- All using same query functions

### Phase 4: Admin Dashboard
- Build tool management interface
- CRUD operations for tools
- Still uses same queries

---

## Important Notes

### Data Source Detection

```typescript
// Automatic detection - no manual configuration
isSupabaseEnabled(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && 
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
```

If both env vars are set → Use Supabase  
If either is missing → Use seed data

### Mappers

The `mappers.ts` file converts Supabase rows to normalized `Tool` types. Any schema changes should:

1. Update `SupabaseToolRow` interface
2. Update mapper function
3. Everything else still works

### Error Handling

All query functions return empty arrays or null on error (never throw). This ensures graceful degradation.

```typescript
try {
  const data = await supabaseQuery()
  return data
} catch (error) {
  console.error('[AILIQ]', error)
  return [] // Graceful fallback
}
```

---

## Next Steps

1. **Create Supabase Project**: https://supabase.com
2. **Create Tables**: Copy SQL from schema section into SQL Editor
3. **Set Environment Variables**: Add to project settings
4. **Test**: Run `npm run dev` and verify data loads

No code changes needed - the architecture handles everything!
