# theantlerconvoy.com
The Antler Convoy's public site: plain static HTML, one stylesheet and a few scripts, served by GitHub Pages.

## Map (line numbers as of 2026-10-18; if they've drifted, search for the function name)

Read big files by line range or search for a name with Grep. Don't read whole files, and don't re-read a file you've already read in this chat.

- **Build and deploy**: nothing to build; GitHub Pages serves the `main` branch at theantlerconvoy.com (`CNAME`, `.nojekyll`). No tests. `README.md` has the page-by-page table.
- **Pages** (all under ~150 lines, fine to read): `index.html` home, `ebay-store/`, `sold-sorter/`, `flipcomp/`, `shopkeeper-for-roblox/`, `support/`, `privacy/`, `404.html`.
- **Styles** (`assets/site.css`, 187 lines): sections header/footer 53, type 68, buttons 80, panels 96, home 101, product pages 131, phones 158, motion and sound 170.
- **Motion and sound toggle** (`assets/site.js`, 34 lines).
- **Sound engine** (`assets/fx.js`, copy of `shared/web/fx.js` in the command-center repo; edit there, then copy): audio graph bus 30, audio 37, voice 77, hiss 113; sound effects 132, play 219; music 227 (scheduleStep 241, startMusic 284, stopMusic 291); switches setSfx 300, setMusic 307, unlock 314, mountToggles 347, setLevel 369; motion countUp 376, reveal 391; `window.FX` export 417.
- **Easter eggs** (`assets/eggs.js`, copy of `shared/web/eggs.js` in the command-center repo; edit there, then copy): config 13-22, ART 25-240 (SVG art), layer 243, sprite 254, MOVES 281, RUNS 403, EGGS catalogue 524, show 610, showRandom 625, parade 629, toast 635, schedule 642, KONAMI 659, injected style 689.
- **Cloud guard hook** (`.claude/hooks/cloud-guard.mjs`, `.claude/settings.json`).
- Never read whole: `assets/shots/`, `assets/fonts/`, images (`*.png`, `*.webp`) are binary; the ART block in `eggs.js` is long SVG strings.
