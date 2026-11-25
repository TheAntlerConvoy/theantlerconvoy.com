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

  // The 3D mount slot (V2 X-13). A page whose hero section names a scene with data-fx3d="<name>" gets
  // assets/fx3d/<name>.js after first render; its default export takes the slot below and mounts the
  // scene through the fx3d runtime. No page names one yet, so today this does nothing and loads nothing.
  // If the scene can't load, the hero stays as it is (the poster). Reduced motion is passed on: the
  // runtime then draws one still frame, and its Pause/Calm button (.fx3d-pause) is remembered per device.
  const host = document.querySelector("[data-fx3d-host][data-fx3d]");
  if (host && /^[a-z0-9-]+$/.test(host.dataset.fx3d)) {
    const start = () => import(`/assets/fx3d/${host.dataset.fx3d}.js`).then((m) => m.default({
      host,
      label: (host.querySelector(".fx3d-desc") || {}).textContent || "",
      poster: host.querySelector("[data-fx3d-poster]") || host.querySelector(".wrap"),
      a11y: host.querySelector(".fx3d-a11y"),
      summary: host.querySelector(".fx3d-summary"),
      control: host.querySelector(".fx3d-pause"),
      ambientKey: "fx3d.ambient",
      reduced: RM,
    })).then(() => host.classList.add("fx3d-on")).catch(() => {});
    const later = () => ("requestIdleCallback" in window ? requestIdleCallback(start, { timeout: 2000 }) : setTimeout(start, 200));
    if (document.readyState === "complete") later(); else addEventListener("load", later, { once: true });
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
