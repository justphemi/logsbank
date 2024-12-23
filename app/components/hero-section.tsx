import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gray-100 dark:bg-black">
      <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between">
          <div className="max-w-2xl text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Your No. 1
              <span className="block text-3xl sm:text-5xl mt-2">Social Logs Vendor</span>
              {/* <span className="block text-[8rem] font-bold text-gray-200 dark:text-gray-800 absolute -top-4 left-0 right-0 lg:left-0 opacity-50 select-none">
                HEADPHONE
              </span> */}
            <p className="text-sm text-muted-foreground tracking-wide p-3">We do not encourage any fraudulent activities.</p>

            </h1>
            <Button className="mt-8 bg-blue-400 hover:bg-blue-700">
              <Link href="/shop" className="text-white">
                Browse Logs
              </Link>
            </Button>
          </div>
          <div className="mt-12 lg:mt-0">
            <Image
              src="/hero.png"
              alt="Beats Solo Wireless Headphones"
              width={600}
              height={600}
              className="w-full max-w-lg transform lg:scale-110"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

