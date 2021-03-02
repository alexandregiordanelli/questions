import React from 'react'
import Link from 'next/link'
import { Img } from './Img'
import { Notebook, Media } from '@prisma/client'
import { getURLMedia } from 'lib/utils'

export const NotebookCard2: React.FC<{
  customerTag?: string
  notebook: Notebook & {
    media: Media
  }
  className?: string
}> = (props) => {
  return (
    <Link href={`/${props.customerTag}/${props.notebook.tag}`}>
      <a>
        <div className={`w-60 flex flex-col ${props.className ?? ''}`}>
          {props.notebook.media && (
            <div className="flex">
              <Img className="" src={getURLMedia(props.notebook.media)} height={135} width={240} />
            </div>
          )}
          <div className="">
            <p className="text-gray-800 font-medium my-1">
              {props.notebook.name.length < 40
                ? props.notebook.name
                : props.notebook.name.substr(0, 40) + '\u2026'}
            </p>
            <span className="text-gray-900 font-semibold">
              {props.notebook.price == 0
                ? 'Free'
                : `R$${props.notebook.price.toFixed(2).replace('.', ',')}`}
            </span>
          </div>
        </div>
      </a>
    </Link>
  )
}
