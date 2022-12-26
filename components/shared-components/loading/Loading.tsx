import React, { FC, PropsWithChildren } from 'react'

const Loading: FC<PropsWithChildren> = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-screen h-screen bg-opacity-90 bg-slate-700 ">
      <p className='text-3xl animate-bounce'>Ładowanie</p>
    </div>
  )
}

export default Loading
