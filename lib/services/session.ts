import { IS_BROWSER } from './../envConstants'

export type SessionValue = string | Record<string, unknown>

export const setSession = (key: string, value: SessionValue) => {
  if (IS_BROWSER) {
    window.sessionStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    )
  }
}

export const getSessionKey = (key: string) => {
  if (!IS_BROWSER) {
    return undefined
  }

  const value = window.sessionStorage.getItem(key)

  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}
