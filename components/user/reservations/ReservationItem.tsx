import { DefaultService, UserInfo } from '@openapi'
import convertToTextMonth from 'helpers/convertToTextMonth'
import daysBetween from 'helpers/daysBetween'
import React, { FC, useEffect, useState } from 'react'

interface ReservationProps {
  ownerId: string
  price: number
  make: string
  model: string
  dateFrom: string
  dateTo: string
}

const ReservationItem: FC<ReservationProps> = ({
  ownerId,
  price,
  make,
  model,
  dateFrom,
  dateTo,
}) => {
  const [owner, setOwner] = useState<UserInfo>()

  useEffect(() => {
    const token = localStorage.getItem('cargo_token')
    if (!token) {
      return
    }
    const authorization = 'Bearer ' + token
    DefaultService.getUserById(ownerId, authorization).then((res) =>
      setOwner(res)
    )
  }, [ownerId])

  const days = daysBetween(new Date(dateTo), new Date(dateFrom))

  return (
    <a
      href={'tel:+48' + owner?.phone}
      className="flex items-center justify-between p-4 md:p-6 bg-brand-gray-400 rounded-2xl"
    >
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
          na {days} {days === 1 ? 'dzień' : 'dni'},{' '}
          {new Date(dateFrom).getDate()}-
          {`${new Date(dateTo).getDate()} ${convertToTextMonth(
            new Date(dateTo).getMonth()
          )}`}{' '}
          <div className="flex gap-1 text-xs">
            Telefon do właściciela{' '}
            <p className="underline">
              {owner?.phone}
            </p>
          </div>
        </div>
      </div>
      <div className="text-sm font-medium md:text-lg text-brand-gray-100">
        -{price} PLN
      </div>
    </a>
  )
}

export default ReservationItem
