import type { Location } from 'react-router-dom'
import type { NavItem } from '@/components/navigation/nav-items'
import { publicNavItems } from '@/components/navigation/nav-items'

function isKnownSectionHash(hash: string) {
  return publicNavItems.some(
    (item) => item.kind === 'section' && `#${item.hash}` === hash,
  )
}

export function isNavItemActive(item: NavItem, location: Location) {
  const { pathname, hash } = location

  if (item.kind === 'section') {
    return pathname === '/' && hash === `#${item.hash}`
  }

  if (item.to === '/') {
    return pathname === '/' && !isKnownSectionHash(hash)
  }

  return pathname === item.to || pathname.startsWith(`${item.to}/`)
}
