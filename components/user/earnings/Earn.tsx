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
          <p className='text-xs font-medium text-brand-gray-200 md:text-base first-letter:uppercase'>{make}</p>
          <p className='text-base font-semibold md:text-xl text-brand-gray-100 first-letter:uppercase'>{model}</p>
        </div>
        <div className='hidden font-medium text-brand-gray-100 md:block'>
          {dateFrom} - {dateTo}
        </div>
      </div>
      <div className='text-sm font-medium md:text-lg text-brand-gray-100'>+{price} PLN</div>
    </div>
  )
}

export default Earn
