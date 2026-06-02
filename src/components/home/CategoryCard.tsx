import { Link } from 'react-router-dom'
import type { CraftCategory } from '@/data/craft-categories'

type CategoryCardProps = {
  category: CraftCategory
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-gray-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
      to={`/crafts?category=${category.slug}`}
    >
      <span aria-hidden="true" className="text-3xl">
        {category.icon}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-gray-700">
        {category.name}
      </h3>
      <p className="mt-2 flex-1 text-sm text-gray-600">{category.description}</p>
      <span className="mt-4 text-sm font-medium text-gray-900">
        Browse {category.name.toLowerCase()} →
      </span>
    </Link>
  )
}
