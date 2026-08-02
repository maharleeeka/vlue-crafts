type EnvDiagnosticLevel = 'warning' | 'error'

export type EnvDiagnostic = {
  level: EnvDiagnosticLevel
  key: string
  message: string
}

type ParsedEnv = {
  apiBaseUrl: string
  craftsApiPath: string
  authLoginPath: string
  enableDebugLogs: boolean
  diagnostics: EnvDiagnostic[]
}

const parseBoolean = (
  value: string | undefined,
  fallback: boolean,
): boolean => {
  if (value == null || value.trim() === '') return fallback

  const normalizedValue = value.trim().toLowerCase()
  if (['1', 'true', 'yes', 'on'].includes(normalizedValue)) return true
  if (['0', 'false', 'no', 'off'].includes(normalizedValue)) return false

  return fallback
}

const parsePath = (
  key: string,
  value: string | undefined,
  diagnostics: EnvDiagnostic[],
  fallback: string,
): string => {
  if (value == null || value.trim() === '') {
    diagnostics.push({
      level: 'warning',
      key,
      message: `${key} is not set. Falling back to "${fallback}".`,
    })
    return fallback
  }

  const path = value.trim()
  const isAbsoluteUrl = /^https?:\/\//i.test(path)
  const isRootRelativePath = path.startsWith('/')

  if (!isAbsoluteUrl && !isRootRelativePath) {
    diagnostics.push({
      level: 'error',
      key,
      message: `${key} must be an absolute URL or root-relative path (received "${path}").`,
    })
    return fallback
  }

  return path
}

const readEnv = (): ParsedEnv => {
  const diagnostics: EnvDiagnostic[] = []

  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').trim()
  const craftsApiPath = parsePath(
    'VITE_CRAFTS_API_PATH',
    import.meta.env.VITE_CRAFTS_API_PATH,
    diagnostics,
    '/api/crafts',
  )
  const authLoginPath = parsePath(
    'VITE_AUTH_LOGIN_PATH',
    import.meta.env.VITE_AUTH_LOGIN_PATH,
    diagnostics,
    '/api/auth/login',
  )

  const enableDebugLogs = parseBoolean(
    import.meta.env.VITE_ENABLE_DEBUG_LOGS,
    false,
  )

  return {
    apiBaseUrl,
    craftsApiPath,
    authLoginPath,
    enableDebugLogs,
    diagnostics,
  }
}

export const env = readEnv()
