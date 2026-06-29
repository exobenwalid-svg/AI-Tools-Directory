# AILIQ Navigation Policy

**Goal**: Zero broken links, no fake features, no placeholder sections.

---

## Rule 1: Route Safety

**Only link to routes that exist and are functional.**

### Current Safe Routes ✅

| Route | Status | Type | Link? |
|-------|--------|------|-------|
| `/` | ✅ Functional | Homepage | YES |
| `/tools` | ✅ Functional | Directory Shell | YES |
| `/compare` | ✅ Functional | Comparison Shell | YES |
| `/blog` | ✅ Functional | Blog Listing Shell | YES |
| `/about` | ✅ Functional | Info | YES |
| `/contact` | ✅ Functional | Info | YES |
| `/faq` | ✅ Functional | Info | YES |
| `/privacy-policy` | ✅ Functional | Legal | YES |
| `/terms-of-use` | ✅ Functional | Legal | YES |
| `/affiliate-disclosure` | ✅ Functional | Editorial | YES |

### Currently NOT Safe ❌

| Route | Why | Action |
|-------|-----|--------|
| `/tools/[slug]` | Not created | Don't link until built |
| `/blog/[slug]` | Not created | Don't link until built |
| `/admin` | Not created | Don't link until built |
| `/search` | Not created | Don't link until built |
| `/categories/[slug]` | Not created | Don't link until built |

---

## Rule 2: Feature Completeness

**Only display features that work end-to-end.**

### Current Features ✅

| Feature | Where | Status |
|---------|-------|--------|
| Navigation | Header | Fully functional |
| Footer links | Footer | Fully functional |
| 404 handling | Broken URLs | Custom page shown |
| Homepage CTAs | Homepage | Functional buttons |
| SEO metadata | All pages | Configured |
| Social links | Footer, Contact | Working (X) |
| Email contact | Footer, Contact, About, FAQ | `mailto:` link |

### Incomplete Features ❌

| Feature | Issue | Plan |
|---------|-------|------|
| Tools listing | Shows placeholder grid | Replace with Supabase query |
| Tool filters | Not functional | Build category/search system |
| Blog posts | Shows placeholder cards | Replace with blog listing from DB |
| Compare functionality | Shows empty state | Build comparison engine |
| Search | No search visible | Add search UI + backend |

---

## Rule 3: Content Integrity

**No fake counts, no inflated metrics, no lorem ipsum.**

### Do ✅
- Use placeholder styling (grids, cards, spacing)
- Show actual text (real descriptions, real titles)
- Link to actual email and X accounts
- Display real legal documents

### Don't ❌
- Show fake tool counts (e.g., "500+ tools" when 0 in DB)
- Display fake star ratings
- Show fabricated "trending" or "popular" lists
- Include lorem ipsum or placeholder copy in public text

---

## Rule 4: Header Navigation Governance

### What Goes in Header
- Only main navigation items that lead to functional pages
- A single CTA button (Contact)

### Current Header ✅
```
Logo: AILIQ
Nav:  Home | Tools | Compare | Blog | About
CTA:  Contact
```

### Never Add to Header ❌
- Broken links
- "Coming Soon" labels
- Non-functional dropdown menus
- Features not yet built

---

## Rule 5: Footer Link Governance

### Organize By Category

**Explore** (Product sections)
- Home
- Tools
- Compare
- Blog

**Company** (About/contact)
- About
- Contact
- FAQ

**Legal** (Compliance)
- Privacy Policy
- Terms of Use
- Email contact

**Social** (AILIQ social)
- X (@AILIQDirectory)

### Rules
- All links must be functional
- All link text must match actual page titles
- No "Coming Soon" or "Under Development"
- Update footer if adding new pages

---

## Rule 6: Metadata Consistency

Every page must have:

### Required Metadata
```tsx
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Brief, accurate description (150-160 chars)',
}
```

### Brand Consistency
- Ensure titles follow format: `{Page Title} | AILIQ` or just `AILIQ`
- Use actual, not placeholder, descriptions
- Don't include version numbers or "v1.0"

---

## Rule 7: Error Handling

### 404 Pages
- Custom 404 page exists at `/app/not-found.tsx`
- Shows helpful message + links to main sections
- Automatically applies to broken routes

### Dead Links
- Test footer links monthly
- Test header links before each deployment
- Verify email and X links in tools section

---

## Rule 8: When Adding New Pages

Before adding a new route:

1. ✅ **Route exists**: Create the file structure
2. ✅ **Content complete**: Add actual text, not placeholders
3. ✅ **Metadata set**: Add title, description, Open Graph
4. ✅ **Links verified**: Check all internal/external links
5. ✅ **Navigation updated**: Add to header OR footer (not hidden)
6. ✅ **Testing done**: Visit the page, check 404 fallback
7. ✅ **No regressions**: Verify other pages still work

---

## Rule 9: Periodic Audits

### Monthly
- [ ] Test all footer links work
- [ ] Test all header navigation works
- [ ] Verify email address still valid
- [ ] Verify X account link works

### Before Each Deployment
- [ ] No console errors on any page
- [ ] All internal links point to existing routes
- [ ] Social media links functional
- [ ] Mobile responsive (check on phone)
- [ ] Metadata correct (check in page source)

### On Demand (After Changes)
- [ ] If you added a new page, test it fully
- [ ] If you changed header/footer, verify all links
- [ ] If you updated metadata, spot-check a few pages
- [ ] If you changed routes, update this policy

---

## Rule 10: Communication

### Add New Route or Feature
**Tell the team** (or yourself):
1. What route was added: `/path/to/new-page`
2. What it does: Brief description
3. Where it's linked from: Header, Footer, or nowhere yet
4. Status: Complete or Shell/Placeholder

**Example**:
> Added `/blog/[slug]` route for individual blog posts. Linked from blog listing page. Currently a shell, awaiting database integration.

---

## Enforcement

### Automated
- TypeScript will catch broken imports
- 404 page handles missing routes
- Build will fail if `next.config.mjs` has issues

### Manual
- Code review: Check no broken links before merging
- Deployment: Test header/footer on staging
- Production: Spot-check main routes after deployment

---

## Current Status

**As of this phase:**
- ✅ All header links functional
- ✅ All footer links functional
- ✅ 404 page ready
- ✅ No broken internal links
- ✅ Brand consistent
- ✅ Metadata complete
- ✅ Ready for Phase 1 (Supabase + Tools)

---

## Next Phases

### Phase 1: Tools System
- Create `/tools/[slug]/page.tsx`
- Query tools from Supabase
- Link individual tool cards from `/tools`

### Phase 2: Blog System
- Create `/blog/[slug]/page.tsx`
- Query posts from Supabase
- Link blog cards from `/blog`

### Phase 3: Enhanced Features
- Add search functionality (if route needed, document here first)
- Add filtering (document new routes)
- Add user comments (if auth route needed, document first)

---

## Questions Before Adding Features

Ask before building:

1. **Does this need a new route?** (If yes, document above before building)
2. **Will it be linked from header/footer?** (If yes, ensure it's complete)
3. **Is there test data in the database?** (If it needs data, set it up first)
4. **Will it be visible to users?** (If yes, ensure it's 100% functional)
5. **Does it break any existing links?** (If yes, update this policy)

---

## TL;DR

**No broken links. No fake features. No placeholders in public text. Test before shipping.**
