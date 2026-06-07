import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import AppLayout from '../components/layout/AppLayout'
import AuthPage from '../pages/AuthPage'
import BoardDetailPage from '../pages/BoardDetailPage'
import BoardsPage from '../pages/BoardsPage'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Navigate to="/boards" replace /> },
      { path: '/login', element: <AuthPage mode="login" /> },
      { path: '/register', element: <AuthPage mode="register" /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/boards', element: <BoardsPage /> },
          { path: '/boards/:boardId', element: <BoardDetailPage /> },
        ],
      },
      { path: '*', element: <Navigate to="/boards" replace /> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
