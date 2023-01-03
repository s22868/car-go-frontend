import React, { ComponentPropsWithoutRef, FC, PropsWithChildren } from 'react'
import classNames from 'classnames'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary'
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  variant = 'primary',
  ...props
}) => {
  return (
    <button
      className={classNames('rounded-2xl font-semibold text-center h-14 ' + className, {
        'bg-brand-red text-white': variant === 'primary',
        'bg-transparent border border-brand-red text-brand-red':
          variant === 'secondary',
      })}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
