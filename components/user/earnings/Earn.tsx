import React, { FC } from 'react'

interface EarnProps {
  dateFrom: string
  dateTo: string
  price: number
  make: string
  model: string
}

const Earn: FC<EarnProps> = ({ dateFrom, dateTo, price, make, model }) => {
  return (
    <div className="flex items-center justify-between p-6 bg-brand-gray-400 rounded-2xl">
      <div className='flex items-center gap-4'>
        <div>
          <div className='font-medium text-brand-gray-200'>{make}</div>
          <div className='text-xl font-semibold text-brand-gray-100'>{model}</div>
        </div>
        <div className='font-medium text-brand-gray-100'>
          {dateFrom} - {dateTo}
        </div>
      </div>
      <div className='text-lg font-medium text-brand-gray-100'>+{price} PLN</div>
    </div>
  )
}

export default Earn
