import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { DefaultService } from '../../services/openapi'
import { Input, Button } from '@components/shared-components'
import Logo from '@components/shared-components/icons/Logo'

const Verify: NextPage = () => {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return setErrorMsg('Hasła nie są zgodne')
    }
    const code = router.query.code
    if (!code || typeof code === 'object') {
      return setErrorMsg('Kod z maila jest błędny, spróbuj ponownie')
    }

    DefaultService.setNewPassword(code, { new_password: password })
      .then((_) => {
        router.push('/login')
      })
      .catch((err) => {
        setErrorMsg('Spróbuj ponownie')
        console.log(err)
      })
  }

  useEffect(() => {
    if (localStorage.getItem('cargo_token')) {
      router.push('/')
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-brand-gray-400">
      <Head>
        <title>Car-Go - Reset hasła</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 w-full gap-4 px-20 text-center">
        <div className="mb-10 space-y-4 md:mb-20">
          <Logo />
          <p className="text-xl font-medium text-brand-gray-200">
            car rental app
          </p>
        </div>
        <h1 className="mb-4 text-2xl font-semibold text-brand-gray-100">
          Zmień hasło
        </h1>
        <form className="flex flex-col gap-4 md:gap-6" onSubmit={handleVerify}>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            type="password"
            placeholder="Nowe hasło"
          />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            type="password"
            placeholder="Potwierdź nowe hasło"
          />
          <Button type="submit">Zmień hasło</Button>
        </form>
        {errorMsg && <div className="text-red-500">{errorMsg}</div>}
      </main>
    </div>
  )
}

export default Verify
