import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    if (adminAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '2025') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
    } else {
      alert('Incorrect password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Enter password"
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <ul className="py-4">
          <li>
            <Link href="/admin" className="block py-2 px-4 hover:bg-gray-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/listings" className="block py-2 px-4 hover:bg-gray-200">
              Listings
            </Link>
          </li>
          <li>
            <Link href="/admin/coupons" className="block py-2 px-4 hover:bg-gray-200">
              Coupons
            </Link>
          </li>
          <li>
            <Link href="/admin/analytics" className="block py-2 px-4 hover:bg-gray-200">
              Analytics
            </Link>
          </li>
        </ul>
        <div className="p-4">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </nav>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout

