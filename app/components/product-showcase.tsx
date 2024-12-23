import Image from "next/image"

export function ProductShowcase() {
  return (
    <div className="bg-blue-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="text-white mb-3 lg:mb-0">
            <h2 className="text-3xl text-center font-bold mb-4">Get free discount code, when you buy logins worth ₦350,000+</h2>
            {/* <p className="text-lg opacity-90 mb-0 text-center"></p> */}
          </div>
          <Image
            src="/discount.png"
            alt="Air Solo Bass Headphones"
            width={700}
            height={500}
            className="w-full max-w-lg"
          />
        </div>
      </div>
    </div>
  )
}

