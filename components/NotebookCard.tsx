import React from 'react'
import Link from 'next/link'
import { Img } from './Img'
import { Notebook, Media } from '@prisma/client'
import { getURLMedia } from 'lib/utils'

export const NotebookCard: React.FC<{
  customerTag?: string
  notebook: Notebook & {
    media: Media
  }
  className?: string
}> = (props) => {
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
      <div className="bg-gray-50 p-5 rounded-b-sm text-gray-500">
        <h1 className="font-medium">{props.notebook.name}</h1>
        <span className="">R${props.notebook.price}</span>
        <div className="flex justify-end mt-5 rounded-b-lg">
          {props.customerTag && (
            <Link href={`/${props.customerTag}/${props.notebook.tag}`}>
              <a className={'bg-gray-500 text-white rounded-lg shadow-md px-4 py-2 font-semibold'}>
                Demo
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
