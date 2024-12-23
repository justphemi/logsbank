"use client"

import { useState } from "react"
import { ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { CartSidebar } from "./shop/cart-sidebar"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items } = useCart()

  return (
    <header className="sticky top-0 z-50 w-[100vw] flex items-center justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 w-[100%] px-6 justify-between items-center">
        
        <Link href="/" className="flex items-center ">
          <span className="text-xl font-bold font-sans text-blue-700">LOGSBANK.</span>
        </Link>
        <div className="flex items-center gap-4 justify-end">
          <Button variant="ghost" className="relative h-8 w-8" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-12 w-12" />
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-green-700 text-[10px] font-bold text-white flex items-center justify-center">
                {items.length > 0 ? items.length : "0"}
              </span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <CartSidebar open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}

