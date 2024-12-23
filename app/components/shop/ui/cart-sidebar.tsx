"use client"

import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { Minus, Plus, X } from 'lucide-react'

export function CartSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(getCartTotal())
  }, [items, getCartTotal])

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.platform}</p>
                <div className="flex items-center mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
          <Button className="w-full mt-4">Proceed to Checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

