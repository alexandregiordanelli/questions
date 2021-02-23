import React, { Dispatch, useState } from 'react'
import { NotebookWithTopicsAndSubTopics, MediaWithUrl } from '../lib/types'
import { SubTopic, Topic, Customer, Media } from '@prisma/client'
import CreatableSelect from 'react-select/creatable'
import slugify from 'slugify'
import { Editor } from 'components/Editor'
import { ActionType, Action } from './Pages/EditNotebookPage'
import { useData } from 'services/client/get'
import { Thumbs } from './Thumbs'
import Modal from './Modal'
import { Thumb } from './Thumb'

type SelectOption = {
  label: string
  value: string
  __isNew__?: boolean
}

export const EditNotebook: React.FC<{
  customer: Customer
  initNotebook?: NotebookWithTopicsAndSubTopics
  notebook?: NotebookWithTopicsAndSubTopics
  dispatch: Dispatch<Action>
}> = (props) => {
  const topics = props.notebook?.topics?.map((x) => {
    return {
      label: x.name,
      value: x.id.toString(),
      __isNew__: false,
    } as SelectOption
  })

  const topicsOriginal = props.initNotebook?.topics?.map((x) => {
    return {
      label: x.name,
      value: x.id.toString(),
      __isNew__: false,
    } as SelectOption
  })

  const [isOpened, setIsOpened] = useState(false)

  const { data: medias } = useData<Media[]>(`/api/media`)

  const mediasWithURL: MediaWithUrl[] = medias?.map((x) => {
    return {
      ...x,
      url: `https://assets.questionsof.com/${x.customerId}/${x.tag}`,
    }
  })

  return (
    <>
      {isOpened && (
        <Modal showModal={setIsOpened}>
          <Thumbs
            medias={mediasWithURL}
            select={(x) => {
              props.dispatch({ type: ActionType.UPDATE_MEDIA, mediaId: x })
              setIsOpened(false)
            }}
          />
        </Modal>
      )}
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-6 sm:col-span-2 ">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Notebook&apos;s name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                autoComplete="family-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                onChange={(x) => {
                  props.dispatch({ type: ActionType.UPDATE_NAME, name: x.target.value })
                  props.dispatch({
                    type: ActionType.UPDATE_TAG,
                    tag: slugify(x.target.value, {
                      lower: true,
                      strict: true,
                    }),
                  })
                }}
                value={props.notebook?.name}
              />
            </div>

            <div className="col-span-6 sm:col-span-1 ">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  onChange={(x) =>
                    props.dispatch({
                      type: ActionType.UPDATE_PRICE,
                      price: Number(x.target.value),
                    })
                  }
                  value={props.notebook?.price.toString()}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="currency" className="sr-only">
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                  >
                    <option>USD</option>
                    <option>CAD</option>
                    <option>EUR</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              {!props.notebook.mediaId ? (
                <button
                  className="bg-gray-200 px-2 py-1 rounded-md"
                  onClick={() => setIsOpened(true)}
                >
                  Select an Image
                </button>
              ) : (
                <Thumb
                  media={mediasWithURL.find((x) => x.id == props.notebook.mediaId)}
                  onClick={() => {
                    setIsOpened(true)
                  }}
                  remove={() => {
                    props.dispatch({ type: ActionType.UPDATE_MEDIA, mediaId: 0 })
                    setIsOpened(false)
                  }}
                />
              )}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Topics
              </label>
              <CreatableSelect
                instanceId={'topics'}
                isMulti
                onChange={(x) =>
                  props.dispatch({
                    type: ActionType.UPDATE_TOPICS,
                    topics: x?.map((y) => {
                      return {
                        id: y.__isNew__ ? -Number(new Date()) : Number(y.value),
                        name: y.label,
                        subtopics: y.__isNew__
                          ? []
                          : props.notebook.topics?.find((z) => z.id == Number(y.value))
                              ?.subtopics ?? [],
                      } as Topic & {
                        subtopics: SubTopic[]
                      }
                    }),
                  })
                }
                isClearable={false}
                value={topics}
                options={topicsOriginal}
              />

              {props.notebook?.topics?.map((x) => {
                const subtopics = x.subtopics?.map((y) => {
                  return {
                    label: y.name,
                    value: y.id.toString(),
                    __isNew__: false,
                  } as SelectOption
                })
                const subtopicsOriginal = props.initNotebook?.topics
                  ?.find((z) => z.id == x.id)
                  ?.subtopics?.map((y) => {
                    return {
                      label: y.name,
                      value: y.id.toString(),
                      __isNew__: false,
                    } as SelectOption
                  })
                return (
                  <div className="bg-gray-50 p-4 my-2 rounded-md" key={x.id}>
                    <span className="block text-sm font-medium text-gray-700">
                      SubTopics of <span className="text-gray-900 font-bold">{x.name}</span>
                    </span>
                    <CreatableSelect
                      className="mt-2"
                      instanceId={x.id}
                      isMulti
                      onChange={(y) =>
                        props.dispatch({
                          type: ActionType.UPDATE_SUBTOPICS,
                          subtopics: y?.map((z) => {
                            return {
                              id: z.__isNew__ ? -Number(new Date()) : Number(z.value),
                              name: z.label,
                              topicId: x.id,
                            } as SubTopic
                          }),
                          topicId: x.id,
                        })
                      }
                      isClearable={false}
                      value={subtopics}
                      options={subtopicsOriginal}
                    />
                  </div>
                )
              })}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Editor
                className="h-48"
                onChange={(x) =>
                  props.dispatch({
                    type: ActionType.UPDATE_TEXT,
                    text: x,
                  })
                }
                value={props.notebook.text}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
