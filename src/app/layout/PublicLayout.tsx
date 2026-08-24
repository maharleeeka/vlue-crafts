import { Outlet } from 'react-router-dom'
import PublicHeader from '@/components/navigation/PublicHeader'

export default function PublicLayout() {
  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900">
      <PublicHeader />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
