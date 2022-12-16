import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Car-Go</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className='text-5xl'>Car-Go</h1>
        <div className='flex gap-6 text-xl mt-4 text-blue-500'>
          <Link className='hover:underline underline-offset-8' href={'/login'}>Logowanie</Link>
          <Link className='hover:underline underline-offset-8' href={'/register'}>Rejestracja</Link>
        </div>
      </main>
    </div>
  )
}

export default Home
