import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Field from '../components/ui/Field'
import { useAuth } from '../context/useAuth'

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const { isAuthenticated, login, register } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const redirectTo = location.state?.from?.pathname ?? '/boards'

  if (isAuthenticated) {
    return <Navigate replace to="/boards" />
  }

  function updateField(event) {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (isRegister) {
        await register(form)
      } else {
        await login({
          email: form.email,
          password: form.password,
        })
      }

      navigate(redirectTo, { replace: true })
    } catch (submitError) {
      setError(submitError.message || 'Authentication failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-md items-center">
      <section className="w-full rounded-lg border border-slate-200/80 bg-white/95 p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
            Task Board
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {isRegister ? 'Create your account' : 'Sign in'}
          </h2>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          {isRegister ? (
            <Field
              autoComplete="name"
              id="name"
              label="Name"
              name="name"
              onChange={updateField}
              required
              value={form.name}
            />
          ) : null}

          <Field
            autoComplete="email"
            id="email"
            label="Email"
            name="email"
            onChange={updateField}
            required
            type="email"
            value={form.email}
          />

          <Field
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            id="password"
            label="Password"
            minLength={6}
            name="password"
            onChange={updateField}
            required
            type="password"
            value={form.password}
          />

          {error ? (
            <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
              {error}
            </p>
          ) : null}

          <Button className="mt-1 w-full" disabled={isSubmitting} type="submit">
            {isSubmitting
              ? 'Please wait...'
              : isRegister
                ? 'Create account'
                : 'Sign in'}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          {isRegister ? 'Already have an account?' : 'Need an account?'}{' '}
          <Link
            className="font-bold text-teal-700 underline-offset-4 hover:underline"
            to={isRegister ? '/login' : '/register'}
          >
            {isRegister ? 'Sign in' : 'Register'}
          </Link>
        </p>
      </section>
    </div>
  )
}
