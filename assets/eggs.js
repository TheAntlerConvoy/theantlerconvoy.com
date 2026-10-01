// Easter eggs: small, original animations nodding to the owner's favorite films, shows and games. One
// wanders in now and then (rarely on the public site, and never labelled there), and each answers a
// few secret words typed anywhere outside a text box; the Konami code sets off a parade, and typing
// "eggs" turns them off or back on (remembered on this device). Every egg is drawn here from plain
// shapes: no logos, likenesses, quotes or music from the works. "Reduce motion" turns them all off.
//
// One source, shared/web/eggs.js; each site serves its own copy as eggs.js (scripts/check-pages.mjs
// fails when a copy differs). The public site loads it with data-public: only its plainest eggs.
(function () {
  "use strict";
  if (window.EGGS) return;
  const me = document.currentScript;
  const PUBLIC = !!(me && me.hasAttribute("data-public"));
  const RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const KEY = "tac-eggs";
  const enabled = () => { try { return localStorage.getItem(KEY) !== "0"; } catch { return true; } };
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const scale = () => Math.max(0.75, Math.min(1.35, innerWidth / 1440));
  const sound = (name) => { if (window.FX) window.FX.play(name); };
  const S = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`;
  const WAVE = (y, w) => `<path d="M0 ${y} q12 -6 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0" transform="scale(${w / 168} 1)" fill="none" stroke="#7fe3ff" stroke-width="2.5" stroke-linecap="round" opacity=".75"/>`;

  /* ---------- the art, one small picture each ---------- */
  const ART = {
    fin: S(120, 44, `<path d="M40 36 C47 22 55 10 70 4 C66 14 66 26 72 36 Z" fill="#9db3c7"/><path d="M58 14 C62 10 66 7 70 4 C67 11 66 18 67 26 Z" fill="#d0dde9" opacity=".6"/>
      <path d="M4 38 q12 -6 24 0 t24 0 t24 0 t24 0" fill="none" stroke="#7fe3ff" stroke-width="2.5" stroke-linecap="round" opacity=".8"><animate attributeName="d" dur="1.2s" repeatCount="indefinite" values="M4 38 q12 -6 24 0 t24 0 t24 0 t24 0;M4 38 q12 6 24 0 t24 0 t24 0 t24 0;M4 38 q12 -6 24 0 t24 0 t24 0 t24 0"/></path>`),
    rider: S(130, 96, `<g fill="#a06f4a"><ellipse cx="58" cy="56" rx="32" ry="14"/><path d="M82 52 L100 30 Q106 26 110 30 L112 36 L104 40 L90 60 Z"/>
      <rect x="32" y="62" width="6" height="26" rx="3"><animateTransform attributeName="transform" type="rotate" values="-14 35 62;16 35 62;-14 35 62" dur=".45s" repeatCount="indefinite"/></rect>
      <rect x="44" y="64" width="6" height="24" rx="3"><animateTransform attributeName="transform" type="rotate" values="16 47 64;-14 47 64;16 47 64" dur=".45s" repeatCount="indefinite"/></rect>
      <rect x="70" y="62" width="6" height="26" rx="3"><animateTransform attributeName="transform" type="rotate" values="-16 73 62;14 73 62;-16 73 62" dur=".45s" repeatCount="indefinite"/></rect>
      <rect x="80" y="60" width="6" height="26" rx="3"><animateTransform attributeName="transform" type="rotate" values="14 83 60;-16 83 60;14 83 60" dur=".45s" repeatCount="indefinite"/></rect></g>
      <path d="M27 52 Q12 58 12 74" stroke="#4a2f1e" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M88 40 L98 28" stroke="#4a2f1e" stroke-width="5" stroke-linecap="round"/>
      <rect x="50" y="22" width="14" height="26" rx="5" fill="#5b3d29"/><circle cx="57" cy="18" r="6.5" fill="#e6b88f"/><ellipse cx="57" cy="13" rx="13" ry="3.2" fill="#2d1f15"/><path d="M51 13 Q51 4 57 4 Q63 4 63 13 Z" fill="#2d1f15"/>
      <path d="M60 30 L76 42" stroke="#5b3d29" stroke-width="4" stroke-linecap="round"/><path d="M50 30 Q44 26 40 30" stroke="#8a2a2a" stroke-width="3" fill="none"/>`),
    tumbleweed: S(56, 56, `<g fill="none" stroke="#c99c5a" stroke-width="2" stroke-linecap="round"><circle cx="28" cy="28" r="22"/><ellipse cx="28" cy="28" rx="22" ry="10" transform="rotate(30 28 28)"/>
      <ellipse cx="28" cy="28" rx="22" ry="12" transform="rotate(-40 28 28)"/><ellipse cx="28" cy="28" rx="10" ry="22" transform="rotate(15 28 28)"/><path d="M10 20 Q28 34 46 18 M12 38 Q30 24 44 40 M20 8 Q26 30 22 50 M36 8 Q30 30 38 50"/></g>`),
    giraffe: S(96, 128, `<g fill="#e9b65a"><ellipse cx="40" cy="78" rx="26" ry="15"/><path d="M56 74 L72 22 L80 24 L66 80 Z"/><ellipse cx="80" cy="18" rx="11" ry="7"/>
      <rect x="20" y="86" width="5" height="38" rx="2.5"/><rect x="30" y="88" width="5" height="36" rx="2.5"/><rect x="48" y="88" width="5" height="36" rx="2.5"/><rect x="57" y="86" width="5" height="38" rx="2.5"/></g>
      <g fill="#a8642b"><circle cx="30" cy="74" r="4"/><circle cx="44" cy="70" r="3.5"/><circle cx="50" cy="82" r="4"/><circle cx="34" cy="86" r="3"/><circle cx="66" cy="50" r="3"/><circle cx="70" cy="36" r="2.6"/><circle cx="62" cy="64" r="3"/></g>
      <path d="M76 12 L74 4 M82 11 L84 3" stroke="#a8642b" stroke-width="2.5" stroke-linecap="round"/><circle cx="84" cy="16" r="1.6" fill="#10202f"/>
      <path d="M14 76 Q6 80 8 92" stroke="#a8642b" stroke-width="3" fill="none" stroke-linecap="round"/>`),
    tracker: S(96, 70, `<rect x="2" y="2" width="92" height="66" rx="8" fill="#0c1a12" stroke="#2c5a3c" stroke-width="2"/>
      <g fill="none" stroke="#3cf08e" stroke-width="1.4" opacity=".55"><path d="M14 60 A34 34 0 0 1 82 60"/><path d="M26 60 A22 22 0 0 1 70 60"/><path d="M38 60 A10 10 0 0 1 58 60"/><path d="M48 60 V22"/></g>
      <circle cx="48" cy="60" r="3" fill="#3cf08e"/>
      <circle r="4" fill="#9dffc4" cx="70" cy="24"><animate attributeName="cx" values="70;58;52" dur="2.6s" fill="freeze"/><animate attributeName="cy" values="24;38;50" dur="2.6s" fill="freeze"/><animate attributeName="opacity" values="1;.3;1" dur=".5s" repeatCount="indefinite"/></circle>`),
    cat: S(80, 64, `<path d="M14 64 Q10 30 22 20 L18 2 L34 16 Q40 14 46 16 L62 2 L58 20 Q70 30 66 64 Z" fill="#e3913d"/><path d="M22 6 L30 16 M58 6 L50 16" stroke="#f6c28e" stroke-width="3"/>
      <ellipse cx="31" cy="38" rx="5" ry="6" fill="#ffe9a8"/><ellipse cx="49" cy="38" rx="5" ry="6" fill="#ffe9a8"/><ellipse cx="31" cy="38" rx="1.8" ry="5" fill="#2a1a0c"/><ellipse cx="49" cy="38" rx="1.8" ry="5" fill="#2a1a0c"/>
      <rect x="24" y="31" width="14" height="0" fill="#e3913d"><animate attributeName="height" values="0;0;14;0;0" keyTimes="0;.55;.6;.66;1" dur="2.2s" repeatCount="indefinite"/></rect>
      <rect x="42" y="31" width="14" height="0" fill="#e3913d"><animate attributeName="height" values="0;0;14;0;0" keyTimes="0;.55;.6;.66;1" dur="2.2s" repeatCount="indefinite"/></rect>
      <path d="M37 47 l3 3 l3 -3 Z" fill="#f08aa0"/><path d="M40 50 v3 M40 53 q-4 3 -7 1 M40 53 q4 3 7 1" stroke="#7a3e12" stroke-width="1.4" fill="none"/>
      <path d="M6 46 l16 2 M6 52 l16 0 M74 46 l-16 2 M74 52 l-16 0" stroke="#fff3e0" stroke-width="1" opacity=".8"/>`),
    chess: S(100, 78, `<rect x="6" y="24" width="88" height="48" rx="6" fill="#d9d4c5"/><rect x="14" y="31" width="50" height="20" rx="2" fill="#1d2b1d"/>
      <text x="39" y="45" text-anchor="middle" font-family="monospace" font-size="8.5" font-weight="700" fill="#7dff8a">CHECKMATE<animate attributeName="opacity" values="1;0;1" dur=".5s" repeatCount="6"/></text>
      <g fill="#6b6455"><circle cx="74" cy="36" r="3"/><circle cx="84" cy="36" r="3"/><circle cx="74" cy="46" r="3"/><circle cx="84" cy="46" r="3"/></g><rect x="14" y="56" width="72" height="10" rx="2" fill="#b9b2a0"/>
      <g><path d="M46 2 h16 l-3 14 h-10 Z" fill="#cfe6f0" opacity=".85"/><rect x="48" y="8" width="12" height="7" fill="#c8a35a" opacity=".9"/><animateTransform attributeName="transform" type="rotate" values="0 54 10;0 54 10;95 54 10" keyTimes="0;.45;1" dur="1.6s" fill="freeze"/></g>
      <g fill="#c8a35a"><circle cx="40" cy="20" r="2"><animate attributeName="cy" values="16;16;30" keyTimes="0;.5;1" dur="1.8s" repeatCount="2"/></circle><circle cx="34" cy="22" r="1.5"><animate attributeName="cy" values="16;16;34" keyTimes="0;.55;1" dur="1.8s" repeatCount="2"/></circle></g>`),
    apple: S(50, 56, `<path d="M25 14 C10 6 2 20 4 32 C6 46 16 54 25 50 C34 54 44 46 46 32 C48 20 40 6 25 14 Z" fill="#d8283a"/>
      <path d="M14 20 C10 24 9 30 11 34" stroke="#ff8a96" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/><path d="M25 14 Q24 6 28 2" stroke="#5a3a1e" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M28 6 Q38 0 42 8 Q34 12 28 6 Z" fill="#3fbf5a"/>`),
    rv: S(120, 66, `<rect x="4" y="12" width="96" height="40" rx="6" fill="#efe6cf"/><path d="M100 22 L114 30 L114 52 L100 52 Z" fill="#efe6cf"/><rect x="4" y="34" width="110" height="5" fill="#7a5a3a"/>
      <rect x="14" y="18" width="16" height="11" rx="2" fill="#8fc7d8"/><rect x="36" y="18" width="16" height="11" rx="2" fill="#8fc7d8"/><rect x="70" y="18" width="12" height="11" rx="2" fill="#8fc7d8"/>
      <path d="M102 25 L112 31 L112 36 L102 36 Z" fill="#8fc7d8"/><rect x="58" y="16" width="9" height="30" rx="1.5" fill="#d8ccb0"/>
      <circle cx="26" cy="54" r="9" fill="#1f1f1f"/><circle cx="26" cy="54" r="3.5" fill="#9a9a9a"/><circle cx="92" cy="54" r="9" fill="#1f1f1f"/><circle cx="92" cy="54" r="3.5" fill="#9a9a9a"/>
      <g fill="#d9b98a" opacity=".6"><circle cx="2" cy="58" r="4"><animate attributeName="r" values="1;6" dur=".6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".7;0" dur=".6s" repeatCount="indefinite"/></circle></g>`),
    pizza: S(60, 60, `<circle cx="30" cy="30" r="27" fill="#e9a948"/><circle cx="30" cy="30" r="22" fill="#d84b2a"/><circle cx="30" cy="30" r="20" fill="#f3cf6a" opacity=".9"/>
      <g fill="#b8322a"><circle cx="22" cy="22" r="4"/><circle cx="38" cy="20" r="4"/><circle cx="30" cy="34" r="4"/><circle cx="18" cy="38" r="3.5"/><circle cx="40" cy="38" r="4"/></g>
      <path d="M30 3 V57 M3 30 H57 M11 11 L49 49 M49 11 L11 49" stroke="#d99a3a" stroke-width="1.2" opacity=".7"/>`),
    rocket: S(34, 96, `<g fill="#cfd8e2" opacity=".7"><circle cx="17" cy="78" r="4"><animate attributeName="cy" values="66;92" dur=".5s" repeatCount="indefinite"/><animate attributeName="r" values="3;8" dur=".5s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur=".5s" repeatCount="indefinite"/></circle></g>
      <path d="M11 52 Q17 70 23 52 Z" fill="#ffb547"><animate attributeName="d" values="M11 52 Q17 70 23 52 Z;M11 52 Q17 80 23 52 Z;M11 52 Q17 70 23 52 Z" dur=".2s" repeatCount="indefinite"/></path>
      <path d="M17 2 C26 14 28 30 26 50 L8 50 C6 30 8 14 17 2 Z" fill="#e8eef5"/><path d="M17 2 C22 8 24 14 25 20 L9 20 C10 14 12 8 17 2 Z" fill="#e0453a"/>
      <circle cx="17" cy="32" r="5" fill="#2bd9ff" stroke="#9aaebf" stroke-width="2"/><path d="M8 40 L0 56 L9 52 Z M26 40 L34 56 L25 52 Z" fill="#e0453a"/>`),
    pig: S(130, 84, `<ellipse cx="62" cy="46" rx="48" ry="28" fill="#b9a7a2"/><ellipse cx="62" cy="40" rx="40" ry="18" fill="#cbb9b4" opacity=".7"/><ellipse cx="108" cy="42" rx="16" ry="14" fill="#b9a7a2"/>
      <ellipse cx="120" cy="46" rx="7" ry="6" fill="#e3a7a7"/><circle cx="118" cy="45" r="1.4" fill="#5a3a3a"/><circle cx="122" cy="45" r="1.4" fill="#5a3a3a"/><path d="M98 28 Q100 18 108 24 Z" fill="#a8928c"/>
      <circle cx="110" cy="36" r="2.2" fill="#1d1a1a"/><circle cx="110.7" cy="35.3" r=".7" fill="#fff"/>
      <g fill="#a8928c"><rect x="30" y="66" width="10" height="14" rx="4"/><rect x="48" y="68" width="10" height="12" rx="4"/><rect x="72" y="68" width="10" height="12" rx="4"/><rect x="88" y="66" width="10" height="14" rx="4"/></g>
      <path d="M14 40 q-8 -2 -8 6 q0 6 6 4" stroke="#a8928c" stroke-width="3" fill="none" stroke-linecap="round"/>`),
    coin: S(48, 48, `<circle cx="24" cy="24" r="21" fill="#d9a93a"/><circle cx="24" cy="24" r="17" fill="none" stroke="#f6d27a" stroke-width="2"/>
      <text x="24" y="30" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="700" fill="#8a6418">25</text>`),
    blackhole: S(120, 120, `<defs><radialGradient id="bhHalo"><stop offset=".42" stop-color="#000" stop-opacity="0"/><stop offset=".52" stop-color="#ffb35c" stop-opacity=".9"/><stop offset=".7" stop-color="#ff7a2a" stop-opacity=".3"/><stop offset="1" stop-color="#ff7a2a" stop-opacity="0"/></radialGradient>
      <linearGradient id="bhDisk" x1="0" x2="1"><stop offset="0" stop-color="#ff8a3a" stop-opacity="0"/><stop offset=".5" stop-color="#fff1c8"/><stop offset="1" stop-color="#ff8a3a" stop-opacity="0"/></linearGradient></defs>
      <circle cx="60" cy="60" r="54" fill="url(#bhHalo)"/><ellipse cx="60" cy="60" rx="58" ry="8" fill="url(#bhDisk)"/><circle cx="60" cy="60" r="24" fill="#000"/>
      <path d="M36 58 A24 12 0 0 1 84 58" fill="none" stroke="#ffe2a8" stroke-width="3" opacity=".8"/>
      <circle r="2.4" fill="#d6ecff"><animateMotion dur="3s" repeatCount="indefinite" path="M60 16 A44 44 0 1 1 59.9 16"/></circle>`),
    bullet: S(220, 44, `<path d="M4 14 H170 C196 14 214 24 218 32 C214 38 200 40 186 40 H4 Z" fill="#f2f5f8"/><rect x="4" y="30" width="190" height="4" fill="#2b6cb0"/>
      <path d="M170 14 C190 15 204 22 210 28 L178 28 Z" fill="#1f2a37"/>
      <g fill="#1f2a37"><rect x="14" y="19" width="12" height="7" rx="2"/><rect x="34" y="19" width="12" height="7" rx="2"/><rect x="54" y="19" width="12" height="7" rx="2"/><rect x="74" y="19" width="12" height="7" rx="2"/><rect x="94" y="19" width="12" height="7" rx="2"/><rect x="114" y="19" width="12" height="7" rx="2"/><rect x="134" y="19" width="12" height="7" rx="2"/><rect x="154" y="19" width="10" height="7" rx="2"/></g>
      <rect x="0" y="40" width="220" height="3" fill="#6f93b5" opacity=".6"/>`),
    steam: S(170, 72, `<g fill="#cfd8e2" opacity=".7"><circle cx="85" cy="12" r="5"><animate attributeName="cy" values="14;-14" dur="1.2s" repeatCount="indefinite"/><animate attributeName="r" values="4;11" dur="1.2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="1.2s" repeatCount="indefinite"/></circle>
      <circle cx="85" cy="12" r="5"><animate attributeName="cy" values="14;-14" dur="1.2s" begin=".6s" repeatCount="indefinite"/><animate attributeName="r" values="4;11" dur="1.2s" begin=".6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="1.2s" begin=".6s" repeatCount="indefinite"/></circle></g>
      <rect x="6" y="26" width="58" height="30" rx="3" fill="#7a2f2a"/><rect x="12" y="32" width="12" height="10" rx="1.5" fill="#f6d27a"/><rect x="30" y="32" width="12" height="10" rx="1.5" fill="#f6d27a"/><rect x="48" y="32" width="10" height="10" rx="1.5" fill="#f6d27a"/>
      <rect x="70" y="30" width="60" height="26" rx="4" fill="#3a4a5c"/><rect x="118" y="20" width="26" height="36" rx="3" fill="#3a4a5c"/><rect x="122" y="25" width="10" height="9" rx="1.5" fill="#f6d27a"/>
      <rect x="80" y="16" width="10" height="16" fill="#26323f"/><path d="M144 46 L160 56 H144 Z" fill="#9aaebf"/><rect x="64" y="44" width="8" height="4" fill="#3a4a5c"/>
      <g fill="#151515"><circle cx="20" cy="60" r="7"/><circle cx="50" cy="60" r="7"/><circle cx="84" cy="60" r="8"/><circle cx="104" cy="60" r="8"/><circle cx="130" cy="60" r="8"/></g>`),
    hex: S(80, 90, `<defs><radialGradient id="hexGlow"><stop offset="0" stop-color="#bff4ff"/><stop offset=".5" stop-color="#2bd9ff" stop-opacity=".6"/><stop offset="1" stop-color="#2bd9ff" stop-opacity="0"/></radialGradient></defs>
      <circle cx="40" cy="45" r="40" fill="url(#hexGlow)" opacity=".5"><animate attributeName="opacity" values=".3;.75;.3" dur="1.6s" repeatCount="indefinite"/></circle>
      <path d="M40 12 L64 26 L64 64 L40 78 L16 64 L16 26 Z" fill="#1b7fae" stroke="#bff4ff" stroke-width="2"/><path d="M40 12 L40 78 M16 26 L64 64 M64 26 L16 64" stroke="#7fe3ff" stroke-width="1.2" opacity=".6"/>
      <path d="M40 24 L52 32 L52 58 L40 66 L28 58 L28 32 Z" fill="#7fe3ff" opacity=".45"><animate attributeName="opacity" values=".25;.7;.25" dur="1.1s" repeatCount="indefinite"/></path>`),
    worm: S(170, 124, `<path d="M70 124 C64 96 68 66 84 40" stroke="#b07f4c" stroke-width="34" fill="none" stroke-linecap="round"/><path d="M70 124 C64 96 68 66 84 40" stroke="#8a6238" stroke-width="34" fill="none" stroke-dasharray="3 11" opacity=".55"/>
      <ellipse cx="86" cy="36" rx="21" ry="12" fill="#5a3b20" transform="rotate(-24 86 36)"/><ellipse cx="86" cy="36" rx="13" ry="7" fill="#24130a" transform="rotate(-24 86 36)"/>
      <g stroke="#f5e6c0" stroke-width="2" stroke-linecap="round"><path d="M76 30 l4 3 M84 25 l1 4 M93 27 l-2 4 M98 34 l-4 2 M74 40 l5 -1"/></g>
      <path d="M0 108 Q30 92 60 104 T120 100 T170 104 V124 H0 Z" fill="#d9a85c"/><path d="M0 116 Q40 106 80 114 T170 112 V124 H0 Z" fill="#c38e46"/>`),
    sauce: S(90, 70, `<path d="M10 30 H80 L74 66 H16 Z" fill="#9aa3ad"/><rect x="6" y="26" width="78" height="8" rx="3" fill="#c0c8d0"/><ellipse cx="45" cy="30" rx="34" ry="5" fill="#b3271e"/>
      <g fill="#fff6e0"><ellipse cx="32" cy="29" rx="4" ry="1.6"/><ellipse cx="50" cy="31" rx="4" ry="1.6"/><ellipse cx="60" cy="28" rx="3.5" ry="1.4"/></g>
      <g fill="#d8433a"><circle cx="38" cy="28" r="0"><animate attributeName="r" values="0;2.6;0" dur="1.1s" repeatCount="indefinite"/></circle><circle cx="56" cy="30" r="0"><animate attributeName="r" values="0;2.2;0" dur="1.4s" begin=".4s" repeatCount="indefinite"/></circle></g>
      <path d="M30 20 q4 -8 0 -14 M45 18 q4 -8 0 -14 M60 20 q4 -8 0 -14" stroke="#d6ecff" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round"/>
      <rect x="0" y="34" width="10" height="5" rx="2" fill="#5a636d"/><rect x="80" y="34" width="10" height="5" rx="2" fill="#5a636d"/>`),
    cape: S(100, 60, `<path fill="#d6232f" d="M10 10 C30 4 50 14 70 8 C80 6 90 10 96 14 C86 22 74 30 60 34 C42 40 24 50 6 54 C14 40 16 24 10 10 Z"><animate attributeName="d" dur=".6s" repeatCount="indefinite" values="M10 10 C30 4 50 14 70 8 C80 6 90 10 96 14 C86 22 74 30 60 34 C42 40 24 50 6 54 C14 40 16 24 10 10 Z;M10 10 C30 8 50 6 70 12 C80 14 90 8 96 14 C86 24 74 26 60 36 C42 42 24 44 6 54 C16 40 12 24 10 10 Z;M10 10 C30 4 50 14 70 8 C80 6 90 10 96 14 C86 22 74 30 60 34 C42 40 24 50 6 54 C14 40 16 24 10 10 Z"/></path>
      <path d="M14 14 C30 10 50 18 68 13" stroke="#ff6b73" stroke-width="2" fill="none" opacity=".6"/>`),
    wolf: S(130, 110, `<circle cx="90" cy="38" r="30" fill="#f4ecc8"/><g fill="#ddd2a6"><circle cx="80" cy="30" r="5"/><circle cx="98" cy="46" r="7"/><circle cx="94" cy="24" r="3"/></g>
      <path d="M0 110 L18 86 Q40 80 70 84 L98 110 Z" fill="#26323f"/>
      <path d="M30 92 C28 78 30 68 36 62 C38 54 40 48 44 42 L42 32 L48 38 L52 30 L54 40 C58 44 60 50 58 56 C64 62 66 72 64 92 Z" fill="#3a4a5c"/><path d="M44 42 L36 36 L44 38 Z" fill="#3a4a5c"/>`),
    van: S(210, 76, `<g transform="translate(60 0)"><path d="M6 22 Q6 10 18 10 H96 Q110 10 116 22 L128 40 V58 H6 Z" fill="#f2c230"/><path d="M6 10 H100 Q108 10 112 18 H6 Z" fill="#f7f1df"/>
      <rect x="14" y="22" width="18" height="12" rx="2" fill="#8fc7d8"/><rect x="38" y="22" width="18" height="12" rx="2" fill="#8fc7d8"/><rect x="62" y="22" width="18" height="12" rx="2" fill="#8fc7d8"/><path d="M90 22 H108 L118 36 H90 Z" fill="#8fc7d8"/>
      <rect x="6" y="40" width="122" height="4" fill="#f7f1df"/><g fill="#1f1f1f"><circle cx="30" cy="60" r="10"/><circle cx="104" cy="60" r="10"/></g><g fill="#cfcfcf"><circle cx="30" cy="60" r="4"/><circle cx="104" cy="60" r="4"/></g></g>
      <g stroke-width="3.2" stroke-linecap="round" fill="none"><g stroke="#f2c9a0" transform="translate(44 34)"><circle cx="0" cy="0" r="4" fill="#f2c9a0"/><path d="M0 4 V18 M0 8 L8 14 M0 8 L-6 14"/><path d="M0 18 L6 30 M0 18 L-6 30"><animateTransform attributeName="transform" type="rotate" values="-20 0 18;20 0 18;-20 0 18" dur=".3s" repeatCount="indefinite"/></path></g>
      <g stroke="#e8b48a" transform="translate(26 36)"><circle cx="0" cy="0" r="4" fill="#e8b48a"/><path d="M0 4 V18 M0 8 L8 13 M0 8 L-6 13"/><path d="M0 18 L6 30 M0 18 L-6 30"><animateTransform attributeName="transform" type="rotate" values="20 0 18;-20 0 18;20 0 18" dur=".3s" repeatCount="indefinite"/></path></g>
      <g stroke="#f6d0b0" transform="translate(9 40)"><circle cx="0" cy="0" r="3.4" fill="#f6d0b0"/><path d="M0 4 V15 M0 7 L6 11 M0 7 L-5 11"/><path d="M0 15 L5 25 M0 15 L-5 25"><animateTransform attributeName="transform" type="rotate" values="-22 0 15;22 0 15;-22 0 15" dur=".28s" repeatCount="indefinite"/></path></g></g>`),
    tub: S(100, 70, `<path d="M8 26 H92 Q92 56 70 60 H30 Q8 56 8 26 Z" fill="#f1f4f7"/><rect x="4" y="22" width="92" height="8" rx="4" fill="#dfe6ec"/>
      <path d="M22 60 l-4 8 M78 60 l4 8" stroke="#c9a35a" stroke-width="4" stroke-linecap="round"/><g fill="#ffffff" opacity=".9"><circle cx="24" cy="20" r="7"/><circle cx="34" cy="16" r="9"/><circle cx="46" cy="19" r="7"/><circle cx="74" cy="18" r="6"/></g>
      <g><ellipse cx="60" cy="16" rx="9" ry="7" fill="#ffd23a"/><circle cx="66" cy="9" r="5.5" fill="#ffd23a"/><path d="M70 9 l5 1 l-5 2 Z" fill="#ff8a1e"/><circle cx="67" cy="8" r="1" fill="#1d1d1d"/>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="1s" repeatCount="indefinite"/></g>`),
    puppy: S(90, 72, `<ellipse cx="45" cy="60" rx="26" ry="12" fill="#f3efe8"/><circle cx="45" cy="34" r="20" fill="#f3efe8"/>
      <path d="M45 14 C38 14 30 18 28 26 C34 22 40 22 45 24 C50 22 56 22 62 26 C60 18 52 14 45 14 Z" fill="#a8693a"/>
      <path d="M27 24 C18 26 16 44 22 50 C28 46 30 34 29 26 Z" fill="#5a3a22"><animateTransform attributeName="transform" type="rotate" values="0 28 24;8 28 24;0 28 24" dur="1.2s" repeatCount="indefinite"/></path>
      <path d="M63 24 C72 26 74 44 68 50 C62 46 60 34 61 26 Z" fill="#5a3a22"><animateTransform attributeName="transform" type="rotate" values="0 62 24;-8 62 24;0 62 24" dur="1.2s" repeatCount="indefinite"/></path>
      <circle cx="38" cy="34" r="3" fill="#1d1a17"/><circle cx="52" cy="34" r="3" fill="#1d1a17"/><circle cx="39" cy="33" r="1" fill="#fff"/><circle cx="53" cy="33" r="1" fill="#fff"/>
      <ellipse cx="45" cy="42" rx="4" ry="3" fill="#1d1a17"/><path d="M45 45 v3 M45 48 q-4 3 -7 0 M45 48 q4 3 7 0" stroke="#1d1a17" stroke-width="1.4" fill="none"/><path d="M45 50 q0 6 3 7" stroke="#f08aa0" stroke-width="3" stroke-linecap="round"/>
      <path d="M71 58 q14 -6 12 -18" stroke="#f3efe8" stroke-width="5" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="-12 71 58;16 71 58;-12 71 58" dur=".3s" repeatCount="indefinite"/></path>
      <g transform="translate(6 10)"><rect x="-2" y="-14" width="4" height="26" fill="#f2c230"/><path d="M-2 12 L0 18 L2 12 Z" fill="#e9d2a8"/><rect x="-2" y="-16" width="4" height="3" fill="#e0828c"/><animateTransform attributeName="transform" type="rotate" values="0;360" dur="1s" repeatCount="indefinite" additive="sum"/></g>`),
    convertible: S(140, 56, `<path d="M6 34 Q8 24 22 22 L48 20 Q60 10 78 12 L92 20 L120 24 Q134 26 134 38 V44 H6 Z" fill="#d42a2a"/><path d="M56 20 Q64 12 76 14 L86 20 Z" fill="#9fd3e6" opacity=".9"/>
      <rect x="6" y="36" width="128" height="3" fill="#ff7b7b" opacity=".7"/><g fill="#1a1a1a"><circle cx="32" cy="44" r="9"/><circle cx="108" cy="44" r="9"/></g><g fill="#d0d0d0"><circle cx="32" cy="44" r="4"/><circle cx="108" cy="44" r="4"/></g>
      <circle cx="130" cy="30" r="3" fill="#ffe9a8"/><g fill="#ffd23a"><rect x="40" y="2" width="4" height="6"><animateTransform attributeName="transform" type="rotate" values="0 42 5;360 42 5" dur=".8s" repeatCount="indefinite"/></rect></g>
      <g fill="#2bd9ff"><rect x="64" y="0" width="4" height="6"><animateTransform attributeName="transform" type="rotate" values="0 66 3;-360 66 3" dur=".9s" repeatCount="indefinite"/></rect></g><g fill="#ff7aa0"><rect x="90" y="4" width="4" height="6"><animateTransform attributeName="transform" type="rotate" values="0 92 7;360 92 7" dur=".7s" repeatCount="indefinite"/></rect></g>`),
    cabin: S(110, 96, `<path d="M10 50 L55 18 L100 50 Z" fill="#4a3a2c"/><rect x="18" y="48" width="74" height="44" fill="#6b5440"/><g stroke="#4a3a2c" stroke-width="2"><path d="M18 58 H92 M18 68 H92 M18 78 H92 M18 88 H92"/></g>
      <rect x="46" y="60" width="16" height="32" fill="#2b1f15"/>
      <rect x="24" y="56" width="14" height="12" fill="#ffd36b" opacity=".85"><animate attributeName="opacity" values=".85;.2;.85;.85" keyTimes="0;.1;.2;1" dur="2.2s" repeatCount="indefinite"/></rect>
      <g><path d="M72 52 V66 M84 52 V66" stroke="#8a7a66" stroke-width="1.2"/><rect x="70" y="66" width="16" height="4" fill="#8a6a4a"/><animateTransform attributeName="transform" type="rotate" values="-16 78 52;16 78 52;-16 78 52" dur="1.6s" repeatCount="indefinite"/></g>
      <rect x="66" y="50" width="24" height="2" fill="#4a3a2c"/>`),
    engine: S(80, 64, `<rect x="10" y="12" width="60" height="40" rx="18" fill="#b8c2cc"/><ellipse cx="14" cy="32" rx="8" ry="20" fill="#3a4450"/>
      <g stroke="#8a96a3" stroke-width="2"><path d="M14 14 L14 50 M6 32 L22 32 M8 20 L20 44 M20 20 L8 44"/><animateTransform attributeName="transform" type="rotate" values="0 14 32;360 14 32" dur=".4s" repeatCount="indefinite"/></g>
      <rect x="66" y="22" width="10" height="20" rx="3" fill="#8a96a3"/>`),
    heart: S(56, 64, `<path d="M28 60 C10 46 2 36 2 24 C2 12 12 6 20 6 C24 6 27 8 28 11 C29 8 32 6 36 6 C44 6 54 12 54 24 C54 36 46 46 28 60 Z" fill="#d6234a"/>
      <path d="M16 16 C12 18 10 22 10 26" stroke="#ff8aa3" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/><rect x="19" y="30" width="18" height="15" rx="3" fill="#f6d27a"/>
      <path d="M22 30 V25 A6 6 0 0 1 34 25 V30" fill="none" stroke="#f6d27a" stroke-width="3"><animateTransform attributeName="transform" type="translate" values="0 -6;0 -6;0 0" keyTimes="0;.5;1" dur="1.4s" fill="freeze"/></path><circle cx="28" cy="37" r="2" fill="#8a6418"/>`),
    candle: S(32, 84, `<rect x="9" y="34" width="14" height="46" rx="2" fill="#efe6cf"/><path d="M9 38 q3 4 0 8" stroke="#e0d4b4" stroke-width="2" fill="none"/><path d="M16 34 v-4" stroke="#3a2a1a" stroke-width="1.5"/>
      <g><path fill="#ffb547" d="M16 6 C22 16 22 24 16 30 C10 24 10 16 16 6 Z"><animate attributeName="d" dur=".35s" repeatCount="indefinite" values="M16 6 C22 16 22 24 16 30 C10 24 10 16 16 6 Z;M17 8 C22 17 21 24 16 30 C11 24 11 17 17 8 Z;M16 6 C22 16 22 24 16 30 C10 24 10 16 16 6 Z"/></path>
      <path d="M16 16 C19 21 19 25 16 28 C13 25 13 21 16 16 Z" fill="#fff3c4"/><animate attributeName="opacity" values="1;1;0" keyTimes="0;.78;.8" dur="5s" fill="freeze"/></g>
      <circle cx="16" cy="22" r="0" fill="#9aaebf" opacity=".5"><animate attributeName="r" values="0;0;7" keyTimes="0;.79;1" dur="5s" fill="freeze"/><animate attributeName="cy" values="26;26;8" keyTimes="0;.79;1" dur="5s" fill="freeze"/></circle>`),
    hallway: S(150, 100, `<rect width="150" height="100" rx="6" fill="#d8c56a"/><path d="M0 0 L50 30 V70 L0 100 Z" fill="#c9b55a"/><path d="M150 0 L100 30 V70 L150 100 Z" fill="#c9b55a"/>
      <path d="M0 100 L50 70 H100 L150 100 Z" fill="#a89a5a"/><rect x="50" y="30" width="50" height="40" fill="#b8a85c"/>
      <rect x="56" y="6" width="38" height="8" fill="#fffbe0"><animate attributeName="opacity" values="1;.2;1;1;.4;1" keyTimes="0;.05;.1;.6;.65;.7" dur="1.8s" repeatCount="indefinite"/></rect>
      <g stroke="#bfae5a" stroke-width="1" opacity=".6"><path d="M10 6 v80 M20 12 v76 M30 18 v64 M120 18 v64 M130 12 v76 M140 6 v80"/></g>`),
    ship: S(150, 96, `<path d="M10 66 H140 L126 84 H30 Z" fill="#7a4a2a"/><path d="M140 66 Q150 58 146 50" stroke="#7a4a2a" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="128" cy="72" r="3" fill="#f6efe0"/><circle cx="128" cy="72" r="1.4" fill="#1d1a17"/>
      <rect x="72" y="14" width="4" height="54" fill="#5a3a22"/><path d="M44 18 H106 V58 H44 Z" fill="#f2e6c8"/><g fill="#c0392b"><rect x="44" y="26" width="62" height="6"/><rect x="44" y="40" width="62" height="6"/></g>
      <g stroke="#5a3a22" stroke-width="2.5" stroke-linecap="round"><path d="M40 78 l-8 14 M56 80 l-8 14 M72 80 l-8 14 M88 80 l-8 14 M104 80 l-8 14"><animateTransform attributeName="transform" type="rotate" values="-6 72 80;8 72 80;-6 72 80" dur="1.2s" repeatCount="indefinite"/></path></g>${WAVE(92, 150)}`),
    spider: S(44, 40, `<g stroke="#2a2a33" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M14 18 L4 10 M14 22 L2 22 M14 26 L4 34 M16 28 L10 38 M30 18 L40 10 M30 22 L42 22 M30 26 L40 34 M28 28 L34 38"><animateTransform attributeName="transform" type="rotate" values="-4 22 22;4 22 22;-4 22 22" dur=".4s" repeatCount="indefinite"/></path></g>
      <circle cx="22" cy="22" r="11" fill="#c8232c"/><path d="M11 22 H33 M22 11 V33 M14 14 L30 30 M30 14 L14 30" stroke="#7a1218" stroke-width="1" opacity=".55"/>
      <ellipse cx="18" cy="20" rx="3.4" ry="4.2" fill="#fff"/><ellipse cx="26" cy="20" rx="3.4" ry="4.2" fill="#fff"/><circle cx="18.6" cy="21" r="1.6" fill="#1d1d1d"/><circle cx="26.6" cy="21" r="1.6" fill="#1d1d1d"/>`),
    herbs: S(100, 64, `<g><rect x="12" y="40" width="24" height="20" rx="3" fill="#8a5a3a"/><g fill="#2fb352"><ellipse cx="18" cy="34" rx="6" ry="10" transform="rotate(-20 18 34)"/><ellipse cx="30" cy="34" rx="6" ry="10" transform="rotate(20 30 34)"/><ellipse cx="24" cy="28" rx="5" ry="11"/></g>
      <animateTransform attributeName="transform" type="translate" values="0 0;10 -10;20 0" dur="1.1s" begin="1s" fill="freeze"/></g>
      <g><rect x="64" y="40" width="24" height="20" rx="3" fill="#8a5a3a"/><g fill="#d8343a"><ellipse cx="70" cy="34" rx="6" ry="10" transform="rotate(-20 70 34)"/><ellipse cx="82" cy="34" rx="6" ry="10" transform="rotate(20 82 34)"/><ellipse cx="76" cy="28" rx="5" ry="11"/></g>
      <animateTransform attributeName="transform" type="translate" values="0 0;-10 -10;-20 0" dur="1.1s" begin="1s" fill="freeze"/></g>
      <path d="M50 4 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z" fill="#fff6c4" opacity="0"><animate attributeName="opacity" values="0;1;0" begin="2.1s" dur=".9s" fill="freeze"/></path>`),
    rec: S(130, 40, `<rect x="2" y="2" width="126" height="36" rx="6" fill="rgba(0,0,0,.6)" stroke="#ffffff" stroke-opacity=".4"/>
      <circle cx="20" cy="20" r="7" fill="#ff3b3b"><animate attributeName="opacity" values="1;.15;1" dur="1s" repeatCount="indefinite"/></circle>
      <text x="33" y="26" font-family="monospace" font-size="15" font-weight="700" fill="#fff">REC</text><text x="74" y="25" font-family="monospace" font-size="12" fill="#d6ecff">00:01:24</text>`),
    frame: S(76, 88, `<rect x="4" y="4" width="68" height="80" rx="3" fill="#c99a3a"/><rect x="10" y="10" width="56" height="68" fill="#3d4a3a"/><rect x="14" y="14" width="48" height="60" fill="#5d6a52"/>
      <path d="M24 74 C24 54 30 46 38 46 C46 46 52 54 52 74 Z" fill="#c8b48a"/><circle cx="38" cy="38" r="7" fill="#e6c9a0"/><path d="M31 36 Q38 26 45 36" fill="#5a3a22"/><rect x="44" y="54" width="16" height="10" fill="#8a6a4a"/>
      <text x="58" y="12" font-size="13" font-family="serif" fill="#ffe9a8">♪<animateTransform attributeName="transform" type="translate" values="0 0;10 -16" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="1.6s" repeatCount="indefinite"/></text>
      <text x="48" y="14" font-size="11" font-family="serif" fill="#ffe9a8">♫<animateTransform attributeName="transform" type="translate" values="0 0;-8 -18" dur="1.9s" begin=".6s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="1.9s" begin=".6s" repeatCount="indefinite"/></text>`),
    boat: S(130, 80, `<path d="M10 52 H120 L108 68 H24 Z" fill="#f2f5f8"/><rect x="10" y="52" width="110" height="4" fill="#2b6cb0"/>
      <rect x="54" y="32" width="30" height="20" rx="2" fill="#e8edf2"/><rect x="58" y="36" width="9" height="7" fill="#8fc7d8"/><rect x="71" y="36" width="9" height="7" fill="#8fc7d8"/>
      <rect x="40" y="8" width="3" height="44" fill="#7a8a9a"/><path d="M43 12 L68 24" stroke="#7a8a9a" stroke-width="1.5"/>${WAVE(74, 130)}`),
    truck: S(170, 80, `<path d="M0 6 Q85 -6 170 6" stroke="#ffd36b" stroke-width="2" stroke-dasharray="2 10" fill="none" opacity=".8"><animate attributeName="stroke-dashoffset" values="0;-24" dur=".3s" repeatCount="indefinite"/></path>
      <path d="M20 50 H110 V38 H128 L140 48 H150 V62 H20 Z" fill="#4a7ab8"/><rect x="112" y="40" width="14" height="8" fill="#9fd3e6"/><g fill="#1a1a1a"><circle cx="42" cy="64" r="8"/><circle cx="130" cy="64" r="8"/></g>
      <g stroke="#f2c9a0" stroke-width="3" stroke-linecap="round" fill="none"><path d="M64 48 V26"/><path d="M64 30 L50 18 M64 30 L78 18"><animateTransform attributeName="transform" type="rotate" values="-4 64 30;4 64 30;-4 64 30" dur="1s" repeatCount="indefinite"/></path></g>
      <circle cx="64" cy="20" r="5" fill="#f2c9a0"/><path fill="none" stroke="#6b3a22" stroke-width="3" d="M60 22 q-10 4 -16 2"><animate attributeName="d" values="M60 22 q-10 4 -16 2;M60 22 q-10 -2 -16 4;M60 22 q-10 4 -16 2" dur=".5s" repeatCount="indefinite"/></path>`),
    polaroid: S(72, 86, `<defs><linearGradient id="sunSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9f6b"/><stop offset=".55" stop-color="#ffd59a"/><stop offset=".56" stop-color="#3a8fb7"/><stop offset="1" stop-color="#1f5f80"/></linearGradient></defs>
      <rect x="2" y="2" width="68" height="82" rx="3" fill="#f7f4ec"/><rect x="8" y="8" width="56" height="56" fill="url(#sunSky)"/><circle cx="36" cy="38" r="8" fill="#fff1c2" opacity=".9"/>
      <rect x="8" y="8" width="56" height="56" fill="#3b3f45"><animate attributeName="opacity" values="1;0" dur="3.4s" fill="freeze"/></rect>`),
    carpe: S(170, 46, `<path d="M10 8 H160 L150 23 L160 38 H10 L20 23 Z" fill="#f2e6c8"/><text x="85" y="29" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="16" fill="#5a3a22">carpe diem</text>`),
    clock: S(110, 70, `<circle cx="34" cy="35" r="28" fill="#f2f0ea" stroke="#5a636d" stroke-width="4"/>
      <g stroke="#2a2a2a" stroke-width="3" stroke-linecap="round"><path d="M34 35 V16"><animateTransform attributeName="transform" type="rotate" values="0 34 35;720 34 35" dur="2s" fill="freeze"/></path><path d="M34 35 L46 35"><animateTransform attributeName="transform" type="rotate" values="0 34 35;60 34 35" dur="2s" fill="freeze"/></path></g>
      <g fill="#e8b48a"><rect x="82" y="34" width="14" height="32" rx="5"/><rect x="77" y="16" width="24" height="22" rx="7"/><animateTransform attributeName="transform" type="translate" values="0 30;0 30;0 0;0 4;0 0" keyTimes="0;.5;.65;.75;.85" dur="3s" fill="freeze"/></g>`),
    pier: S(150, 90, `<defs><linearGradient id="dawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a6a"/><stop offset=".6" stop-color="#f29a6b"/><stop offset="1" stop-color="#ffd59a"/></linearGradient></defs>
      <rect width="150" height="56" rx="4" fill="url(#dawn)"/><circle cx="110" cy="56" r="14" fill="#fff1c2"><animate attributeName="cy" values="64;54" dur="4s" fill="freeze"/></circle><rect y="56" width="150" height="34" rx="4" fill="#2a5a7a"/>
      <path d="M0 64 H96 V68 H0 Z" fill="#5a3a22"/><g stroke="#5a3a22" stroke-width="2"><path d="M10 68 V86 M30 68 V86 M50 68 V86 M70 68 V86 M90 68 V86"/></g><g fill="#1d1a17"><circle cx="92" cy="56" r="2.4"/><rect x="90.5" y="58" width="3" height="6"/></g>`),
    ufo: S(110, 92, `<path d="M38 40 L20 90 H90 L72 40 Z" fill="#bff4ff" opacity=".18"><animate attributeName="opacity" values=".08;.3;.08" dur="1s" repeatCount="indefinite"/></path>
      <ellipse cx="55" cy="36" rx="44" ry="12" fill="#9aaebf"/><path d="M33 32 Q36 12 55 12 Q74 12 77 32 Z" fill="#bff4ff" opacity=".85"/>
      <g fill="#ffd36b"><circle cx="25" cy="38" r="3"><animate attributeName="fill" values="#ffd36b;#ff4d6a;#ffd36b" dur=".8s" repeatCount="indefinite"/></circle><circle cx="42" cy="42" r="3"/><circle cx="68" cy="42" r="3"/><circle cx="85" cy="38" r="3"><animate attributeName="fill" values="#ffd36b;#2bd9ff;#ffd36b" dur=".8s" repeatCount="indefinite"/></circle></g>`),
    sticky: S(70, 70, `<rect x="4" y="4" width="62" height="62" fill="#ffe36b"/><path d="M50 66 L66 50 V66 Z" fill="#e6c64a"/>
      <path d="M35 54 C22 44 16 36 18 28 C20 20 30 20 35 28 C40 20 50 20 52 28 C54 36 48 44 35 54 Z" fill="#ff7aa0"/><text x="35" y="16" text-anchor="middle" font-family="cursive" font-size="9" fill="#7a5a2a">Montauk</text>`),
    fox: S(80, 76, `<ellipse cx="40" cy="74" rx="34" ry="8" fill="#5a3a22"/><path d="M14 72 Q12 44 26 34 L22 10 L36 26 Q40 24 44 26 L58 10 L54 34 Q68 44 66 72 Z" fill="#e8762e"/>
      <path d="M24 14 L30 24 M56 14 L50 24" stroke="#2a1a0c" stroke-width="3" stroke-linecap="round"/><path d="M22 54 Q30 64 40 60 Q50 64 58 54 Q52 70 40 70 Q28 70 22 54 Z" fill="#fff3e0"/>
      <circle cx="32" cy="44" r="3" fill="#1d1a17"/><circle cx="48" cy="44" r="3" fill="#1d1a17"/><ellipse cx="40" cy="56" rx="4" ry="3" fill="#1d1a17"/><path d="M33 41 l-4 -2 M47 41 l4 -2" stroke="#1d1a17" stroke-width="1.5"/>
      <rect x="31" y="40" width="20" height="0" fill="#e8762e"><animate attributeName="height" values="0;0;7;0;0" keyTimes="0;.4;.45;.5;1" dur="2.5s" repeatCount="indefinite"/></rect>`),
    icecream: S(110, 90, `<rect x="40" y="10" width="70" height="80" fill="#b98ad8"/><rect x="40" y="10" width="70" height="8" fill="#9a6ac0"/>
      <g fill="#ffe36b"><rect x="50" y="26" width="14" height="12"/><rect x="74" y="26" width="14" height="12"/><rect x="50" y="48" width="14" height="12"/><rect x="74" y="48" width="14" height="12"/></g><rect x="96" y="60" width="10" height="30" fill="#7a4a9a"/>
      <path d="M14 50 L24 86 L34 50 Z" fill="#d9a85c"/><path d="M16 54 L32 54 M18 62 L30 62 M20 70 L28 70" stroke="#b07f3a" stroke-width="1.2"/>
      <circle cx="24" cy="44" r="12" fill="#ffd1e0"/><circle cx="18" cy="36" r="8" fill="#fff6e8"/>
      <path fill="none" stroke="#ffd1e0" stroke-width="4" stroke-linecap="round" d="M31 50 q2 4 0 6"><animate attributeName="d" values="M31 50 q2 4 0 6;M31 50 q2 10 0 18" dur="2.5s" fill="freeze"/></path>`),
    campfire: S(150, 96, `<g fill="#ffffff"><circle cx="20" cy="12" r="1.2"/><circle cx="60" cy="8" r="1"/><circle cx="96" cy="16" r="1.4"/><circle cx="130" cy="10" r="1"><animate attributeName="opacity" values="1;.2;1" dur="1.5s" repeatCount="indefinite"/></circle></g>
      <path d="M0 90 L40 34 L62 60 L92 18 L150 90 Z" fill="#3a4f63"/><path d="M92 18 L80 34 L88 32 L96 38 L102 30 Z" fill="#e8eef5"/><path d="M40 34 L32 46 L40 44 L46 48 Z" fill="#e8eef5"/>
      <path d="M0 96 H150 V88 Q75 80 0 88 Z" fill="#2a3a28"/><path d="M62 88 l12 -18 l12 18 Z" fill="#c98a3a"/><path d="M74 70 V88" stroke="#8a5a2a" stroke-width="1.5"/>
      <path fill="#ffb547" d="M106 88 C110 82 110 78 108 72 C114 78 116 82 112 88 Z"><animate attributeName="d" dur=".4s" repeatCount="indefinite" values="M106 88 C110 82 110 78 108 72 C114 78 116 82 112 88 Z;M106 88 C109 82 111 76 109 72 C113 78 115 83 112 88 Z;M106 88 C110 82 110 78 108 72 C114 78 116 82 112 88 Z"/></path>`),
    highway: S(160, 70, `<rect x="120" y="6" width="34" height="18" rx="2" fill="#1f7a46" stroke="#fff" stroke-width="1"/><text x="137" y="18" text-anchor="middle" font-family="sans-serif" font-size="8" font-weight="700" fill="#fff">I-80 W</text><rect x="135" y="24" width="3" height="40" fill="#8a96a3"/>
      <path d="M10 44 H70 V32 H90 L100 44 H108 V58 H10 Z" fill="#8a4a3a"/><rect x="74" y="35" width="13" height="8" fill="#9fd3e6"/><g fill="#1a1a1a"><circle cx="28" cy="60" r="7"/><circle cx="92" cy="60" r="7"/></g>
      <rect x="0" y="66" width="160" height="2" fill="#ffd36b" opacity=".6"/>`),
    secret: S(100, 84, `<rect x="4" y="4" width="92" height="76" fill="#6b6f74"/>
      <g stroke="#4a4e52" stroke-width="2"><path d="M4 22 H96 M4 42 H96 M4 62 H96 M30 4 V22 M70 4 V22 M18 22 V42 M50 22 V42 M82 22 V42 M30 42 V62 M70 42 V62 M18 62 V80 M50 62 V80 M82 62 V80"/></g>
      <rect x="26" y="20" width="48" height="44" fill="#1d1f22"/><path d="M38 52 L42 36 L50 44 L58 36 L62 52 Z" fill="#f6c453"/><rect x="38" y="52" width="24" height="5" fill="#e0a92c"/><circle cx="50" cy="40" r="2" fill="#ff4d6a"/>
      <rect x="26" y="20" width="48" height="44" fill="#7a7e83"><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -46" keyTimes="0;.35;1" dur="2s" fill="freeze"/></rect>`),
    led: S(56, 56, `<circle cx="28" cy="28" r="20" fill="none" stroke="#2bd9ff" stroke-width="6"><animate attributeName="stroke" values="#2bd9ff;#2bd9ff;#ffd23a;#ff3b4f;#2bd9ff" keyTimes="0;.35;.55;.75;1" dur="3.2s" fill="freeze"/></circle><circle cx="28" cy="28" r="20" fill="none" stroke="#fff" stroke-width="1.5" opacity=".6"/>`),
    pigeon: S(80, 56, `<ellipse cx="38" cy="32" rx="20" ry="11" fill="#8a96a3"/><circle cx="58" cy="24" r="8" fill="#9aa6b3"/><path d="M65 24 l7 2 l-7 2 Z" fill="#e0a92c"/><circle cx="60" cy="22" r="1.4" fill="#1d1a17"/>
      <path d="M52 30 q4 4 8 2" stroke="#3cf08e" stroke-width="2" fill="none" opacity=".7"/><path d="M18 32 L4 26 L6 36 Z" fill="#6f7a86"/>
      <path d="M34 28 C26 10 44 6 52 22 Z" fill="#a8b4c0"><animateTransform attributeName="transform" type="rotate" values="0 40 28;-38 40 28;0 40 28" dur=".25s" repeatCount="indefinite"/></path>
      <rect x="34" y="42" width="8" height="4" rx="1" fill="#c9a35a"/><path d="M38 40 v2" stroke="#5a3a22" stroke-width="1.5"/>`),
    eagle: S(90, 40, `<path d="M4 20 Q24 4 44 18 Q64 4 86 20 Q64 14 50 24 L44 30 L38 24 Q24 14 4 20 Z" fill="#7a5238"/><circle cx="44" cy="22" r="4" fill="#f2f0ea"/><path d="M44 24 l3 2 l-3 1 Z" fill="#e0a92c"/>`),
    hooded: S(30, 44, `<path d="M15 2 L26 16 Q26 26 22 30 L24 42 H6 L8 30 Q4 26 4 16 Z" fill="#f2f0ea"/><path d="M15 4 L22 15 H8 Z" fill="#c9cfd6"/><circle cx="15" cy="14" r="3" fill="#2a2a2a"/><rect x="6" y="26" width="18" height="3" fill="#c0392b"/>`),
    haystack: S(80, 50, `<path d="M4 48 Q8 8 40 6 Q72 8 76 48 Z" fill="#e2b85a"/><g stroke="#c99a3a" stroke-width="1.5"><path d="M14 40 l6 -20 M28 44 l4 -30 M44 44 l-2 -34 M58 42 l-6 -26 M68 40 l-8 -18"/></g>`),
    sedan: S(160, 66, `<path d="M10 46 Q12 36 26 34 L44 32 Q52 16 72 14 L98 14 Q110 16 118 30 L140 32 Q152 34 152 44 V50 H10 Z" fill="#26303b"/>
      <path d="M60 30 Q66 20 76 18 H94 Q102 20 108 30 Z" fill="#7aa3b8" opacity=".85"/><rect x="83" y="18" width="3" height="12" fill="#26303b"/>
      <path d="M14 46 Q22 36 38 40 L40 52 H14 Z M118 40 Q136 36 148 46 V52 H120 Z" fill="#33404d"/>
      <circle cx="34" cy="52" r="10" fill="#111"/><circle cx="34" cy="52" r="6" fill="#f2f0ea"/><circle cx="34" cy="52" r="2.5" fill="#9aa"/><circle cx="130" cy="52" r="10" fill="#111"/><circle cx="130" cy="52" r="6" fill="#f2f0ea"/><circle cx="130" cy="52" r="2.5" fill="#9aa"/>
      <circle cx="150" cy="38" r="3.5" fill="#ffe9a8"/><rect x="146" y="44" width="10" height="3" fill="#c0c8d0"/>`),
    glint: S(70, 50, `<path d="M0 50 Q20 30 40 36 Q56 40 70 30 V50 Z" fill="#2a3a28"/>
      <path d="M48 30 l2 -8 l2 8 l8 2 l-8 2 l-2 8 l-2 -8 l-8 -2 Z" fill="#fff" opacity="0"><animate attributeName="opacity" values="0;1;0;0;1;0" keyTimes="0;.1;.25;.6;.7;.85" dur="2.6s" fill="freeze"/></path>`),
    zipline: S(160, 130, `<g stroke="#9aa6b3" stroke-width="2" fill="none"><path d="M130 128 L140 10 L150 128 M134 90 L146 90 M136 60 L144 60 M138 34 L142 34 M132 110 L148 70 M148 110 L132 70"/></g>
      <circle cx="140" cy="8" r="3" fill="#ff4d6a"><animate attributeName="opacity" values="1;.2;1" dur="1s" repeatCount="indefinite"/></circle><path d="M140 20 L6 120" stroke="#c0c8d0" stroke-width="1.5"/>
      <g><path d="M0 0 v6" stroke="#5a636d" stroke-width="2"/><circle cx="0" cy="10" r="3.5" fill="#f2c9a0"/><path d="M0 13 v12 M0 17 l-6 -8 M0 17 l6 -8 M0 25 l-4 8 M0 25 l4 8" stroke="#4a7a4a" stroke-width="3" stroke-linecap="round"/>
      <animateMotion dur="2.6s" fill="freeze" path="M140 20 L8 118"/></g>`),
    fountain: S(160, 90, `<rect x="0" y="80" width="160" height="10" rx="3" fill="#1f4f6a"/><g fill="none" stroke="#bff4ff" stroke-width="2.5" stroke-linecap="round" opacity=".85">
      <path d="M20 80 Q40 80 60 80"><animate attributeName="d" values="M20 80 Q40 80 60 80;M20 80 Q40 6 60 80;M20 80 Q40 40 60 80" dur="2s" repeatCount="indefinite"/></path>
      <path d="M60 80 Q80 80 100 80"><animate attributeName="d" values="M60 80 Q80 80 100 80;M60 80 Q80 0 100 80;M60 80 Q80 30 100 80" dur="2s" begin=".3s" repeatCount="indefinite"/></path>
      <path d="M100 80 Q120 80 140 80"><animate attributeName="d" values="M100 80 Q120 80 140 80;M100 80 Q120 6 140 80;M100 80 Q120 40 140 80" dur="2s" begin=".6s" repeatCount="indefinite"/></path></g>
      <g fill="#ffe9a8" opacity=".8"><circle cx="40" cy="84" r="2"/><circle cx="80" cy="84" r="2"/><circle cx="120" cy="84" r="2"/></g>`),
    smile: S(32, 32, `<circle cx="16" cy="16" r="14" fill="#ffd23a"/><circle cx="11" cy="13" r="2.2" fill="#3a2a0a"/><circle cx="21" cy="13" r="2.2" fill="#3a2a0a"/><path d="M9 19 Q16 26 23 19" stroke="#3a2a0a" stroke-width="2.2" fill="none" stroke-linecap="round"/>`),
  };

  /* ---------- how they move ---------- */
  let uid = 0;
  function layer() {
    let l = document.getElementById("egg-layer");
    if (!l) {
      l = document.createElement("div");
      l.id = "egg-layer";
      l.setAttribute("aria-hidden", "true");
      document.body.appendChild(l);
    }
    return l;
  }
  // A picture on the layer, sized to the screen; flipped to face the way it travels.
  function sprite(name, egg, flip) {
    const n = ++uid;
    const box = document.createElement("div");
    box.className = "egg";
    const inner = document.createElement("div");
    inner.className = "egg-art" + (egg.bob ? " egg-bob" : "") + (egg.roll ? " egg-roll" : "") + (egg.hop ? " egg-hop" : "") + (egg.slowspin ? " egg-slowspin" : "");
    inner.innerHTML = ART[name].replace(/id="([^"]+)"/g, `id="$1-${n}"`).replace(/url\(#([^)]+)\)/g, `url(#$1-${n})`);
    const svg = inner.firstElementChild;
    const s = scale() * (egg.size || 1);
    svg.setAttribute("width", String(Math.round(Number(svg.getAttribute("width")) * s)));
    svg.setAttribute("height", String(Math.round(Number(svg.getAttribute("height")) * s)));
    if (flip) svg.style.transform = "scaleX(-1)";
    box.appendChild(inner);
    layer().appendChild(box);
    return box;
  }
  // Off the page once played; and in any case shortly after it should have ended, since a browser can
  // pause animations in a background tab.
  function gone(anim) {
    const el = anim.effect.target, t = anim.effect.getTiming();
    const bye = () => el.remove();
    anim.finished.then(bye, bye);
    setTimeout(bye, (Number(t.duration) || 0) + (Number(t.delay) || 0) + 2000);
    return anim;
  }
  const across = (ltr, w) => (ltr ? [-w - 40, innerWidth + 40] : [innerWidth + 40, -w - 40]);

  const MOVES = {
    // Along the bottom edge, one way or the other.
    cross(egg) {
      const ltr = Math.random() < 0.5;
      const el = sprite(egg.art, egg, (egg.faces === "right") !== ltr);
      const [a, b] = across(ltr, el.offsetWidth);
      el.style.left = "0";
      el.style.bottom = `${egg.y ?? 4}px`;
      const ms = (egg.ms || 9000) * (0.45 + 0.55 * Math.min(1.6, innerWidth / 1440));
      return gone(el.animate([{ transform: `translateX(${a}px)` }, { transform: `translateX(${b}px)` }], { duration: ms, easing: "linear" }));
    },
    // Across the sky near the top, rising and dipping.
    fly(egg) {
      const ltr = Math.random() < 0.5;
      const el = sprite(egg.art, egg, (egg.faces === "right") !== ltr);
      const [a, b] = across(ltr, el.offsetWidth);
      el.style.left = "0";
      el.style.top = `${rand(0.1, 0.26) * innerHeight}px`;
      const frames = [];
      for (let i = 0; i <= 10; i++) frames.push({ transform: `translate(${a + (b - a) * (i / 10)}px, ${Math.sin((i / 10) * Math.PI * 3) * 16}px)` });
      return gone(el.animate(frames, { duration: egg.ms || 7000, easing: "linear" }));
    },
    // Up from the bottom edge, a look around, and back down.
    peek(egg) {
      const el = sprite(egg.art, egg, Math.random() < 0.5);
      const h = el.offsetHeight + 12;
      el.style.left = `${rand(0.06, 0.86) * Math.max(0, innerWidth - el.offsetWidth)}px`;
      el.style.bottom = "0";
      return gone(el.animate([{ transform: `translateY(${h}px)` }, { transform: "translateY(0)", offset: 0.16 }, { transform: "translateY(0)", offset: 0.84 }, { transform: `translateY(${h}px)` }], { duration: egg.ms || 5000, easing: "ease-in-out" }));
    },
    // Falls from the top, lands with a bounce, and fades.
    drop(egg) {
      const el = sprite(egg.art, egg, Math.random() < 0.5);
      const land = rand(0.45, 0.72) * innerHeight;
      el.style.left = `${rand(0.1, 0.86) * Math.max(0, innerWidth - el.offsetWidth)}px`;
      el.style.top = "0";
      const y = (v) => `translateY(${v}px)`;
      return gone(el.animate([
        { transform: y(-el.offsetHeight - 20) }, { transform: y(land), offset: 0.34, easing: "ease-out" }, { transform: y(land - 36), offset: 0.44, easing: "ease-in" },
        { transform: y(land), offset: 0.54 }, { transform: y(land), opacity: 1, offset: 0.86 }, { transform: y(land), opacity: 0 },
      ], { duration: egg.ms || 4200, easing: "ease-in" }));
    },
    // Fades in at a corner (or the top right), floats a little, and fades out.
    corner(egg) {
      const el = sprite(egg.art, egg, false);
      const right = egg.top || Math.random() < 0.6, top = egg.top ?? Math.random() < 0.3;
      el.style[right ? "right" : "left"] = "18px";
      el.style[top ? "top" : "bottom"] = top ? "84px" : "18px";
      if (egg.erase) el.firstElementChild.firstElementChild.animate([{ clipPath: "circle(75% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", offset: 0.4 }, { clipPath: "circle(0% at 50% 50%)" }], { duration: (egg.ms || 5000) * 0.85, fill: "forwards", easing: "ease-in" });
      return gone(el.animate([{ opacity: 0, transform: "scale(.6) translateY(10px)" }, { opacity: 1, transform: "scale(1)", offset: 0.14 }, { opacity: 1, transform: "scale(1) translateY(-6px)", offset: 0.86 }, { opacity: 0, transform: "scale(.92) translateY(-10px)" }], { duration: egg.ms || 5000, easing: "ease-in-out" }));
    },
    // Up out of the ground and back under (the sandworm, the fountain).
    rise(egg) {
      const el = sprite(egg.art, egg, Math.random() < 0.5);
      const h = el.offsetHeight;
      el.style.left = `${rand(0.1, 0.8) * Math.max(0, innerWidth - el.offsetWidth)}px`;
      el.style.bottom = "0";
      return gone(el.animate([{ transform: `translateY(${h}px)` }, { transform: "translateY(0)", offset: 0.3, easing: "cubic-bezier(.2,.8,.2,1)" }, { transform: "translateY(0)", offset: 0.68 }, { transform: `translateY(${h}px)`, easing: "ease-in" }], { duration: egg.ms || 5400 }));
    },
    // Down on a thread from the top, a wiggle, and back up (the spider).
    thread(egg) {
      const el = sprite(egg.art, egg, false);
      const down = rand(0.22, 0.42) * innerHeight;
      el.style.left = `${rand(0.1, 0.9) * innerWidth}px`;
      el.style.top = "0";
      const line = document.createElement("i");
      line.className = "egg-thread";
      el.prepend(line);
      const y = (v) => `translateY(${v}px)`;
      return gone(el.animate([{ transform: y(-el.offsetHeight - 10) }, { transform: y(down), offset: 0.32, easing: "ease-out" }, { transform: y(down - 12), offset: 0.48 }, { transform: y(down), offset: 0.64 }, { transform: y(-el.offsetHeight - 10), easing: "ease-in" }], { duration: egg.ms || 6200 }));
    },
    // Straight up from the bottom with a wobble (the rocket).
    launch(egg) {
      const el = sprite(egg.art, egg, false);
      el.style.left = `${rand(0.1, 0.88) * innerWidth}px`;
      el.style.top = `${innerHeight}px`;
      const up = innerHeight + el.offsetHeight + 60;
      return gone(el.animate([{ transform: "translate(0,0) rotate(0deg)" }, { transform: `translate(${rand(-30, 30)}px, ${-up * 0.45}px) rotate(${rand(-6, 6)}deg)`, offset: 0.5 }, { transform: `translate(${rand(-70, 70)}px, ${-up}px) rotate(${rand(-10, 10)}deg)` }], { duration: egg.ms || 3800, easing: "cubic-bezier(.55,0,.8,.55)" }));
    },
    // Thrown up onto the top bar, where it stays a moment (the pizza on the roof).
    lob(egg) {
      const el = sprite(egg.art, egg, false);
      const x1 = rand(0.25, 0.75) * innerWidth, x0 = x1 - rand(140, 280), land = 52;
      el.style.left = "0";
      el.style.top = "0";
      const at = (x, y, r) => `translate(${x}px, ${y}px) rotate(${r}deg)`;
      return gone(el.animate([
        { transform: at(x0, innerHeight, 0) }, { transform: at((x0 + x1) / 2, land - 150, 400), offset: 0.4, easing: "ease-in" }, { transform: at(x1, land, 720), offset: 0.56 },
        { transform: at(x1, land - 10, 720), offset: 0.61 }, { transform: at(x1, land, 720), offset: 0.66 }, { transform: at(x1, land, 720), opacity: 1, offset: 0.9 }, { transform: at(x1, land, 720), opacity: 0 },
      ], { duration: egg.ms || 4800 }));
    },
    // Flipped up in the air and caught on the ground (the coin).
    toss(egg) {
      const el = sprite(egg.art, egg, false);
      el.style.left = `${rand(0.2, 0.8) * innerWidth}px`;
      el.style.bottom = "12px";
      const up = rand(0.32, 0.5) * innerHeight;
      return gone(el.animate([
        { transform: "translateY(0) rotateX(0)" }, { transform: `translateY(${-up}px) rotateX(900deg)`, offset: 0.45, easing: "ease-in" }, { transform: "translateY(0) rotateX(1800deg)", offset: 0.8 },
        { transform: "translateY(0) rotateX(1800deg)", opacity: 1, offset: 0.93 }, { transform: "translateY(0) rotateX(1800deg)", opacity: 0 },
      ], { duration: egg.ms || 3300, easing: "ease-out" }));
    },
    // Unfurls at the top centre (the banner).
    banner(egg) {
      const el = sprite(egg.art, egg, false);
      el.style.left = `${(innerWidth - el.offsetWidth) / 2}px`;
      el.style.top = "92px";
      return gone(el.animate([{ clipPath: "inset(0 50% 0 50%)", opacity: 0 }, { clipPath: "inset(0 0 0 0)", opacity: 1, offset: 0.2 }, { clipPath: "inset(0 0 0 0)", opacity: 1, offset: 0.85 }, { clipPath: "inset(0 0 0 0)", opacity: 0 }], { duration: egg.ms || 4500, easing: "ease-out" }));
    },
  };

  /* ---------- the ones made of many small pieces ---------- */
  function dot(cls, x, y, size, color) {
    const d = document.createElement("i");
    d.className = "egg-dot " + cls;
    d.style.left = `${x}px`;
    d.style.top = `${y}px`;
    d.style.width = d.style.height = `${size}px`;
    if (color) d.style.background = color;
    layer().appendChild(d);
    return d;
  }
  const RUNS = {
    // The Last of Us: fireflies drifting up out of the dark.
    fireflies() {
      for (let i = 0; i < 18; i++) {
        const d = dot("egg-firefly", rand(0.04, 0.96) * innerWidth, rand(0.5, 0.95) * innerHeight, rand(4, 7));
        gone(d.animate([{ transform: "translate(0,0)", opacity: 0 }, { opacity: 1, offset: 0.2 }, { transform: `translate(${rand(-60, 60)}px, ${rand(-120, -40)}px)`, opacity: 0.25, offset: 0.55 },
          { opacity: 1, offset: 0.7 }, { transform: `translate(${rand(-90, 90)}px, ${rand(-220, -110)}px)`, opacity: 0 }], { duration: rand(5000, 7500), delay: rand(0, 1500), easing: "ease-in-out" }));
      }
    },
    // Ghost of Tsushima: a gust of golden leaves across the screen.
    wind() {
      const band = rand(0.25, 0.65) * innerHeight;
      for (let i = 0; i < 30; i++) {
        const d = dot("egg-leaf", -30, band + rand(-140, 140), 1, pick(["#f6c453", "#e8a33a", "#ffd98a", "#f2b25a", "#fff1c2", "#e9763a"]));
        const amp = rand(20, 60), turns = rand(1, 3), ms = rand(2600, 4200);
        const frames = [];
        for (let k = 0; k <= 8; k++) frames.push({ transform: `translate(${(innerWidth + 80) * (k / 8)}px, ${Math.sin((k / 8) * Math.PI * turns) * amp}px) rotate(${k * 90}deg)` });
        gone(d.animate(frames, { duration: ms, delay: rand(0, 900), easing: "ease-in-out" }));
      }
    },
    // Sunday in the Park with George: a tree painted in dots.
    seurat() {
      const s = scale(), cx = rand(0.15, 0.85) * innerWidth, cy = rand(0.38, 0.62) * innerHeight;
      const pts = [];
      for (let i = 0; i < 80; i++) { const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * 48 * s; pts.push([cx + Math.cos(a) * r, cy - 44 * s + Math.sin(a) * r * 0.8, pick(["#3f8f4a", "#5fae5a", "#8ccf6a", "#2f6f3a", "#c9e27a", "#7ab8e6"])]); }
      for (let i = 0; i < 20; i++) pts.push([cx + rand(-6, 6) * s, cy + rand(0, 44) * s, pick(["#7a4a2a", "#9a6a3a", "#c98a5a"])]);
      for (let i = 0; i < 34; i++) pts.push([cx + rand(-80, 80) * s, cy + 46 * s + rand(-3, 3), pick(["#6fbf6a", "#a8d86a", "#f6e27a", "#e8a3c8"])]);
      pts.forEach(([x, y, c], i) => gone(dot("egg-paint", x, y, 5 * s, c).animate([{ opacity: 0, transform: "scale(0)" }, { opacity: 1, transform: "scale(1)", offset: 0.12 }, { opacity: 1, offset: 0.85 }, { opacity: 0 }], { duration: 5200, delay: i * 14, easing: "ease-out" })));
    },
    // Marvel: six gems light up, a snap, and half the dust drifts away.
    snap() {
      const s = scale(), x0 = rand(0.15, 0.55) * innerWidth, y0 = rand(0.55, 0.78) * innerHeight;
      ["#8a4dff", "#2b7bff", "#ff3b4f", "#ff9f1a", "#33d17a", "#ffd23a"].forEach((c, i) => {
        const g = dot("egg-gem", x0 + i * 22 * s, y0, 12 * s, c);
        g.style.boxShadow = `0 0 12px 3px ${c}`;
        gone(g.animate([{ opacity: 0, transform: "scale(.4)" }, { opacity: 1, transform: "scale(1)", offset: 0.2 }, { opacity: 1, transform: "scale(1.25)", offset: 0.35 }, { opacity: 1, transform: "scale(1)", offset: 0.85 }, { opacity: 0 }], { duration: 4200, delay: i * 140 }));
      });
      for (let i = 0; i < 44; i++) {
        const away = i % 2 === 0;
        const d = dot("egg-dust", x0 + rand(0, 130) * s, y0 - rand(30, 90) * s, rand(3, 5), "#9fb3c8");
        gone(d.animate(away
          ? [{ opacity: 0 }, { opacity: 0.9, offset: 0.15 }, { opacity: 0.9, transform: "translate(0,0)", offset: 0.38 }, { opacity: 0, transform: `translate(${rand(40, 160)}px, ${rand(-80, -10)}px)` }]
          : [{ opacity: 0 }, { opacity: 0.9, offset: 0.15 }, { opacity: 0.9, offset: 0.85 }, { opacity: 0 }], { duration: 4200, easing: "ease-out" }));
      }
    },
    // Pluribus: one smile becomes many, and they all blink together.
    hive() {
      const s = scale(), cx = rand(0.25, 0.75) * innerWidth, cy = rand(0.45, 0.68) * innerHeight, step = 40 * s;
      [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1], [-2, 0], [2, 0], [0, -2], [0, 2]].forEach(([gx, gy], i) => {
        const el = sprite("smile", {}, false);
        el.style.left = `${cx}px`;
        el.style.top = `${cy}px`;
        const at = `translate(${gx * step}px, ${gy * step}px)`;
        gone(el.animate([{ transform: "translate(0,0) scale(0)" }, { transform: `${at} scale(1)`, offset: 0.25 }, { transform: `${at} scale(1)`, offset: 0.55 }, { transform: `${at} scale(1,.1)`, offset: 0.58 },
          { transform: `${at} scale(1)`, offset: 0.62 }, { transform: `${at} scale(1)`, opacity: 1, offset: 0.88 }, { transform: `${at} scale(.6)`, opacity: 0 }], { duration: 4400, delay: i === 0 ? 0 : 300 + i * 60, easing: "ease-out" }));
      });
    },
    // Stranger Things: painted letters on the wall, each lit by its bulb in turn.
    lights() {
      const word = document.querySelector(".motto") && document.querySelector(".motto").textContent.trim() ? document.querySelector(".motto").textContent.trim().toUpperCase() : "HELLO";
      const strip = document.createElement("div");
      strip.className = "egg-lights";
      const colors = ["#ff4d4d", "#3cf08e", "#ffd23a", "#2b9bff", "#ff8a1e"];
      [...word].forEach((ch, i) => {
        const cell = document.createElement("span");
        const bulb = document.createElement("b");
        bulb.style.setProperty("--c", colors[i % colors.length]);
        bulb.style.animationDelay = `${0.6 + i * 0.45}s`;
        cell.append(bulb, document.createTextNode(ch === " " ? " " : ch));
        strip.appendChild(cell);
        if (ch !== " ") setTimeout(() => sound("buzz"), 600 + i * 450);
      });
      layer().appendChild(strip);
      gone(strip.animate([{ opacity: 0, transform: "translate(-50%, -12px)" }, { opacity: 1, transform: "translate(-50%, 0)", offset: 0.08 }, { opacity: 1, transform: "translate(-50%, 0)", offset: 0.9 }, { opacity: 0, transform: "translate(-50%, 0)" }], { duration: 1200 + word.length * 450 + 1800 }));
    },
    // Severance: the numbers that feel scary wobble, and go in the bin.
    severance() {
      const panel = document.createElement("div");
      panel.className = "egg-mdr";
      const grid = document.createElement("div");
      for (let i = 0; i < 32; i++) {
        const n = document.createElement("span");
        n.textContent = String(Math.floor(Math.random() * 10));
        if ([5, 6, 13, 22].includes(i)) n.className = "scary";
        grid.appendChild(n);
      }
      const bin = document.createElement("em");
      bin.textContent = "01";
      panel.append(grid, bin);
      panel.style[Math.random() < 0.5 ? "left" : "right"] = "20px";
      panel.style.bottom = "20px";
      layer().appendChild(panel);
      gone(panel.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none", offset: 0.1 }, { opacity: 1, offset: 0.9 }, { opacity: 0 }], { duration: 5600 }));
    },
    // Outlast: the camcorder's night vision, for a breath.
    nightvision() {
      const v = document.createElement("div");
      v.className = "egg-nv";
      v.innerHTML = '<span class="rec">● REC</span><span class="bat"><i></i></span>';
      layer().appendChild(v);
      gone(v.animate([{ opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 1, offset: 0.8 }, { opacity: 0 }], { duration: 3000 }));
    },
    // Assassin's Creed: the eagle circles, and someone takes the leap into the hay.
    leap() {
      MOVES.fly({ art: "eagle", faces: "right", ms: 4200 });
      const hay = sprite("haystack", {}, false);
      const x = rand(0.2, 0.75) * innerWidth;
      hay.style.left = `${x}px`;
      hay.style.bottom = "4px";
      gone(hay.animate([{ opacity: 0 }, { opacity: 1, offset: 0.12 }, { opacity: 1, transform: "scale(1)", offset: 0.62 }, { transform: "scale(1.12, .9)", offset: 0.66 }, { transform: "scale(1)", offset: 0.72 }, { opacity: 1, offset: 0.9 }, { opacity: 0 }], { duration: 5600 }));
      const who = sprite("hooded", {}, false);
      who.style.left = `${x + hay.offsetWidth / 2 - who.offsetWidth / 2}px`;
      who.style.top = "0";
      const end = innerHeight - hay.offsetHeight * 0.6 - who.offsetHeight;
      gone(who.animate([{ transform: `translateY(${-who.offsetHeight}px)`, opacity: 0 }, { opacity: 0, offset: 0.4 }, { transform: "translateY(60px)", opacity: 1, offset: 0.45 }, { transform: `translateY(${end}px) rotate(180deg)`, opacity: 1, offset: 0.64, easing: "ease-in" }, { transform: `translateY(${end + 30}px) rotate(180deg)`, opacity: 0 }], { duration: 5600 }));
      setTimeout(() => sound("thud"), 3550);
    },
  };

  /* ---------- the catalogue ---------- */
  // title: the caption on the owner's sites; public: also shown (unlabelled) on the public site.
  const EGGS = [
    { id: "fin", title: "Jaws", art: "fin", move: "cross", faces: "left", ms: 12000, bob: true, sounds: [[0, "splash"]], words: ["jaws", "shark", "amity", "biggerboat"], public: true },
    { id: "rider", title: "Red Dead Redemption 2", art: "rider", move: "cross", faces: "right", ms: 9000, sounds: [[0, "clop"], [900, "clop"], [1800, "clop"]], words: ["rdr", "reddead", "arthurmorgan", "outlaw", "cowboy", "vanderlinde"], public: true },
    { id: "tumbleweed", title: "Red Dead", art: "tumbleweed", move: "cross", roll: true, hop: true, ms: 8000, sounds: [[0, "gust"]], words: ["tumbleweed", "howdy", "yeehaw"], public: true },
    { id: "giraffe", title: "The Last of Us", art: "giraffe", move: "cross", faces: "right", ms: 15000, bob: true, words: ["giraffe", "tlou", "ellie", "joel", "lastofus"], public: true },
    { id: "fireflies", title: "The Last of Us", run: "fireflies", night: true, words: ["fireflies", "firefly", "lookforthelight"], public: true },
    { id: "tracker", title: "Alien", art: "tracker", move: "corner", ms: 4400, sounds: [[0, "blip"], [900, "blip"], [1600, "blip"], [2100, "blip"], [2450, "blip"], [2700, "blip"]], words: ["alien", "ripley", "nostromo", "xenomorph", "motiontracker", "weyland"], public: false },
    { id: "cat", title: "Alien", art: "cat", move: "peek", ms: 5400, sounds: [[800, "mew"]], words: ["jonesy", "meow", "kitty"], public: true },
    { id: "chess", title: "The Thing", art: "chess", move: "corner", ms: 4600, sounds: [[900, "fizz"]], words: ["thething", "macready", "chess", "outpost"], public: false },
    { id: "wind", title: "Ghost of Tsushima", run: "wind", sounds: [[0, "gust"]], words: ["tsushima", "jinsakai", "samurai", "guidingwind", "ghost"], public: true },
    { id: "apple", title: "Death Note", art: "apple", move: "drop", ms: 4200, sounds: [[1450, "boing"]], words: ["deathnote", "ryuk", "kira", "apple", "shinigami"], public: true },
    { id: "lights", title: "Stranger Things", run: "lights", words: ["eleven", "hawkins", "upsidedown", "strangerthings", "demogorgon", "eggos"], public: false },
    { id: "rv", title: "Breaking Bad", art: "rv", move: "cross", faces: "right", ms: 10000, bob: true, sounds: [[0, "honk"]], words: ["breakingbad", "heisenberg", "jessepinkman", "albuquerque", "lospollos"], public: false },
    { id: "pizza", title: "Breaking Bad", art: "pizza", move: "lob", ms: 4800, sounds: [[2650, "pop"]], words: ["pizza"], public: false },
    { id: "rocket", title: "Jake Gyllenhaal · October Sky", art: "rocket", move: "launch", ms: 3800, sounds: [[0, "whoosh"]], words: ["octobersky", "rocket", "rocketboys"], public: true, jake: true },
    { id: "seurat", title: "Jake Gyllenhaal · Sunday in the Park with George", run: "seurat", sounds: [[0, "chime"]], words: ["seurat", "sundayinthepark", "pointillism"], public: true, jake: true },
    { id: "pig", title: "Jake Gyllenhaal · Okja", art: "pig", move: "cross", faces: "right", ms: 14000, bob: true, sounds: [[500, "oink"]], words: ["okja", "superpig", "piggy"], public: true, jake: true },
    { id: "coin", title: "No Country for Old Men", art: "coin", move: "toss", ms: 3300, sounds: [[0, "coin"], [2650, "tock"]], words: ["nocountry", "chigurh", "friendo", "coinflip", "callit"], public: false },
    { id: "blackhole", title: "Interstellar", art: "blackhole", move: "corner", ms: 6200, sounds: [[0, "swell"]], words: ["interstellar", "cooper", "murph", "gargantua", "tars", "wormhole"], public: true },
    { id: "bullet", title: "Bullet Train", art: "bullet", move: "cross", faces: "right", ms: 2600, sounds: [[0, "whoosh"]], words: ["bullettrain", "ladybug", "shinkansen", "tangerine", "lemon"], public: true },
    { id: "steam", title: "Trainspotting", art: "steam", move: "cross", faces: "right", ms: 13000, sounds: [[0, "chug"]], words: ["trainspotting", "chooselife", "renton", "spud", "train"], public: true },
    { id: "hex", title: "Arcane", art: "hex", move: "corner", ms: 4800, sounds: [[0, "chime"]], words: ["arcane", "jinx", "piltover", "zaun", "hextech", "powder"], public: true },
    { id: "worm", title: "Dune", art: "worm", move: "rise", ms: 5800, sounds: [[0, "rumble"]], words: ["dune", "spice", "arrakis", "shaihulud", "sandworm", "muaddib", "fremen"], public: true },
    { id: "sauce", title: "Goodfellas", art: "sauce", move: "peek", ms: 5400, sounds: [[600, "bubble"]], words: ["goodfellas", "garlic", "sauce", "henryhill", "funnyhow"], public: false },
    { id: "cape", title: "Superman", art: "cape", move: "fly", faces: "right", ms: 6000, sounds: [[0, "whoosh"]], words: ["superman", "krypton", "clarkkent", "smallville", "upupandaway"], public: true },
    { id: "snap", title: "Marvel", run: "snap", sounds: [[1500, "snap"]], words: ["marvel", "snap", "thanos", "avengers", "infinitystones", "wakanda", "excelsior"], public: false },
    { id: "wolf", title: "Ginger Snaps", art: "wolf", move: "corner", top: true, night: true, ms: 5800, sounds: [[900, "howl"]], words: ["gingersnaps", "werewolf", "howl", "fullmoon"], public: true },
    { id: "van", title: "Little Miss Sunshine", art: "van", move: "cross", faces: "right", ms: 10000, bob: true, sounds: [[300, "honk"]], words: ["sunshine", "littlemisssunshine", "olive", "superfreak"], public: true },
    { id: "tub", title: "Creep", art: "tub", move: "peek", ms: 5400, sounds: [[500, "bubble"]], words: ["creep", "tubbytime", "peachfork"], public: false },
    { id: "numbers", title: "Severance", run: "severance", sounds: [[0, "blip"], [2600, "chime"]], words: ["severance", "lumon", "macrodata", "innie", "outie", "waffleparty", "praisekier"], public: false },
    { id: "hive", title: "Pluribus", run: "hive", sounds: [[0, "pop"], [2500, "chime"]], words: ["pluribus", "hivemind", "joined"], public: false },
    { id: "puppy", title: "John Wick", art: "puppy", move: "peek", ms: 5400, sounds: [[700, "yip"]], words: ["johnwick", "babayaga", "pencil", "daisy", "continental"], public: false },
    { id: "convertible", title: "Ferris Bueller's Day Off", art: "convertible", move: "cross", faces: "right", ms: 6000, sounds: [[0, "honk"]], words: ["ferris", "bueller", "saveferris", "dayoff", "cameron"], public: true },
    { id: "cabin", title: "Evil Dead", art: "cabin", move: "corner", ms: 5600, sounds: [[1600, "creak"]], words: ["evildead", "groovy", "boomstick", "necronomicon", "ashwilliams"], public: false },
    { id: "engine", title: "Donnie Darko · 28:06:42:12", art: "engine", move: "drop", ms: 4200, sounds: [[0, "whoosh"], [1430, "thud"]], words: ["donnie", "darko", "tangentuniverse", "jetengine"], public: false, jake: true },
    { id: "heart", title: "Obsession", art: "heart", move: "corner", ms: 4400, sounds: [[700, "tock"]], words: ["obsession"], public: true },
    { id: "candle", title: "Leviticus", art: "candle", move: "corner", ms: 5200, sounds: [[4000, "puff"]], words: ["leviticus", "candle"], public: true },
    { id: "hallway", title: "The Backrooms", art: "hallway", move: "corner", ms: 4400, sounds: [[0, "buzz"]], words: ["backrooms", "noclip", "levelzero", "liminal"], public: false },
    { id: "ship", title: "The Odyssey", art: "ship", move: "cross", faces: "right", ms: 16000, bob: true, sounds: [[0, "splash"]], words: ["odyssey", "odysseus", "ithaca", "trojanhorse", "penelope"], public: true },
    { id: "spider", title: "Spider-Man", art: "spider", move: "thread", ms: 6400, sounds: [[1900, "boing"]], words: ["spiderman", "spidey", "peterparker", "webslinger", "milesmorales"], public: true },
    { id: "herbs", title: "Resident Evil", art: "herbs", move: "corner", ms: 4600, sounds: [[0, "clack"], [2200, "chime"]], words: ["residentevil", "greenherb", "redherb", "raccooncity", "typewriter", "jillvalentine", "leonkennedy"], public: false },
    { id: "rec", title: "Archie's Final Project", art: "rec", move: "corner", top: true, ms: 4200, sounds: [[0, "tock"]], words: ["archie", "finalproject"], public: false },
    { id: "frame", title: "Girl, Interrupted", art: "frame", move: "corner", ms: 5000, sounds: [[400, "chime"]], words: ["girlinterrupted", "interrupted", "susanna", "vermeer"], public: true },
    { id: "boat", title: "Manchester by the Sea", art: "boat", move: "cross", faces: "right", ms: 15000, bob: true, sounds: [[0, "splash"]], words: ["manchester", "manchesterbythesea"], public: true },
    { id: "truck", title: "The Perks of Being a Wallflower", art: "truck", move: "cross", faces: "right", ms: 7000, sounds: [[0, "whoosh"]], words: ["wallflower", "perks", "infinite", "tunnel"], public: true },
    { id: "polaroid", title: "Aftersun", art: "polaroid", move: "corner", ms: 5800, sounds: [[0, "tock"]], words: ["aftersun", "polaroid"], public: true },
    { id: "carpe", title: "Dead Poets Society", art: "carpe", move: "banner", ms: 4600, sounds: [[0, "flap"]], words: ["carpediem", "deadpoets", "ocaptain", "keating"], public: true },
    { id: "clock", title: "The Breakfast Club", art: "clock", move: "corner", ms: 4400, sounds: [[0, "tock"], [2000, "pop"]], words: ["breakfastclub", "detention", "shermer", "saturday"], public: false },
    { id: "pier", title: "Requiem for a Dream", art: "pier", move: "corner", ms: 5400, sounds: [[0, "swell"]], words: ["requiem", "coneyisland"], public: false },
    { id: "ufo", title: "Mysterious Skin", art: "ufo", move: "fly", ms: 7000, sounds: [[0, "warble"]], words: ["mysteriousskin", "ufo"], public: false },
    { id: "sticky", title: "Eternal Sunshine of the Spotless Mind", art: "sticky", move: "corner", erase: true, ms: 5400, sounds: [[2400, "erase"]], words: ["eternalsunshine", "clementine", "montauk", "lacuna", "spotless"], public: true },
    { id: "fox", title: "Fantastic Mr. Fox", art: "fox", move: "peek", ms: 5200, sounds: [[800, "tock"], [980, "tock"]], words: ["fantasticmrfox", "mrfox", "foxy", "cuss", "whackbat"], public: true },
    { id: "icecream", title: "The Florida Project", art: "icecream", move: "peek", ms: 5400, sounds: [[500, "pop"]], words: ["floridaproject", "moonee", "magiccastle", "icecream"], public: true },
    { id: "campfire", title: "Brokeback Mountain", art: "campfire", move: "corner", ms: 5800, sounds: [[0, "swell"]], words: ["brokeback", "ennis", "jacktwist", "wyoming"], public: true, jake: true },
    { id: "highway", title: "Bones and All", art: "highway", move: "cross", faces: "right", ms: 9000, sounds: [[0, "whoosh"]], words: ["bonesandall", "maren"], public: false },
    { id: "secret", title: "Wolfenstein", art: "secret", move: "corner", ms: 4600, sounds: [[700, "chime"]], words: ["wolfenstein", "blazkowicz", "secretwall"], public: false },
    { id: "led", title: "Detroit: Become Human", art: "led", move: "corner", ms: 4200, sounds: [[1500, "blip"], [2200, "blip"]], words: ["detroit", "becomehuman", "connor", "markus", "deviant", "android"], public: true },
    { id: "pigeon", title: "Battlefield 1", art: "pigeon", move: "fly", faces: "right", ms: 6600, sounds: [[0, "flap"]], words: ["battlefield", "warpigeon", "pigeon", "biplane"], public: true },
    { id: "nightvision", title: "Outlast", run: "nightvision", sounds: [[0, "tock"]], words: ["outlast", "nightvision", "mountmassive", "camcorder"], public: false },
    { id: "leap", title: "Assassin's Creed", run: "leap", sounds: [[0, "flap"], [2400, "whoosh"]], words: ["assassinscreed", "leapoffaith", "ezio", "altair", "haystack", "animus"], public: true },
    { id: "sedan", title: "Mafia", art: "sedan", move: "cross", faces: "right", ms: 10000, bob: true, sounds: [[300, "awooga"]], words: ["mafia", "lostheaven", "salieri", "tommyangelo"], public: false },
    { id: "glint", title: "Sniper Elite", art: "glint", move: "corner", ms: 3400, sounds: [[300, "ting"], [1800, "ting"]], words: ["sniperelite", "sniper", "scopeglint", "fairburne"], public: false },
    { id: "zipline", title: "Far Cry", art: "zipline", move: "corner", ms: 4400, sounds: [[100, "whoosh"]], words: ["farcry", "radiotower", "zipline", "vaas", "insanity"], public: true },
    { id: "fountain", title: "Ocean's Eleven", art: "fountain", move: "rise", ms: 6400, sounds: [[0, "splash"]], words: ["oceanseleven", "bellagio", "dannyocean", "rustyryan"], public: true },
  ];
  const BY_ID = new Map(EGGS.map((e) => [e.id, e]));
  const WORDS = [];
  for (const e of EGGS) for (const w of e.words) WORDS.push([w, e]);
  WORDS.push(["jake", null], ["gyllenhaal", null]); // one of his
  WORDS.sort((a, b) => b[0].length - a[0].length);

  /* ---------- showing one ---------- */
  let capTimer = 0;
  function caption(text) {
    if (PUBLIC) return;
    let c = document.getElementById("egg-cap");
    if (c) c.remove();
    c = document.createElement("div");
    c.id = "egg-cap";
    c.setAttribute("aria-hidden", "true");
    c.textContent = `♦ ${text}`;
    document.body.appendChild(c);
    clearTimeout(capTimer);
    capTimer = setTimeout(() => c.remove(), 3800);
  }
  const recent = [];
  function show(id) {
    const egg = typeof id === "string" ? BY_ID.get(id) : id;
    if (!egg || RM || (PUBLIC && !egg.public)) return false;
    if (egg.run) RUNS[egg.run](egg);
    else MOVES[egg.move](egg);
    for (const [t, name] of egg.sounds || []) setTimeout(() => sound(name), t);
    caption(egg.title);
    recent.push(egg.id);
    if (recent.length > 8) recent.shift();
    return true;
  }
  function eligible() {
    const night = new Date().getHours() >= 20 || new Date().getHours() < 6;
    return EGGS.filter((e) => (!PUBLIC || e.public) && !recent.includes(e.id) && (!e.night || night || Math.random() < 0.25));
  }
  function showRandom() {
    const list = eligible();
    if (list.length) show(pick(list));
  }
  function parade() {
    const list = [...eligible()].sort(() => Math.random() - 0.5).slice(0, 6);
    list.forEach((e, i) => setTimeout(() => show(e), i * 1700));
  }

  /* ---------- when they come ---------- */
  function toast(text) {
    const t = document.createElement("div");
    t.id = "egg-cap";
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }
  function schedule(first) {
    // The owner's sites: one every few minutes while the page is in view. The public site: at most one,
    // sometimes, a while after the page opens.
    if (PUBLIC) {
      if (Math.random() < 0.4) setTimeout(() => { if (enabled() && !document.hidden) showRandom(); }, rand(20, 70) * 1000);
      return;
    }
    setTimeout(() => {
      if (enabled() && !document.hidden) showRandom();
      schedule(false);
    }, (first ? rand(45, 110) : rand(240, 560)) * 1000);
  }
  if (!RM) schedule(true);

  // Secret words, typed anywhere but a text box; the Konami code; five quick clicks on the emblem.
  const typing = (el) => el instanceof Element && !!el.closest("input, textarea, select, [contenteditable=''], [contenteditable='true']");
  let typed = "", konami = [];
  const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  document.addEventListener("keydown", (e) => {
    if (RM || e.ctrlKey || e.metaKey || e.altKey || typing(e.target)) return;
    konami = [...konami, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-KONAMI.length);
    if (konami.join(",") === KONAMI.join(",")) { konami = []; if (enabled()) parade(); return; }
    if (!/^[a-z0-9]$/i.test(e.key)) return;
    typed = (typed + e.key.toLowerCase()).slice(-24);
    if (typed.endsWith("eggs")) {
      typed = "";
      const on = !enabled();
      try { localStorage.setItem(KEY, on ? "1" : "0"); } catch { /* not remembered */ }
      toast(on ? "♦ Easter eggs on" : "♦ Easter eggs off");
      return;
    }
    if (!enabled()) return;
    const hit = WORDS.find(([w]) => typed.endsWith(w));
    if (!hit) return;
    typed = "";
    const [, egg] = hit;
    if (egg) show(egg);
    else show(pick(EGGS.filter((x) => x.jake && (!PUBLIC || x.public))));
  });
  let taps = [];
  document.addEventListener("click", (e) => {
    if (RM || !(e.target instanceof Element) || !e.target.closest(".emblem, .brand-text")) return;
    const now = Date.now();
    taps = [...taps.filter((t) => now - t < 2500), now];
    if (taps.length >= 5 && enabled()) { taps = []; showRandom(); }
  });

  const style = document.createElement("style");
  style.textContent = `
#egg-layer{position:fixed;inset:0;z-index:60;pointer-events:none;overflow:hidden}
#egg-layer .egg{position:absolute;left:0;top:auto;will-change:transform}
#egg-layer .egg svg{display:block;overflow:visible;filter:drop-shadow(0 6px 10px rgba(0,0,0,.45))}
.egg-bob{animation:egg-bob .8s ease-in-out infinite}
.egg-hop{animation:egg-hop .6s ease-in-out infinite}
.egg-roll svg{animation:egg-roll 1s linear infinite}
@keyframes egg-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes egg-hop{0%,100%{transform:translateY(0)}50%{transform:translateY(-22px)}}
@keyframes egg-roll{to{transform:rotate(-360deg)}}
.egg-thread{position:absolute;left:50%;bottom:calc(100% - 4px);width:1px;height:100vh;background:rgba(214,236,255,.55)}
.egg-dot{position:absolute;display:block;border-radius:50%;pointer-events:none}
.egg-firefly{background:#f6ffa8;box-shadow:0 0 10px 3px rgba(246,255,168,.75)}
.egg-leaf{width:9px!important;height:5px!important;border-radius:50% 0}
.egg-dust{border-radius:30%}
#egg-cap{position:fixed;left:16px;bottom:16px;z-index:61;padding:5px 11px;border:1px solid rgba(255,207,92,.45);border-radius:999px;background:rgba(3,13,26,.88);color:#ffcf5c;
  font:600 11px/1.3 "Chakra Petch","Segoe UI",system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;pointer-events:none;animation:egg-cap 3.8s ease forwards}
@keyframes egg-cap{0%{opacity:0;transform:translateY(8px)}10%{opacity:1;transform:none}85%{opacity:1}100%{opacity:0}}
.egg-lights{position:absolute;left:50%;top:84px;display:flex;gap:14px;padding:16px 22px 12px;border-radius:6px;background:repeating-linear-gradient(45deg,#efe3c4 0 10px,#e8d9b4 10px 20px);box-shadow:0 10px 30px -10px #000;
  font:700 26px/1 "Comic Sans MS","Chakra Petch",cursive;color:#1d1a17}
.egg-lights span{position:relative;display:inline-flex;flex-direction:column;align-items:center;gap:8px}
.egg-lights b{display:block;width:12px;height:16px;border-radius:50% 50% 45% 45%;background:#5a5a5a;animation:egg-bulb .45s ease forwards}
@keyframes egg-bulb{to{background:var(--c);box-shadow:0 0 12px 4px var(--c)}}
.egg-mdr{position:absolute;display:flex;align-items:flex-end;gap:12px;padding:12px 14px;border:1px solid #2c6a78;border-radius:4px;background:#07222a;box-shadow:0 10px 30px -10px #000}
.egg-mdr div{display:grid;grid-template-columns:repeat(8,1fr);gap:4px 10px;font:600 15px "JetBrains Mono",monospace;color:#bfe8ff}
.egg-mdr .scary{display:inline-block;color:#ffffff;animation:egg-scary .3s ease-in-out 6 alternate,egg-bin .7s ease-in 2s forwards}
@keyframes egg-scary{to{transform:scale(1.6) rotate(8deg)}}
@keyframes egg-bin{to{transform:translate(120px,40px) scale(.3);opacity:0}}
.egg-mdr em{font:600 12px "JetBrains Mono",monospace;font-style:normal;color:#07222a;background:#bfe8ff;padding:3px 7px;border-radius:2px}
.egg-nv{position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(60,255,110,.08),rgba(0,40,10,.55)),repeating-linear-gradient(0deg,rgba(0,0,0,.18) 0 1px,transparent 1px 3px);mix-blend-mode:normal}
.egg-nv .rec{position:absolute;left:24px;top:84px;font:700 16px monospace;color:#ff4d4d;animation:egg-blink 1s steps(1) infinite}
.egg-nv .bat{position:absolute;right:28px;top:86px;width:34px;height:16px;border:2px solid #b8ffbf;border-radius:3px}
.egg-nv .bat i{position:absolute;left:2px;top:2px;bottom:2px;width:6px;background:#ff4d4d;animation:egg-blink .6s steps(1) infinite}
@keyframes egg-blink{50%{opacity:0}}
@media (prefers-reduced-motion:reduce){#egg-layer,#egg-cap{display:none!important}}
`;
  document.head.appendChild(style);

  window.EGGS = { show, showRandom, parade, list: () => EGGS.filter((e) => !PUBLIC || e.public).map((e) => ({ id: e.id, title: e.title, words: e.words })) };
})();
