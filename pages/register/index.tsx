import { DefaultService } from '@openapi'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { Input, Button, Spinner } from '@components/shared-components'
import Logo from '@components/shared-components/icons/Logo'

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
      return setLoading(false)
    }

    DefaultService.registerUser({ email, password })
      .then((res) =>
        router.push({
          pathname: '/verify',
          query: { token: res.verification_token },
        })
      )
      .catch((_) => {
        setMessage('Nie udało się utworzyć konta')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (localStorage.getItem('cargo_token')) {
      router.push('/')
    }
  })

  useEffect(() => {
    setMessage('')
  }, [password, confirmPassword])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-brand-gray-400">
      <Head>
        <title>Car-Go - Rejestracja</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 w-full gap-4 px-20 text-center">
        <div className="mb-10 space-y-4 md:mb-20">
          <Logo />
          <p className="text-xl font-medium text-brand-gray-200">
            car rental app
          </p>
        </div>
        <h1 className="mb-8 text-2xl font-semibold md:mb-12 text-brand-gray-100">
          Stwórz konto
        </h1>
        <form
          className="flex flex-col gap-4 md:gap-6 md:w-[330px]"
          onSubmit={handleRegister}
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="example@ex.com"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
            type="password"
            placeholder="Hasło"
          />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={8}
            required
            type="password"
            placeholder="Powtórz hasło"
          />
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner /> : 'Stwórz konto'}
          </Button>
        </form>
        {message && <div className="text-red-500">{message}</div>}
        <div className="flex flex-col w-[249px] md:w-[330px] gap-4 md:gap-8">
          <hr className="w-full border-2 border-brand-gray-300" />
          <Link href="/login">
            <Button className="w-full" variant="secondary">
              Zaloguj się
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Register
