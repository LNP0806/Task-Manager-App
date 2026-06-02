import { useState } from 'react'
import Button from '../ui/Button'
import Field from '../ui/Field'

export default function CreateBoardForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    onCreate({ title: trimmedTitle, description: description.trim() })
    setTitle('')
    setDescription('')
  }

  return (
    <form
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold text-slate-950">Create board</h2>
      <div className="mt-4 space-y-4">
        <Field
          id="board-title"
          label="Board title"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Roadmap"
          value={title}
        />
        <Field
          as="textarea"
          className="min-h-24 resize-y"
          id="board-description"
          label="Description"
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What this board is for"
          value={description}
        />
        <Button className="w-full" type="submit">
          Create board
        </Button>
      </div>
    </form>
  )
}
