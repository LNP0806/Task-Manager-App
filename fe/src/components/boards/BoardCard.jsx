import { Link } from 'react-router-dom'

export default function BoardCard({ board }) {
  return (
    <Link
      className="group flex min-h-44 flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
      to={`/boards/${board.id}`}
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-950 group-hover:text-teal-800">
          {board.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {board.description || 'No board description yet.'}
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
        <span>4 statuses</span>
        <span>{board.cardCount ?? 0} cards</span>
      </div>
    </Link>
  )
}
