import { useState } from 'react'
import Button from '../ui/Button'
import Field from '../ui/Field'

export default function CardDetailModal({
  card,
  columns,
  currentColumn,
  onClose,
  onMove,
  onSave,
}) {
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description ?? '')
  const [status, setStatus] = useState(currentColumn.status)

  async function handleSubmit(event) {
    event.preventDefault()
    await onSave(card.id, {
      title: title.trim(),
      description: description.trim(),
    })

    if (status !== currentColumn.status) {
      await onMove(card.id, status)
    }
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      role="dialog"
    >
      <form
        className="w-full max-w-2xl rounded-lg bg-white p-5 shadow-xl sm:p-6"
        onSubmit={handleSubmit}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-teal-700">
              {currentColumn.title}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">
              Card details
            </h2>
          </div>
          <button
            className="rounded-md px-2 py-1 text-2xl leading-none text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            onClick={onClose}
            type="button"
            aria-label="Close card details"
          >
            x
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <Field
            id="card-detail-title"
            label="Title"
            onChange={(event) => setTitle(event.target.value)}
            required
            value={title}
          />
          <Field
            as="textarea"
            className="min-h-36 resize-y"
            id="card-detail-description"
            label="Description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
          <label className="block" htmlFor="card-detail-status">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Status
            </span>
            <select
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
              id="card-detail-status"
              onChange={(event) => setStatus(event.target.value)}
              value={status}
            >
              {columns.map((column) => (
                <option key={column.status} value={column.status}>
                  {column.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button onClick={onClose} type="button" variant="secondary">
            Cancel
          </Button>
          <Button disabled={!title.trim()} type="submit">
            Save changes
          </Button>
        </div>
      </form>
    </div>
  )
}
