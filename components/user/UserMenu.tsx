import classNames from 'classnames'
import { UseUser } from 'hooks/useUser'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const UserMenu: FC = () => {
  const router = useRouter()
  const { logout } = UseUser()

  const handleLogout = () => {
    logout?.()
  }
  return (
    <ul className="flex flex-col gap-2">
      <Link href="/user-settings">
        <li
          className={classNames(
            'flex items-center h-12 px-4 text-base font-semibold text-white transition-colors duration-300 cursor-pointer rounded-xl hover:bg-brand-red',
            {
              'bg-brand-red': router.pathname === '/user-settings',
            }
          )}
        >
          Ustawienia profilu
        </li>
      </Link>
      <Link href="/my-offers">
        <li
          className={classNames(
            'flex items-center h-12 px-4 text-base font-semibold text-white transition-colors duration-300 cursor-pointer rounded-xl hover:bg-brand-red',
            {
              'bg-brand-red': router.pathname === '/my-offers',
            }
          )}
        >
          Moje ogłoszenia
        </li>
      </Link>
      <Link href="/my-reservations">
        <li
          className={classNames(
            'flex items-center h-12 px-4 text-base font-semibold text-white transition-colors duration-300 cursor-pointer rounded-xl hover:bg-brand-red',
            {
              'bg-brand-red': router.pathname === '/my-reservations',
            }
          )}
        >
          Moje rezerwacje
        </li>
      </Link>
      <Link href="/earnings">
        <li
          className={classNames(
            'flex items-center h-12 px-4 text-base font-semibold text-white transition-colors duration-300 cursor-pointer rounded-xl hover:bg-brand-red',
            {
              'bg-brand-red': router.pathname === '/earnings',
            }
          )}
        >
          Zarobki
        </li>
      </Link>
      <li
        onClick={handleLogout}
        className="flex items-center h-12 px-4 text-base font-semibold transition-colors duration-200 cursor-pointer text-brand-red rounded-xl hover:bg-brand-red hover:text-white"
      >
        Wyloguj
      </li>
    </ul>
  )
}

export default UserMenu
