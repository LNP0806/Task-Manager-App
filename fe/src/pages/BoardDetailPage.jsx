import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CardDetailModal from '../components/cards/CardDetailModal'
import KanbanColumn from '../components/columns/KanbanColumn'
import { getBoardById } from '../services/boardService'
import {
  createCard,
  deleteCard,
  moveCard,
  updateCard,
} from '../services/cardService'

export default function BoardDetailPage() {
  const { boardId } = useParams()
  const [board, setBoard] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCardId, setSelectedCardId] = useState(null)

  useEffect(() => {
    getBoardById(boardId).then((data) => {
      setBoard(data)
      setIsLoading(false)
    })
  }, [boardId])

  const selectedCardContext = (() => {
    if (!board || !selectedCardId) {
      return null
    }

    for (const column of board.columns) {
      const card = column.cards.find((item) => item.id === selectedCardId)
      if (card) {
        return { card, column }
      }
    }

    return null
  })()

  async function refreshBoard() {
    const nextBoard = await getBoardById(boardId)
    setBoard(nextBoard)
  }

  async function handleCreateCard(columnId, payload) {
    await createCard(columnId, payload)
    await refreshBoard()
  }

  async function handleDeleteCard(cardId) {
    await deleteCard(cardId)
    if (selectedCardId === cardId) {
      setSelectedCardId(null)
    }
    await refreshBoard()
  }

  async function handleSaveCard(cardId, payload) {
    await updateCard(cardId, payload)
    await refreshBoard()
    setSelectedCardId(cardId)
  }

  async function handleMoveCard(cardId, targetColumnId) {
    await moveCard(cardId, targetColumnId)
    await refreshBoard()
    setSelectedCardId(cardId)
  }

  if (isLoading) {
    return (
      <p className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600">
        Loading board...
      </p>
    )
  }

  if (!board) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-950">
          Board not found
        </h2>
        <Link
          className="mt-4 inline-flex items-center justify-center rounded-md bg-teal-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          to="/boards"
        >
          Back to boards
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            className="text-sm font-medium text-teal-700 hover:text-teal-900"
            to="/boards"
          >
            Back to boards
          </Link>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            {board.title}
          </h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
            {board.description || 'No board description yet.'}
          </p>
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600">
          {board.columns.length} columns
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
        {board.columns.map((column) => (
          <KanbanColumn
            column={column}
            key={column.id}
            onCreateCard={handleCreateCard}
            onDeleteCard={handleDeleteCard}
            onOpenCard={(card) => setSelectedCardId(card.id)}
          />
        ))}
      </div>

      {selectedCardContext ? (
        <CardDetailModal
          card={selectedCardContext.card}
          columns={board.columns}
          currentColumn={selectedCardContext.column}
          key={`${selectedCardContext.card.id}-${selectedCardContext.column.id}`}
          onClose={() => setSelectedCardId(null)}
          onMove={handleMoveCard}
          onSave={handleSaveCard}
        />
      ) : null}
    </div>
  )
}
