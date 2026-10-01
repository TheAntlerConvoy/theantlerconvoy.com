// Sound, music and motion for The Antler Convoy's private sites: the command center, the extensions site
// and the copytrade site. Every sound is made in the browser with the Web Audio API, so there are no
// sound files and nothing is fetched. Sound effects start on and music starts off; each site remembers
// the choice on this device. Browsers only allow sound after a click or a key press on the page, so
// nothing plays before one. "Reduce motion" turns the moving parts off; sound has its own switch.
//
// One source, shared/web/fx.js. Each site serves its own copy as fx.js (scripts/check-pages.mjs fails
// when a copy differs; `node scripts/check-pages.mjs --sync` copies it).
(function () {
  "use strict";
  if (window.FX) return;

  const remember = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v === null ? fallback : v === "1"; } catch { return fallback; }
    },
    set(key, on) {
      try { localStorage.setItem(key, on ? "1" : "0"); } catch { /* not remembered: fine */ }
    },
  };
  const RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  let sfxOn = remember.get("tac-sfx", true);
  let musicOn = remember.get("tac-music", false);
  let sfxLevel = 0.55; // a site can make its effects quieter with FX.setLevel
  let ctx = null, limiter = null, SFX = null, MUS = null, noiseBuf = null, unlocked = false;
  const changed = new Set();

  /* ---------- the audio graph ---------- */
  // Each bus has a dry fader and a send to the shared reverb, and switching a bus off fades both.
  function bus(level) {
    const dry = ctx.createGain(), wet = ctx.createGain();
    dry.gain.value = level; wet.gain.value = level;
    dry.connect(limiter); wet.connect(reverbIn);
    return { dry, wet, level };
  }
  let reverbIn = null;
  function audio() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -16; limiter.knee.value = 10; limiter.ratio.value = 5;
    limiter.attack.value = 0.004; limiter.release.value = 0.25;
    const master = ctx.createGain();
    master.gain.value = 0.85;
    limiter.connect(master);
    master.connect(ctx.destination);
    const verb = ctx.createConvolver();
    verb.buffer = impulse(3.4, 2.4);
    reverbIn = ctx.createGain();
    reverbIn.gain.value = 0.3;
    reverbIn.connect(verb);
    verb.connect(limiter);
    SFX = bus(sfxOn ? sfxLevel : 0);
    MUS = bus(0);
    return ctx;
  }
  function impulse(seconds, decay) {
    const rate = ctx.sampleRate, len = Math.floor(rate * seconds), buf = ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }
  function noise() {
    if (noiseBuf) return noiseBuf;
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return noiseBuf;
  }
  const hz = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

  // One voice: an oscillator (or a few, detuned) through an optional filter and an envelope.
  function voice(b, o) {
    const t = o.t, a = o.a ?? 0.004, d = o.d ?? 0.12, peak = o.peak ?? 0.2, hold = o.hold ?? 0;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    if (hold) g.gain.setValueAtTime(peak, t + a + hold);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + hold + d);
    let head = g;
    if (o.filter) {
      const f = ctx.createBiquadFilter();
      f.type = o.filter.type || "lowpass";
      f.frequency.setValueAtTime(o.filter.f, t);
      if (o.filter.to) f.frequency.exponentialRampToValueAtTime(o.filter.to, t + a + hold + d);
      f.Q.value = o.filter.q ?? 0.7;
      f.connect(g);
      head = f;
    }
    const end = t + a + hold + d + 0.05;
    for (const detune of o.detunes || [0]) {
      const osc = ctx.createOscillator();
      osc.type = o.type || "sine";
      osc.frequency.setValueAtTime(o.f, t);
      if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t + a + hold + d);
      osc.detune.value = detune;
      osc.connect(head);
      osc.start(t);
      osc.stop(end);
    }
    g.connect(b.dry);
    if (o.wet) {
      const s = ctx.createGain();
      s.gain.value = o.wet;
      g.connect(s);
      s.connect(b.wet);
    }
  }
  function hiss(b, o) {
    const t = o.t, d = o.d ?? 0.15;
    const src = ctx.createBufferSource();
    src.buffer = noise();
    const f = ctx.createBiquadFilter();
    f.type = o.type || "bandpass";
    f.frequency.setValueAtTime(o.f ?? 1200, t);
    if (o.to) f.frequency.exponentialRampToValueAtTime(o.to, t + d);
    f.Q.value = o.q ?? 0.8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(o.peak ?? 0.1, t + (o.a ?? 0.01));
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    src.connect(f); f.connect(g); g.connect(b.dry);
    if (o.wet) { const s = ctx.createGain(); s.gain.value = o.wet; g.connect(s); s.connect(b.wet); }
    src.start(t);
    src.stop(t + d + 0.05);
  }

  /* ---------- sound effects ---------- */
  const SOUNDS = {
    click(t) { voice(SFX, { type: "triangle", f: 1500, to: 950, t, d: 0.045, peak: 0.1 }); },
    hover(t) { voice(SFX, { f: 2700, t, d: 0.025, peak: 0.018 }); },
    tick(t) { voice(SFX, { type: "square", f: 3100, t, d: 0.01, peak: 0.012, filter: { f: 5200 } }); },
    tab(t) {
      voice(SFX, { type: "triangle", f: 880, t, d: 0.05, peak: 0.07 });
      voice(SFX, { type: "triangle", f: 1320, t: t + 0.05, d: 0.08, peak: 0.06, wet: 0.2 });
    },
    open(t) {
      hiss(SFX, { t, d: 0.16, peak: 0.05, f: 500, to: 3200, q: 1.1 });
      voice(SFX, { f: 520, to: 820, t, d: 0.12, peak: 0.06, wet: 0.25 });
    },
    close(t) {
      hiss(SFX, { t, d: 0.13, peak: 0.04, f: 2800, to: 500, q: 1.1 });
      voice(SFX, { f: 760, to: 470, t, d: 0.1, peak: 0.05 });
    },
    success(t) {
      [1046.5, 1318.5, 1568].forEach((f, i) => voice(SFX, { type: "triangle", f, t: t + i * 0.075, d: 0.24, peak: 0.08, wet: 0.4 }));
    },
    error(t) {
      [0, 0.12].forEach((dt) => voice(SFX, { type: "square", f: 196, to: 160, t: t + dt, d: 0.09, peak: 0.045, filter: { f: 900 } }));
    },
    coin(t) {
      voice(SFX, { type: "square", f: 987.8, t, d: 0.07, peak: 0.05, filter: { f: 4200 } });
      voice(SFX, { type: "square", f: 1318.5, t: t + 0.075, d: 0.34, peak: 0.05, filter: { f: 4200 }, wet: 0.35 });
    },
    cash(t) {
      SOUNDS.coin(t);
      voice(SFX, { f: 2093, t: t + 0.14, d: 0.7, peak: 0.04, wet: 0.6 });
      voice(SFX, { f: 2637, t: t + 0.2, d: 0.6, peak: 0.025, wet: 0.6 });
      hiss(SFX, { t: t + 0.1, d: 0.4, peak: 0.025, f: 7500, type: "highpass", wet: 0.5 });
    },
    alert(t) {
      voice(SFX, { f: 880, t, d: 0.16, peak: 0.11, wet: 0.3 });
      voice(SFX, { f: 659.3, t: t + 0.19, d: 0.28, peak: 0.11, wet: 0.3 });
    },
    crit(t) {
      [0, 0.22, 0.44].forEach((dt) => voice(SFX, { type: "sawtooth", f: 466, to: 349, t: t + dt, d: 0.16, peak: 0.06, filter: { f: 1700 } }));
    },
    resolved(t) {
      voice(SFX, { type: "triangle", f: 659.3, t, d: 0.14, peak: 0.07, wet: 0.3 });
      voice(SFX, { type: "triangle", f: 987.8, t: t + 0.12, d: 0.3, peak: 0.07, wet: 0.4 });
    },
    stamp(t) {
      hiss(SFX, { t, d: 0.09, peak: 0.12, f: 220, type: "lowpass" });
      voice(SFX, { f: 95, to: 48, t, d: 0.14, peak: 0.22 });
    },
    whoosh(t) { hiss(SFX, { t, d: 0.7, a: 0.2, peak: 0.03, f: 260, to: 2600, q: 0.9, wet: 0.35 }); },
    boot(t) {
      [146.8, 220, 293.7, 370, 440, 587.3].forEach((f, i) =>
        voice(SFX, { type: "triangle", f, t: t + i * 0.07, a: 0.06, d: 1.1, peak: 0.035, wet: 0.6 }));
    },
  };
  // Some sounds can repeat quickly (hovering, counters rolling): at most one per this many milliseconds.
  const GAP = { hover: 70, tick: 45, click: 30, coin: 90 };
  const lastPlayed = {};
  function play(name) {
    if (!sfxOn || !unlocked || !SOUNDS[name] || !audio() || ctx.state !== "running") return;
    const now = performance.now();
    if (GAP[name] && now - (lastPlayed[name] || 0) < GAP[name]) return;
    lastPlayed[name] = now;
    SOUNDS[name](ctx.currentTime + 0.005);
  }

  /* ---------- music: an original menu theme, played live ---------- */
  // D minor, 84 beats a minute: Dm, B-flat, F, C, two bars each (eight bars, about 23 seconds a loop).
  // Pads and a plucked arpeggio from the start; the heartbeat drums from the second loop; the bell
  // melody on every other loop after that.
  const BPM = 84, EIGHTH = 30 / BPM, STEPS = 64;
  const CHORDS = [[50, 57, 62, 65], [46, 53, 58, 62], [53, 57, 60, 65], [48, 55, 60, 64]];
  const ARP = [0, 2, 1, 3, 2, 1, 3, 2];
  const MELODY = new Map([
    [0, [69, 4]], [4, [74, 4]], [8, [72, 2]], [10, [69, 2]], [12, [72, 4]],
    [16, [70, 6]], [22, [69, 2]], [24, [65, 8]],
    [32, [72, 4]], [36, [77, 4]], [40, [76, 2]], [42, [74, 2]], [44, [72, 4]],
    [48, [76, 6]], [54, [74, 2]], [56, [72, 6]], [62, [69, 2]],
  ]);
  let step = 0, loop = 0, nextAt = 0, timer = 0;
  function scheduleStep(i, t) {
    const chord = CHORDS[Math.floor(i / 16)], inChord = i % 16;
    if (inChord === 0) {
      const len = 16 * EIGHTH;
      for (const n of chord) {
        voice(MUS, { type: "sawtooth", f: hz(n), t, a: 1.3, hold: len - 1.6, d: 1.8, peak: 0.022, detunes: [-9, 8], filter: { f: 900, to: 1500, q: 0.5 }, wet: 0.55 });
      }
    }
    if (i % 8 === 0 || i % 8 === 5) {
      voice(MUS, { type: "triangle", f: hz(chord[0] - 12), t, a: 0.012, d: i % 8 === 0 ? 0.9 : 0.45, peak: 0.13, filter: { f: 320 } });
    }
    const arpNote = chord[ARP[i % 8]] + 12;
    voice(MUS, { type: "triangle", f: hz(arpNote), t, a: 0.004, d: 0.34, peak: 0.032, wet: 0.45, filter: { f: 3200 } });
    voice(MUS, { type: "triangle", f: hz(arpNote), t: t + 3 * EIGHTH, a: 0.004, d: 0.3, peak: 0.011, wet: 0.5, filter: { f: 2400 } });
    if (loop >= 1) {
      if (i % 4 === 0) voice(MUS, { f: 118, to: 44, t, a: 0.003, d: 0.24, peak: i % 8 === 0 ? 0.2 : 0.12 });
      if (i % 2 === 1) hiss(MUS, { t, d: 0.03, a: 0.002, peak: 0.012, f: 8200, type: "highpass" });
    }
    if (loop >= 2 && loop % 2 === 0 && MELODY.has(i)) {
      const [n, len] = MELODY.get(i);
      const d = Math.min(2.4, len * EIGHTH * 1.6);
      voice(MUS, { f: hz(n), t, a: 0.01, d, peak: 0.05, wet: 0.6 });
      voice(MUS, { f: hz(n) * 2.005, t, a: 0.01, d: d * 0.5, peak: 0.012, wet: 0.6 });
    }
  }
  function pump() {
    if (!ctx) return;
    const ahead = document.hidden ? 1.5 : 0.3;
    while (nextAt < ctx.currentTime + ahead) {
      scheduleStep(step, nextAt);
      step = (step + 1) % STEPS;
      if (step === 0) loop++;
      nextAt += EIGHTH;
    }
  }
  function fade(b, to, seconds) {
    const t = ctx.currentTime;
    for (const node of [b.dry, b.wet]) {
      node.gain.cancelScheduledValues(t);
      node.gain.setValueAtTime(node.gain.value, t);
      node.gain.linearRampToValueAtTime(to, t + seconds);
    }
  }
  function startMusic() {
    if (!unlocked || !audio() || timer) return;
    step = 0; loop = 0; nextAt = ctx.currentTime + 0.15;
    fade(MUS, 0.42, 2.5);
    pump();
    timer = setInterval(pump, 60);
  }
  function stopMusic() {
    if (!ctx || !timer) return;
    fade(MUS, 0, 1.2);
    const old = timer;
    timer = 0;
    setTimeout(() => clearInterval(old), 1300);
  }

  /* ---------- switches ---------- */
  function setSfx(on) {
    sfxOn = !!on;
    remember.set("tac-sfx", sfxOn);
    if (ctx) fade(SFX, sfxOn ? sfxLevel : 0, 0.15);
    if (sfxOn) play("tab");
    changed.forEach((fn) => fn());
  }
  function setMusic(on) {
    musicOn = !!on;
    remember.set("tac-music", musicOn);
    if (musicOn) { unlock(); startMusic(); } else stopMusic();
    changed.forEach((fn) => fn());
  }
  // The first click or key press anywhere lets the page make sound (the browser's rule).
  function unlock() {
    if (unlocked) return;
    const c = audio();
    if (!c) return;
    unlocked = true;
    const go = () => { if (musicOn) startMusic(); };
    if (c.state === "suspended") c.resume().then(go, () => {}); else go();
  }
  addEventListener("pointerdown", unlock, { capture: true, passive: true });
  addEventListener("keydown", unlock, { capture: true });

  // Every button, link and switch clicks, unless it (or a parent) says otherwise with data-sfx: a
  // sound's name, or "none".
  document.addEventListener("click", (e) => {
    const el = e.target instanceof Element ? e.target.closest("button, a, summary, [role=button], input[type=checkbox], input[type=radio], label") : null;
    if (!el) return;
    const tagged = el.closest("[data-sfx]");
    const name = tagged ? tagged.dataset.sfx : "click";
    if (name && name !== "none") play(name);
  }, true);
  // A faint tick when a mouse moves onto anything marked data-hover (touch screens don't hover).
  document.addEventListener("pointerover", (e) => {
    if (e.pointerType !== "mouse" || !(e.target instanceof Element)) return;
    const el = e.target.closest("[data-hover]");
    if (el && !(e.relatedTarget instanceof Node && el.contains(e.relatedTarget))) play("hover");
  }, { passive: true });

  const ICON = {
    sfx: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 6h2.6L8.6 3v10L5.1 10H2.5z"/><path class="fx-wave" d="M10.8 5.6a3.4 3.4 0 0 1 0 4.8M12.7 3.8a6 6 0 0 1 0 8.4"/><path class="fx-x" d="M11 6l3.6 4M14.6 6 11 10"/></svg>',
    music: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M6 12.4V3.6l7.2-1.6v8.7"/><circle cx="4.3" cy="12.4" r="1.8"/><circle cx="11.4" cy="10.7" r="1.8"/></svg>',
  };
  // Two buttons, sound effects and music, added to `host` with the site's own button class (only the
  // first with { music: false }).
  function mountToggles(host, className, opts) {
    const make = (kind, label) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `${className} fx-toggle fx-${kind}`;
      b.dataset.sfx = "none";
      b.innerHTML = ICON[kind];
      b.addEventListener("click", () => (kind === "sfx" ? setSfx(!sfxOn) : setMusic(!musicOn)));
      const sync = () => {
        const on = kind === "sfx" ? sfxOn : musicOn;
        b.setAttribute("aria-pressed", String(on));
        b.title = `${label}: ${on ? "on" : "off"}`;
        b.setAttribute("aria-label", label);
        b.classList.toggle("fx-off", !on);
      };
      changed.add(sync);
      sync();
      return b;
    };
    host.append(make("sfx", "Sound effects"));
    if (!opts || opts.music !== false) host.append(make("music", "Music"));
  }
  function setLevel(level) {
    sfxLevel = Math.max(0, Math.min(1, Number(level) || 0));
    if (ctx && sfxOn) fade(SFX, sfxLevel, 0.1);
  }

  /* ---------- motion ---------- */
  // Counts a number up (or down) to `to`, writing it with `format`; at once when motion is reduced.
  function countUp(el, to, opts) {
    const o = opts || {};
    const format = o.format || ((v) => String(Math.round(v)));
    const from = o.from ?? Number(el.dataset.fxValue ?? NaN);
    el.dataset.fxValue = String(to);
    if (RM || !Number.isFinite(from) || from === to || !Number.isFinite(to)) { el.textContent = format(to); return; }
    const ms = o.ms ?? 900, t0 = performance.now();
    const frame = (now) => {
      const k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3);
      el.textContent = format(from + (to - from) * e);
      if (k < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
  // Brings elements in one after another, the first time only.
  function reveal(nodes, gapMs) {
    if (RM) return;
    let i = 0;
    for (const n of nodes) {
      if (!n || n.classList.contains("fx-in")) continue;
      n.style.setProperty("--fx-delay", `${i++ * (gapMs ?? 70)}ms`);
      n.classList.add("fx-in");
    }
  }

  // The moving parts every site shares.
  const style = document.createElement("style");
  style.textContent = `
.fx-in{animation:fx-rise .7s cubic-bezier(.2,.75,.25,1) both;animation-delay:var(--fx-delay,0ms)}
@keyframes fx-rise{from{opacity:0;transform:translateY(14px) scale(.985);filter:blur(2px)}to{opacity:1;transform:none;filter:none}}
.fx-flash{animation:fx-flash 1.2s ease-out}
@keyframes fx-flash{0%{box-shadow:0 0 0 0 rgba(255,207,92,.0),inset 0 0 0 1px rgba(255,207,92,.9)}30%{box-shadow:0 0 22px 2px rgba(255,207,92,.35),inset 0 0 0 1px rgba(255,207,92,.6)}100%{box-shadow:none}}
.fx-toggle .fx-x{display:none}
.fx-toggle.fx-off .fx-x{display:inline}
.fx-toggle.fx-off .fx-wave{display:none}
.fx-toggle.fx-music:not(.fx-off) svg{animation:fx-bob 1.43s ease-in-out infinite}
@keyframes fx-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.5px)}}
@media (prefers-reduced-motion:reduce){.fx-in,.fx-flash,.fx-toggle svg{animation:none!important}}
`;
  document.head.appendChild(style);

  window.FX = {
    play,
    countUp,
    reveal,
    mountToggles,
    setSfx,
    setMusic,
    setLevel,
    get sfx() { return sfxOn; },
    get music() { return musicOn; },
    reducedMotion: RM,
  };
})();
