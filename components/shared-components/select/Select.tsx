import React, { ComponentPropsWithoutRef, FC } from 'react'

interface SelectProps extends ComponentPropsWithoutRef<'select'> {}

const Select: FC<SelectProps> = ({ children, ...props }) => {
  return (
    <select
      {...props}
      className="block px-6 font-medium placeholder-gray-400 outline-none rounded-2xl h-14 bg-brand-gray-400 text-brand-gray-200 focus:ring-blue-500 focus:border-blue-500"
    >
      {children}
    </select>
  )
}

export default Select
