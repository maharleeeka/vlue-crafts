export type RouteNavItem = {
  kind: 'route'
  label: string
  to: string
  end?: boolean
}

export type SectionNavItem = {
  kind: 'section'
  label: string
  hash: string
}

export type NavItem = RouteNavItem | SectionNavItem

export const publicNavItems: NavItem[] = [
  { kind: 'route', to: '/', label: 'Home', end: true },
  { kind: 'section', hash: 'recent-crafts', label: 'Crafts' },
  { kind: 'section', hash: 'contact', label: 'Contact' },
]
