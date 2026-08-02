import { env } from '@/config/env'

const trimSlashes = (value: string): string => {
  return value.replace(/\/+$/, '')
}

const resolveUrl = (baseUrl: string, path: string): string => {
  if (/^https?:\/\//i.test(path)) return path

  const normalizedBase = trimSlashes(baseUrl.trim())
  if (!normalizedBase) return path

  return `${normalizedBase}${path}`
}

const errorDiagnostics = env.diagnostics.filter(
  (item) => item.level === 'error',
)
if (errorDiagnostics.length > 0) {
  const details = errorDiagnostics
    .map((item) => `${item.key}: ${item.message}`)
    .join('\n')

  throw new Error(`Invalid environment configuration.\n${details}`)
}

const warningDiagnostics = env.diagnostics.filter(
  (item) => item.level === 'warning',
)
if (warningDiagnostics.length > 0 && env.enableDebugLogs) {
  warningDiagnostics.forEach((item) => {
    console.warn(`[config] ${item.key}: ${item.message}`)
  })
}

export const appConfig = {
  api: {
    craftsUrl: resolveUrl(env.apiBaseUrl, env.craftsApiPath),
    authLoginUrl: resolveUrl(env.apiBaseUrl, env.authLoginPath),
  },
  features: {
    enableDebugLogs: env.enableDebugLogs,
  },
} as const
