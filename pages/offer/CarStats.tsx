import { CarOfferRes } from '@openapi'
import React, { FC } from 'react'

interface CarStatsProps {
  carOffer: CarOfferRes
}

const CarStats: FC<CarStatsProps> = ({ carOffer }) => {
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
    </div>
  )
}

export default CarStats
