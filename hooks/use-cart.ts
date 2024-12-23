import { useState, useEffect, useCallback } from "react"
import { Product } from "@/types/product"

interface CartItem extends Product {
  quantity: number
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  const loadCart = useCallback(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    loadCart()
    window.addEventListener('storage', loadCart)
    return () => window.removeEventListener('storage', loadCart)
  }, [loadCart])

  const saveCart = (cart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(cart))
    setItems(cart)
    window.dispatchEvent(new Event('storage'))
  }

  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = items.find((item) => item.id === product.id)

    if (existingItem) {
      const updatedCart = items.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
      saveCart(updatedCart)
    } else {
      saveCart([...items, { ...product, quantity }])
    }
  }

  const removeFromCart = (productId: string) => {
    const updatedCart = items.filter((item) => item.id !== productId)
    saveCart(updatedCart)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = items.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    )
    saveCart(updatedCart)
  }

  const clearCart = () => {
    localStorage.removeItem("cart")
    setItems([])
    window.dispatchEvent(new Event('storage'))
  }

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  }
}

