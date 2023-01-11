import React, { ComponentPropsWithoutRef, FC } from 'react'
import classNames from 'classnames'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  error?: boolean
  dark?: boolean
}

const Input: FC<InputProps> = ({ error, className, dark, ...props }) => {
  return (
    <input
      className={classNames(
        'text-brand-gray-200 font-medium rounded-2xl px-6 h-14 outline-none ' +
          className,
        {
          'border border-red-600': error,
          'bg-brand-gray-400': dark,
          'bg-brand-gray-300': !dark,
        }
      )}
      {...props}
    />
  )
}

export default Input
