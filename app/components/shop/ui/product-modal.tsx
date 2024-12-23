"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useCart } from "@/hooks/use-cart"
import { Product } from "@/types/product"

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [coupon, setCoupon] = useState("")
  const { addToCart } = useCart()

  if (!product) return null

  const handleAddToCart = () => {
    addToCart(product, quantity)
    onClose()
  }

  return (
    <Dialog open={!!product} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="relative aspect-video">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">{product.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Platform</span>
                <p className="font-medium">{product.platform}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Price</span>
                <p className="font-medium">₦{product.price.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Followers</span>
                <p className="font-medium">{product.followers.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Account Age</span>
                <p className="font-medium">{product.age} years</p>
              </div>
            </div>
            {product.features && (
              <div>
                <span className="text-sm text-muted-foreground">Features</span>
                <ul className="list-disc list-inside mt-1">
                  {product.features.map((feature) => (
                    <li key={feature} className="capitalize">
                      {feature.replace("-", " ")}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coupon">Coupon Code (Optional)</Label>
              <Input
                id="coupon"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleAddToCart}>
              Add to Cart - ₦{(product.price * quantity).toLocaleString()}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

