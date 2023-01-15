import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { DefaultService } from '../../services/openapi'
import { Input, Button } from '@components/shared-components'

const Verify: NextPage = () => {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')
  const [code, setCode] = useState('')
  const authorization = 'Bearer ' + router.query.token

  const handleVerify = (e: FormEvent) => {
    e.preventDefault()
    DefaultService.verifyEmail(code, authorization)
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
        <title>Car-Go - Weryfikacja</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 w-full gap-4 px-20 text-center">
        <div className="mb-10 space-y-4 md:mb-20">
          <p className="text-5xl font-semibold text-brand-gray-100">
            cargo.<span className="text-brand-red">co</span>
          </p>
          <p className="text-xl font-medium text-brand-gray-200">
            car rental app
          </p>
        </div>
        <h1 className="mb-4 text-2xl font-semibold text-brand-gray-100">
          Weryfikacja
        </h1>
        <form className="flex flex-col gap-4 md:gap-6" onSubmit={handleVerify}>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            placeholder="Kod z maila"
          />
          <Button type="submit">Zweryfikuj</Button>
        </form>
        {errorMsg && <div className="text-red-500">{errorMsg}</div>}
      </main>
    </div>
  )
}

export default Verify
