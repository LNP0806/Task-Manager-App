const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const AUTH_TOKEN_STORAGE_KEY = 'task_board_auth_token'

export class ApiError extends Error {
  constructor(message, status, payload = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

export function getStoredAuthToken() {
  return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
}

export function setStoredAuthToken(token) {
  window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token)
}

export function clearStoredAuthToken() {
  window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
}

export async function apiRequest(path, options = {}) {
  const body =
    options.body && typeof options.body !== 'string'
      ? JSON.stringify(options.body)
      : options.body
  const token = getStoredAuthToken()

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
    body,
  })

  const payload = response.status === 204 ? null : await response.json()

  if (!response.ok) {
    throw new ApiError(
      payload?.message ?? `API request failed with status ${response.status}`,
      response.status,
      payload,
    )
  }

  if (response.status === 204) {
    return null
  }

  return payload && Object.hasOwn(payload, 'data') ? payload.data : payload
}

export { API_BASE_URL }
