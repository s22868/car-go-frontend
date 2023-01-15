import Select from '@components/shared-components/select/Select'
import { CarOfferReq, DefaultService, Feature, FuelType } from '@openapi'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Spinner, Input, Button } from '@components/shared-components'

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
const features: Feature[] = [
  Feature.AC,
  Feature.AUX,
  Feature.BLUETOOTH,
  Feature.FOUR_BY_FOUR,
  Feature.GPS,
  Feature.HEATED_SEATS,
  Feature.PANORAMA_ROOF,
  Feature.USB,
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
    features: [Feature.AC],
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
    const test = Object.entries(offerData)
      .map(([keys, value]) => {
        if (!value) {
          return false
        }
        return true
      })
      .filter((val) => !val)

    if (!selectedFile) {
      setError('Nie dodano zdjęcia :(')
      setLoading(false)
      return
    }
    if (test.length > 0) {
      setError('Nie podano wszystkich danych :(')
      setLoading(false)
      return
    }

    if (!offerData) {
      setError('Błąd przy dodawaniu ogłoszenia :(')
      setLoading(false)
      return
    }
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

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0])
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-brand-gray-400">
      <Head>
        <title>Car-Go - Dodaj oferte</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center flex-1 w-full gap-4 px-20">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-col gap-6 p-6 bg-brand-gray-300 rounded-2xl">
            <h1 className="mb-4 text-2xl font-semibold text-brand-gray-100">
              Dodaj ogłoszenie
            </h1>
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold text-brand-gray-100">
                Informacje dotyczące pojazdu
              </p>
              <div className="flex gap-6">
                <Input dark placeholder="Marka" value={offerData.make} />
                <Input dark placeholder="Model" value={offerData.model} />
                <Input
                  dark
                  placeholder="Moc silnika"
                  value={offerData.horsepower}
                />
              </div>
              <div className="flex gap-6">
                <Input
                  dark
                  placeholder="Rok produkcji"
                  value={offerData.year}
                />
                <Input
                  dark
                  placeholder="Liczba miejsc"
                  value={offerData.seats_amount}
                />
              </div>
              <div className="flex gap-4">
                <div>
                  <div className="text-brand-red">Fuel</div>
                  <Select
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
                <div>
                  {/* TODO: multichoices */}
                  <div className="text-brand-red">Feature</div>
                  <Select
                    value={offerData?.features}
                    onChange={(e) =>
                      setOfferData((prev) => ({
                        ...prev,
                        features: [e.target.value as Feature],
                      }))
                    }
                  >
                    {features.map((feature) => (
                      <option value={feature}>{feature}</option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-4 text-xl font-semibold text-brand-gray-100">
                Zdjęcia pojazdu
              </p>
              <input
                required
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileInput}
              />
            </div>
            <div>
              <p className="mb-4 text-xl font-semibold text-brand-gray-100">
                Informacje dotyczące wynajmu
              </p>
              <div className="flex gap-6">
                <Input dark placeholder="Lokalizacja" value={offerData.city} />
                <Input
                  dark
                  placeholder="Cena za dobę"
                  type="number"
                  value={offerData.price_per_day}
                />
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Button
                disabled={loading}
                type="submit"
                className="px-4 w-[400px]"
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
