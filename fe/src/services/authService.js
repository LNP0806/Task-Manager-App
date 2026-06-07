import { apiRequest } from './apiClient'

export async function login({ email, password }) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: {
      email,
      password,
    },
  })
}

export async function register({ name, email, password }) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: {
      name,
      email,
      password,
    },
  })
}
