import { categories } from "../data/products";
import { ArrowUpRight } from "lucide-react";
export default function CategorySection() {
  return <section className="section categories-section" id="collections">
    <div className="section-heading"><div><p className="eyebrow"><span/> காட்சி · SHOWROOM WINDOW</p><h2>Gold, silver &amp; <em>diamond</em></h2></div><a className="text-link" href="#products">View all jewellery <span>↗</span></a></div>
    <div className="category-grid three">{categories.map((cat,i)=><a href="#products" className={`category-card category-${i+1}`} key={cat.name}>
      <img src={cat.image} alt={`${cat.name} jewellery`} loading="lazy"/><div className="category-overlay"></div><div className="category-info"><span>{cat.ta}</span><h3>{cat.name}</h3><p>{cat.caption}</p></div><span className="category-arrow"><ArrowUpRight/></span>
    </a>)}</div>
  </section>;
}
