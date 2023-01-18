import React, { FC } from 'react'

interface EarnProps {
  dateFrom: string
  dateTo: string
  price: number
  make: string
  model: string
}

const Earn: FC<EarnProps> = ({ dateFrom, dateTo, price, make, model }) => {
  const convertToTextMonth = (month: number) => {
    console.log(month)
    switch (month) {
      case 0: {
        return 'Styczeń'
      }
      case 1: {
        return 'Luty'
      }
      case 2: {
        return 'Marzec'
      }
      case 3: {
        return 'Kwiecień'
      }
      case 4: {
        return 'Maj'
      }
      case 5: {
        return 'Czerwiec'
      }
      case 6: {
        return 'Lipiec'
      }
      case 7: {
        return 'Sierpień'
      }
      case 8: {
        return 'Wrzesień'
      }
      case 9: {
        return 'Październik'
      }
      case 10: {
        return 'Listopad'
      }
      case 11: {
        return 'Grudzień'
      }
      default: {
        return 'Styczeń'
      }
    }
  }
  console.log(new Date(dateTo))
  return (
    <div className="flex items-center justify-between p-4 md:p-6 bg-brand-gray-400 rounded-2xl">
      <div className="flex items-center gap-4">
        <div className="md:w-[100px]">
          <p className="text-xs font-medium text-brand-gray-200 md:text-base first-letter:uppercase">
            {make}
          </p>
          <p className="text-base font-semibold md:text-xl text-brand-gray-100 first-letter:uppercase">
            {model}
          </p>
        </div>
        <div className="hidden font-medium text-brand-gray-100 md:block">
          {new Date(dateFrom).getDate()} -{' '}
          {`${new Date(dateTo).getDate()} ${convertToTextMonth(
            new Date(dateTo).getMonth()
          )}`}
        </div>
      </div>
      <div className="text-sm font-medium md:text-lg text-brand-gray-100">
        +{price} PLN
      </div>
    </div>
  )
}

export default Earn
