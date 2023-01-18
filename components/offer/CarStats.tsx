import { CarOfferRes } from '@openapi'
import React, { FC } from 'react'
import { features } from '../../pages/create-offer'

interface CarStatsProps {
  carOffer: CarOfferRes
}

const CarStats: FC<CarStatsProps> = ({ carOffer }) => {
  if (!carOffer) {
    return null
  }
  return (
    <div className="p-6 space-y-4 bg-brand-gray-400 rounded-xl">
      <div className="flex">
        <span className="text-base font-medium text-brand-gray-200">
          Rodzaj paliwa
        </span>
        <span className="ml-auto text-base font-medium text-brand-gray-200">
          {carOffer.fuel_type}
        </span>
      </div>
      <div className="flex">
        <span className="text-base font-medium text-brand-gray-200">
          Liczba miejsc
        </span>
        <span className="ml-auto text-base font-medium text-brand-gray-200">
          {carOffer.seats_amount}
        </span>
      </div>
      <div className="flex">
        <span className="text-base font-medium text-brand-gray-200">
          Rok produkcji
        </span>
        <span className="ml-auto text-base font-medium text-brand-gray-200">
          {carOffer.year}
        </span>
      </div>
      <div className="flex">
        <span className="text-base font-medium text-brand-gray-200">
          Moc silnika
        </span>
        <span className="ml-auto text-base font-medium text-brand-gray-200">
          {carOffer.horsepower}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-base font-medium text-brand-gray-200">
          Dodatki
        </span>
        <div className="flex flex-wrap gap-4 mt-2">
          {carOffer.features.map((val) => (
            <div className="p-4 font-medium border cursor-pointer rounded-xl text-brand-gray-100 border-brand-red">
              {features.find(({ value }) => value === val)!.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CarStats
