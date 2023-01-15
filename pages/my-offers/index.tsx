import { Button, TopMenu } from '@components/shared-components'
import UserMenu from '@components/user/UserMenu'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'

const MyOffers: FC = () => {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('cargo_token')) {
      router.push('/login')
    }
  })
  return (
    <div className="w-full h-screen p-8 bg-brand-gray-400">
      <Head>
        <title>Car-Go - Moje oferty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TopMenu />
        <div className="flex gap-8 px-36">
          <div className="pt-4">
            <UserMenu />
          </div>
          <div className="p-8 bg-brand-gray-300 rounded-2xl">
            <div className="flex items-start justify-between">
              <h1 className="text-2xl font-semibold text-brand-gray-100">
                Moje ogłoszenia
              </h1>
              <Link href={'/create-offer'}>
                <Button type="button" className="w-full">
                  Dodaj ogłoszenie
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MyOffers
