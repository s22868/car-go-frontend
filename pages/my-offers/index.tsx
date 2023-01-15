import { Button, Spinner, TopMenu } from '@components/shared-components'
import Offer from '@components/user/offers/Offer'
import UserMenu from '@components/user/UserMenu'
import { CarOfferRes, DefaultService } from '@openapi'
import { UseUser } from 'hooks/useUser'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'

const MyOffers: FC = () => {
  const router = useRouter()
  const { user } = UseUser()
  const [loading, setLoading] = useState(true)
  const [userOffers, setUserOffers] = useState<CarOfferRes[]>()
  const [refreshOffers, setRefreshOffers] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('cargo_token')
    if (!token) {
      return
    }
    const authorization = 'Bearer ' + token
    DefaultService.getUserOffers(authorization).then((res) => {
      setUserOffers(res)
      setLoading(false)
    })
  }, [user, refreshOffers])

  useEffect(() => {
    if (!localStorage.getItem('cargo_token')) {
      router.push('/login')
    }
  }, [])
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
          <div className="w-full p-8 lg:w-2/4 bg-brand-gray-300 rounded-2xl">
            <div className="flex items-start justify-between ">
              <h1 className="text-2xl font-semibold text-brand-gray-100">
                Moje ogłoszenia
              </h1>
              <Link href={'/create-offer'}>
                <Button type="button" className="px-4">
                  Dodaj ogłoszenie
                </Button>
              </Link>
            </div>
            <div className="mt-4">
              {loading && <Spinner />}
              <div className="flex flex-col gap-4">
                {userOffers?.map((offer) => (
                  <Offer
                    refresh={() => setRefreshOffers((prev) => !prev)}
                    id={offer.id}
                    img={offer.images[0].url || ''}
                    make={offer.make}
                    model={offer.model}
                    price={offer.price_per_day}
                    key={offer.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MyOffers
