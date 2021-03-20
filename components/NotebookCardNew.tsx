import { Customer, Media, Notebook } from '@prisma/client'
import { getURLMedia } from 'lib/utils'
import React from 'react'
import Link from 'next/link'

export const NotebookCardNew: React.FC<{
  notebook: Notebook & {
    media: Media
  }
  customer: Customer & { media: Media }
}> = (props) => {
  return (
    <Link href={`/${props.notebook.tag}`}>
      <a title="TailwindCSS fintess gym" className="flex flex-col overflow-hidden rounded">
        <div className="relative h-48 overflow-hidden rounded-lg xl:h-64">
          <img
            src={getURLMedia(props.notebook.media)}
            alt={props.notebook.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-3">
          <div className="flex">
            <div className="relative flex-shrink-0 w-8 h-8 mt-1 mr-3 overflow-hidden rounded-full shadow-inner">
              <img
                src={getURLMedia(props.customer.media)}
                alt={props.customer.name}
                className="absolute inset-0 w-full h-full z-negative"
              />
            </div>
            <div className="flex-1 w-0 leading-snug">
              <h4 className="font-bold truncate whitespace-nowrap text-secondary hover:text-primary">
                {props.notebook.name}
              </h4>
              <p className="text-sm text-gray-600">{props.customer.name}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
