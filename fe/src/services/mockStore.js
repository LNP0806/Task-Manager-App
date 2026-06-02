import { mockBoards, mockCards } from '../mocks/boards'

let boards = structuredClone(mockBoards)
let cards = structuredClone(mockCards)

export function cloneData(data) {
  return structuredClone(data)
}

export function getBoardsStore() {
  return boards
}

export function setBoardsStore(nextBoards) {
  boards = nextBoards
}

export function getCardsStore() {
  return cards
}

export function setCardsStore(nextCards) {
  cards = nextCards
}
