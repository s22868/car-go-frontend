import classNames from 'classnames'
import React, { FC, PropsWithChildren, useEffect, useState } from 'react'

interface FieldProps extends PropsWithChildren<unknown> {
  title: string
  value: string
  toggleActive: boolean
  noEdit?: boolean
}

const Field: FC<FieldProps> = ({
  title,
  value,
  toggleActive,
  noEdit,
  children,
}) => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(false)
  }, [toggleActive])
  return (
    <div
      className={classNames(
        'w-full p-6 rounded-2xl bg-brand-gray-400 h-[103px] transition-all overflow-hidden space-y-7',
        {
          'min-h-[260px]': active,
          'min-h-[103px]': !active,
        }
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-brand-gray-200">{title}</div>
          <div className="text-xl font-semibold text-brand-gray-100">
            {value}
          </div>
        </div>
        {noEdit ? null : (
          <button
            type="button"
            onClick={() => setActive((prev) => !prev)}
            className="font-medium underline cursor-pointer text-brand-gray-100"
          >
            {active ? 'Anuluj' : 'Edytuj'}
          </button>
        )}
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Field
