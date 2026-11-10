import { img } from "../data/products";
const images = ["haram.jpg","jimikki.jpg","kolusu.jpg","diamond-haram.jpg","oddiyanam.jpg"];
export default function FloatingGallery() {
  return <section className="floating-gallery"><div className="gallery-heading"><p className="eyebrow"><span/> வரவேற்பு · WELCOME</p><h2>A house for gold and <em>silver.</em></h2></div><div className="marquee-window"><div className="jewel-marquee">{[...images,...images,...images].map((f,i)=><div className={`marquee-image mi-${i%5}`} key={i}><img src={img(f)} alt="SSS Fashion jewellery" loading="lazy"/></div>)}</div></div></section>;
}
