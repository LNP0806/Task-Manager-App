import { useEffect, useState } from 'react'
import BoardCard from '../components/boards/BoardCard'
import CreateBoardForm from '../components/boards/CreateBoardForm'
import { createBoard, getBoards } from '../services/boardService'

export default function BoardsPage() {
  const [boards, setBoards] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getBoards().then((data) => {
      setBoards(data)
      setIsLoading(false)
    })
  }, [])

  async function handleCreateBoard(payload) {
    const board = await createBoard(payload)
    setBoards((currentBoards) => [board, ...currentBoards])
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
