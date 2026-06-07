import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CardDetailModal from '../components/cards/CardDetailModal'
import KanbanColumn from '../components/columns/KanbanColumn'
import { useAuth } from '../context/useAuth'
import { getBoardById } from '../services/boardService'
import {
  createCard,
  deleteCard,
  moveCard,
  updateCard,
} from '../services/cardService'

export default function BoardDetailPage() {
  const { boardId } = useParams()
  const { logout } = useAuth()
  const [board, setBoard] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCardId, setSelectedCardId] = useState(null)

  useEffect(() => {
    let isMounted = true

    getBoardById(boardId)
      .then((data) => {
        if (isMounted) {
          setBoard(data)
        }
      })
      .catch((loadError) => {
        if (loadError.status === 401) {
          logout()
        }

        if (isMounted) {
          setError(loadError.message || 'Unable to load board')
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [boardId, logout])

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

  async function handleCreateCard(status, payload) {
    try {
      await createCard(boardId, status, payload)
      await refreshBoard()
    } catch (cardError) {
      setError(cardError.message || 'Unable to create card')
    }
  }

  async function handleDeleteCard(cardId) {
    try {
      await deleteCard(cardId)
      if (selectedCardId === cardId) {
        setSelectedCardId(null)
      }
      await refreshBoard()
    } catch (cardError) {
      setError(cardError.message || 'Unable to delete card')
    }
  }

  async function handleSaveCard(cardId, payload) {
    try {
      await updateCard(cardId, payload)
      await refreshBoard()
      setSelectedCardId(cardId)
    } catch (cardError) {
      setError(cardError.message || 'Unable to save card')
    }
  }

  async function handleMoveCard(cardId, targetStatus) {
    try {
      await moveCard(cardId, targetStatus)
      await refreshBoard()
      setSelectedCardId(cardId)
    } catch (cardError) {
      setError(cardError.message || 'Unable to move card')
    }
  }

  if (isLoading) {
    return (
      <p className="rounded-lg border border-slate-200/80 bg-white/90 p-6 text-sm text-slate-600 shadow-sm">
        Loading board...
      </p>
    )
  }

  if (!board) {
    return (
      <div className="rounded-lg border border-slate-200/80 bg-white/95 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">
          {error || 'Board not found'}
        </h2>
        <Link
          className="mt-4 inline-flex items-center justify-center rounded-md bg-teal-700 px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          to="/boards"
        >
          Back to boards
        </Link>
      </div>
    )
  }

  return (
    <div className="md:flex md:h-full md:min-h-0 md:flex-col">
      <div className="mb-5 flex shrink-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            {board.title}
          </h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
            {board.description || 'No board description yet.'}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full border border-slate-200/80 bg-white/95 px-3 py-1 text-sm font-semibold text-slate-600 shadow-sm">
            {board.columns.length} columns
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:min-h-0 md:flex-1 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
        {error ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700 md:col-span-full">
            {error}
          </p>
        ) : null}
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
