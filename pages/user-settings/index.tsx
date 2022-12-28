import type { NextPage } from 'next'
import Head from 'next/head'
import { UseUser } from 'hooks/useUser'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const UserSettings: NextPage = () => {
  const router = useRouter()
  const { user } = UseUser()

  useEffect(() => {
    if (!localStorage.getItem('cargo_token')) {
      router.push('/login')
    }
  })

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-zinc-400">
      <Head>
        <title>Car-Go - Ustawienia profilu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 w-full gap-4 px-20 text-center">
        <h1 className="text-xl">Ustawienia profilu</h1>
        <div className="flex flex-col gap-3">
          <label className="flex flex-col items-start">
            <p>Id:</p>
            <input
              value={user?.id}
              disabled
              className="h-10 px-2 border border-gray-300 rounded-md outline-none focus:border-gray-900"
            />
          </label>
          <label className="flex flex-col items-start">
            <p>E-mail:</p>
            <input
              value={user?.email}
              disabled
              className="h-10 px-2 border border-gray-300 rounded-md outline-none focus:border-gray-900"
            />
          </label>
          <label className="flex flex-col items-start">
            <p>Weryfikacja konta:</p>
            <input
              value={user?.isVerified ? 'Zweryfikowane' : 'Brak'}
              disabled
              className="h-10 px-2 border border-gray-300 rounded-md outline-none focus:border-gray-900"
            />
          </label>
        </div>
      </main>
    </div>
  )
}

export default UserSettings
