export default function CardItem({ card, onDelete, onOpen }) {
  function handleOpen() {
    onOpen(card)
  }

  function handleDelete(event) {
    event.stopPropagation()
    onDelete(card.id)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleOpen()
    }
  }

  return (
    <article
      className="cursor-pointer rounded-md border border-slate-200/90 bg-white p-3 text-left shadow-sm shadow-slate-200/80 transition duration-150 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md hover:shadow-teal-900/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="block w-full text-left">
        <h3 className="text-sm font-bold leading-5 text-slate-950">
          {card.title}
        </h3>
        {card.description ? (
          <p className="mt-2 line-clamp-3 text-sm leading-5 text-slate-600">
            {card.description}
          </p>
        ) : null}
      </div>
      <div className="mt-3 flex justify-end">
        <button
          className="rounded px-2 py-1 text-xs font-bold text-rose-700 transition hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          onClick={handleDelete}
          type="button"
        >
          Delete
        </button>
      </div>
    </article>
  )
}
