import { createId } from '../utils/ids'
import { cloneData, getBoardsStore, setBoardsStore } from './mockStore'

function findColumn(columnId) {
  for (const board of getBoardsStore()) {
    const column = board.columns.find((item) => item.id === columnId)
    if (column) {
      return { board, column }
    }
  }

  return null
}

function findCard(cardId) {
  for (const board of getBoardsStore()) {
    for (const column of board.columns) {
      const cardIndex = column.cards.findIndex((item) => item.id === cardId)
      if (cardIndex >= 0) {
        return { board, column, card: column.cards[cardIndex], cardIndex }
      }
    }
  }

  return null
}

export async function createCard(columnId, { title, description = '' }) {
  const result = findColumn(columnId)

  if (!result) {
    throw new Error('Column not found')
  }

  const card = {
    id: createId('card'),
    title,
    description,
  }

  result.column.cards.push(card)
  result.board.updatedAt = new Date().toISOString()
  setBoardsStore([...getBoardsStore()])
  return cloneData(card)
}

export async function updateCard(cardId, updates) {
  const result = findCard(cardId)

  if (!result) {
    throw new Error('Card not found')
  }

  Object.assign(result.card, updates)
  result.board.updatedAt = new Date().toISOString()
  setBoardsStore([...getBoardsStore()])
  return cloneData(result.card)
}

export async function deleteCard(cardId) {
  const result = findCard(cardId)

  if (!result) {
    throw new Error('Card not found')
  }

  result.column.cards.splice(result.cardIndex, 1)
  result.board.updatedAt = new Date().toISOString()
  setBoardsStore([...getBoardsStore()])
  return { id: cardId }
}

export async function moveCard(cardId, targetColumnId) {
  const cardResult = findCard(cardId)
  const columnResult = findColumn(targetColumnId)

  if (!cardResult || !columnResult) {
    throw new Error('Card or target column not found')
  }

  if (cardResult.column.id === targetColumnId) {
    return cloneData(cardResult.card)
  }

  const [card] = cardResult.column.cards.splice(cardResult.cardIndex, 1)
  columnResult.column.cards.push(card)
  cardResult.board.updatedAt = new Date().toISOString()
  setBoardsStore([...getBoardsStore()])
  return cloneData(card)
}
