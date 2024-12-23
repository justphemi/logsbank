import AdminLayout from '@/app/components/admin/AdminLayout'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Listing {
  id: string
  title: string
  category: string
  price: number
  followers: number
  age: number
  features: string[]
  description: string
  facebookFeatures?: {
    marketplace: boolean
    dating: boolean
    twoFa: boolean
    linkedInstagram: boolean
  }
}

const AdminListings = () => {
  const [listings, setListings] = useState<Listing[]>([])
  const [newListing, setNewListing] = useState<Partial<Listing>>({
    category: '',
    price: 0,
    followers: 0,
    age: 0,
    features: [],
    facebookFeatures: {
      marketplace: false,
      dating: false,
      twoFa: false,
      linkedInstagram: false
    }
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchListings = async () => {
      // Simulating API call
      const data = [
        {
          id: '1',
          title: 'Premium Facebook Account',
          category: 'Facebook',
          price: 150000,
          followers: 50000,
          age: 5,
          features: ['marketplace', 'dating'],
          description: 'Premium Facebook account with marketplace access and dating profile',
          facebookFeatures: {
            marketplace: true,
            dating: true,
            twoFa: false,
            linkedInstagram: false
          }
        },
        // ... more listings
      ]
      setListings(data)
    }

    fetchListings()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewListing(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string) => {
    setNewListing(prev => ({
      ...prev,
      facebookFeatures: {
        ...prev.facebookFeatures,
        [name]: !prev.facebookFeatures?.[name as keyof typeof prev.facebookFeatures]
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      // Update existing listing
      setListings(prev => prev.map(listing => 
        listing.id === editingId ? { ...listing, ...newListing, id: editingId } : listing
      ))
      setEditingId(null)
    } else {
      // Add new listing
      setListings(prev => [...prev, { ...newListing, id: Date.now().toString() } as Listing])
    }
    setNewListing({
      category: '',
      price: 0,
      followers: 0,
      age: 0,
      features: [],
      facebookFeatures: {
        marketplace: false,
        dating: false,
        twoFa: false,
        linkedInstagram: false
      }
    })
  }

  const handleEdit = (listing: Listing) => {
    setNewListing(listing)
    setEditingId(listing.id)
  }

  const handleDelete = (id: string) => {
    setListings(prev => prev.filter(listing => listing.id !== id))
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Manage Listings</h1>
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Listing' : 'Create New Listing'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={newListing.title || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={newListing.category || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={newListing.price || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="followers">Followers</Label>
            <Input
              id="followers"
              name="followers"
              type="number"
              value={newListing.followers || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={newListing.age || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Input
              id="features"
              name="features"
              value={newListing.features?.join(', ') || ''}
              onChange={(e) => setNewListing(prev => ({ ...prev, features: e.target.value.split(',').map(f => f.trim()) }))}
            />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={newListing.description || ''}
            onChange={handleInputChange}
            rows={4}
          />
        </div>
        {newListing.category?.toLowerCase() === 'facebook' && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Facebook Features</h3>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Checkbox
                  id="marketplace"
                  checked={newListing.facebookFeatures?.marketplace || false}
                  onCheckedChange={() => handleCheckboxChange('marketplace')}
                />
                <Label htmlFor="marketplace" className="ml-2">Marketplace</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="dating"
                  checked={newListing.facebookFeatures?.dating || false}
                  onCheckedChange={() => handleCheckboxChange('dating')}
                />
                <Label htmlFor="dating" className="ml-2">Dating</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="twoFa"
                  checked={newListing.facebookFeatures?.twoFa || false}
                  onCheckedChange={() => handleCheckboxChange('twoFa')}
                />
                <Label htmlFor="twoFa" className="ml-2">2FA</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="linkedInstagram"
                  checked={newListing.facebookFeatures?.linkedInstagram || false}
                  onCheckedChange={() => handleCheckboxChange('linkedInstagram')}
                />
                <Label htmlFor="linkedInstagram" className="ml-2">Linked to Instagram</Label>
              </div>
            </div>
          </div>
        )}
        <Button type="submit" className="mt-4">
          {editingId ? 'Update Listing' : 'Create Listing'}
        </Button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Current Listings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Title</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map(listing => (
                <tr key={listing.id}>
                  <td className="p-2">{listing.title}</td>
                  <td className="p-2">{listing.category}</td>
                  <td className="p-2">₦{listing.price.toLocaleString()}</td>
                  <td className="p-2">
                    <Button onClick={() => handleEdit(listing)} className="mr-2">Edit</Button>
                    <Button onClick={() => handleDelete(listing.id)} variant="destructive">Delete</Button>
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

export default AdminListings

