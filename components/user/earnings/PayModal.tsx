import { Button, Input, Spinner } from '@components/shared-components'
import Card from '@components/shared-components/card/Card'
import { DefaultService } from '@openapi'
import React, { FC, FormEvent, useState } from 'react'

interface PayModalProps {
  onClose: () => Promise<void>
}

const PayModal: FC<PayModalProps> = ({ onClose }) => {
  const [number, setNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  const [amount, setAmount] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const token = localStorage.getItem('cargo_token')
    const authorization = 'Bearer ' + token
    try {
      await DefaultService.addBalance(Number(amount), authorization)
      setLoading(false)
      await onClose()
    } catch {
      setLoading(false)
      setError('Coś poszło nie tak, spróbuj ponownie')
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
      <Card
        number={number}
        firstName={firstName}
        lastName={lastName}
        month={month}
        year={year}
      />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Input
            dark
            placeholder="Imię"
            className="w-[165px] md:w-[185px]"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            dark
            placeholder="Nazwisko"
            className="w-[165px] md:w-[185px]"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            dark
            className="w-full"
            placeholder="Numer karty"
            minLength={16}
            maxLength={16}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between gap-2">
          <Input
            dark
            placeholder="Miesiac"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-[110px] md:w-[120px]"
            required
            minLength={1}
            maxLength={2}
          />
          <Input
            dark
            placeholder="Rok"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-[110px] md:w-[120px]"
            required
            minLength={4}
            maxLength={4}
          />
          <Input dark placeholder="CVC" className="w-[110px] md:w-[120px]" minLength={3} maxLength={3} />
        </div>
        <div>
          <Input
            placeholder="Kwota"
            className="w-full"
            type="number"
            dark
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min={1}
          />
        </div>
        {error && <div>{error}</div>}
      </div>
      <div className="flex justify-between gap-4">
        <Button
          type="button"
          onClick={onClose}
          variant="secondary"
          className="w-1/2"
          disabled={loading}
        >
          Anuluj
        </Button>
        <Button disabled={loading} type="submit" className="w-1/2">
          {loading ? <Spinner /> : 'Wpłać'}
        </Button>
      </div>
    </form>
  )
}

export default PayModal
