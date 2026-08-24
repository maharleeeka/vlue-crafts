import { appConfig } from '@/config/app-config'
import { getAuthToken } from '@/lib/auth'

export type Craft = {
  id: string
  name: string
  price: number
}

export type CraftInput = {
  name: string
  price: number
}

function authHeaders(): HeadersInit {
  const token = getAuthToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as {
      message?: string
      error?: string
    }
    return (
      payload.message ??
      payload.error ??
      `Request failed (${response.status})`
    )
  } catch {
    return `Request failed (${response.status})`
  }
}

export async function fetchCrafts(): Promise<Craft[]> {
  const response = await fetch(appConfig.api.craftsUrl)

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}

export async function fetchCraft(id: string): Promise<Craft> {
  const response = await fetch(`${appConfig.api.craftsUrl}/${id}`)

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}

export async function createCraft(input: CraftInput): Promise<Craft> {
  const response = await fetch(appConfig.api.craftsUrl, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}

export async function updateCraft(
  id: string,
  input: CraftInput,
): Promise<Craft> {
  const response = await fetch(`${appConfig.api.craftsUrl}/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json()
}

export async function deleteCraft(id: string): Promise<void> {
  const response = await fetch(`${appConfig.api.craftsUrl}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }
}
