import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { Spinner } from '@components/shared-components'
import { useRouter } from 'next/router'
import { UseUser } from 'hooks/useUser'

const Login: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { login } = UseUser()
  const router = useRouter()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login?.(email, password)
      router.push('/')
    } catch (_) {
      setErrorMessage('Błędny email lub hasło, spróbuj jeszcze raz')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('cargo_token')) {
      router.push('/')
    }
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-zinc-400">
      <Head>
        <title>Car-Go - Logowanie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 w-full gap-4 px-20 text-center">
        <h1 className="text-xl">Car-Go Logowanie</h1>
        <form className="flex flex-col gap-3" onSubmit={handleLogin}>
          <label className="flex flex-col items-start">
            <p>E-mail:</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="example@ex.com"
              className="h-10 px-2 border border-gray-300 rounded-md outline-none focus:border-gray-900"
            />
          </label>
          <label className="flex flex-col items-start">
            <p>Hasło:</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
              type="password"
              placeholder="*****"
              className="h-10 px-2 border border-gray-300 rounded-md outline-none focus:border-gray-900"
            />
          </label>
          <button
            className="flex items-center justify-center h-10 border border-green-700 rounded-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Zaloguj'}
          </button>
        </form>
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
        <div>
          <p>Nie masz konta?</p>
          <Link
            className="text-blue-500 hover:underline underline-offset-4"
            href="/register"
          >
            Zarejestruj się
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Login
