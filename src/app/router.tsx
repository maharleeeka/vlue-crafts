import { createBrowserRouter } from 'react-router-dom'
import RequireAuth from '@/app/RequireAuth'
import AdminLayout from '@/app/layout/AdminLayout'
import PublicLayout from '@/app/layout/PublicLayout'
import Dashboard from '@/pages/admin/Dashboard'
import ItemDetails from '@/pages/admin/ItemDetails'
import Items from '@/pages/admin/Items'
import Login from '@/pages/admin/Login'
import Crafts from '@/pages/public/Crafts'
import Home from '@/pages/public/Home'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/crafts', element: <Crafts /> },
    ],
  },
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <RequireAuth />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'items', element: <Items /> },
          { path: 'items/:id', element: <ItemDetails /> },
        ],
      },
    ],
  },
])
