import { useState } from "react";
import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import CategorySection from "./components/CategorySection";
import FloatingGallery from "./components/FloatingGallery";
import ProductSection from "./components/ProductSection";
import StorySection from "./components/StorySection";
import Benefits from "./components/Benefits";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import GoldCoinQuotation from "./components/GoldCoinQuotation";
import { SparkleTrail, ScrollProgress } from "./components/Effects";
import useScrollEffects from "./hooks/useScrollEffects";

export default function App(){
  const [wishlistCount,setWishlistCount]=useState(0);
  useScrollEffects();
  return <><ScrollProgress/><SparkleTrail/><AnnouncementBar/><Header wishlistCount={wishlistCount}/><main><Hero/><Ticker/><CategorySection/><FloatingGallery/><ProductSection onWishlist={()=>setWishlistCount(x=>x+1)}/><GoldCoinQuotation/><StorySection/><Benefits/><Newsletter/></main><Footer/><a className="back-to-top" href="#home" aria-label="Back to top">↑</a></>;
}
