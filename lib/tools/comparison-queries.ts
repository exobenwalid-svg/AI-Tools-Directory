We found the exact cause of the compare 404 issue.

Problem:
The compare links on /compare are built manually as:
`/compare/${comparison.slugA}-vs-${comparison.slugB}`

But the dynamic route uses `generateStaticParams()` with `generateComparisonSlug(slugA, slugB)`, which alphabetically sorts the pair.
This means the public link format and the generated static route format can diverge, causing 404s.

Your task now is to fix this compare slug consistency issue.

Required fixes:
1. in /compare page, stop building compare URLs manually
2. use `generateComparisonSlug(comparison.slugA, comparison.slugB)` everywhere a comparison link is created
3. audit all compare links across the app and ensure they use the same slug generator
4. in the dynamic compare page, normalize the incoming slug against the canonical generated slug
5. if the URL is valid but non-canonical, redirect to the canonical comparison URL
6. keep invalid tool pairs returning 404

Files to inspect and fix:
- app/compare/page.tsx
- app/compare/[slug]/page.tsx
- any component generating compare links
- lib/tools/comparison-queries.ts if minor normalization improvements are needed

Important:
- do not redesign the compare page
- do not remove curated comparisons
- fix slug consistency only
- ensure these URLs resolve correctly after the fix:
  - /compare/claude-vs-copy-ai
  - /compare/chatgpt-vs-claude

Before changing code, summarize your fix plan in 5 bullets.

Output:
- root cause confirmed
- files changed
- exact code fix applied
- whether compare links are now canonical
- whether 404s for valid pairs are resolved
