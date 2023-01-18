import Select from '@components/shared-components/select/Select'
import { CarOfferReq, DefaultService, Feature, FuelType } from '@openapi'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Spinner, Input, Button, TopMenu } from '@components/shared-components'
import classNames from 'classnames'

const offerFields: Partial<CarOfferReq> = {
  city: 'Gdansk',
  horsepower: '100',
  make: 'test',
  model: 'test',
  price_per_day: 120,
  seats_amount: 'test',
  year: 'test',
}
const fuels: FuelType[] = [
  FuelType.DIESEL,
  FuelType.ELECTRIC,
  FuelType.GAS,
  FuelType.HYBRID,
]
export const features = [
  { name: 'Klimatyzacja', value: Feature.AC },
  { name: 'AUX', value: Feature.AUX },
  { name: 'Bluetooth', value: Feature.BLUETOOTH },
  { name: 'Napęd na 4', value: Feature.FOUR_BY_FOUR },
  { name: 'GPS', value: Feature.GPS },
  { name: 'Podgrzewane siedzenia', value: Feature.HEATED_SEATS },
  { name: 'Szyberdach', value: Feature.PANORAMA_ROOF },
  { name: 'USB', value: Feature.USB },
]

const CreateOffer: NextPage = () => {
  const [offerData, setOfferData] = useState<Partial<CarOfferReq>>({
    city: '',
    horsepower: '',
    make: '',
    model: '',
    seats_amount: '',
    year: '',
    price_per_day: undefined,
    features: [],
    fuel_type: FuelType.DIESEL,
  })
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File>()
  const [error, setError] = useState('')
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('cargo_token')) {
      router.push('/login')
    }
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = 'Bearer ' + localStorage.getItem('cargo_token')!
      const res = await DefaultService.postOffersAdd(token, {
        ...(offerData as CarOfferReq),
      })

      await DefaultService.addPictures(res.id, token, {
        image: selectedFile!,
      })
      setLoading(false)
      router.push('/')
    } catch {
      setError('Błąd przy dodawaniu ogłoszenia :(')
      setLoading(false)
    }
  }
  const handleFeatures = (value: Feature) => {
    const tempFeatures = offerData.features
    if (offerData.features?.includes(value)) {
      setOfferData((prev) => ({
        ...prev,
        features: tempFeatures?.filter((val) => val !== value),
      }))
    } else {
      setOfferData((prev) => ({
        ...prev,
        features: [...prev.features!, value],
      }))
    }
  }
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0])
  }

  return (
    <div className="w-full h-full min-h-screen p-4 md:p-8 bg-brand-gray-400">
      <Head>
        <title>Car-Go - Dodaj oferte</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TopMenu />
        <form
          className="px-4 md:flex md:items-center md:justify-center"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="flex flex-col p-5 md:p-6 bg-brand-gray-300 rounded-2xl">
            <h1 className="mb-2 text-base font-semibold md:mb-4 md:text-2xl text-brand-gray-100">
              Dodaj ogłoszenie
            </h1>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold md:text-xl text-brand-gray-100">
                Informacje dotyczące pojazdu
              </p>
              <div className="flex flex-col gap-3 md:gap-6 lg:flex-row">
                <Input
                  dark
                  placeholder="Marka"
                  value={offerData.make}
                  onChange={(e) =>
                    setOfferData((prev) => ({
                      ...prev,
                      make: e.target.value,
                    }))
                  }
                  required
                />
                <Input
                  dark
                  placeholder="Model"
                  value={offerData.model}
                  onChange={(e) =>
                    setOfferData((prev) => ({
                      ...prev,
                      model: e.target.value,
                    }))
                  }
                  required
                />
                <Input
                  dark
                  type="number"
                  placeholder="Moc silnika"
                  value={offerData.horsepower}
                  onChange={(e) =>
                    setOfferData((prev) => ({
                      ...prev,
                      horsepower: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-3 md:gap-6 lg:flex-row">
                <Input
                  dark
                  type="number"
                  placeholder="Rok produkcji"
                  value={offerData.year}
                  onChange={(e) =>
                    setOfferData((prev) => ({
                      ...prev,
                      year: e.target.value,
                    }))
                  }
                  required
                />
                <Input
                  dark
                  type="number"
                  placeholder="Liczba miejsc"
                  value={offerData.seats_amount}
                  onChange={(e) =>
                    setOfferData((prev) => ({
                      ...prev,
                      seats_amount: e.target.value,
                    }))
                  }
                  required
                />
                <Select
                  required
                  className="lg:w-[249px] w-full"
                  value={offerData?.fuel_type}
                  onChange={(e) =>
                    setOfferData((prev) => ({
                      ...prev,
                      fuel_type: e.target.value as FuelType,
                    }))
                  }
                >
                  {fuels.map((fuel) => (
                    <option value={fuel}>{fuel}</option>
                  ))}
                </Select>
              </div>
              <div className="flex max-w-4xl gap-4">
                <div>
                  <div className="text-sm font-semibold md:text-xl text-brand-gray-100">
                    Wyposażenie
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 md:gap-4">
                    {features.map(({ name, value }) => (
                      <div
                        onClick={() => handleFeatures(value)}
                        className={classNames(
                          'border p-4 rounded-xl cursor-pointer text-sm md:text-base',
                          {
                            'text-brand-gray-100 font-medium border-brand-red':
                              offerData.features?.includes(value),
                            'text-brand-gray-200 font-medium':
                              !offerData.features?.includes(value),
                          }
                        )}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="mt-2 mb-4 text-sm font-semibold md:text-xl text-brand-gray-100">
                Zdjęcia pojazdu
              </p>
              <input
                required
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileInput}
                className="w-full mb-2"
              />
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold md:text-xl text-brand-gray-100">
                Informacje dotyczące wynajmu
              </p>
              <div className="flex flex-col gap-3 md:gap-6 lg:flex-row">
                <Input
                  dark
                  placeholder="Lokalizacja"
                  value={offerData.city}
                  onChange={(e) =>
                    setOfferData((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  required
                />
                <Input
                  required
                  dark
                  placeholder="Cena za dobę"
                  type="number"
                  value={offerData.price_per_day}
                  onChange={(e) =>
                    setOfferData((prev) => ({
                      ...prev,
                      price_per_day: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex justify-center mt-4 md:mt-6">
              <Button
                disabled={loading}
                type="submit"
                className="px-4 w-full md:w-[400px]"
              >
                {loading ? <Spinner /> : 'Dodaj ogłoszenie'}
              </Button>
            </div>
          </div>
        </form>
        <div className="text-red-600">{error}</div>
      </main>
    </div>
  )
}

export default CreateOffer
