import { Spinner } from '@components/shared-components'
import { DefaultService } from '@openapi'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'

const Register: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (password !== confirmPassword) {
      setMessage('hasła nie są zgodne :(')
      return
    }
    DefaultService.registerUser({ email, password })
      .then((res) => console.log(res)).then((res) => router.push('/verify'))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setMessage('')
  }, [password, confirmPassword])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-zinc-400">
      <Head>
        <title>Car-Go - Rejestracja</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 w-full gap-4 px-20 text-center">
        <h1 className="text-xl">Car-Go Rejestracja</h1>
        <form className="flex flex-col gap-3" onSubmit={handleRegister}>
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
          <label className="flex flex-col items-start">
            <p>Powtórz hasło:</p>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              required
              type="password"
              placeholder="*****"
              className="h-10 px-2 border border-gray-300 rounded-md outline-none focus:border-gray-900"
            />
          </label>
          <button
            className="h-10 border border-green-700 rounded-lg"
            type="submit"
          >
            {loading ? <Spinner/> : "Zarejestruj"}
          </button>
        </form>
        {message && <div className="text-red-500">{message}</div>}
        <div>
          <p>Masz już konto?</p>
          <Link
            className="text-blue-500 hover:underline underline-offset-4"
            href="/login"
          >
            Zaloguj się
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Register
