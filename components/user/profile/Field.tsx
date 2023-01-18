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
        'w-full md:p-6 p-4 rounded-2xl bg-brand-gray-400 md:h-[103px] h-[81px] transition-all overflow-hidden space-y-7',
        {
          'md:min-h-[260px] min-h-[240px]': active,
          'md:min-h-[103px] min-h-[81px]': !active,
        }
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-medium md:text-base text-brand-gray-200">{title}</div>
          <div className="text-sm font-semibold md:text-xl text-brand-gray-100">
            {value}
          </div>
        </div>
        {noEdit ? null : (
          <button
            type="button"
            onClick={() => setActive((prev) => !prev)}
            className="text-sm font-medium underline cursor-pointer md:text-base text-brand-gray-100"
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
