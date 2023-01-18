import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { CarOfferRes, DefaultService, Feature } from '@openapi'
import ListItem from '@components/home/list-item/ListItem'
import Map from '@components/home/map/Map'
import { Button, TopMenu, Input } from '@components/shared-components'
import { FormEvent, useState } from 'react'
import Modal from '@components/shared-components/modal/Modal'
import { features as featuresData } from './create-offer'
import classNames from 'classnames'

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ carOffers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [city, setCity] = useState('')
  const [features, setFeatures] = useState<Feature[]>([])
  const [carOffersData, setCarOffersData] = useState(carOffers)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const offers = await DefaultService.getOffers(
        fromDate || undefined,
        toDate || undefined,
        city || undefined,
        features.join(',') || undefined
      )
      setCarOffersData(offers)
    } catch {
      return
    }
  }
  const handleFeatures = (value: Feature) => {
    const tempFeatures = [...features]
    if (features?.includes(value)) {
      setFeatures(tempFeatures?.filter((val) => val !== value))
    } else {
      setFeatures((prev) => [...prev, value])
    }
  }

  return (
    <div className="w-full h-screen p-4 md:p-8 bg-brand-gray-400">
      <Head>
        <title>Car-Go</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full">
        <TopMenu />
        <div className="flex gap-8 h-[90%]">
          <div className="flex flex-col flex-1 gap-4">
            <form
              onSubmit={handleSubmit}
              className="flex justify-between gap-2"
            >
              <Input
                size={12}
                placeholder="Lokalizacja"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                size={12}
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                placeholder="Data odbioru"
                className="hidden lg:block max-w-[185px] cursor-pointer"
              />
              <Input
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                size={12}
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                placeholder="Data zwrotu"
                className="hidden lg:block max-w-[185px] cursor-pointer"
              />
              <Button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className="w-[150px] hidden md:block"
                variant="secondary"
              >
                Filtry
              </Button>
              <Button type="submit" className="w-[150px]">
                Szukaj
              </Button>
            </form>
            <div className="flex flex-col gap-4 overflow-y-scroll scrollbar-hide">
              {carOffersData.map((offer) => (
                <Link href={`/offer/${offer.id}`} key={offer.id}>
                  <ListItem
                    key={offer.id}
                    make={offer.make}
                    model={offer.model}
                    pricePerDay={offer.price_per_day}
                    imgSrc={offer.images[0]?.url || ''}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex-1 hidden overflow-hidden rounded-lg lg:block">
            <Map
              markers={carOffersData
                .filter((offer) => offer.point)
                .map((offer) => ({
                  id: offer.id!,
                  name: `${offer.make}, ${offer.model} - ${offer.price_per_day}PLN/dzień`,
                  position: {
                    lat: Number(offer.point?.lat),
                    lng: Number(offer.point?.lon),
                  },
                }))}
            />
          </div>
        </div>
      </main>
      <Modal
        onClose={() => setIsModalOpen(false)}
        show={isModalOpen}
        title="Filtry"
      >
        <div className='max-w-2xl mt-4'>
          <div className='flex flex-col gap-4 md:flex-wrap md:flex-row '>
            {featuresData.map(({ name, value }) => (
              <div
                onClick={() => handleFeatures(value)}
                className={classNames('border p-4 rounded-xl cursor-pointer', {
                  'text-brand-gray-100 font-medium border-brand-red':
                    features?.includes(value),
                  'text-brand-gray-200 font-medium': !features?.includes(value),
                })}
              >
                {name}
              </div>
            ))}
          </div>
          <div className='mt-11'>
            <Button type="button" className='w-full' onClick={() => setIsModalOpen(false)}>
              Zapisz
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<{
  carOffers: CarOfferRes[]
}> = async (context) => {
  const carOffers = await DefaultService.getOffers()
  return {
    props: {
      carOffers,
    },
  }
}
