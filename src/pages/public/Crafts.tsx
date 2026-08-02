import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { appConfig } from '@/config/app-config'
import { craftCategories } from '@/data/craft-categories'

type Craft = {
  id: string
  name: string
  price: number
}

const fetchCrafts = async (): Promise<Craft[]> => {
  const response = await fetch(appConfig.api.craftsUrl)

  if (!response.ok) {
    throw new Error(`Failed to load crafts (${response.status})`)
  }

  return response.json()
}

export default function Crafts() {
  const [searchParams] = useSearchParams()
  const categorySlug = searchParams.get('category')
  const category = craftCategories.find((item) => item.slug === categorySlug)
  const {
    data: crafts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['crafts'],
    queryFn: fetchCrafts,
  })

  return (
    <div className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
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
            Category &quot;{categorySlug}&quot; was not found. Showing all
            crafts instead.
          </p>
        )}

        {isLoading && (
          <p className="mt-8 text-sm text-gray-500">Loading crafts…</p>
        )}

        {error && (
          <p className="mt-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-900">
            {error instanceof Error ? error.message : 'Failed to load crafts'}
          </p>
        )}

        {!isLoading && !error && crafts.length === 0 && (
          <p className="mt-8 text-sm text-gray-500">No crafts found.</p>
        )}

        {!isLoading && !error && crafts.length > 0 && (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {crafts.map((craft) => (
              <li
                key={craft.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-gray-900">
                  {craft.name}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  ${craft.price.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
