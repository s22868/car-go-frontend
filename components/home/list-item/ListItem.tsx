import React, { FC } from 'react'
import NextImage from 'next/image'

interface ListItemProps {
  imgSrc: string
  make: string
  model: string
  pricePerDay: number
}

const ListItem: FC<ListItemProps> = ({ imgSrc, make, model, pricePerDay }) => {
  return (
    <div className="bg-brand-gray-300 rounded-2xl p-2 md:p-3.5 flex md:gap-4 gap-2 cursor-pointer hover:opacity-90">
      <div className="relative h-20 overflow-hidden w-36 md:h-24 md:w-44 rounded-xl">
        <NextImage
          src={imgSrc}
          alt={`${make} ${model}`}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="flex justify-between w-full md:w-full">
        <div className="self-end">
          <p className="text-base font-medium md:text-xl text-brand-gray-200 first-letter:uppercase">
            {make}
          </p>
          <p className="text-lg font-semibold md:text-2xl text-brand-gray-100 first-letter:uppercase">
            {model}
          </p>
        </div>
        <div className="self-end text-lg font-semibold md:text-2xl text-brand-gray-100">
          {pricePerDay} PLN/
          <span className="text-sm font-medium md:text-xl text-brand-gray-200">
            dzień
          </span>
        </div>
      </div>
    </div>
  )
}

export default ListItem
