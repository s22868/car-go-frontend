import type { NextPage } from 'next'
import Head from 'next/head'
import { UseUser } from 'hooks/useUser'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Input, Button, TopMenu } from '@components/shared-components'
import UserMenu from '@components/user/UserMenu'
import Field from '@components/user/profile/Field'
import { DefaultService } from '@openapi'

const UserSettings: NextPage = () => {
  const router = useRouter()
  const { user, getUser } = UseUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  const handleSubmit = async (
    e: FormEvent,
    type: 'Name' | 'Phone' | 'License' | 'Birthday'
  ) => {
    e.preventDefault()
    toggleActive()
    setLoading(true)
    const token = localStorage.getItem('cargo_token')
    const authorization = 'Bearer ' + token

    try {
      switch (type) {
        case 'Name':
          await handleNameSubmit(authorization)
          break
        case 'Phone':
          await handlePhoneSubmit(authorization)
          break
        case 'License':
          await handleLicenseSubmit(authorization)
          break
        case 'Birthday':
          await handleBirthdaySubmit(authorization)
          break
      }
      await getUser?.()
      setLoading(false)
    } catch {
      setError('Coś poszło nie tak, spróbuj ponownie później')
    }
  }
  const handleNameSubmit = async (authorization: string) => {
    await DefaultService.postUserProfile(authorization, {
      first_name: firstName,
      last_name: lastName,
    })
    setFirstName('')
    setLastName('')
  }
  const handlePhoneSubmit = async (authorization: string) => {
    await DefaultService.postUserProfile(authorization, { phone })
    setPhone('')
  }
  const handleLicenseSubmit = async (authorization: string) => {
    await DefaultService.postUserProfile(authorization, {
      driving_licence: license,
    })

    setLicense('')
  }
  const handleBirthdaySubmit = async (authorization: string) => {
    await DefaultService.postUserProfile(authorization, { dob: birthday })
    setBirthday('')
  }

  return (
    <div className="w-full h-full min-h-screen p-4 md:p-8 bg-brand-gray-400">
      <Head>
        <title>Car-Go - Ustawienia profilu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TopMenu />
        <div className="flex flex-col gap-8 px-4 xl:flex-row md:px-8 lg:px-36">
          <div className="pt-4 ">
            <UserMenu />
          </div>
          <div className="w-full p-6 md:p-8 xl:w-7/12 bg-brand-gray-300 rounded-2xl">
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-base font-semibold md:text-2xl text-brand-gray-100">
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
                  <div className="flex gap-2 md:gap-4">
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      tabIndex={-1}
                      placeholder="Imie"
                      className="md:w-[200px] w-[140px]"
                      required
                    />
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      tabIndex={-1}
                      placeholder="Nazwisko"
                      className="md:w-[200px] w-[140px]"
                      required
                    />
                  </div>
                  {error && <div className="text-brand-red">{error}</div>}
                  <div>
                    <Button
                      disabled={loading}
                      tabIndex={-1}
                      type="submit"
                      className="w-7/12 md:w-1/3"
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
              <Field
                toggleActive={toggle}
                value={user?.phone || 'Brak telefonu'}
                title="Telefon"
              >
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
                      minLength={9}
                      maxLength={9}
                      required
                      placeholder="Telefon"
                      className="md:w-[200px] w-[180px]"
                    />
                  </div>
                  {error && <div className="text-brand-red">{error}</div>}
                  <div>
                    <Button
                      disabled={loading}
                      tabIndex={-1}
                      type="submit"
                      className="w-7/12 md:w-1/3"
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
                      className="md:w-[200px] w-[180px]"
                      required
                    />
                  </div>
                  {error && <div className="text-brand-red">{error}</div>}
                  <div>
                    <Button
                      disabled={loading}
                      tabIndex={-1}
                      type="submit"
                      className="w-7/12 md:w-1/3"
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
                      className="md:w-[200px] w-[180px]"
                      required
                    />
                  </div>
                  {error && <div className="text-brand-red">{error}</div>}
                  <div>
                    <Button
                      disabled={loading}
                      tabIndex={-1}
                      type="submit"
                      className="w-7/12 md:w-1/3"
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
