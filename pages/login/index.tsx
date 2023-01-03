import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { Spinner } from '@components/shared-components'
import { useRouter } from 'next/router'
import { UseUser } from 'hooks/useUser'
import Input from '@components/shared-components/input/Input'
import Button from '@components/shared-components/button/Button'

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-brand-gray-400">
      <Head>
        <title>Car-Go - Logowanie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <div className="mb-10 space-y-4 md:mb-20">
          <p className="text-5xl font-semibold text-brand-gray-100">
            cargo.<span className="text-brand-red">co</span>
          </p>
          <p className="text-xl font-medium text-brand-gray-200">
            car rental app
          </p>
        </div>
        <h1 className="mb-8 text-2xl font-semibold md:mb-12 text-brand-gray-100">
          Zaloguj się
        </h1>
        <form className="flex flex-col gap-4 md:gap-6 md:w-[330px]" onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="E-mail"
            error={!!errorMessage}
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
            type="password"
            placeholder="Hasło"
            error={!!errorMessage}
          />
          <Link
            className="font-medium text-right underline text-brand-red"
            href="/forgot-password"
          >
            Nie pamiętasz hasła?
          </Link>
          <Button type="submit" className="my-4 md:my-6" disabled={loading}>
            {loading ? <Spinner /> : 'Zaloguj'}
          </Button>
        </form>
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
        <div className="flex flex-col w-[249px] md:w-[330px] gap-4 md:gap-8">
          <hr className="w-full border-2 border-brand-gray-300" />
          <Link href="/register">
            <Button className="w-full" variant="secondary">
              Zarejestruj sie
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Login
