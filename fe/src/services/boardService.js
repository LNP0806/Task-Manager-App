import { createId } from '../utils/ids'
import { cloneData, getBoardsStore, setBoardsStore } from './mockStore'

export async function getBoards() {
  return cloneData(getBoardsStore())
}

export async function createBoard({ title, description = '' }) {
  const board = {
    id: createId('board'),
    title,
    description,
    updatedAt: new Date().toISOString(),
    columns: [
      { id: createId('column'), title: 'To Do', cards: [] },
      { id: createId('column'), title: 'In Progress', cards: [] },
      { id: createId('column'), title: 'Done', cards: [] },
    ],
  }

  setBoardsStore([board, ...getBoardsStore()])
  return cloneData(board)
}

export async function getBoardById(boardId) {
  const board = getBoardsStore().find((item) => item.id === boardId)
  return board ? cloneData(board) : null
}
