import React from 'react'
import { Img } from './Img'
import { Notebook, Media, Subscriber } from '../lib/types'
import { getURLMedia } from 'lib/utils'
import { useAuth } from 'lib/auth'
import Link from 'next/link'
import { supabase } from 'lib/supabase-client'

export const NotebookCard: React.FC<{
  startQuestionTag?: string
  hasThisNotebook: boolean
  notebook: Notebook & {
    Media: Media
  }
  className?: string
}> = (props) => {
  const auth = useAuth()
  return (
    <div
      className={`bg-white shadow-xl rounded-sm w-80 flex flex-col border ${props.className ?? ''}`}
    >
      {props.notebook.Media && (
        <div className="flex">
          <Img
            className="rounded-t-sm"
            src={getURLMedia(props.notebook.Media)}
            height={props.notebook.Media.height}
            width={props.notebook.Media.width}
          />
        </div>
      )}
      <div className="bg-gray-50 p-5 rounded-b-sm text-gray-500 flex flex-col">
        <h1 className="font-medium">{props.notebook.name}</h1>
        {!props.hasThisNotebook && (
          <button
            className="bg-green-500 hover:bg-green-400 px-4 py-2 text-white mt-4"
            onClick={async () => {
              if (auth.customer) {
                await supabase.from<Subscriber>('Subscriber').insert([
                  {
                    customerId: auth.customer.id,
                    notebookId: props.notebook.id,
                  },
                ])
              }
            }}
          >
            Subscribe for free
          </button>
        )}
        {props.hasThisNotebook && props.startQuestionTag && (
          <Link href={`/${props.notebook.tag}/${props.startQuestionTag}`}>
            <a className="bg-blue-500 hover:bg-blue-400 px-4 py-2 text-white mt-4 text-center">
              Open Notebook
            </a>
          </Link>
        )}
      </div>
    </div>
  )
}
