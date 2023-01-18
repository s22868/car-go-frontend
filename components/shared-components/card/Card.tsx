import CardChip from '@components/shared-components/icons/CardChip'
import Logo from '@components/shared-components/icons/Logo'
import React, { FC } from 'react'

interface CardProps {
  number?: string
  firstName?: string
  lastName?: string
  month?: string
  year?: string
}

const Card: FC<CardProps> = ({ number, firstName, lastName, month, year }) => {
  return (
    <div className="bg-brand-gray-400 rounded-2xl md:p-7 p-5 md:w-[380px] cursor-default">
      <div className="flex items-center justify-between">
        <div>
          <Logo />
        </div>
        <div>
          <CardChip />
        </div>
      </div>
      <div className="flex justify-between">
        {number ? (
          number
            .match(/.{1,4}/g)
            ?.map((num) => (
              <span className="text-[22px] text-brand-gray-100">{num}</span>
            ))
        ) : (
          <>
            <span className="text-[22px] text-brand-gray-100">0000</span>
            <span className="text-[22px] text-brand-gray-100">0000</span>
            <span className="text-[22px] text-brand-gray-100">0000</span>
            <span className="text-[22px] text-brand-gray-100">0000</span>
          </>
        )}
      </div>
      <div className="mt-4 mb-1 text-base font-medium text-brand-gray-100">
        {firstName || lastName ? `${firstName} ${lastName}` : 'Imie i nazwisko'}
      </div>
      <div className="text-brand-gray-200">
        {month || year ? `${month}/${year}` : 'Miesiąc/Rok'}
      </div>
    </div>
  )
}

export default Card
