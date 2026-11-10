import { useEffect } from "react";

// Scroll reveal, 3D card tilt, magnetic buttons, hero parallax.
export default function useScrollEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cleanups = [];

    // 1. Scroll reveal with stagger
    const targets = document.querySelectorAll(
      ".section-heading > *, .gallery-heading > *, .product-toolbar, .benefit-intro > *, .benefit-item, .story-copy > *, .shop-list > *, .newsletter > div:first-child > *, .footer-col, .footer-brand, .category-card"
    );
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
      }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty("--rd", `${(i % 5) * 90}ms`);
      io.observe(el);
    });
    cleanups.push(() => io.disconnect());

    if (fine) {
      // 2. 3D tilt on product + category cards
      const tiltMove = (e) => {
        const card = e.target.closest?.(".product-card, .category-card");
        if (!card) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--ry", `${x * 10}deg`);
        card.style.setProperty("--rx", `${-y * 10}deg`);
        card.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
        card.style.setProperty("--my", `${(y + 0.5) * 100}%`);
      };
      const tiltLeave = (e) => {
        const card = e.target.closest?.(".product-card, .category-card");
        if (!card) return;
        card.style.setProperty("--ry", "0deg");
        card.style.setProperty("--rx", "0deg");
      };
      document.addEventListener("mousemove", tiltMove);
      document.addEventListener("mouseout", tiltLeave);
      cleanups.push(() => {
        document.removeEventListener("mousemove", tiltMove);
        document.removeEventListener("mouseout", tiltLeave);
      });

      // 3. Magnetic buttons
      const mag = ".primary-btn, .btn-gold, .btn, .back-to-top";
      const magMove = (e) => {
        const b = e.target.closest?.(mag);
        if (!b) return;
        const r = b.getBoundingClientRect();
        b.style.setProperty("--tx", `${(e.clientX - r.left - r.width / 2) * 0.25}px`);
        b.style.setProperty("--ty", `${(e.clientY - r.top - r.height / 2) * 0.35}px`);
      };
      const magLeave = (e) => {
        const b = e.target.closest?.(mag);
        if (!b) return;
        b.style.setProperty("--tx", "0px");
        b.style.setProperty("--ty", "0px");
      };
      document.addEventListener("mousemove", magMove);
      document.addEventListener("mouseout", magLeave);
      cleanups.push(() => {
        document.removeEventListener("mousemove", magMove);
        document.removeEventListener("mouseout", magLeave);
      });

      // 4. Hero parallax (mouse)
      const hero = document.querySelector(".hero-section");
      if (hero) {
        const heroMove = (e) => {
          const r = hero.getBoundingClientRect();
          hero.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
          hero.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
        };
        hero.addEventListener("mousemove", heroMove);
        cleanups.push(() => hero.removeEventListener("mousemove", heroMove));
      }
    }

    // 5. Scroll progress + back-to-top visibility + story image parallax
    const bar = document.querySelector(".scroll-progress");
    const topBtn = document.querySelector(".back-to-top");
    const storyImg = document.querySelector(".story-image img");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? window.scrollY / h : 0;
        if (bar) bar.style.transform = `scaleX(${p})`;
        if (topBtn) topBtn.classList.toggle("show", window.scrollY > 500);
        if (storyImg) {
          const r = storyImg.parentElement.getBoundingClientRect();
          const t = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
          storyImg.style.setProperty("--py2", `${(t * -30).toFixed(1)}px`);
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    return () => cleanups.forEach((c) => c());
  }, []);
}
