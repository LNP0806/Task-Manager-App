import { Link, Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#eef6f5_0%,#f7f8fb_34%,#f5f7fa_100%)] text-slate-900 md:h-screen md:overflow-hidden">
      <header className="shrink-0 border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-200/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link
            className="block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
            to="/boards"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
              Task Board
            </p>
            <h1 className="text-xl font-bold text-slate-950 sm:text-2xl">
              Kanban Workspace
            </h1>
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 sm:px-6 md:min-h-0 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
