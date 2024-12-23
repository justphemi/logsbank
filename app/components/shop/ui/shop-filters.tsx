"use client"

import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const platforms = [
  "All",
  "Facebook",
  "Instagram",
  "Twitter",
  "LinkedIn",
  "Google Voice",
  "Talkatone",
  "TikTok",
  "WhatsApp",
]

const facebookFeatures = [
  { id: "marketplace", label: "Marketplace Access" },
  { id: "dating", label: "Dating Profile" },
  { id: "instagram", label: "Linked to Instagram" },
  { id: "2fa", label: "2 Factor Authentication" },
]

interface ShopFiltersProps {
  initialPlatform: string;
  onFilterChange: (filters: any) => void;
}
export function ShopFilters({ initialPlatform, onFilterChange }: ShopFiltersProps) {
  const [platform, setPlatform] = useState(initialPlatform || "All")
  const [price, setPrice] = useState([0, 500000])
  const [followers, setFollowers] = useState([0, 10000000])
  const [age, setAge] = useState([0, 20])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  useEffect(() => {
    onFilterChange({ platform, price, followers, age, selectedFeatures })
  }, [platform, price, followers, age, selectedFeatures, onFilterChange])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <h3 className="font-semibold text-md text-neutral-500 mb-4">Filters</h3>
        <RadioGroup value={platform} onValueChange={setPlatform}>
          {platforms.map((p) => (
            <div key={p} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={p} id={p} />
              <Label htmlFor={p}>{p}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range (₦)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="number"
                    value={price[0]}
                    onChange={(e) => setPrice([+e.target.value, price[1]])}
                    min={0}
                    max={500000}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    value={price[1]}
                    onChange={(e) => setPrice([price[0], +e.target.value])}
                    min={0}
                    max={500000}
                  />
                </div>
              </div>
              <Slider
                value={price}
                onValueChange={setPrice}
                max={500000}
                step={5000}
                min={0}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₦{formatNumber(price[0])}</span>
                <span>₦{formatNumber(price[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="followers">
          <AccordionTrigger>Followers</AccordionTrigger>
          <AccordionContent>
            <Slider
              value={followers}
              onValueChange={setFollowers}
              max={10000000}
              step={1000}
              min={0}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatNumber(followers[0])}</span>
              <span>{formatNumber(followers[1])}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="age">
          <AccordionTrigger>Account Age (years)</AccordionTrigger>
          <AccordionContent>
            <Slider
              value={age}
              onValueChange={setAge}
              max={20}
              step={1}
              min={0}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{age[0]} years</span>
              <span>{age[1]} years</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
