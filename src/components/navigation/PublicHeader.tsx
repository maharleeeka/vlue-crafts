import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NavItemLink from '@/components/navigation/NavItemLink'
import { publicNavItems } from '@/components/navigation/nav-items'
import { goHome } from '@/lib/go-home'

const MenuIcon = ({ open }: { open: boolean }) => {
  if (open) {
    return (
      <svg
        aria-hidden="true"
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          d="M6 18 18 6M6 6l12 12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function PublicHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"
      >
        <Link
          className="text-lg font-semibold tracking-tight text-gray-900"
          onClick={(event) => {
            event.preventDefault()
            goHome(navigate, location, { onNavigate: closeMenu })
          }}
          to="/"
        >
          Vlue Crafts
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {publicNavItems.map((item) => (
            <li key={item.kind === 'route' ? item.to : item.hash}>
              <NavItemLink item={item} />
            </li>
          ))}
        </ul>

        <button
          aria-controls="mobile-nav"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <MenuIcon open={menuOpen} />
        </button>
      </nav>

      <ul
        className={[
          'border-t border-gray-200 px-4 py-3 md:hidden',
          menuOpen ? 'block' : 'hidden',
        ].join(' ')}
        id="mobile-nav"
      >
        {publicNavItems.map((item) => (
          <li key={item.kind === 'route' ? item.to : item.hash}>
            <NavItemLink item={item} onNavigate={closeMenu} />
          </li>
        ))}
      </ul>
    </header>
  )
}
