import { Button, Spinner, TopMenu } from '@components/shared-components'
import Modal from '@components/shared-components/modal/Modal'
import Earn from '@components/user/earnings/Earn'
import PayModal from '@components/user/earnings/PayModal'
import WithdrawModal from '@components/user/earnings/WithdrawModal'
import UserMenu from '@components/user/UserMenu'
import { DefaultService, Reservation } from '@openapi'
import { UseUser } from 'hooks/useUser'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'

const Earnings: FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>()
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)

  const { user, getUser } = UseUser()

  useEffect(() => {
    const token = localStorage.getItem('cargo_token')
    if (!token) {
      return
    }
    const authorization = 'Bearer ' + token
    DefaultService.getOwnersReservations(authorization).then((res) => {
      setReservations(res)
      setLoading(false)
    })
  }, [user])

  const onClose = async () => {
    await getUser?.()
    setIsModalOpen(false)
    setIsWithdrawModalOpen(false)
  }

  useEffect(() => {
    if (!localStorage.getItem('cargo_token')) {
      router.push('/login')
    }
  })

  return (
    <div className="w-full h-screen p-8 bg-brand-gray-400">
      <Head>
        <title>Car-Go - Zarobki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TopMenu />
        <div className="flex flex-col gap-8 px-4 md:flex-row md:px-8 lg:px-36">
          <div className="pt-4 ">
            <UserMenu />
          </div>
          <div className="w-full p-8 lg:w-2/4 bg-brand-gray-300 rounded-2xl">
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-2xl font-semibold text-brand-gray-100">
                Zarobki
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              {loading && <Spinner />}
              {reservations?.map((item) => (
                <Earn
                  dateFrom={item.from}
                  dateTo={item.to}
                  price={item.total_price}
                  make={item.make}
                  model={item.model}
                />
              ))}
            </div>
          </div>
          <div className="p-8 rounded-2xl lg:w-1/4 bg-brand-gray-300">
            <div className="mb-6 text-2xl font-semibold text-brand-gray-100">
              Saldo
            </div>
            <div className="flex items-center w-full px-6 text-2xl font-semibold h-14 bg-brand-gray-400 rounded-2xl text-brand-gray-100">
              {user?.balance || 0} PLN
            </div>
            <div className="flex flex-col gap-6 mt-6">
              <Button onClick={() => setIsWithdrawModalOpen(true)}>
                Wypłać
              </Button>
              <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
                Wpłać
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Modal title="Wpłać pieniądze" onClose={onClose} show={isModalOpen}>
        <PayModal onClose={onClose} />
      </Modal>
      <Modal
        title="Wypłać pieniądze"
        onClose={onClose}
        show={isWithdrawModalOpen}
      >
        <WithdrawModal onClose={onClose} />
      </Modal>
    </div>
  )
}

export default Earnings
