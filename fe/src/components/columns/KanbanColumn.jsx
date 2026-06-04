import { useState } from 'react'
import CardItem from '../cards/CardItem'
import Button from '../ui/Button'
import Field from '../ui/Field'

export default function KanbanColumn({
  column,
  onCreateCard,
  onDeleteCard,
  onOpenCard,
}) {
  const [title, setTitle] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    onCreateCard(column.id, { title: trimmedTitle })
    setTitle('')
    setIsAdding(false)
  }

  return (
    <section className="flex min-h-80 w-full min-w-0 flex-col rounded-lg border border-slate-200/80 bg-white/70 p-3 shadow-sm shadow-slate-200/70 backdrop-blur md:h-full md:min-h-0">
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-slate-200/80 px-1 pb-3">
        <h2 className="truncate text-sm font-bold uppercase tracking-[0.08em] text-slate-700">
          {column.title}
        </h2>
        <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700 ring-1 ring-teal-100">
          {column.cards.length}
        </span>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1 md:scroll-pr-1">
        {column.cards.map((card) => (
          <CardItem
            card={card}
            key={card.id}
            onDelete={onDeleteCard}
            onOpen={onOpenCard}
          />
        ))}
        {column.cards.length === 0 ? (
          <p className="rounded-md border border-dashed border-slate-300 bg-white/60 px-3 py-6 text-center text-sm font-medium text-slate-500">
            No cards yet
          </p>
        ) : null}
      </div>

      {isAdding ? (
        <form className="mt-3 space-y-3" onSubmit={handleSubmit}>
          <Field
            id={`card-title-${column.id}`}
            label="Card title"
            onChange={(event) => setTitle(event.target.value)}
            placeholder="New task"
            value={title}
          />
          <div className="flex gap-2">
            <Button className="flex-1" disabled={!title.trim()} type="submit">
              Add
            </Button>
            <Button
              className="flex-1"
              onClick={() => setIsAdding(false)}
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Button
          className="mt-3 w-full"
          onClick={() => setIsAdding(true)}
          variant="secondary"
        >
          Add card
        </Button>
      )}
    </section>
  )
}
