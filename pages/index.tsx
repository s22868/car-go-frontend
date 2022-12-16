import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-zinc-400">
      <Head>
        <title>Car-Go</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className='text-5xl'>Car-Go</h1>
        <div className='flex gap-6 mt-4 text-xl text-blue-500'>
          <Link className='hover:underline underline-offset-8' href={'/login'}>Logowanie</Link>
          <Link className='hover:underline underline-offset-8' href={'/register'}>Rejestracja</Link>
        </div>
      </main>
    </div>
  )
}

export default Home
