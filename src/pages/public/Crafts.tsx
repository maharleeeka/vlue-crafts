import { Link, useSearchParams } from 'react-router-dom'
import { craftCategories } from '@/data/craft-categories'

export default function Crafts() {
  const [searchParams] = useSearchParams()
  const categorySlug = searchParams.get('category')
  const category = craftCategories.find((item) => item.slug === categorySlug)

  return (
    <div className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
          to="/"
        >
          ← Back to home
        </Link>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
          {category ? category.name : 'All crafts'}
        </h1>

        <p className="mt-4 max-w-2xl text-gray-600">
          {category
            ? category.description
            : 'Browse everything we make, or pick a category from the homepage.'}
        </p>

        {!category && categorySlug && (
          <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Category &quot;{categorySlug}&quot; was not found. Showing all crafts
            instead.
          </p>
        )}

        <p className="mt-8 text-sm text-gray-500">
          Craft listings will appear here. Cards available to purchase will link
          to an external shop.
        </p>
      </div>
    </div>
  )
}
