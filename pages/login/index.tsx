import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

const Login: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    alert('zalogowano :)')
    console.log(email, password)
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Car-Go - Logowanie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex gap-4 w-full flex-1 flex-col items-center justify-center px-20 text-center">
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
              className="border border-gray-300 focus:border-gray-900 rounded-md outline-none px-2 h-10"
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
              className="border border-gray-300 focus:border-gray-900 rounded-md outline-none px-2 h-10"
            />
          </label>
          <button
            className="h-10 border border-green-700 rounded-lg"
            type="submit"
          >
            Zaloguj
          </button>
        </form>
        <div>
            <p>Nie masz konta?</p>
            <Link className='text-blue-500 hover:underline underline-offset-4' href="/register">Zarejestruj się</Link>
        </div>
      </main>
    </div>
  )
}

export default Login
