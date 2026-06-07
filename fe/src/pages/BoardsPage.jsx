import { useEffect, useState } from 'react'
import BoardCard from '../components/boards/BoardCard'
import CreateBoardForm from '../components/boards/CreateBoardForm'
import { useAuth } from '../context/useAuth'
import { createBoard, getBoards } from '../services/boardService'

export default function BoardsPage() {
  const { logout } = useAuth()
  const [boards, setBoards] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    getBoards()
      .then((data) => {
        if (isMounted) {
          setBoards(data)
        }
      })
      .catch((loadError) => {
        if (loadError.status === 401) {
          logout()
        }

        if (isMounted) {
          setError(loadError.message || 'Unable to load boards')
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
  }, [logout])

  async function handleCreateBoard(payload) {
    setError('')

    try {
      const board = await createBoard(payload)
      setBoards((currentBoards) => [board, ...currentBoards])
    } catch (createError) {
      if (createError.status === 401) {
        logout()
      }

      setError(createError.message || 'Unable to create board')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section>
        <div className="mb-5 flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Boards
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Choose a workspace board or create a new one.
          </p>
        </div>
        {isLoading ? (
          <p className="rounded-lg border border-slate-200/80 bg-white/90 p-6 text-sm text-slate-600 shadow-sm">
            Loading boards...
          </p>
        ) : error ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-sm font-semibold text-rose-700 shadow-sm">
            {error}
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {boards.map((board) => (
              <BoardCard board={board} key={board.id} />
            ))}
          </div>
        )}
      </section>
      <aside className="lg:pt-12">
        <CreateBoardForm onCreate={handleCreateBoard} />
      </aside>
    </div>
  )
}
