# AILIQ Implementation Checklist

Phase 1 complete. Use this checklist to track progress through Phase 2.

---

## Phase 2: Content Pages & Data Integration

### Homepage (`/`)

- [ ] Add featured tools section
  - [ ] Import `getFeaturedTools()` from `lib/tools/queries`
  - [ ] Display in grid with images, ratings, links
  - [ ] Link each tool to `/tools/[slug]`
- [ ] Add category cards
  - [ ] Import `getCategories()` from `lib/tools/queries`
  - [ ] Show category name, description, count
  - [ ] Link to `/tools?category=slug`
- [ ] Verify static generation (`npm run build`)
- [ ] Test on preview

### Tools Directory (`/tools`)

- [ ] Create `/tools/page.tsx` (currently shell)
- [ ] Implement tool listing
  - [ ] Import `fetchTools()` 
  - [ ] Support category filter from query params
  - [ ] Display tools in grid
  - [ ] Show name, description, rating, price
  - [ ] Link to `/tools/[slug]`
- [ ] Add category sidebar
  - [ ] Import `getCategories()`
  - [ ] Display all categories
  - [ ] Show selected category highlight
  - [ ] Link to filter `/tools?category=...`
- [ ] Pagination (20 tools per page)
  - [ ] Get page from query params
  - [ ] Use `fetchTools({ page, per_page: 20 })`
  - [ ] Show prev/next buttons
- [ ] Sorting
  - [ ] Add sort dropdown (newest, rating, name)
  - [ ] Pass to `fetchTools({ sort })`
- [ ] Verify all tools appear
- [ ] Test filters work

### Tool Detail Page (`/tools/[slug]`)

- [ ] Create `/tools/[slug]/page.tsx`
- [ ] Fetch tool data
  - [ ] Use `fetchToolBySlug(slug)`
  - [ ] Show 404 if not found
- [ ] Display tool information
  - [ ] Name, category, rating, review count
  - [ ] Full description
  - [ ] Pros/cons lists
  - [ ] Official and affiliate URLs
- [ ] Pricing section
  - [ ] Display all `pricing_tiers`
  - [ ] Show name, price, features list
  - [ ] CTA button to affiliate link
- [ ] FAQs section
  - [ ] Display all `faqs` items
  - [ ] Use accordion/details components
  - [ ] Q: Question, A: Answer
- [ ] Related tools section
  - [ ] Use `getRelatedTools(slug, 5)`
  - [ ] Show as grid or carousel
  - [ ] Link to each related tool
- [ ] Images
  - [ ] Display tool images (if available)
  - [ ] Add alt text
- [ ] Affiliate disclosure
  - [ ] Show on pricing section or sidebar
  - [ ] Link to `/affiliate-disclosure`
- [ ] Test navigation between tools

### Category Pages (Optional)

- [ ] Create `/category/[slug]/page.tsx`
- [ ] Use `fetchToolsByCategory(slug)`
- [ ] Show all tools in category
- [ ] Sort/filter options
- [ ] Breadcrumb: Home > Category Name

### Search Page (`/search`)

- [ ] Create `/search/page.tsx`
- [ ] Get query from search params (`?q=...`)
- [ ] Use `searchTools(query)`
- [ ] Display results
  - [ ] Show result count
  - [ ] List tools matching query
  - [ ] Link to tool pages
- [ ] Handle empty query
  - [ ] Show message: "Enter a search term"
  - [ ] Don't show thousands of tools
- [ ] Handle no results
  - [ ] Show: "No tools found for 'xyz'"

### Navigation Integration

- [ ] Add search to header
  - [ ] Search input field
  - [ ] Submit to `/search?q=...`
  - [ ] Works on all pages
- [ ] Update header links
  - [ ] All point to working pages
  - [ ] No broken links
  - [ ] No 404s when clicked
- [ ] Update footer links
  - [ ] Already have all pages
  - [ ] Verify all working
- [ ] Add breadcrumbs to detail pages
  - [ ] Home > Tools > [Tool Name]
  - [ ] Easy navigation back

---

## Phase 3: Blog System

### Blog Architecture

- [ ] Create `blog_posts` table in Supabase (SQL provided)
- [ ] Create `lib/blog/queries.ts` (similar pattern to tools)
  - [ ] `fetchBlogPosts(filters?)`
  - [ ] `fetchBlogPostBySlug(slug)`
  - [ ] `searchBlogPosts(query)`

### Blog Listing (`/blog`)

- [ ] Create `/blog/page.tsx`
- [ ] Use `fetchBlogPosts()`
- [ ] Display blog post cards
  - [ ] Title, excerpt, date
  - [ ] Author, featured image
  - [ ] Link to blog post

### Blog Detail (`/blog/[slug]`)

- [ ] Create `/blog/[slug]/page.tsx`
- [ ] Use `fetchBlogPostBySlug(slug)`
- [ ] Display post content
  - [ ] Title, author, date
  - [ ] Featured image
  - [ ] Full post body
- [ ] Related posts sidebar
- [ ] Newsletter signup (optional)

---

## Phase 4: Comparisons

### Comparison Architecture

- [ ] Create `comparisons` table in Supabase
- [ ] Create `lib/comparisons/queries.ts`
  - [ ] `fetchComparisons()`
  - [ ] `fetchComparisonBySlug(slug)`

### Comparison Pages

- [ ] Design comparison table layout
  - [ ] Tool names across top
  - [ ] Features down left side
  - [ ] Checkmarks/X marks in cells
- [ ] Create page template
  - [ ] Fetch tools being compared
  - [ ] Build comparison matrix
  - [ ] Highlight winner/recommended

---

## Phase 5: Authentication (Optional)

- [ ] Decide: Do we need user accounts?
  - [ ] For reviews? (Future Phase)
  - [ ] For favorites? (Future Phase)
  - [ ] Just for admin? (Recommended)
- [ ] If yes: Implement auth
  - [ ] Use Better Auth or Supabase Auth
  - [ ] Admin dashboard access
  - [ ] Tool management CRUD

---

## Data Validation Checklist

As you build pages, verify data:

- [ ] No tools missing fields
  - [ ] All have `slug`
  - [ ] All have `short_description` at least
  - [ ] All have `pricing_tiers` array (not null)
  - [ ] All have `faqs` array (not empty)
- [ ] Categories match tool categories
  - [ ] No typos in category names
  - [ ] All tools have valid category
- [ ] URLs are valid
  - [ ] Affiliate URLs are real
  - [ ] Official URLs are real
- [ ] Images load
  - [ ] All image URLs return 200
  - [ ] Images have alt text
- [ ] SEO data complete
  - [ ] Title tags updated
  - [ ] Meta descriptions set
  - [ ] OG images configured

---

## Performance Checklist

- [ ] Seed data loads instantly (< 100ms)
- [ ] Supabase queries complete in < 500ms
- [ ] No N+1 queries (use Promise.all)
- [ ] Images optimized (WebP, lazy loading)
- [ ] Build stays under 100KB JS per page
- [ ] Lighthouse score > 90 on all pages

---

## Testing Checklist

- [ ] All routes generate without errors
  - [ ] `npm run build` succeeds
  - [ ] No console warnings/errors
- [ ] All links work
  - [ ] Category filters work
  - [ ] Tool detail pages load
  - [ ] Search returns results
  - [ ] Related tools link works
- [ ] Data displays correctly
  - [ ] Ratings show as 0-5
  - [ ] Prices display properly
  - [ ] FAQs expand/collapse
  - [ ] Images load
- [ ] Responsive design
  - [ ] Mobile (375px) works
  - [ ] Tablet (768px) works
  - [ ] Desktop (1200px+) works
- [ ] Accessibility
  - [ ] Links have text/aria-labels
  - [ ] Images have alt text
  - [ ] Keyboard navigation works
  - [ ] Color contrast sufficient

---

## Supabase Migration Checklist

When ready to migrate from seed data to Supabase:

- [ ] Create Supabase project
- [ ] Run table creation SQL
- [ ] Set environment variables
- [ ] Verify app still works (should just work!)
- [ ] Add more data to database
- [ ] Test with 50+ tools
- [ ] Test pagination
- [ ] Test search on large dataset
- [ ] Monitor query performance

---

## Pre-Launch Checklist

Before going live:

- [ ] All navigation links work (no 404s)
- [ ] No console errors
- [ ] Images load properly
- [ ] Mobile responsive
- [ ] Lighthouse scores > 85
- [ ] SEO metadata complete
- [ ] Analytics configured
- [ ] Error monitoring setup
- [ ] Database backups configured
- [ ] HTTPS enabled
- [ ] Affiliate disclosure visible
- [ ] Privacy policy complete
- [ ] Terms of use complete
- [ ] Legal disclaimers in place
- [ ] Contact form works
- [ ] Newsletter signup works (if applicable)

---

## File Checklist

### Required (Phase 1 - Complete)

- [x] `lib/tools/types.ts` - Type definitions
- [x] `lib/tools/queries.ts` - Query functions
- [x] `lib/tools/supabase-client.ts` - Supabase config
- [x] `lib/tools/mappers.ts` - Data converters
- [x] `data/tools/seed/index.ts` - Seed data

### Pages (Phase 2 - To Build)

- [ ] `/tools/page.tsx` - Tools directory
- [ ] `/tools/[slug]/page.tsx` - Tool detail
- [ ] `/search/page.tsx` - Search results

### Optional Pages

- [ ] `/category/[slug]/page.tsx` - Category pages
- [ ] `/blog/[slug]/page.tsx` - Blog posts
- [ ] `/comparison/[slug]/page.tsx` - Comparisons

### Already Built

- [x] `/` - Homepage (shell)
- [x] `/about` - About page
- [x] `/contact` - Contact page
- [x] `/faq` - FAQ page
- [x] `/privacy-policy` - Privacy policy
- [x] `/terms-of-use` - Terms
- [x] `/affiliate-disclosure` - Affiliate disclosure
- [x] `/blog` - Blog listing (shell)
- [x] `/compare` - Comparisons (shell)
- [x] `layout.tsx` - Root layout with header/footer
- [x] `not-found.tsx` - 404 page

---

## Documentation Checklist

- [x] `DATA_ARCHITECTURE.md` - Technical design
- [x] `SUPABASE_SETUP.md` - Integration guide
- [x] `lib/tools/README.md` - API reference
- [ ] `IMPLEMENTATION_GUIDE.md` - How to build pages (TO CREATE)
- [ ] `/docs/API.md` - Full API documentation (OPTIONAL)

---

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Connected to Vercel
- [ ] Environment variables set in Vercel
- [ ] Build succeeds on Vercel
- [ ] Preview URL works
- [ ] Production domain configured
- [ ] DNS points to Vercel
- [ ] SSL certificate active
- [ ] Analytics configured
- [ ] Error monitoring active

---

## Team Communication

- [ ] Share PHASE_1_COMPLETE.md with team
- [ ] Share this checklist with team
- [ ] Weekly standup on progress
- [ ] Block reviewers for code PRs
- [ ] Verify before merging to main

---

## Status Summary

| Phase | Status | ETA |
|-------|--------|-----|
| 0: Skeleton | ✅ Complete | - |
| 1: Data Layer | ✅ Complete | - |
| 2: Content Pages | ⏳ In Progress | 2-3 days |
| 3: Blog | 📋 Planned | 1-2 days |
| 4: Comparisons | 📋 Planned | 1-2 days |
| 5: Admin | 📋 Planned | 3-5 days |
| 6: Auth/Reviews | 📋 Planned | 2-3 days |
| 7: Polish | 📋 Planned | 2-3 days |
| 8: Launch | 📋 Planned | - |

**Total**: 3-4 weeks to production-ready

---

Print this checklist and mark items as you complete them!
