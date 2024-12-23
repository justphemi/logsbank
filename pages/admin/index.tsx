import AdminLayout from '@/app/components/admin/AdminLayout'
import { useState, useEffect } from 'react'

const AdminDashboard = () => {
  const [inventory, setInventory] = useState({
    total: 0,
    categories: {} as Record<string, number>
  })

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchInventory = async () => {
      // Simulating API call
      const data = {
        total: 100,
        categories: {
          Facebook: 20,
          Instagram: 25,
          Twitter: 15,
          LinkedIn: 10,
          'Google Voice': 10,
          Talkatone: 5,
          WhatsApp: 10,
          TikTok: 5
        }
      }
      setInventory(data)
    }

    fetchInventory()
  }, [])

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Inventory Overview</h2>
        <p className="mb-4">Total items in stock: {inventory.total}</p>
        <h3 className="text-lg font-semibold mb-2">Items by Category:</h3>
        <ul>
          {Object.entries(inventory.categories).map(([category, count]) => (
            <li key={category} className="mb-2">
              {category}: {count}
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard

