import { useEffect, useRef } from "react";

// Gold sparkle trail that follows the cursor (desktop only)
export function SparkleTrail() {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = ref.current;
    let last = 0;
    const glyphs = ["✦", "✧", "·", "✦"];
    const move = (e) => {
      const now = performance.now();
      if (now - last < 55) return;
      last = now;
      const s = document.createElement("span");
      s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      s.style.left = e.clientX + "px";
      s.style.top = e.clientY + "px";
      s.style.setProperty("--dx", `${(Math.random() - 0.5) * 40}px`);
      s.style.setProperty("--s", `${0.6 + Math.random() * 0.9}`);
      host.appendChild(s);
      setTimeout(() => s.remove(), 900);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div className="sparkle-trail" ref={ref} aria-hidden="true" />;
}

export function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />;
}

// Floating gold dust for the hero
export function GoldDust({ count = 18 }) {
  const items = Array.from({ length: count }, (_, i) => ({
    left: (i * 53) % 100,
    size: 4 + ((i * 7) % 9),
    dur: 9 + ((i * 3) % 9),
    delay: -((i * 1.7) % 12),
    drift: ((i * 29) % 60) - 30,
  }));
  return (
    <div className="gold-dust" aria-hidden="true">
      {items.map((d, i) => (
        <i key={i} style={{ left: `${d.left}%`, width: d.size, height: d.size, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s`, "--drift": `${d.drift}px` }} />
      ))}
    </div>
  );
}
