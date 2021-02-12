import React, { Dispatch, useState, useEffect } from 'react'
import {
  QuestionWithAll,
  NotebookWithTopicsAndSubTopics,
  CustomerWithNotebooks,
} from '../lib/types'
import Select, { GroupType, OptionsType } from 'react-select'
import slugify from 'slugify'
import { Editor } from 'components/Editor'
import { Action, ActionType } from './Pages/EditQuestionPage'
import { fetcher } from 'services/client/get'

type SelectOption = {
  label: string
  value: string
  __isNew__?: boolean
}

export const EditQuestion: React.FC<{
  question: QuestionWithAll
  notebookTag: string
  customer: CustomerWithNotebooks
  dispatch: Dispatch<Action>
}> = (props) => {
  const [notebookTag, setNotebookTag] = useState(props.notebookTag)
  const [notebook, setNotebook] = useState<NotebookWithTopicsAndSubTopics>(null)

  useEffect(() => {
    ;(async () => {
      const _notebook = await fetcher<NotebookWithTopicsAndSubTopics>(
        `/api/${props.customer?.tag}/${notebookTag}`
      )
      setNotebook(_notebook)
    })()
  }, [notebookTag])

  const topics: OptionsType<GroupType<SelectOption>> = notebook?.topics?.map((x) => {
    return {
      label: x.name,
      options: x.subtopics?.map((y) => {
        return {
          label: y.name,
          value: y.id.toString(),
        }
      }),
    }
  })

  const topic = topics
    ?.find((x) => x?.options.some((y) => Number(y.value) == props.question.subTopicId))
    ?.options?.find((y) => Number(y.value) == props.question.subTopicId)

  return (
    <>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-6 sm:col-span-2 ">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Question&apos;s name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                autoComplete="family-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                onChange={(x) => {
                  props.dispatch({ type: ActionType.UPDATE_TITLE, name: x.target.value })
                  props.dispatch({
                    type: ActionType.UPDATE_TAG,
                    tag: slugify(x.target.value, {
                      lower: true,
                    }),
                  })
                }}
                value={props.question?.name}
              />
            </div>
            <div className="col-span-6 sm:col-span-1 ">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Notebook
              </label>
              <div className="mt-1">
                <Select
                  onChange={(x) => {
                    setNotebookTag(x.value)
                  }}
                  value={
                    {
                      value: notebookTag,
                      label: props.customer?.notebooks.find((x) => x.tag == notebookTag)?.name,
                    } as SelectOption
                  }
                  options={props.customer?.notebooks.map(
                    (x) =>
                      ({
                        label: x.name,
                        value: x.tag,
                      } as SelectOption)
                  )}
                />
              </div>
            </div>
            <div className="col-span-6 sm:col-span-1 ">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <div className="mt-1">
                <Select
                  instanceId={'topics'}
                  isClearable
                  menuPortalTarget={
                    typeof document != 'undefined' && document.querySelector('body')
                  }
                  onChange={(x) => {
                    props.dispatch({
                      type: ActionType.UPDATE_SUBTOPIC,
                      subTopicId: Number(x?.value),
                    })
                  }}
                  value={(topic as unknown) as GroupType<SelectOption>}
                  options={topics}
                />
              </div>
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Body
              </label>

              <Editor
                className="h-32"
                onChange={(x) =>
                  props.dispatch({
                    type: ActionType.UPDATE_TEXT,
                    text: x,
                  })
                }
                value={props.question.text}
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Solution
              </label>

              <Editor
                className="h-48"
                onChange={(x) =>
                  props.dispatch({
                    type: ActionType.UPDATE_SOLUTION,
                    solution: x,
                  })
                }
                value={props.question.solution}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
