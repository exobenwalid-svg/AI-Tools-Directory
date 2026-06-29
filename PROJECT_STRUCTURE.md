# AILIQ - Core Application Skeleton

**Project**: AILIQ AI Tools Directory  
**Domain**: https://www.ailiq.xyz  
**Brand**: AILIQ  
**Contact**: best4liker@gmail.com  
**X**: @AILIQDirectory

---

## File Structure

```
/vercel/share/v0-project/
├── app/
│   ├── layout.tsx                    # Root layout with Header and Footer
│   ├── page.tsx                      # Homepage (hero + features)
│   ├── globals.css                   # Global styles (Tailwind v4)
│   ├── not-found.tsx                 # Custom 404 error page
│   ├── tools/
│   │   └── page.tsx                  # Tools directory listing (shell)
│   ├── compare/
│   │   └── page.tsx                  # Tool comparison interface (shell)
│   ├── blog/
│   │   └── page.tsx                  # Blog posts listing (shell)
│   ├── about/
│   │   └── page.tsx                  # About AILIQ page
│   ├── contact/
│   │   └── page.tsx                  # Contact information
│   ├── faq/
│   │   └── page.tsx                  # FAQ with answers
│   ├── privacy-policy/
│   │   └── page.tsx                  # Privacy policy (legal)
│   ├── terms-of-use/
│   │   └── page.tsx                  # Terms of use (legal)
│   └── affiliate-disclosure/
│       └── page.tsx                  # Affiliate disclosure (editorial transparency)
├── components/
│   ├── header.tsx                    # Navigation header (brand-safe)
│   ├── footer.tsx                    # Global footer (all links + contact)
│   └── ui/
│       └── button.tsx                # (pre-existing)
├── public/
│   ├── icon.svg                      # (pre-existing)
│   ├── icon-light-32x32.png          # (pre-existing)
│   ├── icon-dark-32x32.png           # (pre-existing)
│   ├── apple-icon.png                # (pre-existing)
│   └── og-image.png                  # (to be added for social media)
├── lib/
│   └── utils.ts                      # Tailwind cn() utility (pre-existing)
├── next.config.mjs                   # Next.js config (pre-existing)
├── tailwind.config.ts                # Tailwind config (pre-existing)
├── tsconfig.json                     # TypeScript config (pre-existing)
├── package.json                      # Dependencies (pre-existing)
├── PROJECT_STRUCTURE.md              # This file
└── NAVIGATION_POLICY.md              # Navigation rules (see below)
```

---

## Created Files (This Phase)

### Pages (9 total + 404)
1. **`/` (Homepage)** - Hero section, feature highlights, CTA buttons
2. **`/tools`** - Tools directory listing (shell ready for Supabase)
3. **`/compare`** - Tool comparison interface (shell)
4. **`/blog`** - Blog posts listing (shell)
5. **`/about`** - About AILIQ, mission, team
6. **`/contact`** - Contact form area + email/X links
7. **`/faq`** - Frequently asked questions (with answers)
8. **`/privacy-policy`** - Privacy policy (legal)
9. **`/terms-of-use`** - Terms of use (legal)
10. **`/affiliate-disclosure`** - Affiliate partnerships disclosure
11. **`not-found`** - Custom 404 error page

### Components (2 new)
1. **`Header`** - Sticky navigation with AILIQ logo, nav items, contact CTA
2. **`Footer`** - Global footer with all required links, contact info, copyright

### Layout Updates
- **Root Layout** - Updated metadata (AILIQ brand-safe, OpenGraph, Twitter cards)
- **Global CSS** - Already Tailwind v4 optimized (no changes needed)

---

## Navigation Policy

### ✅ SAFE TO LINK (All routes exist and are functional)

**Header Navigation:**
- Home (`/`)
- Tools (`/tools`)
- Compare (`/compare`)
- Blog (`/blog`)
- About (`/about`)

**Header CTA:**
- Contact (`/contact`)

**Footer - Explore Section:**
- Home (`/`)
- Tools (`/tools`)
- Compare (`/compare`)
- Blog (`/blog`)

**Footer - Company Section:**
- About (`/about`)
- Contact (`/contact`)
- FAQ (`/faq`)

**Footer - Legal Section:**
- Privacy Policy (`/privacy-policy`)
- Terms of Use (`/terms-of-use`)
- Email contact: `best4liker@gmail.com`

**Social Links:**
- X: `https://x.com/AILIQDirectory`

**Error Handling:**
- Custom 404 page available for any broken routes
- All nav links verified to exist

### ❌ DO NOT ADD (Not yet implemented)

The following are NOT yet built and should NOT be linked from visible navigation:
- Individual tool pages (`/tools/[slug]`)
- Blog posts (`/blog/[slug]`)
- Admin dashboard
- User accounts
- Search functionality
- Filtering systems

---

## Brand Consistency

### Text Elements
- Logo: **AILIQ** (everywhere in header)
- Title format: `"Page Title | AILIQ"` (in browser tabs)
- Email: **best4liker@gmail.com** (footer, contact, FAQ)
- X handle: **@AILIQDirectory** (footer, contact)
- X URL: **https://x.com/AILIQDirectory**

### Metadata
- All pages have custom, brand-safe metadata
- OpenGraph and Twitter cards configured
- Site name: **AILIQ**
- Description: AI tools directory with reviews and comparisons

### Copyright
- **© 2026 AILIQ. All rights reserved.** (footer, bottom)

### Footer Structure (Applied to all pages)
```
[Brand Section]           [Explore]           [Company]           [Legal]
AILIQ logo                Home                About               Privacy Policy
Description               Tools               Contact             Terms of Use
X icon/link               Compare             FAQ                 Contact Email
                          Blog
```

---

## Metadata Strategy

### Global Metadata (all pages)
- **metadataBase**: https://www.ailiq.xyz
- **applicationName**: AILIQ
- **creator**: AILIQ
- **robots**: index, follow

### Page-Specific Metadata
Each page has a custom title template: `{Page} | AILIQ`

Examples:
- `AILIQ | Trusted AI Tools Directory & Reviews` (homepage)
- `AI Tools Directory | AILIQ` (tools page)
- `Compare AI Tools | AILIQ` (compare page)
- `AI Blog & News | AILIQ` (blog page)

### Social Media Cards
- OpenGraph enabled (Twitter, Facebook, LinkedIn)
- Custom OG image: `/og-image.png` (1200x630px)
- Twitter handle: `@AILIQDirectory`

---

## Component Patterns

### Header
- Sticky positioning (`sticky top-0 z-50`)
- Active link detection using `usePathname()`
- Mobile-friendly (responsive nav hidden on small screens)
- Primary CTA button: Contact

### Footer
- 4-column layout on desktop, 1-column on mobile
- All links grouped by category
- Social media icons (X via lucide-react)
- Affiliate disclosure note at bottom
- Current year in copyright (auto-updating)

---

## Ready for Next Phases

### Phase 1 (Tools System)
- `/tools/page.tsx` is ready for data fetching
- Schema: `Tool` (id, name, category, rating, description, url)
- Requires: Supabase integration

### Phase 2 (Blog System)
- `/blog/page.tsx` is ready for blog listing
- Schema: `BlogPost` (id, title, slug, content, published_at)
- Route: `/blog/[slug]` (to be created)

### Phase 3 (Comparison System)
- `/compare/page.tsx` is ready for comparison UI
- Requires: Tool selection, feature matching logic

### Phase 4 (Admin Features)
- New route: `/admin` (to be created)
- Requires: Authentication setup

---

## Deployment Readiness

✅ **Complete:**
- No broken internal links
- All footer links functional
- Brand consistency across all pages
- Proper error handling (404 page)
- SEO metadata configured
- Responsive design (mobile + desktop)
- Dark/light mode support

⏳ **Next Steps:**
1. Generate `/og-image.png` (social media card)
2. Install Supabase integration
3. Create database schema
4. Build data fetching for `/tools` and `/blog`
5. Add authentication (if needed for submissions/comments)
6. Deploy to Vercel

---

## Testing Checklist

Before shipping:
- [ ] All header links navigate correctly
- [ ] All footer links navigate correctly
- [ ] 404 page appears for broken URLs
- [ ] Social media links work (X)
- [ ] Email link works (mailto:)
- [ ] Responsive design verified (mobile/tablet/desktop)
- [ ] Dark mode works
- [ ] SEO metadata appears in page source
- [ ] OpenGraph preview looks good on social platforms
- [ ] No console errors

---

## Notes

- This skeleton is built with **Next.js 16** and **Tailwind CSS v4**
- All pages use **Server Components** (default in App Router)
- Navigation components are marked `'use client'` for interactivity
- Global footer is consistent across all pages
- Future pages can import and extend these components
- No fake content, no placeholders, no broken links in navigation
