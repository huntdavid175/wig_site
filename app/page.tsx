import HeroCarousel from "./components/HeroCarousel";
import CategorySection from "./components/CategorySection";
import BestSellersSection from "./components/BestSellersSection";
import TestimonialsSection from "./components/TestimonialsSection";
import BrandValueSection from "./components/BrandValueSection";

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <CategorySection />
      <BestSellersSection />
      <TestimonialsSection />
      <BrandValueSection />
    </div>
  );
}
