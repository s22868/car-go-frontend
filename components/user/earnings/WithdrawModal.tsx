import { Button, Input, Spinner } from '@components/shared-components'
import { DefaultService } from '@openapi'
import { UseUser } from 'hooks/useUser'
import React, { FC, FormEvent, useState } from 'react'

interface WithdrawModalProps {
  onClose: () => Promise<void>
}

const WithdrawModal: FC<WithdrawModalProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false)
  const { user } = UseUser()
  const [error, setError] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const token = localStorage.getItem('cargo_token')
    const authorization = 'Bearer ' + token
    if (!user?.balance) {
      setLoading(false)
      return setError('Nie masz wystarczających środków na koncie')
    }
    if (Number(amount) > user?.balance) {
      setLoading(false)
      return setError('Nie masz wystarczających środków na koncie')
    }
    try {
      await DefaultService.addBalance(Number(-amount), authorization)
      setLoading(false)
      await onClose()
    } catch (err) {
      console.log(err)
      setLoading(false)
      setError('Coś poszło nie tak, spróbuj ponownie')
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
      <div className="text-brand-gray-100">
        Saldo: {user?.balance || 0} PLN
      </div>
      <Input
        dark
        placeholder="Kwota do wypłaty"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      {error && <div className="text-brand-red">{error}</div>}
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
          {loading ? <Spinner /> : 'Wypłać'}
        </Button>
      </div>
    </form>
  )
}

export default WithdrawModal
