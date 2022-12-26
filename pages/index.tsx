import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { UseUser } from 'hooks/useUser'

const Home: NextPage = () => {
  const { logout, user } = UseUser()

  const handleLogout = () => {
    logout?.()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-zinc-400">
      <Head>
        <title>Car-Go</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className="text-5xl">Car-Go</h1>
        {user ? (
          <>
            <div>Zalogowany jako: {String(user.email)}</div>
            <Link
              className="my-3 text-blue-500 hover:underline underline-offset-4"
              href={'/user-settings'}
            >
              Ustawienia profilu
            </Link>
            <button
              className="p-1 transition-colors border border-gray-600 rounded-md hover:text-white bg-slate-300 hover:bg-slate-500"
              onClick={handleLogout}
            >
              Wyloguj
            </button>
          </>
        ) : (
          <div className="flex gap-6 mt-4 text-xl text-blue-500">
            <Link
              className="hover:underline underline-offset-8"
              href={'/login'}
            >
              Logowanie
            </Link>
            <Link
              className="hover:underline underline-offset-8"
              href={'/register'}
            >
              Rejestracja
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
