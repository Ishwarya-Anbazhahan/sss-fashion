import { useState } from "react";
import { Menu, Heart, X } from "lucide-react";

export default function Header({ wishlistCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [["Home","#home"],["Collections","#collections"],["Jewellery","#products"],["Gold Coin","#quotation"],["Showrooms","#contact"]];
  return <header className="site-header">
    <button className="mobile-menu icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <X/> : <Menu/>}</button>
    <a className="brand" href="#home"><span className="brand-mark">S<span>✦</span>S</span><span className="brand-name">SSS <b>FASHION</b><small>TRICHY · COIMBATORE</small></span></a>
    <nav className={menuOpen ? "main-nav open" : "main-nav"}>{links.map(([t,h], i) => <a key={t} className={i === 0 ? "active" : ""} href={h} onClick={() => setMenuOpen(false)}>{t}</a>)}</nav>
    <div className="header-actions"><button className="icon-button wishlist-action" aria-label="Wishlist"><Heart/><i key={wishlistCount} className="bump">{wishlistCount}</i></button></div>
  </header>;
}
