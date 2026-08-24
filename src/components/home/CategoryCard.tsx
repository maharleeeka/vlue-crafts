import { Link } from 'react-router-dom'
import type { CraftCategory } from '@/data/craft-categories'

type CategoryCardProps = {
  accent?: 'primary' | 'secondary'
  category: CraftCategory
}

const accentStyles = {
  primary: {
    icon: 'bg-primary-100',
    hover:
      'hover:border-primary-300 hover:bg-primary-50 focus-visible:outline-primary-600',
    title: 'text-primary-900 group-hover:text-primary-700',
    cta: 'text-primary-600',
  },
  secondary: {
    icon: 'bg-secondary-100',
    hover:
      'hover:border-secondary-400 hover:bg-secondary-50 focus-visible:outline-primary-600',
    title: 'text-primary-900 group-hover:text-primary-700',
    cta: 'text-primary-600',
  },
} as const

export default function CategoryCard({
  accent = 'primary',
  category,
}: CategoryCardProps) {
  const styles = accentStyles[accent]

  return (
    <Link
      className={`group flex flex-col rounded-xl border border-neutral-200 bg-neutral-0 p-6 shadow-sm transition hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles.hover}`}
      to={`/crafts?category=${category.slug}`}
    >
      <span
        aria-hidden="true"
        className={`inline-flex size-12 items-center justify-center rounded-full text-3xl ${styles.icon}`}
      >
        {category.icon}
      </span>
      <h3 className={`mt-4 text-lg font-semibold ${styles.title}`}>
        {category.name}
      </h3>
      <p className="mt-2 flex-1 text-sm text-neutral-600">
        {category.description}
      </p>
      <span className={`mt-4 text-sm font-medium ${styles.cta}`}>
        Browse {category.name.toLowerCase()} →
      </span>
    </Link>
  )
}
