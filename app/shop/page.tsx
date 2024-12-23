"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ShopFilters } from "../components/shop/shop-filters"
import { ProductGrid } from "../components/shop/product-grid"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const [platform, setPlatform] = useState(searchParams?.get("platform"))

  useEffect(() => {
    const platform = searchParams?.get("platform")
    if (platform) {
      setPlatform(platform)
    }
  }, [searchParams])

  const handleFilterChange = (newFilters) => {
    // You can add more logic here if needed
    setPlatform(newFilters.platform)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
        <ShopFilters initialPlatform={platform} onFilterChange={handleFilterChange} />
        <ProductGrid initialPlatform={platform} />
      </div>
    </div>
  )
}

