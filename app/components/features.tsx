import { Download, Shield, Headphones, CreditCard } from 'lucide-react'

const features = [
  {
    icon: Download,
    title: "Fast Dowloand",
    description: "Download sinlge or multiple log in PDF",
  },
  {
    icon: Shield,
    title: "Safe Transaction",
    description: "Reliable and safe transactions.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "All Payment Secure and Transparent",
  },
  {
    icon: Headphones,
    title: "Online Support on Whatsapp",
    description: "Send a DM if you experience any issues.",
  },
]

export function Features() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 rounded-lg border bg-card"
          >
            <feature.icon className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

