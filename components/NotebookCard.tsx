import React from 'react'
import { Img } from './Img'
import { Notebook, Media } from '@prisma/client'
import { getURLMedia } from 'lib/utils'
import { useAuth } from 'lib/auth'

export const NotebookCard: React.FC<{
  notebook: Notebook & {
    media: Media
  }
  className?: string
}> = (props) => {
  const { setShowFocusOnLogin } = useAuth()

  return (
    <div
      className={`bg-white shadow-xl rounded-sm w-80 flex flex-col border ${props.className ?? ''}`}
    >
      {props.notebook.media && (
        <div className="flex">
          <Img
            className="rounded-t-sm"
            src={getURLMedia(props.notebook.media)}
            height={props.notebook.media.height}
            width={props.notebook.media.width}
          />
        </div>
      )}
      <div className="bg-gray-50 p-5 rounded-b-sm text-gray-500 flex flex-col">
        <h1 className="font-medium">{props.notebook.name}</h1>
        <button
          className="bg-green-500 hover:bg-green-400 px-4 py-2 text-white mt-4"
          onClick={() => setShowFocusOnLogin(true)}
        >
          Subscribe for free
        </button>
      </div>
    </div>
  )
}
