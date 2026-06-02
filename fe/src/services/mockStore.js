import { mockBoards } from '../mocks/boards'

let boards = structuredClone(mockBoards)

export function cloneData(data) {
  return structuredClone(data)
}

export function getBoardsStore() {
  return boards
}

export function setBoardsStore(nextBoards) {
  boards = nextBoards
}
