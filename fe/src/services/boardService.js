import { createId } from '../utils/ids'
import { CARD_STATUSES } from '../constants/cardStatuses'
import {
  cloneData,
  getBoardsStore,
  getCardsStore,
  setBoardsStore,
} from './mockStore'

function getCardsForBoard(boardId) {
  return getCardsStore()
    .filter((card) => card.boardId === boardId)
    .sort((a, b) => a.position - b.position)
}

function buildBoardView(board) {
  const cards = getCardsForBoard(board.id)

  return {
    ...board,
    cardCount: cards.length,
    columns: CARD_STATUSES.map((status) => ({
      id: status.value,
      status: status.value,
      title: status.title,
      cards: cards.filter((card) => card.status === status.value),
    })),
  }
}

export async function getBoards() {
  return cloneData(getBoardsStore().map(buildBoardView))
}

export async function createBoard({ title, description = '' }) {
  const now = new Date().toISOString()
  const board = {
    id: createId('board'),
    title,
    description,
    createdAt: now,
    updatedAt: now,
  }

  setBoardsStore([board, ...getBoardsStore()])
  return cloneData(buildBoardView(board))
}

export async function getBoardById(boardId) {
  const board = getBoardsStore().find((item) => item.id === boardId)
  return board ? cloneData(buildBoardView(board)) : null
}
