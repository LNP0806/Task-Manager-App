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
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-slate-950">Boards</h2>
          <p className="mt-1 text-sm text-slate-600">
            Choose a workspace board or create a new one.
          </p>
        </div>
        {isLoading ? (
          <p className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600">
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
      <aside>
        <CreateBoardForm onCreate={handleCreateBoard} />
      </aside>
    </div>
  )
}
