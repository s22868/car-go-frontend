import type { NextPage } from 'next'
import Head from 'next/head'
import { UseUser } from 'hooks/useUser'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Input from '@components/shared-components/input/Input'
import Link from 'next/link'
import Button from '@components/shared-components/button/Button'

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-brand-gray-400">
      <Head>
        <title>Car-Go - Ustawienia profilu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="mb-4 text-xl text-center text-brand-red">
          Ustawienia profilu
        </h1>
        <div className="flex flex-col gap-3">
          <label className="flex flex-col items-start">
            <p className="text-brand-red">Id:</p>
            <Input
              value={user?.id}
              disabled
              className="h-10 px-2 border border-gray-300 rounded-md outline-none focus:border-gray-900"
            />
          </label>
          <label className="flex flex-col items-start">
            <p className="text-brand-red">E-mail:</p>
            <Input
              value={user?.email}
              disabled
              className="h-10 px-2 border border-gray-300 rounded-md outline-none focus:border-gray-900"
            />
          </label>
          <label className="flex flex-col items-start">
            <p className="text-brand-red">Weryfikacja konta:</p>
            <Input
              value={user?.is_verified ? 'Zweryfikowane' : 'Brak'}
              disabled
              className="h-10 px-2 border border-gray-300 rounded-md outline-none focus:border-gray-900"
            />
          </label>
        </div>

        <Link href={'/create-offer'}>
          <Button type="button" className="w-full mt-6">
            Dodaj oferte
          </Button>
        </Link>
      </main>
    </div>
  )
}

export default UserSettings
