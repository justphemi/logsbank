import AdminLayout from '@/app/components/admin/AdminLayout'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem }from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Coupon {
  id: string
  code: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  expiryDate: string
}

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [newCoupon, setNewCoupon] = useState<Partial<Coupon>>({
    code: '',
    discountType: 'percentage',
    discountValue: 0,
    expiryDate: ''
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchCoupons = async () => {
      // Simulating API call
      const data = [
        {
          id: '1',
          code: 'SUMMER20',
          discountType: 'percentage',
          discountValue: 20,
          expiryDate: '2023-08-31'
        },
        {
          id: '2',
          code: 'FLAT50',
          discountType: 'fixed',
          discountValue: 5000,
          expiryDate: '2023-12-31'
        },
      ]
      setCoupons(data)
    }

    fetchCoupons()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCoupon(prev => ({ ...prev, [name]: value }))
  }

  const handleDiscountTypeChange = (value: 'percentage' | 'fixed') => {
    setNewCoupon(prev => ({ ...prev, discountType: value }))
  }

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    setNewCoupon(prev => ({ ...prev, code: result }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      // Update existing coupon
      setCoupons(prev => prev.map(coupon => 
        coupon.id === editingId ? { ...coupon, ...newCoupon, id: editingId } : coupon
      ))
      setEditingId(null)
    } else {
      // Add new coupon
      setCoupons(prev => [...prev, { ...newCoupon, id: Date.now().toString() } as Coupon])
    }
    setNewCoupon({
      code: '',
      discountType: 'percentage',
      discountValue: 0,
      expiryDate: ''
    })
  }

  const handleEdit = (coupon: Coupon) => {
    setNewCoupon(coupon)
    setEditingId(coupon.id)
  }

  const handleDelete = (id: string) => {
    setCoupons(prev => prev.filter(coupon => coupon.id !== id))
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Manage Coupons</h1>
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Coupon' : 'Create New Coupon'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="code">Coupon Code</Label>
            <div className="flex">
              <Input
                id="code"
                name="code"
                value={newCoupon.code || ''}
                onChange={handleInputChange}
                required
                className="flex-grow"
              />
              <Button type="button" onClick={generateRandomCode} className="ml-2">
                Generate
              </Button>
            </div>
          </div>
          <div>
            <Label>Discount Type</Label>
            <RadioGroup
              value={newCoupon.discountType}
              onValueChange={handleDiscountTypeChange}
              className="flex space-x-4"
            >
              <div className="flex items-center">
                <RadioGroupItem value="percentage" id="percentage" />
                <Label htmlFor="percentage" className="ml-2">Percentage</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="fixed" id="fixed" />
                <Label htmlFor="fixed" className="ml-2">Fixed Amount</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="discountValue">Discount Value</Label>
            <Input
              id="discountValue"
              name="discountValue"
              type="number"
              value={newCoupon.discountValue || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              type="date"
              value={newCoupon.expiryDate || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <Button type="submit" className="mt-4">
          {editingId ? 'Update Coupon' : 'Create Coupon'}
        </Button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Active Coupons</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Code</th>
                <th className="text-left p-2">Discount</th>
                <th className="text-left p-2">Expiry Date</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(coupon => (
                <tr key={coupon.id}>
                  <td className="p-2">{coupon.code}</td>
                  <td className="p-2">
                    {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₦${coupon.discountValue.toLocaleString()}`}
                  </td>
                  <td className="p-2">{coupon.expiryDate}</td>
                  <td className="p-2">
                    <Button onClick={() => handleEdit(coupon)} className="mr-2">Edit</Button>
                    <Button onClick={() => handleDelete(coupon.id)} variant="destructive">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminCoupons

