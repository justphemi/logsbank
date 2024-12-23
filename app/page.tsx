import { HeroSection } from "./components/hero-section"
import { ProductGrid } from "./components/product-grid"
import { Features } from "./components/features"
import { ProductShowcase } from "./components/product-showcase"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <ProductGrid />
      <Features />
      <ProductShowcase />
    </div>
  )
}

