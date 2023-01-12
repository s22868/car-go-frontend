import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { CarOfferRes, DefaultService } from '@openapi'
import ListItem from '@components/home/list-item/ListItem'
import Map from '@components/home/map/Map'
import Input from '@components/shared-components/input/Input'
import Button from '@components/shared-components/button/Button'
import TopMenu from '@components/shared-components/top-menu/TopMenu'

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ carOffers }) => {
  return (
    <div className="w-screen h-screen p-8 bg-brand-gray-400">
      <Head>
        <title>Car-Go</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full">
      <TopMenu/>
        <div className="flex gap-8 h-[90%]">
          <div className="flex flex-col flex-1 gap-4 p-1">
            <div className="flex justify-between gap-2">
              <Input size={12} placeholder="Lokalizacja" />
              <Input
                size={12}
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                placeholder="Data odbioru"
                className="hidden md:block max-w-[185px]"
              />
              <Input
                size={12}
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                placeholder="Data zwrotu"
                className="hidden md:block max-w-[185px]"
              />
              <Button
                type="button"
                className="w-[150px] hidden md:block"
                variant="secondary"
              >
                Filtry
              </Button>
              <Button type="button" className="w-[150px]">
                Szukaj
              </Button>
            </div>
            <div className="flex flex-col gap-4 overflow-y-scroll scrollbar-hide">
              {carOffers.map((offer) => (
                <Link href={`/offer/${offer.id}`}>
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
              markers={carOffers
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
