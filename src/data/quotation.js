// ===== Update these when the daily gold rate changes =====
export const GOLD_RATE_22K = 13210;          // ₹ per gram, 22kt
export const RATE_UPDATED = "10 Nov 2026, 04:30 PM";
export const MAKING_PCT = 17;                // making charge %
export const GST_PCT = 3;                    // GST %
export const SHOWROOM_PHONE = "8248794493";

const r2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

export function calcQuote(grams) {
  const gold = r2(grams * GOLD_RATE_22K);
  const making = r2(gold * MAKING_PCT / 100);
  const gst = r2((gold + making) * GST_PCT / 100);
  const total = r2(gold + making + gst);
  return { grams, rate: GOLD_RATE_22K, gold, making, gst, total };
}

export const inr = (n) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
