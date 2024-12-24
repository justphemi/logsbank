"use client";

import { useState, useEffect, Suspense } from "react";
import { ShopFilters } from "../components/shop/shop-filters";
import { ProductGrid } from "../components/shop/product-grid";
import { useSearchParams } from "next/navigation";

// Component that directly uses `useSearchParams`
function ShopContent() {
  const searchParams = useSearchParams();
  const [platform, setPlatform] = useState(searchParams?.get("platform") || "");

  useEffect(() => {
    const platform = searchParams?.get("platform") || ""; // Fallback to an empty string
    setPlatform(platform);
  }, [searchParams]);

  const handleFilterChange = (newFilters: any) => {
    setPlatform(newFilters.platform);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
        <ShopFilters initialPlatform={platform} onFilterChange={handleFilterChange} />
        <ProductGrid initialPlatform={platform} />
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function ShopPage() {
  return (
    <Suspense fallback={<div>Please wait...</div>}>
      <ShopContent />
    </Suspense>
  );
}
