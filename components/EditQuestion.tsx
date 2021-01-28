import React, { useReducer, useEffect } from 'react'
import { QuestionWithAll, NotebookWithTopicsAndSubTopics } from '../lib/types'
import { Alternative, RightAlternative, Customer } from '@prisma/client'
import Select, { GroupType, OptionsType } from 'react-select'
import _ from 'lodash'
import slugify from 'slugify'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { postClient } from 'services/client/post'
import { mutate } from 'swr'
enum ActionType {
  UPDATE_RIGHT_ALTERNATIVE,
  UPDATE_ALTERNATIVES,
  UPDATE_QUESTION,
  UPDATE_SOLUTION,
  UPDATE_TITLE,
  UPDATE_TAG,
  UPDATE_DESCRIPTION,
  UPDATE_SUBTOPIC,
}

type Action =
  | {
      type: ActionType.UPDATE_ALTERNATIVES
      alternatives: Alternative[]
    }
  | {
      type: ActionType.UPDATE_QUESTION
      question: QuestionWithAll
    }
  | {
      type: ActionType.UPDATE_SOLUTION
      solution: string
    }
  | {
      type: ActionType.UPDATE_DESCRIPTION
      description: string
    }
  | {
      type: ActionType.UPDATE_TITLE
      title: string
    }
  | {
      type: ActionType.UPDATE_TAG
      tag: string
    }
  | {
      type: ActionType.UPDATE_RIGHT_ALTERNATIVE
      rightAlternative: RightAlternative
    }
  | {
      type: ActionType.UPDATE_SUBTOPIC
      subTopicId: number
    }

type SelectOption = {
  label: string
  value: string
  __isNew__?: boolean
}

const initState: QuestionWithAll = {
  id: 0,
  tag: '',
  subTopic: {
    id: 0,
    name: '',
    topicId: 0,
  },
  question: '',
  notebookId: 0,
  solution: '',
  title: '',
  subTopicId: 0,
  alternatives: [],
  rightAlternative: null,
}

const reducer = (state: QuestionWithAll, action: Action): QuestionWithAll => {
  switch (action.type) {
    case ActionType.UPDATE_RIGHT_ALTERNATIVE: {
      const newState = _.cloneDeep(state)
      newState.rightAlternative = action.rightAlternative
      return newState
    }
    case ActionType.UPDATE_DESCRIPTION: {
      const newState = _.cloneDeep(state)
      newState.question = action.description
      return newState
    }
    case ActionType.UPDATE_ALTERNATIVES: {
      const newState = _.cloneDeep(state)
      newState.alternatives = action.alternatives
      return newState
    }
    case ActionType.UPDATE_TAG: {
      const newState = _.cloneDeep(state)
      newState.tag = action.tag
      return newState
    }
    case ActionType.UPDATE_QUESTION: {
      return action.question
    }
    case ActionType.UPDATE_SOLUTION: {
      const newState = _.cloneDeep(state)
      newState.solution = action.solution
      return newState
    }
    case ActionType.UPDATE_TITLE: {
      const newState = _.cloneDeep(state)
      newState.title = action.title
      return newState
    }
    case ActionType.UPDATE_SUBTOPIC: {
      const newState = _.cloneDeep(state)
      newState.subTopicId = action.subTopicId
      newState.subTopic.id = action.subTopicId
      return newState
    }
    default:
      break
  }
  return state
}

export const EditQuestion: React.FC<{
  question?: QuestionWithAll
  notebook: NotebookWithTopicsAndSubTopics
  customer: Customer
}> = (props) => {
  const initQuestion = props.question ? props.question : initState

  const router = useRouter()

  const [state, dispatch] = useReducer(reducer, initQuestion)

  useEffect(() => {
    dispatch({ type: ActionType.UPDATE_QUESTION, question: initQuestion })
  }, [initQuestion])

  const postQuestion = async (_question: QuestionWithAll): Promise<void> => {
    _question.notebookId = props.notebook.id

    try {
      NProgress.start()
      const question = await postClient<QuestionWithAll>(
        _question,
        `/api/${props.customer.username}/${props.notebook.tag}`
      )
      mutate(`/api/${props.customer.username}/${props.notebook.tag}/${question.tag}`, question)
      router.push(`/${props.customer.username}/${props.notebook.tag}/${question.tag}`)
      mutate(`/api/${props.customer.username}/${props.notebook.tag}/${question.tag}`)
    } catch (e) {
      NProgress.done()
      console.log(e)
    }
  }

  const topics: OptionsType<GroupType<SelectOption>> = props.notebook?.topics?.map((x) => {
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
    ?.find((x) => x?.options.some((y) => Number(y.value) == state.subTopicId))
    ?.options?.find((y) => Number(y.value) == state.subTopicId)

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-6 sm:col-span-2 ">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Notebook&apos;s name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(x) => {
                          dispatch({ type: ActionType.UPDATE_TITLE, title: x.target.value })
                          dispatch({
                            type: ActionType.UPDATE_TAG,
                            tag: slugify(x.target.value, {
                              lower: true,
                            }),
                          })
                        }}
                        value={state?.title}
                      />
                      <span className="text-xs font-medium text-right block">
                        {state?.tag && `questionsof.com/${state?.tag}`}
                      </span>
                    </div>

                    <div className="col-span-6 sm:col-span-1 ">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="price"
                          id="price"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                          onChange={(x) =>
                            dispatch({ type: ActionType.UPDATE_SOLUTION, solution: x.target.value })
                          }
                          value={state?.solution}
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700  mb-1"
                      >
                        Topics
                      </label>
                      <Select
                        instanceId={'topics'}
                        isClearable
                        menuPortalTarget={
                          typeof document != 'undefined' && document.querySelector('body')
                        }
                        onChange={(x) => {
                          dispatch({
                            type: ActionType.UPDATE_SUBTOPIC,
                            subTopicId: Number(x?.value),
                          })
                        }}
                        value={(topic as unknown) as GroupType<SelectOption>}
                        options={topics}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Description
                      </label>
                      <textarea
                        className="resize-y mt-1 font-mono focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(x) =>
                          dispatch({
                            type: ActionType.UPDATE_DESCRIPTION,
                            description: x.target.value,
                          })
                        }
                        value={state?.question ?? ''}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    onClick={() => {
                      if (props.question) {
                        router.replace(
                          `/${props.customer.username}/${props.notebook.tag}/${props.question.tag}`
                        )
                      } else {
                        router.replace(`/${props.customer.username}/${props.notebook.tag}`)
                      }
                    }}
                    className="inline-flex justify-center py-2 px-4 border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => await postQuestion(state)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
