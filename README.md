# theantlerconvoy.com

The Antler Convoy's public site, served by GitHub Pages from the `docs/` folder of this repository's
`main` branch at https://theantlerconvoy.com (the `docs/CNAME` file). Plain HTML and one stylesheet;
nothing to build. Only `docs/` is published: this file, `CLAUDE.md` and `.claude/` are not. To preview
it, run `python -m http.server --directory docs` and open http://localhost:8000.

| Path | What |
|---|---|
| `docs/index.html` | Home: what The Antler Convoy makes, one card per venture |
| `docs/ebay-store/` | The eBay store |
| `docs/sold-sorter/`, `docs/flipcomp/`, `docs/shopkeeper-for-roblox/` | One page per browser extension |
| `docs/studio-plugins/` | The two Roblox Studio plugins and the Cozy Village model packs on the Creator Store |
| `docs/support/`, `docs/privacy/` | Contact, and this site's privacy note with links to each product's policy |
| `docs/404.html` | GitHub Pages shows this for an address that doesn't exist |
| `docs/assets/` | `site.css`, the fonts, the logo, the link-preview image (`og.png`) and screenshots |
| `docs/assets/site.js` | The rise-into-view motion and the quiet click and hover sounds, with the speaker switch in the header |
| `docs/assets/fx.js` | The sound engine: a copy of `shared/web/fx.js` in the command-center repository (copy it again after changing it there) |
| `docs/assets/eggs.js` | The easter eggs, a copy of `shared/web/eggs.js` in the command-center repository; loaded with `data-public`, so only the plainest few, rarely and unlabelled |

Each extension also has its own site at `theantlerconvoy.github.io/<name>/` (separate repositories).
Their `privacy.html` addresses are built into the published extensions and their store listings, so
those repositories and pages must stay where they are.

When an extension goes live in a store, change its "Coming soon" status (its page and its card on the
home page) and add the store buttons.
