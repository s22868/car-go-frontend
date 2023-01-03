import React, { ComponentPropsWithoutRef, FC } from 'react'
import classNames from 'classnames'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  error?: boolean
}

const Input: FC<InputProps> = ({ error, className, ...props }) => {
  return (
    <input
      className={classNames(
        'text-brand-gray-200 font-medium bg-brand-gray-300 rounded-2xl px-6 h-14 outline-none ' +
          className,
        {
          'border border-red-600': error,
        }
      )}
      {...props}
    />
  )
}

export default Input
