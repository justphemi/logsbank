import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const products = [
  {
    title: "Facebook",
    image: "/facebook.png",
    color: "bg-blue-700",
    textColor: "text-white",
    href: "/shop?platform=facebook"
  },
  {
    title: "X",
    image: "/x.png",
    color: "bg-zinc-900",
    textColor: "text-white",
    href: "/shop?platform=x"
  },
  {
    title: "Instagram",
    image: "/instagram.png",
    color: "bg-red-500",
    textColor: "text-white",
    href: "/shop?platform=instagram"
  },
  {
    title: "LinkedIn",
    image: "/linkedin.png",
    color: "bg-blue-300",
    textColor: "text-black",
    href: "/shop?platform=linkedin"
  },
  {
    title: "Tiktok",
    image: "/tiktok.png",
    color: "bg-gray-500",
    textColor: "text-white",
    href: "/shop?platform=tiktok"
  },
  {
    title: "Whatsapp",
    image: "/whatsapp.png",
    color: "bg-green-500",
    textColor: "text-white",
    href: "/shop?platform=whatsapp"
  },
  {
    title: "Textplus",
    image: "/textplus.png",
    color: "bg-green-800",
    textColor: "text-white",
    href: "/shop?platform=textplus"
  },
  {
    title: "Google Voice",
    image: "/voice.png",
    color: "bg-gray-200",
    textColor: "text-black",
    href: "/shop?platform=voice"
  },
]

export function ProductGrid() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <div
            key={index}
            className={`${product.color} cursor-pointer rounded-2xl p-6 relative overflow-hidden transition-transform hover:scale-105`}
          >
            <div className="flex flex-col h-full">
              {/* <p className="text-sm opacity-80 mb-1">Enjoy</p> */}
              <h3 className={`text-2xl font-bold mb-4 ${product.textColor}`}>
                <span className="block text-4xl mt-1">{product.title}</span>
              </h3>
              <Button
                className="bg-blue-200 text-neutral-600 self-start mb-4 z-10"
              >
                <Link href={product.href}>
                  Browse Logs
                </Link>
              </Button>
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
                className="absolute bottom-0 right-0 w-48 h-48 object-contain transform translate-x-8 translate-y-8"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

