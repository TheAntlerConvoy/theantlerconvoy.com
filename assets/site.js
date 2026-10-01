// theantlerconvoy.com's small touches: things rise into view as you scroll, cards and buttons answer the
// mouse, and quiet sounds play when you click (assets/fx.js, a copy of the command center's
// shared/web/fx.js). The speaker button in the header turns the sounds off; the browser remembers that
// on this device only. Every page works the same without this file.
(() => {
  "use strict";
  const RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);

  // Sound effects only (no music on the public site), kept quiet, with a switch in the header.
  if (window.FX) {
    FX.setLevel(0.26);
    const nav = document.querySelector(".site-nav");
    if (nav) FX.mountToggles(nav, "sound-btn", { music: false });
    for (const el of document.querySelectorAll(".btn, .site-nav a, .plan")) el.setAttribute("data-hover", "");
    for (const a of document.querySelectorAll(".card a.stretch")) a.closest(".card").setAttribute("data-hover", "");
  }

  // Rising into view, a little after one another within each row.
  if (RM || !("IntersectionObserver" in window)) return;
  const items = [...document.querySelectorAll(".hero-text > *, .hero-mark, .section-head, .card, .value, .plan, .band, .shot, .two > *, .prose > *, .page-head .wrap > *")];
  const seen = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("in");
      seen.unobserve(e.target);
    }
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
  for (const el of items) {
    const i = el.parentElement ? Math.min(6, [...el.parentElement.children].indexOf(el)) : 0;
    el.style.setProperty("--rise-delay", `${Math.max(0, i) * 70}ms`);
    el.classList.add("rise");
    seen.observe(el);
  }
})();
