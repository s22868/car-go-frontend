import Button from '@components/shared-components/button/Button'
import Input from '@components/shared-components/input/Input'
import Select from '@components/shared-components/select/Select'
import { CarOfferReq, DefaultService, Feature, FuelType } from '@openapi'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

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
    price_per_day: 0,
  })
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
    const test = Object.entries(offerData)
      .map(([keys, value]) => {
        if (!value) {
          return false
        }
        return true
      })
      .filter((val) => !val)

    if(!selectedFile){
        setError("Nie dodano zdjęcia :(")
        return
    }
    if (test.length > 0) {
      setError('Nie podano wszystkich danych :(')
      return
    }

    if (!offerData) {
      setError('Błąd przy dodawaniu ogłoszenia :(')
      return
    }
    try {
      const token = "Bearer " + localStorage.getItem('cargo_token')!
      const res = await DefaultService.postOffersAdd(token, {
        ...(offerData as CarOfferReq),
      })

      await DefaultService.postOfferOfferId(res.id, token, {
        image: selectedFile!,
      })
    } catch {
      setError('Błąd przy dodawaniu ogłoszenia :(')
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
      <main className="flex flex-col items-center justify-center flex-1 w-full gap-4 px-20 text-center">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <input type="file" onChange={handleFileInput} />
            {Object.entries(offerFields).map(([keys, values], index) => (
              <div>
                <div className="text-brand-red">{keys}</div>
                <Input
                  value={(offerData[keys as keyof CarOfferReq] as keyof CarOfferReq) || ''}
                  onChange={(e) =>
                    setOfferData((prev) => {
                      return {
                        ...prev,
                        [keys]:
                          keys === 'price_per_day'
                            ? Number(e.target.value)
                            : e.target.value,
                      }
                    })
                  }
                  type={keys === 'price_per_day' ? 'number' : 'text'}
                  placeholder={values.toString()}
                />
              </div>
            ))}
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
          <div className="flex justify-center mt-6">
            <Button type="submit" className="px-4">
              Dodaj ogłoszenie
            </Button>
          </div>
        </form>
        <div className="text-red-600">{error}</div>
      </main>
    </div>
  )
}

export default CreateOffer
