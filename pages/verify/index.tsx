import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, useState } from 'react'
import { DefaultService } from '../../services/openapi'

const Verify: NextPage = () => {
  const [code, setCode] = useState('')
  const authorization = ''

  const handleVerify = (e: FormEvent) => {
    e.preventDefault()
    DefaultService.verifyEmail(code, authorization)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-zinc-400">
      <Head>
        <title>Car-Go - Weryfikacja</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 w-full gap-4 px-20 text-center">
        <h1 className="text-xl">Car-Go Weryfikacja</h1>
        <form className="flex flex-col gap-3" onSubmit={handleVerify}>
          <label className="flex flex-col items-start">
            <p>Kod z maila:</p>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="h-10 px-2 border border-gray-300 rounded-md outline-none focus:border-gray-900"
            />
          </label>
          <button
            className="h-10 border border-green-700 rounded-lg"
            type="submit"
          >
            Zweryfikuj
          </button>
        </form>
      </main>
    </div>
  )
}

export default Verify
