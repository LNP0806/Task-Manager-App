import { apiRequest } from './apiClient'

export async function createCard(boardId, status, { title, description = '' }) {
  return apiRequest(`/api/boards/${boardId}/cards`, {
    method: 'POST',
    body: {
      title,
      description,
      status,
    },
  })
}

export async function updateCard(cardId, updates) {
  return apiRequest(`/api/cards/${cardId}`, {
    method: 'PATCH',
    body: updates,
  })
}

export async function deleteCard(cardId) {
  return apiRequest(`/api/cards/${cardId}`, {
    method: 'DELETE',
  })
}

export async function moveCard(cardId, targetStatus) {
  return apiRequest(`/api/cards/${cardId}/move`, {
    method: 'PATCH',
    body: {
      targetStatus,
    },
  })
}
