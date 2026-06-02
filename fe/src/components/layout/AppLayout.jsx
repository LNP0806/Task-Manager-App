import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">
              Task Board
            </p>
            <h1 className="text-xl font-semibold text-slate-950 sm:text-2xl">
              Kanban Workspace
            </h1>
          </div>
          <span className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600">
            Mock mode
          </span>
        </div>
      </header>
      <main className="mx-auto min-h-[calc(100vh-81px)] max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
