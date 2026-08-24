import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCraft, fetchCrafts } from '@/lib/crafts'

export default function Dashboard() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const {
    data: crafts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['crafts'],
    queryFn: fetchCrafts,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCraft,
    onSuccess: async (_data, deletedId) => {
      if (selectedId === deletedId) setSelectedId(null)
      await queryClient.invalidateQueries({ queryKey: ['crafts'] })
    },
  })

  const query = search.trim().toLowerCase()
  const filteredCrafts = query
    ? crafts.filter((craft) => craft.name.toLowerCase().includes(query))
    : crafts

  function handleCardClick(id: string) {
    setSelectedId((current) => (current === id ? null : id))
  }

  async function handleDelete(id: string, name: string) {
    const confirmed = window.confirm(`Delete "${name}"?`)
    if (!confirmed) return

    try {
      await deleteMutation.mutateAsync(id)
    } catch {
      // Error message is shown via deleteMutation.error below.
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Search, add, and manage craft items.
          </p>
        </div>
        <Link
          className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          to="/admin/items/new"
        >
          Add Item
        </Link>
      </div>

      <div className="mt-6">
        <label className="sr-only" htmlFor="item-search">
          Search items
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-gray-900 focus:border-gray-900 focus:ring-2 sm:max-w-md"
          id="item-search"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search items…"
          type="search"
          value={search}
        />
      </div>

      {isLoading && (
        <p className="mt-8 text-sm text-gray-500">Loading items…</p>
      )}

      {error && (
        <p className="mt-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-900">
          {error instanceof Error ? error.message : 'Failed to load items'}
        </p>
      )}

      {deleteMutation.error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-900">
          {deleteMutation.error instanceof Error
            ? deleteMutation.error.message
            : 'Failed to delete item'}
        </p>
      )}

      {!isLoading && !error && filteredCrafts.length === 0 && (
        <p className="mt-8 text-sm text-gray-500">
          {search.trim() ? 'No items match your search.' : 'No items yet.'}
        </p>
      )}

      {!isLoading && !error && filteredCrafts.length > 0 && (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCrafts.map((craft) => {
            const isSelected = selectedId === craft.id

            return (
              <li key={craft.id}>
                <div
                  className={`rounded-xl border bg-white p-5 shadow-sm transition ${
                    isSelected
                      ? 'border-gray-900 ring-2 ring-gray-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <button
                    className="w-full text-left"
                    onClick={() => handleCardClick(craft.id)}
                    type="button"
                  >
                    <h2 className="text-lg font-semibold text-gray-900">
                      {craft.name}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                      ${craft.price.toFixed(2)}
                    </p>
                  </button>

                  {isSelected && (
                    <div className="mt-4 flex gap-2">
                      <button
                        className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => navigate(`/admin/items/${craft.id}`)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
                        disabled={
                          deleteMutation.isPending &&
                          deleteMutation.variables === craft.id
                        }
                        onClick={() => void handleDelete(craft.id, craft.name)}
                        type="button"
                      >
                        {deleteMutation.isPending &&
                        deleteMutation.variables === craft.id
                          ? 'Deleting…'
                          : 'Delete'}
                      </button>
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
