import { useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { products } from "../data/products";
export default function ProductSection({ onWishlist }) {
  const [filter,setFilter] = useState("All");
  const [liked,setLiked] = useState([]);
  const visible = useMemo(()=>filter==="All"?products:products.filter(p=>p.category===filter),[filter]);
  const filters = ["All","Gold","Silver","Diamond"];
  const ta = {Gold:"தங்கம்",Silver:"வெள்ளி",Diamond:"வைரம்"};
  function toggleLike(id){setLiked(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]);onWishlist?.();}
  return <section className="section products-section" id="products">
    <div className="section-heading"><div><p className="eyebrow"><span/> JEWELLERY</p><h2>Worn for the <em>occasion</em></h2></div><p className="heading-note">Pieces are shown at the Trichy and Coimbatore showrooms.<br/>Ask there for metal purity and hallmark details.</p></div>
    <div className="product-toolbar"><div className="filter-tabs">{filters.map(f=><button key={f} className={filter===f?"selected":""} onClick={()=>setFilter(f)}>{f==="All"?"All":`${ta[f]} · ${f}`}</button>)}</div><span className="product-count">{visible.length} PIECES</span></div>
    <div className="product-grid">{visible.map((p,i)=><article className="product-card" key={p.id} style={{"--delay":`${i*70}ms`}}>
      <div className="product-image"><img src={p.image} alt={p.name} loading="lazy"/><span className="product-tag">{p.ta}</span><button className={`heart-button ${liked.includes(p.id)?"liked":""}`} onClick={()=>toggleLike(p.id)} aria-label="Add to wishlist"><Heart size={18} fill={liked.includes(p.id)?"currentColor":"none"}/></button><a className="quick-add" href="tel:8248794493">CALL HOUSE DESK <span>+</span></a></div>
      <div className="product-meta"><div><h3>{p.name}</h3><span>{p.text}</span></div></div>
    </article>)}</div>
  </section>;
}
