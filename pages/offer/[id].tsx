import Input from '@components/shared-components/input/Input'
import { CarOfferRes, DefaultService } from '@openapi'
import NextImage from 'next/image'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Button from '@components/shared-components/button/Button'

const Offer: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ carOffer }) => {
  const title = `Car-Go ${
    carOffer && ` - ${carOffer.city} - ${carOffer.make} ${carOffer.model}`
  }`
  return (
    <div className="w-screen h-full min-h-screen p-8 bg-brand-gray-400">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col items-center">
          <div className="mb-4">
            {carOffer.images
              ?.filter(({ url }) => url)
              .map(({ url }) => (
                <NextImage
                  src={url!}
                  alt={`${carOffer.make} ${carOffer.model}`}
                  width={400}
                  height={400}
                />
              ))}
          </div>
          <div className="flex justify-center gap-2">
            <div className="bg-brand-gray-300">...</div>
            <div className="flex flex-col gap-8 p-6 bg-brand-gray-300 rounded-2xl">
              <div className='text-2xl font-semibold text-brand-gray-100'>Rezerwacja</div>
              <Input
                className="w-[300px]"
                dark
                placeholder="Data odbioru"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                type="text"
              />
              <Input
                className="w-[300px]"
                dark
                placeholder="Data zwrotu"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                type="text"
              />
              <Button type='button'>Zarezerwuj</Button>
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
    const carOffer = await DefaultService.getOfferOfferId(id)
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
