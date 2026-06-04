const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export class ApiError extends Error {
  constructor(message, status, payload = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

export async function apiRequest(path, options = {}) {
  const body =
    options.body && typeof options.body !== 'string'
      ? JSON.stringify(options.body)
      : options.body

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
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
