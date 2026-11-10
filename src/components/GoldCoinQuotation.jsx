import { useEffect, useRef, useState } from "react";
import { Coins, Download, MessageCircle } from "lucide-react";
import { GOLD_RATE_22K, RATE_UPDATED, MAKING_PCT, GST_PCT, calcQuote, inr } from "../data/quotation";

async function drawQuote(canvas, q) {
  try { await document.fonts.ready; } catch { /* ignore */ }
  const W = 900, H = 1040;
  canvas.width = W; canvas.height = H;
  const c = canvas.getContext("2d");
  const bg = c.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#1f1209"); bg.addColorStop(1, "#3a2110");
  c.fillStyle = bg; c.fillRect(0, 0, W, H);
  c.strokeStyle = "#dba73d"; c.lineWidth = 4; c.strokeRect(24, 24, W - 48, H - 48);
  c.lineWidth = 1; c.strokeRect(40, 40, W - 80, H - 80);

  c.textAlign = "center";
  c.fillStyle = "#e9bd62"; c.font = "600 56px 'Playfair Display', serif";
  c.fillText("SSS FASHION", W / 2, 130);
  c.fillStyle = "#f3e5c9"; c.font = "500 20px 'DM Sans', sans-serif";
  c.fillText("TRICHY  ·  COIMBATORE", W / 2, 168);
  c.fillStyle = "#e9bd62"; c.font = "italic 400 38px 'Playfair Display', serif";
  c.fillText("Gold Coin Quotation", W / 2, 240);
  c.fillRect(W / 2 - 60, 262, 120, 3);

  const rows = [
    ["Date", RATE_UPDATED],
    ["22kt rate · 1 gram", inr(q.rate)],
    ["Your weight", `${q.grams} g`],
    ["Gold value", inr(q.gold)],
    [`Making · ${MAKING_PCT}%`, inr(q.making)],
    [`GST · ${GST_PCT}%`, inr(q.gst)],
  ];
  let y = 340;
  rows.forEach(([k, v]) => {
    c.textAlign = "left"; c.fillStyle = "#cdb98f"; c.font = "400 26px 'DM Sans', sans-serif";
    c.fillText(k, 96, y);
    c.textAlign = "right"; c.fillStyle = "#fff5dc"; c.font = "600 28px 'DM Sans', sans-serif";
    c.fillText(v, W - 96, y);
    c.strokeStyle = "rgba(233,189,98,.25)"; c.lineWidth = 1;
    c.beginPath(); c.moveTo(96, y + 22); c.lineTo(W - 96, y + 22); c.stroke();
    y += 78;
  });

  const box = c.createLinearGradient(96, 0, W - 96, 0);
  box.addColorStop(0, "#f3c66e"); box.addColorStop(1, "#b87824");
  c.fillStyle = box; c.beginPath(); c.roundRect(96, y + 10, W - 192, 150, 24); c.fill();
  c.textAlign = "center"; c.fillStyle = "#2b1407"; c.font = "500 22px 'DM Sans', sans-serif";
  c.fillText("FINAL PRICE", W / 2, y + 56);
  c.font = "700 56px 'Playfair Display', serif";
  c.fillText(inr(q.total), W / 2, y + 120);

  c.fillStyle = "#cdb98f"; c.font = "400 18px 'DM Sans', sans-serif";
  c.fillText("Gift gold is extra and is not charged.", W / 2, H - 100);
  c.fillText("The showroom bill is the final price.", W / 2, H - 70);
}

function useCountUp(target) {
  const [v, setV] = useState(target);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setV(target); return; }
    let raf; const t0 = performance.now(), dur = 900;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
}

function Result({ q }) {
  const canvasRef = useRef(null);
  const total = useCountUp(q.total);
  useEffect(() => { if (canvasRef.current) drawQuote(canvasRef.current, q); }, [q]);

  const text = `SSS Fashion – Gold Coin Quotation\n${q.grams} g · 22kt @ ${inr(q.rate)}/g\nGold ${inr(q.gold)} + Making ${MAKING_PCT}% ${inr(q.making)} + GST ${GST_PCT}% ${inr(q.gst)}\nFinal price: ${inr(q.total)}\n(Showroom bill is the final price.)`;

  const getBlob = () => new Promise((res) => canvasRef.current.toBlob(res, "image/png"));
  async function download() {
    const blob = await getBlob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `gold-coin-quotation-${q.grams}g.png`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  async function share() {
    const blob = await getBlob();
    const file = new File([blob], `gold-coin-quotation-${q.grams}g.png`, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], text }); return; }
      catch (e) { if (e.name === "AbortError") return; }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }

  return (
    <div className="quote-result">
      <div className="quote-summary">
        <span>FINAL PRICE · {q.grams} g</span>
        <strong>{inr(total)}</strong>
        <ul>
          <li><span>Gold value</span><b>{inr(q.gold)}</b></li>
          <li><span>Making {MAKING_PCT}%</span><b>{inr(q.making)}</b></li>
          <li><span>GST {GST_PCT}%</span><b>{inr(q.gst)}</b></li>
        </ul>
        <div className="quote-actions">
          <button type="button" className="quote-btn whatsapp" onClick={share}><MessageCircle size={18}/> Share on WhatsApp</button>
          <button type="button" className="quote-btn ghost" onClick={download}><Download size={18}/> Save image</button>
        </div>
      </div>
      <canvas ref={canvasRef} className="quote-canvas" aria-label="Gold coin quotation image" />
    </div>
  );
}

export default function GoldCoinQuotation() {
  const [value, setValue] = useState("");
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const g = parseFloat(value);
    if (!g || g <= 0) { setError("Enter the grams, for example 8."); setQuote(null); return; }
    if (g > 1000) { setError("For more than 1000 g, please call the house desk."); setQuote(null); return; }
    setError(""); setQuote(calcQuote(g));
  }

  return (
    <section className="quote-section" id="quotation">
      <div className="quote-head">
        <p className="eyebrow light"><span/> தங்க நாணயம் · QUOTATION</p>
        <h2>Gold Coin <em>Quotation</em></h2>
        <p>Enter the grams. You get a Gold Coin quotation image with the 1 gram rate, your weight, making, GST, and the final price. Share it on WhatsApp.</p>
      </div>

      <form className="quote-card" onSubmit={submit}>
        <div className="quote-rate"><Coins size={18}/> 22kt gold rate: <b>{inr(GOLD_RATE_22K)}</b> per gram · {RATE_UPDATED}</div>
        <label htmlFor="grams">How many grams?</label>
        <input id="grams" type="number" inputMode="decimal" min="0" step="0.01" placeholder="8" value={value} onChange={(e) => setValue(e.target.value)} />
        <p className="quote-note">On the image: 1 gram 22kt rate, your weight × that rate, {MAKING_PCT}% making, then {GST_PCT}% GST. Gift gold is extra and is not charged. The showroom bill is the final price.</p>
        {error && <p className="quote-error" role="alert">{error}</p>}
        <button type="submit" className="quote-submit">Show quotation</button>
      </form>

      <div className="quote-card quote-output" aria-live="polite">
        {quote ? <Result key={quote.grams} q={quote} /> : <p className="quote-empty">Enter the grams to see the Gold Coin quotation image.</p>}
      </div>
    </section>
  );
}
