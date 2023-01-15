import { CarOfferRes, DefaultService } from '@openapi'
import NextImage from 'next/image'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import CarStats from '@components/offer/CarStats'
import {Input, Button, TopMenu} from '@components/shared-components'

const Offer: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ carOffer }) => {
  const title = `Car-Go ${
    carOffer && ` - ${carOffer.city} - ${carOffer.make} ${carOffer.model}`
  }`
  if(!carOffer){
    return null
  }
  return (
    <div className="w-full h-full min-h-screen p-8 bg-brand-gray-400">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TopMenu />
        <div className="flex flex-col items-center">
          <div className="flex justify-center gap-8">
            <div className="flex flex-col w-[822px] gap-6 p-6 bg-brand-gray-300 rounded-2xl">
              <div className="flex gap-2 text-2xl font-semibold text-brand-gray-100">
                <p className="first-letter:uppercase">{carOffer.make}</p>
                <p className="first-letter:uppercase">{carOffer.model}</p>
              </div>
              <div className="flex">
                <div className="relative w-[509px] h-[254px] rounded-xl overflow-hidden">
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
                  <span className="text-xl font-medium text-brand-gray-200">
                    Lokalizacja pojazdu
                  </span>
                  <span className="ml-auto text-xl font-medium text-brand-gray-200">
                    Cena za dobę
                  </span>
                </div>
                <div className="flex">
                  <span className="text-2xl font-semibold text-brand-gray-100">
                    {carOffer.city}
                  </span>
                  <span className="ml-auto text-2xl font-semibold text-brand-gray-100">
                    {carOffer.price_per_day} PLN
                  </span>
                </div>
              </div>
              <CarStats carOffer={carOffer} />
            </div>
            <div className="flex flex-col gap-8 p-6 bg-brand-gray-300 rounded-2xl h-fit">
              <div className="text-2xl font-semibold text-brand-gray-100">
                Rezerwacja
              </div>
              <Input
                className="w-[300px] cursor-pointer"
                dark
                placeholder="Data odbioru"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                type="text"
              />
              <Input
                className="w-[300px] cursor-pointer"
                dark
                placeholder="Data zwrotu"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                type="text"
              />
              <Button type="button">Zarezerwuj</Button>
            </div>
          </div>
        </div>
      </main>
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
