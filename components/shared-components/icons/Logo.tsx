import React, { FC } from 'react'

const Logo: FC = () => {
  return (
    <div className="flex items-center">
      <div className="text-[40px] font-bold italic text-brand-gray-100">
        CAR
      </div>
      <div className="text-[22px] font-bold text-brand-red mt-3.5">GO</div>
    </div>
  )
}

export default Logo
