import React, { Dispatch } from 'react'
import { QuestionWithAll, CustomerWithNotebooks } from '../lib/types'
import slugify from 'slugify'
import { Editor } from 'components/Editor'
import { Action, ActionType } from './Pages/EditQuestionPage'
import _ from 'lodash'
import { Alternative } from '@prisma/client'

export const EditQuestion: React.FC<{
  question: QuestionWithAll
  customer: CustomerWithNotebooks
  dispatch: Dispatch<Action>
}> = (props) => {
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
                      strict: true,
                    }),
                  })
                }}
                value={props.question?.name}
              />
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

            <select
              onChange={(x) => {
                const n = Number(x.target.value)

                const alternatives: Alternative[] = props.question.alternatives.slice(0, n)

                for (let i = props.question.alternatives.length; i < n; i++) {
                  alternatives.push({
                    id: -i,
                    questionId: props.question.id,
                    text: '',
                    createdAt: null,
                    updatedAt: null,
                  })
                }

                props.dispatch({
                  type: ActionType.UPDATE_ALTERNATIVES,
                  alternatives,
                })
              }}
              value={props.question.alternatives.length}
            >
              {Array.from(Array(10).keys()).map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>

            {props.question.alternatives.map((alternative, i) => {
              const alternatives = _.cloneDeep(props.question.alternatives)
              return (
                <div className="col-span-6 sm:col-span-4" key={i}>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Alternative {i + 1}
                  </label>

                  <Editor
                    className="h-24"
                    onChange={(x) => {
                      alternatives[i] = {
                        ...alternatives[i],
                        text: x,
                      }
                      props.dispatch({
                        type: ActionType.UPDATE_ALTERNATIVES,
                        alternatives,
                      })
                    }}
                    value={alternative.text}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
