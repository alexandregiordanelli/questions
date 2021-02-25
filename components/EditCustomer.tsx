import React, { Dispatch, SetStateAction, useState } from 'react'
import { Customer, Media } from '@prisma/client'
import { Thumb } from './Thumb'
import { useData } from 'services/client/get'
import { MediaWithUrl } from 'lib/types'
import { getURLMedia } from 'lib/utils'
import { Thumbs } from './Thumbs'
import Modal from './Modal'
import { Editor } from './Editor'

export const EditCustomer: React.FC<{
  state: Customer
  setState: Dispatch<SetStateAction<Customer>>
}> = (props) => {
  const [isOpened, setIsOpened] = useState(false)

  const { data: medias } = useData<Media[]>(`/api/media`)

  const mediasWithURL: MediaWithUrl[] = medias?.map((x) => {
    return {
      ...x,
      url: getURLMedia(x),
    }
  })

  return (
    <>
      {isOpened && (
        <Modal showModal={setIsOpened}>
          <Thumbs
            medias={mediasWithURL}
            select={(x) => {
              props.setState({
                ...props.state,
                mediaId: x,
              })
              setIsOpened(false)
            }}
          />
        </Modal>
      )}
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              {!props.state.mediaId ? (
                <button
                  className="bg-gray-200 px-2 py-1 rounded-md"
                  onClick={() => setIsOpened(true)}
                >
                  Select an Image
                </button>
              ) : (
                <Thumb
                  media={mediasWithURL?.find((x) => x.id == props.state.mediaId)}
                  onClick={() => {
                    setIsOpened(true)
                  }}
                  remove={() => {
                    props.setState({
                      ...props.state,
                      mediaId: null,
                    })
                    setIsOpened(false)
                  }}
                />
              )}
            </div>
            <div className="col-span-6 sm:col-span-2 ">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                tag
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                autoComplete="family-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                onChange={(x) =>
                  props.setState({
                    ...props.state,
                    tag: x.target.value,
                  })
                }
                value={props.state.tag}
              />
              <span className="text-xs font-medium text-right block">
                {props.state.tag && `questionsof.com/${props.state.tag}`}
              </span>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Text
              </label>
              <Editor
                className="h-48"
                onChange={(x) =>
                  props.setState({
                    ...props.state,
                    text: x,
                  })
                }
                value={props.state.text}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
