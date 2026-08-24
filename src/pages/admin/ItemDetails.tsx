import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  createCraft,
  fetchCraft,
  updateCraft,
  type CraftInput,
} from '@/lib/crafts'

type ItemFormProps = {
  initialName: string
  initialPrice: string
  isCreateMode: boolean
  isPending: boolean
  saveError: Error | null
  onSave: (input: CraftInput) => Promise<void>
}

function ItemForm({
  initialName,
  initialPrice,
  isCreateMode,
  isPending,
  saveError,
  onSave,
}: ItemFormProps) {
  const [name, setName] = useState(initialName)
  const [price, setPrice] = useState(initialPrice)
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const trimmedName = name.trim()
    const parsedPrice = Number(price)

    if (!trimmedName) {
      setFormError('Name is required.')
      return
    }

    if (Number.isNaN(parsedPrice)) {
      setFormError('Price must be a number.')
      return
    }

    try {
      await onSave({
        name: trimmedName,
        price: parsedPrice,
      })
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save item')
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="item-name"
        >
          Name
        </label>
        <input
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none ring-gray-900 focus:border-gray-900 focus:ring-2"
          id="item-name"
          onChange={(event) => setName(event.target.value)}
          required
          type="text"
          value={name}
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="item-price"
        >
          Price
        </label>
        <input
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none ring-gray-900 focus:border-gray-900 focus:ring-2"
          id="item-price"
          min="0"
          onChange={(event) => setPrice(event.target.value)}
          required
          step="0.01"
          type="number"
          value={price}
        />
      </div>

      {(formError || saveError) && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {formError ??
            (saveError instanceof Error
              ? saveError.message
              : 'Failed to save item')}
        </p>
      )}

      <button
        className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? 'Saving…' : isCreateMode ? 'Create item' : 'Save changes'}
      </button>
    </form>
  )
}

export default function ItemDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isCreateMode = id === 'new'

  const craftQuery = useQuery({
    queryKey: ['crafts', id],
    queryFn: () => fetchCraft(id!),
    enabled: Boolean(id) && !isCreateMode,
  })

  const saveMutation = useMutation({
    mutationFn: async (input: CraftInput) => {
      if (isCreateMode) return createCraft(input)
      return updateCraft(id!, input)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['crafts'] })
      navigate('/admin')
    },
  })

  if (!isCreateMode && craftQuery.isLoading) {
    return <p className="text-sm text-gray-500">Loading item…</p>
  }

  if (!isCreateMode && craftQuery.error) {
    return (
      <div>
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-900">
          {craftQuery.error instanceof Error
            ? craftQuery.error.message
            : 'Failed to load item'}
        </p>
        <Link
          className="mt-4 inline-block text-sm font-medium text-gray-700 hover:text-gray-900"
          to="/admin"
        >
          ← Back to dashboard
        </Link>
      </div>
    )
  }

  const craft = isCreateMode ? undefined : craftQuery.data

  if (!isCreateMode && !craft) {
    return (
      <div>
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-900">
          Item not found.
        </p>
        <Link
          className="mt-4 inline-block text-sm font-medium text-gray-700 hover:text-gray-900"
          to="/admin"
        >
          ← Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg">
      <Link
        className="text-sm font-medium text-gray-600 hover:text-gray-900"
        to="/admin"
      >
        ← Back to dashboard
      </Link>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
        {isCreateMode ? 'Add item' : 'Edit item'}
      </h1>

      <ItemForm
        key={craft?.id ?? 'new'}
        initialName={craft?.name ?? ''}
        initialPrice={craft ? String(craft.price) : ''}
        isCreateMode={isCreateMode}
        isPending={saveMutation.isPending}
        onSave={async (input) => {
          await saveMutation.mutateAsync(input)
        }}
        saveError={
          saveMutation.error instanceof Error ? saveMutation.error : null
        }
      />
    </div>
  )
}
