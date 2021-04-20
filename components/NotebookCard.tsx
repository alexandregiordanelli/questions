import React from 'react'
import { Img } from './Img'
import { Notebook, Media, Subscriber } from '../lib/types'
import { getURLMedia } from 'lib/utils'
import { useAuth } from 'lib/auth'
import NProgress from 'nprogress'
import { postClientArray } from 'services/client/post'
import { MyNotebooks } from 'lib/types'
import { mutate } from 'swr'
import Link from 'next/link'

const postSubscriber = async (_subscriber: Subscriber): Promise<void> => {
  try {
    NProgress.start()
    const subscribers = (await postClientArray<Subscriber>(
      _subscriber,
      `/api/subscribers`
    )) as MyNotebooks
    mutate('/api/subscribers', subscribers)
    NProgress.done()
  } catch (e) {
    NProgress.done()
    console.log(e)
  }
}

export const NotebookCard: React.FC<{
  startQuestionTag?: string
  hasThisNotebook: boolean
  notebook: Notebook & {
    media: Media
  }
  className?: string
}> = (props) => {
  const { setShowFocusOnLogin } = useAuth()
  const auth = useAuth()
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
        {!props.hasThisNotebook && (
          <button
            className="bg-green-500 hover:bg-green-400 px-4 py-2 text-white mt-4"
            onClick={async () => {
              if (auth.customer) {
                await postSubscriber({
                  id: 0,
                  customerId: auth.customer.id,
                  notebookId: props.notebook.id,
                  createdAt: null,
                  updatedAt: null,
                })
                auth.setShowNotebookCard(false)
              } else {
                setShowFocusOnLogin(true)
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
