export default function CardItem({ card, onDelete, onOpen }) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-teal-300">
      <button
        className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        onClick={() => onOpen(card)}
        type="button"
      >
        <h3 className="text-sm font-semibold leading-5 text-slate-950">
          {card.title}
        </h3>
        {card.description ? (
          <p className="mt-2 line-clamp-3 text-sm leading-5 text-slate-600">
            {card.description}
          </p>
        ) : null}
      </button>
      <div className="mt-3 flex justify-end">
        <button
          className="rounded px-2 py-1 text-xs font-medium text-rose-700 transition hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          onClick={() => onDelete(card.id)}
          type="button"
        >
          Delete
        </button>
      </div>
    </article>
  )
}
