import { useCallback, useMemo, useState } from 'react'
import {
  clearStoredAuthToken,
  getStoredAuthToken,
  setStoredAuthToken,
} from '../services/apiClient'
import * as authService from '../services/authService'
import { AuthContext } from './authContextValue'

const AUTH_USER_STORAGE_KEY = 'task_board_auth_user'

function getStoredUser() {
  const value = window.localStorage.getItem(AUTH_USER_STORAGE_KEY)

  if (!value) {
    return null
  }

  try {
    return JSON.parse(value)
  } catch {
    window.localStorage.removeItem(AUTH_USER_STORAGE_KEY)
    return null
  }
}

function setStoredUser(user) {
  window.localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user))
}

function clearStoredUser() {
  window.localStorage.removeItem(AUTH_USER_STORAGE_KEY)
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredAuthToken())
  const [user, setUser] = useState(() => getStoredUser())

  const persistSession = useCallback((session) => {
    setStoredAuthToken(session.token)
    setStoredUser(session.user)
    setToken(session.token)
    setUser(session.user)
  }, [])

  const login = useCallback(async (credentials) => {
    const session = await authService.login(credentials)
    persistSession(session)
    return session
  }, [persistSession])

  const register = useCallback(async (payload) => {
    const session = await authService.register(payload)
    persistSession(session)
    return session
  }, [persistSession])

  const logout = useCallback(() => {
    clearStoredAuthToken()
    clearStoredUser()
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      login,
      logout,
      register,
      token,
      user,
    }),
    [login, logout, register, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
