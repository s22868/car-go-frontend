import { UseUser } from 'hooks/useUser'
import Link from 'next/link'
import React, { FC } from 'react'

const TopMenu: FC = () => {
  const { logout, user } = UseUser()

  const handleLogout = () => {
    logout?.()
  }
  return (
    <div className="flex items-center justify-between mb-8">
      <p className="text-3xl font-semibold cursor-default text-brand-gray-100">
        cargo.<span className="text-brand-red">co</span>
      </p>
      {user ? (
        <div className="flex flex-col items-end">
          <Link href={'/user-settings'}>
            <p className="hidden text-xs sm:block text-brand-gray-200">
              {user.email}
            </p>
          </Link>
          <button
            onClick={handleLogout}
            className="text-brand-red hover:underline"
          >
            Wyloguj
          </button>
        </div>
      ) : (
        <Link href="/login" className="text-brand-red hover:underline">
          Zaloguj
        </Link>
      )}
    </div>
  )
}

export default TopMenu
