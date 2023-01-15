import XIcon from '@components/shared-components/icons/XIcon'
import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface ModalProps extends PropsWithChildren {
  title: string
  show: boolean
  onClose: () => void
}

const Modal: FC<ModalProps> = ({ show, onClose, title, children }) => {
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => {
    setIsBrowser(true)
  }, [])
  if (!isBrowser) {
    return null
  }
  if (!show) {
    return null
  }
  return ReactDOM.createPortal(
    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-screen h-screen backdrop-blur">
      <div className="p-8 bg-brand-gray-300 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold text-brand-gray-100">
            {title}
          </div>
          <div onClick={() => onClose()} className="cursor-pointer">
            <XIcon />
          </div>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  )
}

export default Modal
