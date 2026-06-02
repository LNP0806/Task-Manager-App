import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import BoardDetailPage from '../pages/BoardDetailPage'
import BoardsPage from '../pages/BoardsPage'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Navigate to="/boards" replace /> },
      { path: '/boards', element: <BoardsPage /> },
      { path: '/boards/:boardId', element: <BoardDetailPage /> },
      { path: '*', element: <Navigate to="/boards" replace /> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
