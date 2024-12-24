"use client"

import { useState, useEffect, Suspense } from "react"
import { ShopFilters } from "../components/shop/shop-filters"
import { ProductGrid } from "../components/shop/product-grid"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"

const ClientShopPage = dynamic(() => Promise.resolve(ShopPage), { ssr: false })

export default function ShopPage() {
  const searchParams = useSearchParams()
  const [platform, setPlatform] = useState(searchParams?.get("platform") || "") // Provide a default empty string

  useEffect(() => {
    const platform = searchParams?.get("platform") || "" // Fallback to an empty string
    setPlatform(platform)
  }, [searchParams])

  const handleFilterChange = (newFilters: any) => {
    setPlatform(newFilters.platform)
  }

  return (
    <Suspense fallback={<div>Please wait...</div>}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
          <ShopFilters initialPlatform={platform} onFilterChange={handleFilterChange} />
          <ProductGrid initialPlatform={platform} />
        </div>
      </div>
    </Suspense>
  )
}
