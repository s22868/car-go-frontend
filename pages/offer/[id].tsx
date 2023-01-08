import Input from '@components/shared-components/input/Input'
import { CarOfferRes, DefaultService } from '@openapi'
import NextImage from 'next/image'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const Offer: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ carOffer }) => {
  const title = `Car-Go ${
    carOffer && ` - ${carOffer.city} - ${carOffer.model}`
  }`
  return (
    <div className="w-screen h-screen p-8 bg-brand-gray-400">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center h-full">
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
          <div className="flex flex-wrap gap-2">
            {Object.entries(carOffer).map(([keys, values], index) => (
              <div>
                <div className="text-center text-brand-red">{keys}:</div>
                <Input key={index} value={values?.toString()} disabled />
              </div>
            ))}
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
