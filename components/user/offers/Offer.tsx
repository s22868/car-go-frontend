import React, { FC, useState } from 'react'
import NextImage from 'next/image'
import { DefaultService } from '@openapi'
import { useRouter } from 'next/router'
import Modal from '@components/shared-components/modal/Modal'
import { Button, Spinner } from '@components/shared-components'

interface OfferProps {
  id: string
  img: string
  make: string
  model: string
  price: number
  refresh: () => void
}

const Offer: FC<OfferProps> = ({ img, make, model, price, id, refresh }) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRemove = async () => {
    setLoading(true)
    const token = localStorage.getItem('cargo_token')
    const authorization = 'Bearer ' + token
    try {
      await DefaultService.deleteOffer(id, authorization)
      refresh()
    } catch {
      setError('Spróbuj ponownie później')
    } finally {
      setLoading(false)
      setIsModalOpen(false)
    }
  }
  return (
    <div className="flex gap-5 p-4 bg-brand-gray-400 rounded-2xl">
      <div className="relative h-[100px] w-[180px] rounded-2xl overflow-hidden bg-brand-gray-200 hidden md:block">
        {img && (
          <NextImage
            className="object-cover"
            src={img}
            fill
            alt={`${make} ${model}`}
          />
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-medium md:text-base text-brand-gray-200 first-letter:uppercase">
          {make}
        </p>
        <p className="text-base font-semibold md:text-2xl text-brand-gray-100 first-letter:uppercase">
          {model}
        </p>
        <div className="flex items-end text-base font-semibold md:text-2xl text-brand-gray-100">
          {price} PLN/
          <p className="text-xs font-medium md:text-base text-brand-gray-200">dzień</p>
        </div>
      </div>
      <button
        type="button"
        disabled={loading}
        onClick={() => setIsModalOpen(true)}
        className="self-end ml-auto text-sm font-medium underline cursor-pointer md:text-lg text-brand-gray-100 underline-offset-4"
      >
        Usuń
      </button>
      <Modal
        onClose={() => setIsModalOpen(false)}
        show={isModalOpen}
        title="Czy na pewno chcesz usunąć?"
      >
        <div className="flex mt-4 gap-7">
          <Button
            disabled={loading}
            className="w-1/2"
            type="button"
            onClick={handleRemove}
          >
            {loading ? <Spinner /> : 'Tak'}
          </Button>
          <Button
            disabled={loading}
            className="w-1/2"
            variant="secondary"
            type="button"
            onClick={() => setIsModalOpen(false)}
          >
            Nie
          </Button>
        </div>
        {error && <div className="self-end text-brand-red">{error}</div>}
      </Modal>
    </div>
  )
}

export default Offer
