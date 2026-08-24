import { type MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { NavItem } from '@/components/navigation/nav-items'
import { goHome } from '@/lib/go-home'
import { isNavItemActive } from '@/lib/is-nav-item-active'
import { scrollToSection } from '@/lib/scroll-to-section'

const navItemClassName = (isActive: boolean) =>
  [
    'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-primary-100 text-primary-800'
      : 'text-neutral-600 hover:bg-primary-50 hover:text-primary-900',
  ].join(' ')

type NavItemLinkProps = {
  item: NavItem
  onNavigate?: () => void
}

export default function NavItemLink({ item, onNavigate }: NavItemLinkProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const isActive = isNavItemActive(item, location)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (item.kind === 'route' && item.to === '/') {
      event.preventDefault()
      goHome(navigate, location, { onNavigate })
      return
    }

    onNavigate?.()

    if (
      item.kind === 'section' &&
      location.pathname === '/' &&
      location.hash === `#${item.hash}`
    ) {
      scrollToSection(item.hash)
    }
  }

  const to =
    item.kind === 'section' ? { hash: item.hash, pathname: '/' } : item.to

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={navItemClassName(isActive)}
      onClick={handleClick}
      to={to}
    >
      {item.label}
    </Link>
  )
}
