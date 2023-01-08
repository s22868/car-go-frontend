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
    <div className="bg-brand-gray-300 rounded-2xl p-3.5 flex gap-4 cursor-pointer hover:opacity-90">
      <div className="relative h-24 overflow-hidden w-44 rounded-xl">
        <NextImage
          src={imgSrc}
          alt={`${make} ${model}`}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="flex justify-between w-full">
        <div className="self-end">
          <p className="text-xl font-medium text-brand-gray-200 first-letter:uppercase">
            {make}
          </p>
          <p className="text-2xl font-semibold text-brand-gray-100 first-letter:uppercase">
            {model}
          </p>
        </div>
        <div className="self-end text-2xl font-semibold text-brand-gray-100">
          {pricePerDay} PLN/
          <span className="text-xl font-medium text-brand-gray-200">dzień</span>
        </div>
      </div>
    </div>
  )
}

export default ListItem
