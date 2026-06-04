import { ApiError, apiRequest } from './apiClient'

export async function getBoards() {
  return apiRequest('/api/boards')
}

export async function createBoard({ title, description = '' }) {
  return apiRequest('/api/boards', {
    method: 'POST',
    body: {
      title,
      description,
    },
  })
}

export async function getBoardById(boardId) {
  try {
    return await apiRequest(`/api/boards/${boardId}`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null
    }

    throw error
  }
}
