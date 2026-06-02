import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '@/app/layout/AdminLayout'
import PublicLayout from '@/app/layout/PublicLayout'
import Dashboard from '@/pages/admin/Dashboard'
import ItemDetails from '@/pages/admin/ItemDetails'
import Items from '@/pages/admin/Items'
import Crafts from '@/pages/public/Crafts'
import Home from '@/pages/public/Home'
import Product from '@/pages/public/Product'
import ProductDetails from '@/pages/public/ProductDetails'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/crafts', element: <Crafts /> },
      { path: '/products', element: <Product /> },
      { path: '/products/:id', element: <ProductDetails /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'items', element: <Items /> },
      { path: 'items/:id', element: <ItemDetails /> },
    ],
  },
])
