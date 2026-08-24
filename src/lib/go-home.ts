import type { Location, NavigateFunction } from 'react-router-dom'
import { scrollToTop } from '@/lib/scroll-to-top'

type GoHomeOptions = {
  onNavigate?: () => void
}

export function goHome(
  navigate: NavigateFunction,
  location: Location,
  { onNavigate }: GoHomeOptions = {},
) {
  onNavigate?.()

  const isAlreadyHome = location.pathname === '/' && !location.hash

  if (isAlreadyHome) {
    scrollToTop()
    return
  }

  if (location.pathname === '/') {
    navigate('/', { replace: true })
    scrollToTop()
    return
  }

  navigate('/')
}
