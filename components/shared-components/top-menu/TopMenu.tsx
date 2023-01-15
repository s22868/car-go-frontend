import Logo from '@components/shared-components/icons/Logo'
import { UseUser } from 'hooks/useUser'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const TopMenu: FC = () => {
  const router = useRouter()
  const { user } = UseUser()
  return (
    <div className="flex items-center justify-between mb-8">
      <p className="cursor-pointer" onClick={() => router.push('/')}>
        <Logo />
      </p>
      {user ? (
        <div className="flex flex-col items-end">
          <Link href={'/user-settings'}>
            <p className="hidden text-sm sm:block text-brand-gray-200">
              {user.email}
            </p>
          </Link>
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
