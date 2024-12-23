"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Linkedin, Phone, MessageCircle, PhoneIcon as WhatsApp, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductModal } from "./product-modal"
import { useCart } from "@/hooks/use-cart"
import { Product } from "@/types/product"

const products: Product[] = [] // Replace with actual product data

interface ProductGridProps {
  initialPlatform: string;
}

export function ProductGrid({ initialPlatform }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { addToCart } = useCart()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState({
    platform: initialPlatform || "All",
    price: [0, 500000],
    followers: [0, 10000000],
    age: [0, 20],
    selectedFeatures: [] as string[],
  })

  useEffect(() => {
    // Shuffle products for randomness if "All" is selected
    const shuffleProducts = (array: Product[]) => array.sort(() => Math.random() - 0.5)

    const filtered = products.filter((product) => {
      const platformMatch =
        filters.platform === "All" || product.platform.toLowerCase() === filters.platform.toLowerCase()
      const priceMatch = product.price >= filters.price[0] && product.price <= filters.price[1]
      const followersMatch = product.followers >= filters.followers[0] && product.followers <= filters.followers[1]
      const ageMatch = product.age >= filters.age[0] && product.age <= filters.age[1]
      const featuresMatch =
        filters.selectedFeatures.length === 0 ||
        filters.selectedFeatures.every((feature) => product.features?.includes(feature))

      return platformMatch && priceMatch && followersMatch && ageMatch && featuresMatch
    })

    setFilteredProducts(filters.platform === "All" ? shuffleProducts(filtered) : filtered)
  }, [filters])

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook className="h-5 w-5" />
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "linkedin":
        return <Linkedin className="h-5 w-5" />
      case "google voice":
        return <Phone className="h-5 w-5" />
      case "talkatone":
        return <MessageCircle className="h-5 w-5" />
      case "whatsapp":
        return <WhatsApp className="h-5 w-5" />
      case "tiktok":
        return <Music className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <div className="flex">
      <main className="w-3/4">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getPlatformIcon(product.platform)}
                    <span className="font-medium capitalize">{product.platform}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{product.title}</h3>
                  <p className="text-2xl font-bold mb-4">₦{product.price.toLocaleString()}</p>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedProduct(product)}
                    >
                      View Details
                    </Button>
                    <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Oops! No products match your criteria.</h2>
            <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
          </div>
        )}

        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </main>
    </div>
  )
}
