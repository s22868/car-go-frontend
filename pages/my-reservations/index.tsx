import { Spinner, TopMenu } from '@components/shared-components'
import Earn from '@components/user/earnings/Earn'
import ReservationItem from '@components/user/reservations/ReservationItem'
import UserMenu from '@components/user/UserMenu'
import { CarOfferRes, DefaultService, Reservation } from '@openapi'
import { UseUser } from 'hooks/useUser'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const MyReservations: NextPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>()
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const { user } = UseUser()

  useEffect(() => {
    const token = localStorage.getItem('cargo_token')
    if (!token) {
      return
    }
    const authorization = 'Bearer ' + token
    DefaultService.geUserReservations(authorization)
      .then((res) => {
        setReservations(res)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }, [user])

  useEffect(() => {
    if (!localStorage.getItem('cargo_token')) {
      router.push('/login')
    }
  })
  console.log(reservations)

  return (
    <div className="w-full h-full min-h-screen p-4 md:p-8 bg-brand-gray-400">
      <Head>
        <title>Car-Go - Moje rezerwacje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TopMenu />
        <div className="flex flex-col gap-8 px-4 xl:flex-row md:px-8 lg:px-36">
          <div className="pt-4 ">
            <UserMenu />
          </div>
          <div className="w-full p-5 md:p-8 xl:w-2/4 bg-brand-gray-300 rounded-2xl">
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-base font-semibold md:text-2xl text-brand-gray-100">
                Moje rezerwacje
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              {loading && <Spinner />}
              {reservations?.map((reservation) => (
                <ReservationItem
                  key={reservation.from + reservation.model + reservation.to}
                  ownerId={reservation.owner_id}
                  price={reservation.total_price}
                  make={reservation.make}
                  model={reservation.model}
                  dateFrom={reservation.from}
                  dateTo={reservation.to}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MyReservations
