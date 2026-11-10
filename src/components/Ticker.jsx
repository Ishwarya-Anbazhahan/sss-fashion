export default function Ticker() {
  const words = ["தங்கம்", "✦", "வெள்ளி", "✧", "வைரம்", "✦"];
  return <div className="ticker" aria-label="Gold, silver, diamond"><div className="ticker-track">{[...words,...words,...words,...words].map((w,i)=><span key={i}>{w}</span>)}</div></div>;
}
