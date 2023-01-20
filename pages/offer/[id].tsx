import { CarOfferRes, DefaultService, Insurance, UserInfo } from '@openapi'
import NextImage from 'next/image'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import React, { FormEvent, useEffect, useState } from 'react'
import CarStats from '@components/offer/CarStats'
import { Input, Button, TopMenu, Spinner } from '@components/shared-components'
import classNames from 'classnames'
import { UseUser } from 'hooks/useUser'
import Modal from '@components/shared-components/modal/Modal'
import daysBetween from 'helpers/daysBetween'
import { useRouter } from 'next/router'
import getInsurancePrice from 'helpers/getInsurancePrice'

const Offer: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ carOffer }) => {
  const title = `Car-Go ${
    carOffer && ` - ${carOffer.city} - ${carOffer.make} ${carOffer.model}`
  }`
  const router = useRouter()
  const { user, getUser } = UseUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [insurance, setInsurance] = useState<Insurance>(Insurance.CHEAP)
  const [owner, setOwner] = useState<UserInfo>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('cargo_token')
    if (!token) {
      return
    }
    const authorization = 'Bearer ' + token
    DefaultService.getUserById(carOffer.owner_id, authorization)
      .then((res) => setOwner(res))
      .catch()
  }, [carOffer.owner_id])

  const days = daysBetween(new Date(dateTo), new Date(dateFrom))

  const price = days * carOffer.price_per_day + getInsurancePrice(insurance)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (Number(user?.balance) < price) {
      return setError('Nie masz wystarczająco środków na koncie')
    }
    setLoading(true)
    const token = localStorage.getItem('cargo_token')
    const authorization = 'Bearer ' + token
    try {
      await DefaultService.makeReservation(authorization, {
        from: dateFrom,
        to: dateTo,
        offer_id: carOffer.id,
        insurance,
      })
      await getUser?.()
      setIsModalOpen(true)
    } catch {
      setError('Coś poszło nie tak, spróbuj ponownie za chwile')
    } finally {
      setLoading(false)
    }
  }
  if (!carOffer) {
    return null
  }

  return (
    <div className="w-full h-full min-h-screen p-4 md:p-8 bg-brand-gray-400">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TopMenu />
        <div className="flex flex-col items-center">
          <div className="flex flex-col justify-center w-full gap-8 lg:w-auto xl:flex-row">
            <div className="flex flex-col lg:w-[822px] w-full gap-6 md:p-6 p-4 bg-brand-gray-300 rounded-2xl">
              <div className="flex gap-2 text-xl font-semibold md:text-2xl text-brand-gray-100">
                <p className="first-letter:uppercase">{carOffer.make}</p>
                <p className="first-letter:uppercase">{carOffer.model}</p>
              </div>
              <div className="flex">
                <div className="relative w-[509px] h-[254px] rounded-xl overflow-hidden ">
                  <NextImage
                    className="object-cover"
                    src={carOffer.images[0].url || ''}
                    alt={`${carOffer.make} ${carOffer.model}`}
                    fill
                  />
                </div>
                <div className="flex flex-col gap-1">
                  {carOffer.images
                    ?.filter(
                      ({ url }, index) => url && index !== 0 && index < 3
                    )
                    .map(({ url }) => (
                      <div className="relative w-[209px] h-[54px] rounded-xl overflow-hidden">
                        <NextImage
                          className="object-cover"
                          src={url!}
                          alt={`${carOffer.make} ${carOffer.model}`}
                          fill
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="px-6">
                <div className="flex">
                  <span className="text-base font-medium md:text-xl text-brand-gray-200">
                    Lokalizacja pojazdu
                  </span>
                  <span className="ml-auto text-base font-medium text-right md:text-xl text-brand-gray-200">
                    Cena za dobę
                  </span>
                </div>
                <div className="flex">
                  <span className="text-lg font-semibold md:text-2xl text-brand-gray-100">
                    {carOffer.city}
                  </span>
                  <span className="ml-auto text-lg font-semibold md:text-2xl text-brand-gray-100">
                    {carOffer.price_per_day} PLN
                  </span>
                </div>
              </div>
              <CarStats carOffer={carOffer} />
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 p-4 md:p-6 bg-brand-gray-300 rounded-2xl h-fit"
            >
              <div className="text-base font-semibold md:text-2xl text-brand-gray-100">
                Rezerwacja
              </div>
              <Input
                className="xl:w-[300px] w-full cursor-pointer"
                dark
                placeholder="Data odbioru"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                max={dateTo}
                type="text"
                required
              />
              <Input
                className="xl:w-[300px] w-full cursor-pointer"
                dark
                placeholder="Data zwrotu"
                value={dateTo}
                min={dateFrom}
                onChange={(e) => setDateTo(e.target.value)}
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                type="text"
                required
              />
              <div>
                <div className="text-brand-gray-100">Ubezpieczenie</div>
                <div className="flex justify-between mt-2">
                  <div
                    onClick={() => setInsurance(Insurance.CHEAP)}
                    className={classNames(
                      'px-4 py-2 bg-brand-gray-400 text-brand-gray-100 rounded-xl cursor-pointer',
                      {
                        'text-brand-red': insurance === Insurance.CHEAP,
                      }
                    )}
                  >
                    Tanie
                  </div>
                  <div
                    onClick={() => setInsurance(Insurance.MEDIUM)}
                    className={classNames(
                      'px-4 py-2 bg-brand-gray-400 text-brand-gray-100 rounded-xl cursor-pointer',
                      {
                        'text-brand-red': insurance === Insurance.MEDIUM,
                      }
                    )}
                  >
                    Średnie
                  </div>
                  <div
                    onClick={() => setInsurance(Insurance.EXPENSIVE)}
                    className={classNames(
                      'px-4 py-2 bg-brand-gray-400 text-brand-gray-100 rounded-xl cursor-pointer',
                      {
                        'text-brand-red': insurance === Insurance.EXPENSIVE,
                      }
                    )}
                  >
                    Drogie
                  </div>
                </div>
              </div>
              {dateFrom && dateTo && (
                <div className="flex justify-between text-xl font-semibold text-brand-gray-100">
                  <div>
                    Cena za {days} {days === 1 ? 'dzień' : 'dni'}
                  </div>
                  <div>{price} PLN</div>
                </div>
              )}
              {error && <p className="flex w-1/2 text-brand-red">{error}</p>}
              <Button disabled={loading} type="submit">
                {loading ? <Spinner /> : 'Zarezerwuj'}
              </Button>
              {owner && (
                <div className="flex flex-col">
                  <p className="text-brand-gray-100">
                    Wynajmujesz od: {owner?.first_name} {owner?.last_name?.[0]}.
                  </p>
                  <p className="text-brand-gray-200">{owner?.email}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
      <Modal
        title="Rezerwacja udana"
        onClose={() => setIsModalOpen(false)}
        show={isModalOpen}
      >
        <div className="mt-4">
          <div className="text-brand-gray-100">
            Udało się zarezerwować {carOffer.make} {carOffer.model}
          </div>
          <div className="text-brand-gray-200">Cena: {price}</div>
          <div className="flex gap-4 mt-4">
            <Button
              className="w-full"
              type="button"
              onClick={() => setIsModalOpen(false)}
            >
              Zamknij
            </Button>
            <Button
              type="button"
              onClick={() => router.push('/my-reservations')}
              className="w-full"
            >
              Moje rezerwacje
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Offer

export const getServerSideProps: GetServerSideProps<{
  carOffer: CarOfferRes
}> = async (context) => {
  const redirect = {
    destination: '/',
    permanent: false,
  }
  const { id } = context.query

  if (!(typeof id === 'string')) {
    return {
      redirect,
    }
  }

  try {
    const carOffer = await DefaultService.getCarOffer(id)
    return {
      props: {
        carOffer,
      },
    }
  } catch {
    return {
      redirect,
    }
  }
}
