# V2 audit: theantlerconvoy.com

Audited October 24, 2026, at commit `ceeb324` (the live `main`). Report only: nothing in the site was changed.

> **This repository is public, so this file is public too.** It points at sensitive spots by file and line
> only, and leaves out private goals, numbers and internal systems. Don't merge it as is: anything on
> `main` is also published on the live site (see section 3, "Served files").

**How it was checked**
- Every text file was read in full: all 9 pages, `site.css`, `site.js`, `fx.js`, `eggs.js`, `README.md`,
  `CLAUDE.md`, `.claude/`, `.gitignore`, `CNAME` and `.nojekyll`. The one exception is the 43 KB SVG
  art block in `eggs.js` (lines 25-240): I scanned it line by line and searched it for URLs, emails and
  text, as the repo's `CLAUDE.md` asks, but didn't read every SVG string.
- Binaries were not opened: 8 fonts (`assets/fonts/*.woff2`); 3 PNGs (`og.png` 1200×630,
  `apple-touch-icon.png` 180×180, `favicon-32.png`); 12 WebPs (`logo-160`, `logo-720`, and 10
  screenshots in `assets/shots/`, 1280×800 or 1280×720). I only checked their dimensions and sizes.
- The pages were tested in local Chromium: phone widths 320/360/390 px, a slow-3G cold load, an axe-core
  4.10.2 scan of all 9 pages (WCAG 2.0/2.1/2.2 A+AA plus best practice), and a timing of the first tap.
- The three extension privacy policies were read from their public repos (`sold-sorter`, `flipcomp`,
  `shopkeeper-for-roblox`).
- **Not checked:** the live site, its HTTP headers and every outside link. This cloud chat's network
  (Limited) blocks them, so they're marked "verify from the PC" below.

---

## 1. What it is

A hand-written static site: nine HTML pages, one stylesheet and three scripts. There's no build step,
no tests and no CI. GitHub Pages serves `main` at theantlerconvoy.com (`CNAME`). `.nojekyll` makes Pages
publish the files as they are, and the privacy page says the domain runs through Cloudflare.

| Page | Lines | What it does |
|---|---|---|
| `index.html` | 150 | Hero, six venture cards (eBay store, 3 extensions, Studio plugins, the game in development), three values, contact band |
| `ebay-store/` | 88 | What buying through eBay means, plus one button to the store |
| `sold-sorter/`, `flipcomp/`, `shopkeeper-for-roblox/` | 125-128 | Hero with Add to Chrome, 2 screenshots, 4 feature blocks, Free/Pro plans, trademark fine print |
| `studio-plugins/` | 152 | Two Creator Store plugins and the model packs, 4 screenshots |
| `support/` | 75 | Email, a link list per product, and how eBay orders work |
| `privacy/` | 78 | "This website collects nothing", hosting, sounds, links to each extension's policy |
| `404.html` | 52 | Not found, with links home and to support (noindex) |

**Shared files**
- `assets/site.css` (187 lines): the "console look". Deep navy, hairline rules with corner ticks, JetBrains Mono
  everywhere, amber for the main action. Sections: header/footer, type, buttons, panels, home, product
  pages, phones, motion.
- `assets/site.js` (34 lines): turns on quiet click/hover sounds with a speaker switch in the header, and
  makes blocks rise into view as you scroll (skipped under reduced motion).
- `assets/fx.js` (429 lines): a Web Audio sound engine. It synthesizes every sound, so nothing is
  downloaded. It's a copy of a shared source kept in another repo (README line 16).
- `assets/eggs.js` (729 lines): easter-egg animations, also a copy of a shared source. 63 eggs are defined,
  but `data-public` lets only 38 of them show here: unlabelled, on 40% of page views, 20-70 seconds after
  the page opens. Secret words, the Konami code and typing "eggs" also work.
- Fonts: 3 JetBrains Mono weights are used. 5 more files (Barlow Semi Condensed ×3, Chakra Petch ×2, 88 KB)
  aren't referenced by any page or stylesheet.

---

## 2. Health

### Links
- **Internal:** every `href`/`src` resolves to a file in the repo.
- **External** (3 Chrome Web Store, 6 github.io, 8 Roblox Creator Store, 1 eBay): not checked (blocked
  here). From the PC: `grep -rhoE 'https://[^"]+' --include=*.html . | sort -u | xargs -n1 curl -s -o /dev/null -w '%{http_code} %{url}\n'`
  (Chrome Web Store and eBay may answer 403 to bots, so check those by hand).
- **Wording that doesn't match:**
  - FlipComp's eyebrow says "for Chrome and Edge" (`flipcomp/index.html:36`) but its status says
    "coming to Edge" (`:39`).
  - Shopkeeper says it "talks only to Roblox's own servers" (`shopkeeper-for-roblox/index.html:73`), but
    it also calls ExtensionPay (`:106`). Its privacy policy words this precisely; the page doesn't.
- **Visitors are sent to duplicate sites:** the "…'s website" buttons (`sold-sorter:42`, `flipcomp:42`,
  `shopkeeper-for-roblox:42`, and `support:48-50`) go to the older github.io pages, which lead away from this site.

### Meta and Open Graph
| | description | canonical | og:* | og:description | twitter:card |
|---|---|---|---|---|---|
| Home, eBay, 3 extensions, plugins | yes | yes | yes | yes | **no** |
| Support | yes | yes | yes | **no** | **no** |
| Privacy | yes | yes | **none** | **no** | **no** |
| 404 | no (noindex, fine) | no | no | no | no |

- Every page shares one `og.png`. There's no `og:image:alt`, `og:image:width`/`height`, or per-product preview image.
- No `robots.txt`, `sitemap.xml` or JSON-LD structured data.
- The home `<title>` is just "The Antler Convoy" (`index.html:6`), and FlipComp's (`flipcomp/index.html:6`) doesn't say what FlipComp does.
- Icons: a 32 px PNG plus the 180 px touch icon. Google's search results prefer an icon of at least 48 px, and there's no `/favicon.ico`.

### Accessibility
- **axe-core found 0 violations on all 9 pages.** It couldn't judge contrast over the gradient
  backgrounds, so I checked the key pairs by hand. Faint text `#7c92ac` on `#040810` is 6.3:1, the blue
  accents are 5.2:1 and the amber buttons about 11:1, all above the AA minimum.
- Already good: skip link, landmarks, one `h1` per page, labelled sections, screenshot alt text that
  describes what's shown, a speaker switch with `aria-pressed`, 44 px buttons, and reduced-motion handling in CSS, `fx.js` and `eggs.js`.
- **Problems:**
  1. **Tiny all-caps labels:** status 10.5 px (`site.css:87`); eyebrow, nav, crumb and card "more" 11 px with
     0.2-0.28em letter-spacing (`:60, :74, :121, :133`); card meta 12 px (`:116`); fine print 12.5 px (`:156`).
     They're hard to read on phones.
  2. **Thin focus ring:** 1 px (`site.css:47`); 2 px reads much better on the dark background.
  3. **Motion with no visible off switch.** Eggs run 3-16 seconds and start by themselves
     (`eggs.js:646`), and the home emblem floats forever (`site.css:178-181`). WCAG 2.2.2 (Pause, Stop,
     Hide) asks for a way to stop motion that starts by itself and lasts over 5 seconds. Reduced-motion
     users are covered; everyone else can only type the secret word "eggs".
  4. **Monospace body text:** long prose in a monospace face, plus all-caps headings with wide spacing,
     slows reading (support, privacy, card text). That's a design-system call, noted here only.
  5. **Sounds are on by default** (`fx.js:22`) and play on click and on hover (`site.js:14-15`). They're
     quiet and only follow your own clicks, so this isn't a WCAG failure, but it's unexpected on a business site.
     Owner decision.

### Performance (measured locally)
- All scripts use `defer`, so none block rendering. The CSS is 13 KB (3.7 KB gzipped).
- **The first tap or click costs ~80 ms** (~115 ms with the CPU slowed 4×), **even with sounds off**.
  `fx.js` creates the AudioContext and builds a 3.4-second stereo reverb buffer (about 326,000 random
  samples) inside the first `pointerdown` handler (`fx.js:37-66, 314-323`). That lands on the first
  interaction's INP score. Later taps cost ~0.1 ms.
- **`eggs.js` is 83 KB (22 KB gzipped) on every page**, the largest text file on the site. Its 25 eggs
  that never show here (plus their art) ship anyway.
- **Fonts:** 3 JetBrains Mono files (63 KB) aren't preloaded. With `font-display:swap`, text appears
  in the fallback font and reflows when JetBrains Mono arrives.
- **Main image (LCP):** on product pages it's the first screenshot, and none of them has
  `fetchpriority="high"` (`sold-sorter:46`, `flipcomp:46`, `shopkeeper-for-roblox:46`,
  `studio-plugins:45`). On the slow-3G cold test, `/sold-sorter/` painted text at 1.8 s but the
  screenshot only at 6.3 s, while it competed with fonts and scripts. That test was uncompressed, so
  production should be faster, but the order still holds.
- **Images:** good WebP with `width`/`height` (no layout shift), and the later ones are lazy. There's
  no `srcset`, so phones download the full 1280 px screenshot.
- **Rise-into-view:** I tested whether text above the fold vanishes and fades back in on slow loads.
  It doesn't (the `h1` stays visible), so leave this as it is.
- **Phones:** no sideways scrolling at 320, 360 or 390 px, but the header wordmark wraps to three lines on every page.

### SEO
- The basics are good: canonicals, real descriptions, one `h1`, and readable URLs.
- **Duplicate pages:** the github.io sites have no canonical tag. Sold Sorter's is a full 7.7 KB page,
  Shopkeeper's 3.5 KB and FlipComp's a short stub. The first two compete with this site in search.
- **No search-first content:** nothing targets how people search for these jobs (for example "sort eBay
  by most sold", "eBay sold count", "Facebook Marketplace eBay comps", "bulk edit Roblox game passes").
- No sitemap, robots file or structured data (see Meta).

---

## 3. Security and privacy

**Clean:** no keys, tokens or passwords in any file. The only email is the public support inbox. There
are no third-party scripts, no third-party fonts, no cookies, no analytics and no forms. The scripts store
only three `localStorage` switches (`tac-sfx`, `tac-music`, `tac-eggs`).

**More is public than visitors need** (location only):
- `assets/fx.js:1-2`: a comment names private internal sites.
- `assets/eggs.js:1-5, 523, 643`: comments tie the catalogue to the owner's personal tastes. The
  catalogue (`:524-588`) includes the 25 entries that never show here, and anyone who views the source can read it.
- `CLAUDE.md`, `README.md:16-17`, `.claude/hooks/cloud-guard.mjs:2-12`: internal tooling and workflow
  notes (other repos, a personal machine, usage-guard thresholds). These aren't secrets, but they are internal.
- Fix: give the public copies of `fx.js` and `eggs.js` a "public build" step in the shared source that
  strips comments and non-public eggs (see WEB-4).

**Served files (verify from the PC):** with `.nojekyll`, GitHub Pages publishes every file on `main`. That
probably includes `/CLAUDE.md`, `/README.md` and this audit if it's merged, and possibly the `.claude/` folder.
Check with `curl -sI https://theantlerconvoy.com/CLAUDE.md`. If it answers 200, publish only the site:
move it into `/docs` and point Pages there, or deploy through an Actions workflow that uploads only the site files.

**Headers:** GitHub Pages can't set CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy` or `Permissions-Policy`.
- If Cloudflare proxies the domain (look for `server: cloudflare` from the PC), a free Transform Rule can
  add them. A CSP that fits this site:
  `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`.
- Start in Report-Only mode. The scripts inject `<style>` tags, and two inline `style=""` attributes
  (`flipcomp:103`, `studio-plugins:115`) need `'unsafe-inline'`, or they can move into `site.css`.
- The risk today is low (static site, no logins or forms), so this is defense in depth and trust.

**The site's privacy page** (`privacy/index.html`) is accurate but out of date:
- It mentions the stored sound choice (`:42`) but not the easter-egg switch.
- "Our products" (`:47-54`) leaves out the Studio plugins and model packs.
- It's dated September 30, 2026 (`:58`) and has no Open Graph tags.

**The extension privacy policies** (Sold Sorter Sep 26, FlipComp Oct 13, Shopkeeper Oct 16, 2026) are
strong: specific about what's read, sent and stored, with retention times, a permission-by-permission
list, the Limited Use statement, a children section and a contact.
- FlipComp's policy fully discloses its server, both AI providers and every retention period.
- **Gaps:**
  1. No line on how to ask for your data or have it deleted. This matters most for FlipComp, whose
     server keeps pseudonymous records for up to 180 days.
  2. No named business or location (who the "data controller" is, in GDPR terms). Owner decision: a
     business address or mailbox can be used instead of a home address.
- **The product pages say less than the policies:**
  - FlipComp's "Private" block (`flipcomp/index.html:71-74`) doesn't say that listing text, and
    sometimes the photo, goes to the FlipComp server and an AI service. Only the "Vague titles"
    block hints at it.
  - Shopkeeper's "only Roblox" line is covered under Links above.

**Billing terms are missing.**
- This site has no terms, refund or cancellation page. Only Sold Sorter's github.io page states them (a
  14-day refund and how to cancel). FlipComp and Shopkeeper sell Pro with no published refund or cancellation terms.
- Stripe's account review expects a refund and cancellation policy and contact details on the business
  website. Auto-renewal laws (California's is the strictest) expect the renewal and cancellation terms to sit
  clearly next to the price.

---

## 4. Efficiency (page weight and load cost)

Estimated first-visit transfer with gzip. Measured files plus HTML; images are counted once they're scrolled into view.

| Page | Fonts | Scripts | CSS+HTML | Images | Total |
|---|---|---|---|---|---|
| eBay, Support, Privacy, 404 | 63 KB | 30 KB | ~6 KB | 3 KB | **~101 KB** |
| Home | 63 | 30 | ~6 | 20 | **~119 KB** |
| Sold Sorter | 63 | 30 | ~6 | 148 | **~247 KB** |
| FlipComp | 63 | 30 | ~6 | 179 | **~278 KB** |
| Shopkeeper | 63 | 30 | ~6 | 81 | **~180 KB** |
| Studio plugins | 63 | 30 | ~6 | 100 → 349 | **~199 → 448 KB** |

- That's already light (a typical web page is measured in megabytes). On text pages, the fonts are ~62%
  of the bytes and `eggs.js` ~22%.
- After load the site makes no network calls and no API or AI calls, so it has no running cost beyond hosting.

**Cheapest wins**
1. Load `eggs.js` after the page is idle (an egg can't appear before 20 seconds anyway), and ship a
   public-only build. That's −22 KB gzipped on every first visit.
2. Subset JetBrains Mono to the characters the site uses, and drop to 2 weights or one variable file:
   about −20 to −35 KB.
3. Add `srcset` widths of 640/960/1280 for the screenshots: about −50 to −60% of image bytes on phones.
4. Create the AudioContext only when a sound will actually play, and build the reverb off the input
   handler: −80 to −115 ms on the first tap.
5. Delete the 5 unused font files (88 KB of repo weight; no effect on page load).
6. The home emblem animates `transform` and `filter` forever (`site.css:178-179`), a small constant cost
   while the page is open. Stop it after a few loops.
7. Caching: GitHub Pages defaults to a 10-minute cache. Check from the PC; Cloudflare can give
   `/assets/fonts/` and `/assets/shots/` long lifetimes.

---

## 5. UI

**Overall:** the look is consistent and distinctive (deep navy, hairlines, corner ticks), the copy is honest
and specific, and the captioned screenshots sell well. The weak spots:
- The home hero says only the company name.
- The cards are all text.
- Product pages open with three equal-looking buttons.
- The plans hide what you save.
- Most motion is decoration (everything rises, the logo floats) rather than meaning.

Design changes should start as a mock in the Antler Convoy design system for the owner to approve before
any code, except small fixes. Every idea below includes its reduced-motion fallback.

**Home**
- **Headline:** the `h1` repeats the wordmark that's already in the header. Lead with the promise (who it's
  for and what it saves), and keep the name as the eyebrow.
- **Cards:**
  - Add a small product glyph or screenshot crop to each card.
  - Add a secondary "Add to Chrome" button on extension cards (it needs `position:relative; z-index:2`
    to sit above the stretched link).
  - Give Night Shift Garden a "follow for launch" link once a Roblox group or page exists.
- **Emblem:** replace the endless float with a one-time "boot": the corner ticks draw in and the glow
  rises once (reduced motion: static). At small sizes, the outlined star with inner lines can read as a
  pentagram. Worth a quick look by the owner, since part of the audience is Roblox creators and their parents.

**Sold Sorter, FlipComp, Shopkeeper**
- **First screen:**
  - Keep one primary button (Add to Chrome), and turn "website" and "privacy policy" into small text links.
  - Under the button, add the offer in one line: "Free · 7-day Pro trial, no card" for Sold Sorter, "10
    free lookups" for FlipComp, "Free up to 10 items" for Shopkeeper.
- **Motion that explains:** swap the first screenshot for a short muted loop of the product doing its one
  job: results re-sorting, the FlipComp card sliding in, Shopkeeper's preview then undo.
  - Use WebM/MP4 (~300-600 KB) with `preload="none"`, the current WebP as the poster, a pause button, and
    `playsinline`.
  - Reduced motion: show the poster with a play button.
- **Plans:**
  - Show the annual saving: Sold Sorter's year costs 50% less than 12 months, FlipComp's 37% less, and
    Shopkeeper's one-time price equals 5 months.
  - Put "Cancel anytime · refund terms" next to each price.
  - Add a short FAQ with `<details>` (no JS): limits, cancelling, refunds, "why does FlipComp need my eBay
    sign-in?".
- **Proof:** leave a slot for the store rating and user count (update it by hand), and add one or two
  short quotes from users, with their permission.
- **Phones:** extensions can't be installed on a phone, so add "Send to my computer" on touch screens
  (the Web Share API or copy link; it collects nothing).
- **Count-ups:** count up real figures already on the page ("17 eBay sites", "53,372 sold") with the
  existing `FX.countUp`. It already jumps straight to the final number under reduced motion.

**Studio plugins:** strong page. Add a 5-second loop of a forest building itself (motion with meaning),
and put the price on each section's own button.

**eBay store:** thin.
- Add "Save this seller" and three or four category links into the store.
- A product photo strip would help; a feedback-score line too, if it's kept current.

**Support:** add a FAQ per product (the top 3 issues each), a billing section (cancel steps and the refund
window), and "Report a problem inside the extension sends us the details".

**Privacy:** the updates from section 3. **404:** add links to the three extension pages.

**Every page**
- **Mobile header:** the wordmark wraps to three lines at 320-390 px. Use a shorter mark or tighter
  letter-spacing under 420 px.
- **Footer:** add product links and the new billing terms.
- **Motion switch:** add a visible switch next to the speaker. It sets `data-motion="off"` on `<html>`,
  which the CSS, `fx.js` and `eggs.js` treat like `prefers-reduced-motion`. That covers WCAG 2.2.2.
- **Rise-into-view:** keep it for blocks below the fold only. It already does nothing under reduced motion
  (`site.css:187`, `site.js:19`).

---

## 6. Money

The site has no analytics by design, so the first step is privacy-safe measurement. The impact figures
are rough guesses from typical results, not measurements.

| # | Idea | How | Rough impact |
|---|---|---|---|
| 1 | **Know which page drives installs** | Add `?utm_source=theantlerconvoy.com&utm_medium=referral&utm_campaign=<page>` to every Chrome Web Store link. The store's developer dashboard can split visits and installs by UTM, and the site itself still collects nothing | Enables everything below |
| 2 | **Billing trust** | A terms/refund/cancel page, plus "Cancel anytime · N-day refund" under every price | +5-15% Pro conversion; fewer disputes |
| 3 | **Annual mix** | Savings tags on the annual and one-time prices | +10-20% of buyers choosing annual (better cash flow, less churn) |
| 4 | **One clear CTA + trial line** | See UI | +5-15% click-through to the store |
| 5 | **Social proof** | Rating, user count, two quotes | +10-30% store click-through, once reviews exist |
| 6 | **Cross-sell resellers** | Sold Sorter and FlipComp serve the same people. Add an "Also for resellers" block on each page and in the Pro welcome screen | Small, with almost no cost |
| 7 | **Edge buttons** | "Get it for Edge" as each listing goes live | +5-10% installs |
| 8 | **Phone visitors** | "Send to my computer" | Recovers some of the traffic from social posts |
| 9 | **Search guides** | 3-5 how-to pages, each with an install button (for example "How to sort eBay by most sold") | The best free long-term channel; slow to build |
| 10 | **Launch audience without forms** | A changelog page with an RSS feed, a Roblox group for the game, or a hosted newsletter. A newsletter would change the "collects nothing" promise, so the owner decides | An audience for each new launch |
| 11 | **Consolidate ranking** | Canonical tags on the github.io pages | Pages rank as one site instead of two |
| 12 | **Repeat eBay buyers** | "Save this seller" plus category links | Small |

---

## 7. Ranked to-do

Effort: XS < 1 hr, S ≈ half a day, M ≈ 1-2 days, L more. "Cloud-safe" means a cloud chat can do it from
GitHub alone. "Two repos" means the change starts in the shared-source repo, then gets copied here.

| ID | What | Why | Impact | Effort | Risk | Cloud-safe |
|---|---|---|---|---|---|---|
| WEB-1 | Billing terms page (refunds, cancelling, auto-renewal) for all three extensions; link it beside every price and in the footer | FlipComp and Shopkeeper have no published terms; Stripe review and auto-renewal laws expect them; trust | High | S | Low (owner approves the terms) | yes |
| WEB-2 | UTM tags on all Chrome Web Store links | Shows which page sells, with zero tracking on the site | High | XS | Low | yes |
| WEB-3 | Lazy AudioContext: create it only when a sound will play, and build the reverb outside the input handler | First tap costs 80-115 ms even with sounds off (INP) | Med | S | Low | yes (two repos) |
| WEB-4 | Public build of `eggs.js`/`fx.js` (no comments, no non-public eggs), and load `eggs.js` when the page is idle | −22 KB gzipped per first visit; stops publishing private notes | Med | M | Low | yes (two repos) |
| WEB-5 | Make product pages match the policies: FlipComp "Private" names the server and AI; Shopkeeper "only Roblox" plus ExtensionPay; fix the FlipComp Edge line | Trust, and store reviewers compare page against policy | Med | XS | Low | yes |
| WEB-6 | Keep internal files off the live site: confirm `/CLAUDE.md` is served, then publish from `/docs` or a site-only workflow | Internal notes, and this audit if merged, are one URL away | Med | M | Med (a deploy-path change can take the site down briefly; do it at a quiet hour and verify) | no (Pages setting) |
| WEB-7 | Meta: OG on Privacy, og:description on Support, `twitter:card` everywhere, `og:image:alt`, better home and FlipComp titles, `robots.txt`, `sitemap.xml`, JSON-LD (Organization, SoftwareApplication with offers), a 48 px+ icon | Search and link previews | Med | S | Low | yes |
| WEB-8 | Canonical tags on the github.io pages pointing here; drop the "website" buttons (**never move the `privacy.html` URLs**) | Consolidates ranking; keeps visitors here | Med | S (3 other repos) | Low | yes |
| WEB-9 | Product-page conversion pass, mock first: one CTA, trial line, savings tags, `<details>` FAQ, proof slot, Edge buttons when live, "Send to my computer" | The main money lever on the site | High | M | Low | yes, after mock approval |
| WEB-10 | Visible motion switch beside the speaker, emblem float stops after a few loops, eggs obey the switch; owner decides the sound default (off is suggested) | WCAG 2.2.2; comfort | Med | S | Low | yes (two repos) |
| WEB-11 | Readability: labels at 12-13 px or more, a 2 px focus ring, a shorter mobile wordmark | Hard-to-read labels on phones | Med | S | Low | yes |
| WEB-12 | Privacy refresh: Studio plugins and models, the eggs switch, OG, new date. In the extension policies: a data-request/deletion line, and a business identity (owner decision) | Accurate, complete policies | Med | S | Low | yes (identity: owner) |
| WEB-13 | Fonts: preload the 400 weight, subset (keep `· → ◀ ✓ ● © '`), consider 2 weights; delete the unused Barlow and Chakra files | −20-35 KB, less reflow | Low-Med | S | Low | yes |
| WEB-14 | Screenshots: `fetchpriority="high"` on the first one; a `srcset` of 640/960/1280 (AVIF optional) | Faster main image on phones | Low-Med | S | Low | yes (image tooling may be easier on the PC) |
| WEB-15 | Security headers through Cloudflare (or a meta CSP), Report-Only first; move the 2 inline styles into `site.css` | Defense in depth, scanner grades | Low-Med | S | Med (a strict CSP can break sounds and eggs) | no (Cloudflare dashboard) |
| WEB-16 | Support FAQ and billing section; eBay page: "Save this seller", categories | Fewer emails; repeat buyers | Low-Med | S | Low | yes |
| WEB-17 | 3-5 search guides with install buttons | Organic installs over time | Med (slow) | M-L | Low | yes (owner picks topics) |
| WEB-18 | Launch-audience channel: RSS changelog, a Roblox group, or a newsletter | Audience for each launch | Med (slow) | S-M | Low | partly (owner decides) |
| WEB-19 | One list of prices and live status (a small JSON file and a check script, or a README checklist) | Prices and status repeat in 3-4 places per product and can drift | Low | S | Low | yes |
| WEB-20 | From the PC: check every outside link, the live headers and cache settings, and whether `/CLAUDE.md` is served | Couldn't be checked from the cloud | Low | XS | None | no |

---

## 8. Traps and lessons (for the knowledge base)

- **Public repo:** every branch, PR and file here, this audit included, is public the moment it's
  pushed. Keep private goals, numbers and internal URLs out.
- **`main` is production:** merging redeploys the live site at once, and GitHub Pages has no preview
  deploys. To test locally, run `python3 -m http.server` from the repo root. The absolute `/assets/` paths
  don't work from `file://`.
- **`.nojekyll` publishes everything on `main`,** not just the pages. Keep docs out of the served folder.
- **`fx.js` and `eggs.js` are copies:** edit the shared source, then copy it here. Nothing in this repo
  checks that the copies match.
- **The github.io `privacy.html` URLs are built into the published extensions and their store listings.**
  Adding canonicals and changing links is safe; moving, renaming or deleting those pages or repos is not.
- **Prices and "Live / coming soon" text repeat** in the home card, the product page (status and plans), the
  meta description and the support list. Change them together (WEB-19).
- **Cloud chats can't reach the live site or outside links** on Limited network. Run link and header checks from the PC.
- **Rise-into-view is safe on slow connections** (tested: above-the-fold text never vanishes). Don't "fix" it.
- **Audio has a hidden cost:** the first tap pays for building the whole audio graph, even when sounds are off.
- **axe can't judge contrast over gradients** ("incomplete" on every page). Check new colors by hand.
- **The Chrome Web Store reads UTM tags,** so installs can be measured without adding any tracking to the site.
- **The egg catalogue ships whole:** `data-public` only hides eggs at runtime. Anything in the shared source ends up in the public file.
