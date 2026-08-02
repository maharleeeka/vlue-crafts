import { appConfig } from '@/config/app-config'

const AUTH_TOKEN_KEY = 'vlue_admin_token'

export type LoginCredentials = {
  email: string
  password: string
}

type LoginResponse = {
  token?: string
  accessToken?: string
  message?: string
}

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthToken())
}

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export async function login(credentials: LoginCredentials): Promise<void> {
  const response = await fetch(appConfig.api.authLoginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  let payload: LoginResponse | null = null

  try {
    payload = (await response.json()) as LoginResponse
  } catch {
    payload = null
  }

  if (!response.ok) {
    throw new Error(payload?.message ?? `Login failed (${response.status})`)
  }

  const token = payload?.token ?? payload?.accessToken
  if (!token) {
    throw new Error('Login succeeded but no token was returned.')
  }

  setAuthToken(token)
}

export function logout(): void {
  clearAuthToken()
}
