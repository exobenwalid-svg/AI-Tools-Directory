# AILIQ Launch Checklist
**Ready for Vercel Production Deployment**

---

## PRE-DEPLOYMENT (Do Before Pushing to Production)

### Code & Build
- [x] `npm run build` passes without errors
- [x] No TypeScript errors
- [x] No console errors
- [x] All 30 pages pre-rendered
- [x] All routes accessible
- [x] No broken internal links

### Branding & Content
- [x] AILIQ branding consistent throughout
- [x] Email address: best4liker@gmail.com
- [x] X handle: @AILIQDirectory
- [x] Domain: https://www.ailiq.xyz
- [x] All pages have unique metadata
- [x] FAQ fully populated with 24 Q&A pairs
- [x] Blog has 5 complete articles
- [x] Tools directory has 8 tools
- [x] Comparisons page has 6 curations
- [x] No placeholder or "coming soon" text
- [x] All links work (footer, header, internal)

### Configuration
- [x] Environment variables documented in .env.example
- [x] vercel.json properly configured
- [x] Security headers configured
- [x] Next.js config optimized
- [x] No secrets in code

### Trust & Legal
- [x] Privacy Policy page complete
- [x] Terms of Use page complete
- [x] Affiliate Disclosure page present
- [x] About page explains methodology
- [x] Contact page has email + X handle
- [x] FAQ has affiliate questions
- [x] Footer has all legal links

### SEO & Discovery
- [x] Sitemap generator at /sitemap.xml
- [x] Robots.txt configured
- [x] All pages have canonical URLs
- [x] All pages have OG tags
- [x] All pages have Twitter cards
- [x] Structured data schema for tools
- [x] Structured data schema for articles
- [x] Structured data schema for comparisons

---

## VERCEL DEPLOYMENT STEPS

### Step 1: Connect Repository
- [ ] Create Vercel project at https://vercel.com
- [ ] Connect GitHub repository
- [ ] Select "Next.js" framework
- [ ] Vercel auto-detects configuration

### Step 2: Environment Variables
In Vercel Dashboard → Project Settings → Environment Variables, add:

```
NEXT_PUBLIC_SITE_URL=https://www.ailiq.xyz
NEXT_PUBLIC_CONTACT_EMAIL=best4liker@gmail.com
NEXT_PUBLIC_X_HANDLE=@AILIQDirectory
```

(Optional for Supabase later):
```
NEXT_PUBLIC_SUPABASE_URL=[your-supabase-url]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-supabase-key]
APP_MODE=database
```

### Step 3: Deploy
- [ ] Push to main branch (or merge PR)
- [ ] Vercel automatically triggers build
- [ ] Build completes (expect ~8 seconds)
- [ ] Deployment succeeds
- [ ] Check deployment logs for warnings/errors

### Step 4: Domain Configuration
- [ ] Go to Vercel Project Settings → Domains
- [ ] Add custom domain: ailiq.xyz
- [ ] Add www subdomain: www.ailiq.xyz
- [ ] Update DNS records if needed
- [ ] Vercel provides SSL certificate automatically

---

## POST-DEPLOYMENT TESTING (First 24 Hours)

### Critical Path Tests
- [ ] Homepage loads at https://www.ailiq.xyz
- [ ] Header navigation works
- [ ] Footer links work
- [ ] Browse /tools page
- [ ] Click a tool, view details
- [ ] Browse /blog page
- [ ] Click an article, read it
- [ ] Browse /compare page
- [ ] Compare two tools
- [ ] Click footer links (all 10 destinations)
- [ ] Footer email link opens email client
- [ ] Footer X link opens in new tab

### Mobile Testing
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Check responsive layout
- [ ] Verify touch targets are clickable
- [ ] Check no horizontal scroll

### SEO Files
- [ ] https://www.ailiq.xyz/sitemap.xml loads (returns XML)
- [ ] https://www.ailiq.xyz/robots.txt loads
- [ ] Sitemap includes ~30 URLs
- [ ] Robots.txt references sitemap

### Metadata
- [ ] Homepage has title + description in browser tab
- [ ] Tool pages have tool name in title
- [ ] Blog pages have article title in title
- [ ] All pages have unique descriptions

---

## SEARCH ENGINE SUBMISSION (Days 1-3)

### Google Search Console
- [ ] Go to https://search.google.com/search-console
- [ ] Add property: https://www.ailiq.xyz
- [ ] Verify domain ownership (DNS record or HTML file)
- [ ] Submit sitemap: https://www.ailiq.xyz/sitemap.xml
- [ ] Request indexing for homepage
- [ ] Wait for coverage report to populate

### Bing Webmaster Tools
- [ ] Go to https://www.bing.com/webmaster
- [ ] Add site: https://www.ailiq.xyz
- [ ] Verify ownership
- [ ] Submit sitemap
- [ ] Request crawl

### DNS Configuration (if needed)
```
A Record:    ailiq.xyz       → Vercel IP
CNAME:       www.ailiq.xyz   → cname.vercel.com
```
(Vercel provides exact IP in dashboard)

---

## MONITORING & ALERTS (First Week)

### Daily Checks
- [ ] Vercel analytics dashboard for traffic
- [ ] Google Search Console for crawl errors
- [ ] Error logs in Vercel dashboard
- [ ] Sitemap status in Google Search Console

### Search Console Monitoring
- [ ] Wait for "Coverage" report
- [ ] Look for any "errors" or "excluded" pages
- [ ] Verify tool pages indexed
- [ ] Verify blog pages indexed
- [ ] Verify comparison pages indexed

### Performance
- [ ] Check PageSpeed Insights for both desktop and mobile
- [ ] Look for Core Web Vitals scores
- [ ] Verify no images are slow-loading
- [ ] Check for unused CSS/JS

### Analytics Setup (Optional)
- [ ] Enable Vercel Analytics in Project Settings
- [ ] Vercel auto-sends Web Vitals
- [ ] Monitor FCP, LCP, CLS

---

## INDEXING TIMELINE

**Expected Indexing Schedule:**
- Day 1-2: Homepage indexed
- Day 3-7: Main category pages (/tools, /blog, /compare)
- Week 2: Tool detail pages start indexing
- Week 2-3: Blog articles and comparisons index
- Week 4: Full directory indexed

**Search Appearance Timeline:**
- Week 2-3: Start seeing in search results
- Week 4-6: Rankings stabilize
- Month 2: Full search visibility

---

## MONTHLY MAINTENANCE

### Check These Items Monthly

- [ ] **Search Console:** Review search performance, fix errors
- [ ] **Analytics:** Review traffic sources and user behavior
- [ ] **Broken Links:** Check if any outbound links broke
- [ ] **Indexing:** Verify all pages remain indexed
- [ ] **Rankings:** Monitor keyword rankings
- [ ] **Content:** Plan new blog articles
- [ ] **Tools:** Add new tools as they become available

---

## FAILURE SCENARIOS & RECOVERY

### If Build Fails
1. Check error message in Vercel logs
2. Run `npm run build` locally to reproduce
3. Fix the error
4. Push to git
5. Vercel auto-redeploys

### If Pages Don't Load
1. Check Vercel status page (vercel.com/status)
2. Check error logs in dashboard
3. Verify environment variables are set
4. Check DNS propagation (dns-check.knownhost.com)

### If Sitemap Not Generating
1. Check app/sitemap.ts for errors
2. Verify all queries functions return data
3. Check build logs for TypeScript errors
4. Redeploy

### If Google Isn't Indexing
1. Verify site is accessible to Googlebot
2. Check Google Search Console for crawl errors
3. Check robots.txt isn't blocking anything
4. Submit individual pages to GSC
5. Wait 48-72 hours

---

## COMPLETION SIGN-OFF

| Task | Status | Notes |
|------|--------|-------|
| Code Quality | ✅ PASS | All tests pass |
| Content Complete | ✅ PASS | All pages real content |
| Build Succeeds | ✅ PASS | 30 pages prerendered |
| Branding Consistent | ✅ PASS | AILIQ throughout |
| Links Work | ✅ PASS | All verified |
| Metadata Present | ✅ PASS | All pages have metadata |
| SEO Ready | ✅ PASS | Sitemap, robots, schema |
| Configuration Ready | ✅ PASS | Env vars documented |
| **READY TO DEPLOY** | **✅ YES** | **Approved for production** |

---

## DEPLOYMENT SIGN-OFF

**Project:** AILIQ - AI Tools Directory  
**Domain:** https://www.ailiq.xyz/  
**Platform:** Vercel (Next.js)  
**Status:** ✅ READY FOR PRODUCTION  

**Approved By:** QA Audit  
**Date:** June 29, 2026  
**Contact:** best4liker@gmail.com  

---

**Next Step:** Push to main branch and watch Vercel deploy automatically.
