import type { NextPage } from 'next'
import Head from 'next/head'
import { UseUser } from 'hooks/useUser'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Input, Button, TopMenu } from '@components/shared-components'
import UserMenu from '@components/user/UserMenu'
import Field from '@components/user/profile/Field'

const UserSettings: NextPage = () => {
  const router = useRouter()
  const { user } = UseUser()
  const [loading, setLoading] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [phone, setPhone] = useState('')

  const [license, setLicense] = useState('')

  const [birthday, setBirthday] = useState('')

  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cargo_token')) {
      router.push('/login')
    }
  })

  if (!user) {
    return null
  }
  const toggleActive = () => setToggle((prev) => !prev)

  const handleSubmit = (
    e: FormEvent,
    type: 'Name' | 'Phone' | 'License' | 'Birthday'
  ) => {
    e.preventDefault()
    toggleActive()
    setLoading(true)
    switch (type) {
      case 'Name':
        handleNameSubmit()
        setLoading(false)
        break
      case 'Phone':
        handlePhoneSubmit()
        setLoading(false)
        break
      case 'License':
        handleLicenseSubmit()
        setLoading(false)
        break
      case 'Birthday':
        handleBirthdaySubmit()
        setLoading(false)
        break
    }
  }
  const handleNameSubmit = () => {
    setFirstName('')
    setLastName('')
  }
  const handlePhoneSubmit = () => {
    setPhone('')
  }
  const handleLicenseSubmit = () => {
    setLicense('')
  }
  const handleBirthdaySubmit = () => {
    setBirthday('')
  }

  return (
    <div className="w-full h-full min-h-screen p-8 bg-brand-gray-400">
      <Head>
        <title>Car-Go - Ustawienia profilu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TopMenu />
        <div className="flex flex-col gap-8 px-4 md:flex-row md:px-8 lg:px-36">
          <div className="pt-4 ">
            <UserMenu />
          </div>
          <div className="w-full p-8 lg:w-2/4 bg-brand-gray-300 rounded-2xl">
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-2xl font-semibold text-brand-gray-100">
                Dane osobowe
              </h1>
            </div>
            <div className="space-y-2.5 md:space-y-6">
              <Field
                toggleActive={toggle}
                value={`${user?.first_name || 'Imie'} ${
                  user?.last_name || 'Nazwisko'
                }`}
                title="Imie i nazwisko"
              >
                <form
                  onSubmit={(e) => handleSubmit(e, 'Name')}
                  className="flex flex-col gap-6"
                >
                  <div className="flex gap-4">
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      tabIndex={-1}
                      placeholder="Imie"
                    />
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      tabIndex={-1}
                      placeholder="Nazwisko"
                    />
                  </div>
                  <div>
                    <Button
                      disabled={loading}
                      tabIndex={-1}
                      type="submit"
                      className="w-1/3"
                    >
                      Zapisz
                    </Button>
                  </div>
                </form>
              </Field>
              <Field
                noEdit
                toggleActive={toggle}
                value={user.email}
                title="Adres e-mail"
              />
              <Field toggleActive={toggle} value={user?.phone || "Brak telefonu"} title="Telefon">
                <form
                  onSubmit={(e) => handleSubmit(e, 'Phone')}
                  className="flex flex-col gap-6"
                >
                  <div className="flex gap-4">
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      tabIndex={-1}
                      placeholder="Telefon"
                    />
                  </div>
                  <div>
                    <Button
                      disabled={loading}
                      tabIndex={-1}
                      type="submit"
                      className="w-1/3"
                    >
                      Zapisz
                    </Button>
                  </div>
                </form>
              </Field>
              <Field
                toggleActive={toggle}
                value={user?.driving_licence || 'Brak dodanego prawa jazdy'}
                title="Prawo jazdy"
              >
                <form
                  onSubmit={(e) => handleSubmit(e, 'License')}
                  className="flex flex-col gap-6"
                >
                  <div className="flex gap-4">
                    <Input
                      value={license}
                      onChange={(e) => setLicense(e.target.value)}
                      tabIndex={-1}
                      placeholder="Prawo jazdy"
                    />
                  </div>
                  <div>
                    <Button
                      disabled={loading}
                      tabIndex={-1}
                      type="submit"
                      className="w-1/3"
                    >
                      Zapisz
                    </Button>
                  </div>
                </form>
              </Field>
              <Field
                toggleActive={toggle}
                value={user?.dob || 'Brak daty urodzenia'}
                title="Data urodzenia"
              >
                <form
                  onSubmit={(e) => handleSubmit(e, 'Birthday')}
                  className="flex flex-col gap-6"
                >
                  <div className="flex gap-4">
                    <Input
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      max="2005-01-01"
                      type="date"
                      tabIndex={-1}
                      placeholder="Imie"
                    />
                  </div>
                  <div>
                    <Button
                      disabled={loading}
                      tabIndex={-1}
                      type="submit"
                      className="w-1/3"
                    >
                      Zapisz
                    </Button>
                  </div>
                </form>
              </Field>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserSettings
