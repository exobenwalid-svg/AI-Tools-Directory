# AILIQ Deployment Guide for Vercel

This guide covers deploying AILIQ to Vercel with proper environment configuration, SEO optimization, and production readiness checks.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Variables](#environment-variables)
3. [Supabase Setup](#supabase-setup)
4. [Vercel Configuration](#vercel-configuration)
5. [SEO & Indexing](#seo--indexing)
6. [Post-Deployment Validation](#post-deployment-validation)
7. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Pre-Deployment Checklist

### Code Quality

- [ ] All routes resolve without 404s
- [ ] No broken internal links
- [ ] TypeScript compilation passes (`npm run build`)
- [ ] No console errors in build output
- [ ] All metadata is dynamic (no hardcoded counts)
- [ ] All images have alt text
- [ ] All pages have unique metadata

### Content Validation

- [ ] Homepage displays correctly
- [ ] All 8 tool pages render (or number in your setup)
- [ ] All 6 comparison pages render
- [ ] All 5 blog articles render
- [ ] All trust pages (About, Contact, FAQ, Legal) are complete
- [ ] No placeholder sections visible
- [ ] No broken affiliate links
- [ ] Contact email works (test sending)

### SEO Files

- [ ] `app/sitemap.ts` exists and generates correctly
- [ ] `public/robots.txt` exists and is accessible
- [ ] `/sitemap.xml` is accessible (generated at runtime)
- [ ] Canonical URLs are correct (should be `https://www.ailiq.xyz`)
- [ ] Open Graph images exist (`/og-image.png`, `/og-image-twitter.png`)

### Branding & Brand Safety

- [ ] All pages say "AILIQ" (never "AI ToolsHub")
- [ ] Twitter handle is `@AILIQDirectory` (everywhere)
- [ ] Email is `best4liker@gmail.com` (everywhere)
- [ ] Domain is `https://www.ailiq.xyz`
- [ ] No legacy branding from previous iterations

---

## Environment Variables

### Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in with your values:
   ```env
   # Supabase (leave empty for seed mode)
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=

   # Use seed data during development
   APP_MODE=seed

   # Site configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_CONTACT_EMAIL=best4liker@gmail.com
   NEXT_PUBLIC_X_HANDLE=@AILIQDirectory
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

### Production on Vercel

1. **Required Environment Variables** (set in Vercel dashboard under Settings > Environment Variables):

   | Variable | Value | Example |
   |----------|-------|---------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase public key | `eyJhbGc...` |
   | `APP_MODE` | `database` (production) | `database` |
   | `NEXT_PUBLIC_SITE_URL` | Production domain | `https://www.ailiq.xyz` |
   | `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email | `best4liker@gmail.com` |
   | `NEXT_PUBLIC_X_HANDLE` | X/Twitter handle | `@AILIQDirectory` |

2. **Optional Variables** (for future features):

   | Variable | Value | When Needed |
   |----------|-------|-------------|
   | `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | Your Vercel Analytics ID | For Web Vitals tracking |
   | `OPENAI_API_KEY` | OpenAI API key | If adding AI content generation |
   | `ANTHROPIC_API_KEY` | Anthropic API key | If using Claude API |

3. **Never Expose** (keep in private environment or .env.local only):
   - `SUPABASE_SERVICE_KEY` (if using with protected routes later)
   - Database passwords
   - API keys for sensitive services

---

## Supabase Setup

### Database Schema (Future Migration)

When ready to move from seed data to Supabase:

1. Create these tables in Supabase SQL Editor:

   ```sql
   -- Tools table
   CREATE TABLE tools (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     slug TEXT UNIQUE NOT NULL,
     name TEXT NOT NULL,
     description TEXT,
     long_description TEXT,
     website_url TEXT,
     category TEXT,
     pricing_model TEXT,
     rating FLOAT,
     review_count INT,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Blog articles table
   CREATE TABLE blog_articles (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     slug TEXT UNIQUE NOT NULL,
     title TEXT NOT NULL,
     excerpt TEXT,
     body TEXT,
     published_at TIMESTAMP,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Comparisons table
   CREATE TABLE comparisons (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     slug_a TEXT NOT NULL,
     slug_b TEXT NOT NULL,
     comparison_data JSONB,
     created_at TIMESTAMP DEFAULT NOW(),
     UNIQUE(slug_a, slug_b)
   );
   ```

2. Update `lib/tools/queries.ts` to use Supabase:
   ```typescript
   // Uncomment Supabase logic
   // import { supabase } from '@/lib/supabase'
   ```

3. Test database connection:
   ```bash
   npm run build
   # Should complete without errors
   ```

### Authentication (Optional Future)

If adding user accounts later, create:

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Vercel Configuration

### Basic Setup

1. Connect your GitHub repository to Vercel
2. Select Next.js as the framework (auto-detected)
3. Set Root Directory to `.` (current directory)
4. Leave Build and Output settings as default

### Environment Variables in Vercel UI

1. Go to Project Settings > Environment Variables
2. Add all variables from [Environment Variables](#environment-variables) section
3. Select environments: Production, Preview, Development
4. Click "Save"

### Deployment

1. Push to main branch:
   ```bash
   git push origin main
   ```

2. Vercel automatically deploys
3. Check deployment status in Vercel Dashboard
4. Preview URL is shown (e.g., `https://ailiq-xyz.vercel.app`)

### Custom Domain

1. In Vercel Dashboard > Settings > Domains
2. Add domain: `www.ailiq.xyz`
3. Add alternate: `ailiq.xyz` (non-www)
4. Update DNS records (Vercel provides instructions)
5. Wait for SSL certificate (usually < 5 minutes)

---

## SEO & Indexing

### Before Publishing

1. **Verify Sitemap**
   ```bash
   # Test locally:
   curl http://localhost:3000/sitemap.xml
   
   # Should show XML with all pages listed
   ```

2. **Verify robots.txt**
   ```bash
   curl https://www.ailiq.xyz/robots.txt
   ```

3. **Verify Canonical URLs**
   ```bash
   # Open DevTools > Network > click any page
   # Check <link rel="canonical"> in HTML
   # Should point to https://www.ailiq.xyz/path
   ```

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://www.ailiq.xyz`
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: `https://www.ailiq.xyz/sitemap.xml`
5. Request indexing for key pages:
   - Homepage
   - /tools
   - /compare
   - /blog

### Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site: `https://www.ailiq.xyz`
3. Verify ownership
4. Submit sitemap

### Page Speed

Check with [PageSpeed Insights](https://pagespeed.web.dev):

```bash
# Test production URL
https://www.ailiq.xyz
```

Target scores:
- Lighthouse Performance: > 80
- Core Web Vitals: All Green
- FID (Interaction to Next Paint): < 100ms
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1

---

## Post-Deployment Validation

### Smoke Tests

1. **Homepage**
   - [ ] Loads in < 3 seconds
   - [ ] All nav links work
   - [ ] Featured tools display
   - [ ] CTA buttons work

2. **Directory**
   - [ ] `/tools` loads all tools
   - [ ] Each tool page loads
   - [ ] Affiliate link clicks work
   - [ ] Metadata is unique per tool

3. **Comparisons**
   - [ ] `/compare` lists comparisons
   - [ ] Each comparison page loads
   - [ ] Side-by-side layout works
   - [ ] Links to tool pages work

4. **Blog**
   - [ ] `/blog` lists articles
   - [ ] Each article loads
   - [ ] Related articles display
   - [ ] Internal links work

5. **Legal/Trust Pages**
   - [ ] `/about` loads
   - [ ] `/contact` loads and email works
   - [ ] `/faq` displays all FAQs
   - [ ] `/privacy-policy` loads
   - [ ] `/terms-of-use` loads
   - [ ] `/affiliate-disclosure` loads

6. **Footer Links**
   - [ ] All footer links work
   - [ ] Social media links are correct
   - [ ] Legal links resolve

### SEO Validation

1. **Metadata Check**
   ```bash
   # Use site:www.ailiq.xyz in Google Search
   site:www.ailiq.xyz
   
   # Should show homepage
   ```

2. **Indexing Status**
   - [ ] Wait 24-48 hours for initial indexing
   - [ ] Check Google Search Console
   - [ ] Check Bing Webmaster Tools

3. **Structured Data**
   - Use [Schema.org Validator](https://validator.schema.org/)
   - Test any page URL
   - Should show Article, Organization, or SoftwareApplication schema

---

## Monitoring & Maintenance

### Weekly Checks

- [ ] Vercel deployment status (no recent errors)
- [ ] Uptime status (site is accessible)
- [ ] 404 errors in error logs
- [ ] Build times (should be < 60 seconds)

### Monthly Checks

- [ ] Google Search Console coverage (no errors)
- [ ] Bing Webmaster Tools health
- [ ] Core Web Vitals (PageSpeed Insights)
- [ ] Broken link checker ([Dead Link Checker](https://www.deadlinkchecker.com/))
- [ ] SSL certificate expiry (should be auto-renewed by Vercel)

### Content Updates

When adding new tools/articles:

1. Update seed data (`data/tools/seed/index.ts` or database)
2. Rebuild and deploy
3. Submit new pages to Google Search Console
4. Verify in `/sitemap.xml`

When updating existing content:

1. Update content in seed data or database
2. Rebuild and deploy
3. No resubmission needed (crawler will pick up changes)

---

## Environment Variable Reference

### Supabase Configuration

```env
# Supabase project URL (visible publicly in client)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Supabase anonymous public key (visible publicly, safe)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Never use the Service Key in client-side code.**

### Application Configuration

```env
# Operating mode: 'seed' for local seed data, 'database' for Supabase
APP_MODE=seed

# Public site URL (used in metadata and OG images)
NEXT_PUBLIC_SITE_URL=https://www.ailiq.xyz

# Public contact email (shown in footer and contact page)
NEXT_PUBLIC_CONTACT_EMAIL=best4liker@gmail.com

# X/Twitter handle (used in Twitter card metadata)
NEXT_PUBLIC_X_HANDLE=@AILIQDirectory
```

### Analytics (Optional)

```env
# Vercel Web Analytics ID
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-id-here
```

---

## Troubleshooting

### Deployment Fails

1. Check build logs in Vercel Dashboard
2. Verify all environment variables are set
3. Run local build: `npm run build`
4. Check for TypeScript errors

### Sitemap Not Generated

1. Verify `app/sitemap.ts` exists
2. Check data fetching functions (may timeout)
3. In Vercel logs, search for "sitemap"
4. If seed data issue, verify `data/` files exist

### Pages Not Indexed

1. Verify robots.txt allows crawling
2. Check Google Search Console for crawl errors
3. Verify canonical URLs are correct
4. Wait 48 hours for initial indexing
5. Manually request indexing in Search Console

### Affiliate Links Broken

1. Verify `NEXT_PUBLIC_SITE_URL` is correct
2. Check affiliate URLs in tool data
3. Test affiliate link tracking in dev mode
4. Verify third-party services are operational

---

## Quick Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Supabase Dashboard](https://app.supabase.com)
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [PageSpeed Insights](https://pagespeed.web.dev)

---

## Support

For questions or issues:
- Email: best4liker@gmail.com
- X/Twitter: @AILIQDirectory

Last Updated: June 2026
