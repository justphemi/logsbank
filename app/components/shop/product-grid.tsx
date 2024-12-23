"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ProductModal } from "./product-modal"
import { useCart } from "@/hooks/use-cart"
import { Product } from "@/types/product"

const products: Product[] = [
  // Facebook products
  {
    id: "fb1",
    title: "Premium Facebook Account",
    platform: "facebook",
    price: 150000,
    followers: 50000,
    age: 5,
    features: ["marketplace", "dating", "instagram"],
    description: "Premium Facebook account with marketplace access and dating profile",
    image: "/facebook.png",
  },
  {
    id: "fb2",
    title: "Established Facebook Page",
    platform: "facebook",
    price: 200000,
    followers: 100000,
    age: 7,
    features: ["verified", "monetization"],
    description: "Established Facebook page with monetization enabled",
    image: "/facebook.png",
  },
  {
    id: "fb3",
    title: "Facebook Business Manager",
    platform: "facebook",
    price: 300000,
    followers: 0,
    age: 3,
    features: ["ad accounts", "pages"],
    description: "Facebook Business Manager with multiple ad accounts and pages",
    image: "/facebook.png",
  },
  {
    id: "fb4",
    title: "Facebook Group",
    platform: "facebook",
    price: 250000,
    followers: 75000,
    age: 4,
    features: ["active members", "niche specific"],
    description: "Active Facebook group with engaged members in a specific niche",
    image: "/facebook.png",
  },
  // Instagram products
  {
    id: "ig1",
    title: "Verified Instagram Account",
    platform: "instagram",
    price: 500000,
    followers: 100000,
    age: 3,
    features: ["verified", "high engagement"],
    description: "Verified Instagram account with high engagement rate",
    image: "/instagram.png",
  },
  {
    id: "ig2",
    title: "Instagram Niche Page",
    platform: "instagram",
    price: 180000,
    followers: 50000,
    age: 2,
    features: ["niche specific", "monetized"],
    description: "Instagram niche page with monetization opportunities",
    image: "/instagram.png",
  },
  {
    id: "ig3",
    title: "Instagram Creator Account",
    platform: "instagram",
    price: 300000,
    followers: 75000,
    age: 4,
    features: ["creator tools", "brand deals"],
    description: "Instagram creator account with access to exclusive tools",
    image: "/instagram.png",
  },
  {
    id: "ig4",
    title: "Instagram Shopping Account",
    platform: "instagram",
    price: 400000,
    followers: 60000,
    age: 3,
    features: ["shopping enabled", "product tags"],
    description: "Instagram account with shopping features enabled",
    image: "/instagram.png",
  },
  // Twitter products
  {
    id: "tw1",
    title: "Verified X Account",
    platform: "x",
    price: 400000,
    followers: 50000,
    age: 5,
    features: ["verified", "high engagement"],
    description: "Verified X account with active followers",
    image: "/x.png",
  },
  {
    id: "tw2",
    title: "X Niche Account",
    platform: "X",
    price: 150000,
    followers: 30000,
    age: 3,
    features: ["niche specific", "engaged audience"],
    description: "X account focused on a specific niche with engaged followers",
    image: "/x.png",
  },
  {
    id: "tw3",
    title: "X News Account",
    platform: "X",
    price: 200000,
    followers: 40000,
    age: 4,
    features: ["news focused", "regular updates"],
    description: "X account dedicated to news updates with a loyal following",
    image: "/x.png",
  },
  {
    id: "tw4",
    title: "X Influencer Account",
    platform: "X",
    price: 350000,
    followers: 80000,
    age: 5,
    features: ["influencer status", "brand collaborations"],
    description: "Established X influencer account with brand collaboration history",
    image: "/x.png",
  },
  // LinkedIn products
  {
    id: "li1",
    title: "LinkedIn Business Profile",
    platform: "linkedin",
    price: 250000,
    followers: 10000,
    age: 5,
    features: ["business networking", "industry connections"],
    description: "Established LinkedIn business profile with valuable industry connections",
    image: "/linkedin.png",
  },
  {
    id: "li2",
    title: "LinkedIn Influencer Account",
    platform: "linkedin",
    price: 400000,
    followers: 50000,
    age: 7,
    features: ["thought leadership", "high engagement"],
    description: "LinkedIn influencer account known for thought leadership content",
    image: "/linkedin.png",
  },
  {
    id: "li3",
    title: "LinkedIn Company Page",
    platform: "linkedin",
    price: 300000,
    followers: 20000,
    age: 4,
    features: ["company showcase", "job postings"],
    description: "LinkedIn company page with established following and job posting history",
    image: "/linkedin.png",
  },
  {
    id: "li4",
    title: "LinkedIn Group",
    platform: "linkedin",
    price: 200000,
    followers: 15000,
    age: 3,
    features: ["industry specific", "active discussions"],
    description: "LinkedIn group focused on industry-specific discussions and networking",
    image: "/linkedin.png",
  },
  // Google Voice products
  {
    id: "gv1",
    title: "Google Voice Number",
    platform: "google voice",
    price: 50000,
    followers: 0,
    age: 2,
    features: ["US number", "call forwarding"],
    description: "Google Voice number with call forwarding and voicemail transcription",
    image: "/voice.png",
  },
  {
    id: "gv2",
    title: "Google Voice Business Account",
    platform: "google voice",
    price: 100000,
    followers: 0,
    age: 3,
    features: ["multiple numbers", "team management"],
    description: "Google Voice business account with multiple numbers and team management",
    image: "/voice.png",
  },
  {
    id: "gv3",
    title: "Google Voice Legacy Account",
    platform: "google voice",
    price: 150000,
    followers: 0,
    age: 5,
    features: ["grandfathered features", "number porting"],
    description: "Legacy Google Voice account with grandfathered features and number porting",
    image: "/voice.png",
  },
  {
    id: "gv4",
    title: "Google Voice International Package",
    platform: "google voice",
    price: 200000,
    followers: 0,
    age: 4,
    features: ["international calling", "low rates"],
    description: "Google Voice account with international calling package and low rates",
    image: "/voice.png",
  },
  // Talkatone products
  {
    id: "tt1",
    title: "Talkatone Basic Account",
    platform: "talkatone",
    price: 30000,
    followers: 0,
    age: 1,
    features: ["free calls", "text messaging"],
    description: "Basic Talkatone account with free calls and text messaging within the US",
    image: "/voice.png",
  },
  {
    id: "tt2",
    title: "Talkatone Premium Account",
    platform: "talkatone",
    price: 80000,
    followers: 0,
    age: 2,
    features: ["ad-free", "voicemail transcription"],
    description: "Premium Talkatone account with ad-free experience and voicemail transcription",
    image: "/voice.png",
  },
  {
    id: "tt3",
    title: "Talkatone Business Package",
    platform: "talkatone",
    price: 150000,
    followers: 0,
    age: 3,
    features: ["multiple lines", "business features"],
    description: "Talkatone business package with multiple lines and advanced features",
    image: "/voice.png",
  },
  {
    id: "tt4",
    title: "Talkatone International Account",
    platform: "talkatone",
    price: 100000,
    followers: 0,
    age: 2,
    features: ["international calling", "low rates"],
    description: "Talkatone account with international calling capabilities and competitive rates",
    image: "/voice.png",
  },
  // WhatsApp products
  {
    id: "wa1",
    title: "WhatsApp Business Account",
    platform: "whatsapp",
    price: 100000,
    followers: 1000,
    age: 2,
    features: ["business profile", "quick replies"],
    description: "WhatsApp Business account with custom business profile and quick replies",
    image: "/whatsapp.png",
  },
  {
    id: "wa2",
    title: "WhatsApp Group Admin",
    platform: "whatsapp",
    price: 50000,
    followers: 5000,
    age: 3,
    features: ["large group", "active members"],
    description: "Admin rights to a large, active WhatsApp group",
    image: "/whatsapp.png",
  },
  {
    id: "wa3",
    title: "WhatsApp Verified Business",
    platform: "whatsapp",
    price: 300000,
    followers: 10000,
    age: 4,
    features: ["verified badge", "API access"],
    description: "Verified WhatsApp Business account with API access for integration",
    image: "/whatsapp.png",
  },
  {
    id: "wa4",
    title: "WhatsApp Broadcast List",
    platform: "whatsapp",
    price: 200000,
    followers: 20000,
    age: 3,
    features: ["large audience", "high engagement"],
    description: "WhatsApp account with a large, engaged broadcast list",
    image: "/whatsapp.png",
  },
  // TikTok products
  {
    id: "tt1",
    title: "TikTok Influencer Account",
    platform: "tiktok",
    price: 500000,
    followers: 100000,
    age: 2,
    features: ["viral content", "high engagement"],
    description: "TikTok influencer account known for viral content and high engagement",
    image: "/tiktok.png",
  },
  {
    id: "tt2",
    title: "TikTok Niche Account",
    platform: "tiktok",
    price: 200000,
    followers: 50000,
    age: 1,
    features: ["niche specific", "trending hashtags"],
    description: "TikTok account focused on a specific niche with trending hashtags",
    image: "/tiktok.png",
  },
  {
    id: "tt3",
    title: "TikTok Business Account",
    platform: "tiktok",
    price: 300000,
    followers: 75000,
    age: 2,
    features: ["business tools", "ad capabilities"],
    description: "TikTok Business account with access to advanced business tools and ad capabilities",
    image: "/tiktok.png",
  },
  {
    id: "tt4",
    title: "TikTok Creator Fund Account",
    platform: "tiktok",
    price: 400000,
    followers: 150000,
    age: 3,
    features: ["monetization", "creator perks"],
    description: "TikTok account eligible for the Creator Fund with monetization opportunities",
    image: "/tiktok.png",
  },
  {
    id: "tt0004",
    title: "Testplus Premium+",
    platform: "textplus",
    price: 50000,
    followers: 10000,
    age: 3,
    features: ["monetization", "creator perks"],
    description: "Textplus account eligible for the Creator Fund with monetization opportunities",
    image: "/textplus.png",
  },
  {
    id: "tt01004",
    title: "Testplus Premium",
    platform: "textplus",
    price: 53000,
    followers: 12000,
    age: 2,
    features: ["monetization", "creator perks"],
    description: "Textplus account eligible for the Creator Fund with monetization opportunities",
    image: "/textplus.png",
  },
  {
    id: "tt00014",
    title: "Testplus Pro+",
    platform: "textplus",
    price: 34000,
    followers: 10600,
    age: 8,
    features: ["monetization", "creator perks"],
    description: "Textplus account eligible for the Creator Fund with monetization opportunities",
    image: "/textplus.png",
  },
]

interface ProductGridProps {
  initialPlatform: string;
}

export function ProductGrid({ initialPlatform }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { addToCart } = useCart()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState({
    platform: initialPlatform,
    price: [0, 500000],
    followers: [0, 10000000],
    age: [0, 20],
    selectedFeatures: [] as string[]
  })

  useEffect(() => {
    const filtered = products.filter((product) => {
      const platformMatch = filters.platform === "All" || product.platform.toLowerCase() === filters.platform.toLowerCase()
      const priceMatch = product.price >= filters.price[0] && product.price <= filters.price[1]
      const followersMatch = product.followers >= filters.followers[0] && product.followers <= filters.followers[1]
      const ageMatch = product.age >= filters.age[0] && product.age <= filters.age[1]
      const featuresMatch = filters.selectedFeatures.length === 0 || 
        filters.selectedFeatures.every(feature => product.features?.includes(feature))

      return platformMatch && priceMatch && followersMatch && ageMatch && featuresMatch
    })

    setFilteredProducts(filtered)
  }, [filters])


  return (
    <div>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium capitalize">{product.platform}</span>
                </div>
                <h3 className="font-semibold mb-2">{product.title}</h3>
                <p className="text-2xl font-bold mb-4">₦{product.price.toLocaleString()}</p>
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedProduct(product)}
                  >
                    Details
                  </Button>
                  <Button onClick={() => addToCart(product)} className="bg-blue-500 text-white">Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Fetching logs..</h2>
          <p className="text-muted-foreground">Please hold on a few secs or refresh!</p>
        </div>
      )}

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}

