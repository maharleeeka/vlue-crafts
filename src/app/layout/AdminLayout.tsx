import { Link, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '@/lib/auth'

export default function AdminLayout() {
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-6">
            <Link className="text-lg font-semibold tracking-tight" to="/admin">
              Vlue Admin
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link className="text-gray-600 hover:text-gray-900" to="/admin">
                Dashboard
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900"
                to="/admin/items"
              >
                Items
              </Link>
            </nav>
          </div>
          <button
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={handleLogout}
            type="button"
          >
            Log out
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
