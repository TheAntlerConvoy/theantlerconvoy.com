# theantlerconvoy.com
The Antler Convoy's public site: plain static HTML, one stylesheet and a few scripts, served by GitHub Pages.

## Map (line numbers as of 2026-10-18; if they've drifted, search for the function name)

Read big files by line range or search for a name with Grep. Don't read whole files, and don't re-read a file you've already read in this chat.

- **Build and deploy**: nothing to build; GitHub Pages serves the `docs/` folder of `main` at theantlerconvoy.com (`docs/CNAME`, `docs/.nojekyll`). Only `docs/` is public: notes, handoffs, audits and anything else internal stay outside it (until Oct 2026 the whole repo was served, `/CLAUDE.md` included: the V2 audit's WEB-6). No tests. Preview: `python -m http.server --directory docs`. `README.md` has the page-by-page table.
- **Pages** (all in `docs/`, all under ~150 lines, fine to read): `index.html` home, `ebay-store/`, `sold-sorter/`, `flipcomp/`, `shopkeeper-for-roblox/`, `studio-plugins/`, `support/`, `billing/`, `privacy/`, `404.html`. Each page names itself in `<link rel="canonical">`; `robots.txt` allows everything and `sitemap.xml` lists every page (add a new page there too).
- **Styles** (`docs/assets/site.css`, 197 lines): sections header/footer 53, type 68, buttons 80, panels 96, home 101, product pages 131, phones 158, 3D mount slot 170, motion and sound 180.
- **Motion and sound toggle, 3D mount slot loader** (`docs/assets/site.js`, 55 lines). Every page's hero `<section>` is a `.fx3d-host` with a hidden screen-reader line (`.fx3d-desc`), an empty summary list and a hidden Pause button; adding `data-fx3d="<scene>"` to it loads `assets/fx3d/<scene>.js` after first render (V2 X-13; no page does yet).
- **Sound engine** (`docs/assets/fx.js`, copy of `shared/web/fx.js` in the command-center repo; edit there, then copy): audio graph bus 30, audio 37, voice 77, hiss 113; sound effects 132, play 219; music 227 (scheduleStep 241, startMusic 284, stopMusic 291); switches setSfx 300, setMusic 307, unlock 314, mountToggles 347, setLevel 369; motion countUp 376, reveal 391; `window.FX` export 417.
- **Easter eggs**: removed from this site in Nov 2026 (V2 X-13 weight cut, 83 KB on every page); they live on in command-center's `shared/web/eggs.js`. Unused Barlow and Chakra Petch font files went too.
- **Cloud guard hook** (`.claude/hooks/cloud-guard.mjs`, `.claude/settings.json`; not published).
- Never read whole: `docs/assets/shots/`, `docs/assets/fonts/`, images (`*.png`, `*.webp`) are binary.
