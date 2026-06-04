import { Link } from 'react-router-dom'

export default function BoardCard({ board }) {
  return (
    <Link
      className="group flex min-h-44 flex-col justify-between rounded-lg border border-slate-200/80 bg-white/95 p-5 text-left shadow-sm shadow-slate-200/70 transition duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:bg-white hover:shadow-lg hover:shadow-teal-900/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
      to={`/boards/${board.id}`}
    >
      <div>
        <h2 className="text-lg font-bold leading-6 text-slate-950 transition group-hover:text-teal-800">
          {board.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {board.description || 'No board description yet.'}
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
        <span className="text-teal-700">{board.cardCount ?? 0} cards</span>
      </div>
    </Link>
  )
}
