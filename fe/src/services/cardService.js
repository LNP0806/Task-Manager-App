import { createId } from '../utils/ids'
import { cloneData, getBoardsStore, getCardsStore, setBoardsStore, setCardsStore } from './mockStore'

function touchBoard(boardId) {
  const boards = getBoardsStore()
  const board = boards.find((item) => item.id === boardId)

  if (board) {
    board.updatedAt = new Date().toISOString()
    setBoardsStore([...boards])
  }
}

function findCard(cardId) {
  const cards = getCardsStore()
  const cardIndex = cards.findIndex((item) => item.id === cardId)

  return cardIndex >= 0 ? { cards, card: cards[cardIndex], cardIndex } : null
}

export async function createCard(boardId, status, { title, description = '' }) {
  const board = getBoardsStore().find((item) => item.id === boardId)

  if (!board) {
    throw new Error('Board not found')
  }

  const now = new Date().toISOString()
  const cards = getCardsStore()
  const nextPosition = cards.filter(
    (cardItem) => cardItem.boardId === boardId && cardItem.status === status,
  ).length
  const card = {
    id: createId('card'),
    boardId,
    title,
    description,
    status,
    position: nextPosition,
    createdAt: now,
    updatedAt: now,
  }

  setCardsStore([...cards, card])
  touchBoard(boardId)
  return cloneData(card)
}

export async function updateCard(cardId, updates) {
  const result = findCard(cardId)

  if (!result) {
    throw new Error('Card not found')
  }

  Object.assign(result.card, updates, { updatedAt: new Date().toISOString() })
  setCardsStore([...result.cards])
  touchBoard(result.card.boardId)
  return cloneData(result.card)
}

export async function deleteCard(cardId) {
  const result = findCard(cardId)

  if (!result) {
    throw new Error('Card not found')
  }

  result.cards.splice(result.cardIndex, 1)
  setCardsStore([...result.cards])
  touchBoard(result.card.boardId)
  return { id: cardId }
}

export async function moveCard(cardId, targetStatus) {
  const result = findCard(cardId)

  if (!result) {
    throw new Error('Card not found')
  }

  if (result.card.status === targetStatus) {
    return cloneData(result.card)
  }

  const nextPosition = result.cards.filter(
    (cardItem) =>
      cardItem.boardId === result.card.boardId && cardItem.status === targetStatus,
  ).length

  result.card.status = targetStatus
  result.card.position = nextPosition
  result.card.updatedAt = new Date().toISOString()
  setCardsStore([...result.cards])
  touchBoard(result.card.boardId)
  return cloneData(result.card)
}
