import { useRouter } from 'next/router'
import { NotebookWithTopicsAndSubTopics } from 'lib/types'
import { useData } from 'services/client/get'
import _ from 'lodash'
import { useReducer, useEffect } from 'react'

import NProgress from 'nprogress'
import { postClient } from 'services/client/post'
import { mutate } from 'swr'
import { HeaderAdmin } from 'pages/admin/notebooks'
import { EditNotebook } from 'components/EditNotebook'
import { Topic, SubTopic, Customer } from '@prisma/client'
export enum ActionType {
  UPDATE_SUBTOPICS,
  UPDATE_NOTEBOOK,
  UPDATE_TOPICS,
  UPDATE_TEXT,
  UPDATE_PRICE,
  UPDATE_NAME,
  UPDATE_TAG,
  UPDATE_MEDIA,
}

export type Action =
  | {
      type: ActionType.UPDATE_TOPICS
      topics: (Topic & {
        subtopics: SubTopic[]
      })[]
    }
  | {
      type: ActionType.UPDATE_SUBTOPICS
      topicId: number
      subtopics: SubTopic[]
    }
  | {
      type: ActionType.UPDATE_NOTEBOOK
      notebook: NotebookWithTopicsAndSubTopics
    }
  | {
      type: ActionType.UPDATE_TEXT
      text: string
    }
  | {
      type: ActionType.UPDATE_PRICE
      price: number
    }
  | {
      type: ActionType.UPDATE_NAME
      name: string
    }
  | {
      type: ActionType.UPDATE_TAG
      tag: string
    }
  | {
      type: ActionType.UPDATE_MEDIA
      mediaId: number
    }

const initState: NotebookWithTopicsAndSubTopics = {
  id: 0,
  customerId: 0,
  text: '',
  name: '',
  price: 0,
  tag: '',
  topics: [],
  createdAt: null,
  updatedAt: null,
  mediaId: 0,
  media: null,
}

const reducer = (
  state: NotebookWithTopicsAndSubTopics,
  action: Action
): NotebookWithTopicsAndSubTopics => {
  switch (action.type) {
    case ActionType.UPDATE_SUBTOPICS: {
      const newState = _.cloneDeep(state)
      const topic = newState.topics.find((x) => x.id == action.topicId)
      topic.subtopics = action.subtopics
      return newState
    }
    case ActionType.UPDATE_NOTEBOOK: {
      const newState = action.notebook
      return newState
    }
    case ActionType.UPDATE_NAME: {
      const newState = _.cloneDeep(state)
      newState.name = action.name
      return newState
    }
    case ActionType.UPDATE_TAG: {
      const newState = _.cloneDeep(state)
      newState.tag = action.tag
      return newState
    }
    case ActionType.UPDATE_PRICE: {
      const newState = _.cloneDeep(state)
      newState.price = action.price
      return newState
    }
    case ActionType.UPDATE_TEXT: {
      const newState = _.cloneDeep(state)
      newState.text = action.text
      return newState
    }
    case ActionType.UPDATE_TOPICS: {
      const newState = _.cloneDeep(state)
      newState.topics = action.topics
      return newState
    }
    case ActionType.UPDATE_MEDIA: {
      const newState = _.cloneDeep(state)
      newState.mediaId = action.mediaId
      return newState
    }
    default: {
      return state
    }
  }
}

export const EditNotebookPage: React.FC<{
  customerTag: string
  notebookTag?: string
}> = (props) => {
  const { data: customer } = useData<Customer>(`/api/${props.customerTag}`, null)

  const { data: notebook } = useData<NotebookWithTopicsAndSubTopics>(
    props.notebookTag ? `/api/${props.customerTag}/${props.notebookTag}` : null
  )

  const initNotebook = notebook ? notebook : initState

  const router = useRouter()

  const [state, dispatch] = useReducer(reducer, initNotebook)

  useEffect(() => {
    dispatch({ type: ActionType.UPDATE_NOTEBOOK, notebook: initNotebook })
  }, [initNotebook])

  const postNotebook = async (_notebook: NotebookWithTopicsAndSubTopics): Promise<void> => {
    _notebook.customerId = customer.id

    try {
      NProgress.start()
      const notebook = await postClient<NotebookWithTopicsAndSubTopics>(
        _notebook,
        `/api/${props.customerTag}`
      )
      mutate(`/api/${props.customerTag}/${notebook.tag}`, notebook)
      router.push(`/admin/notebooks`)
    } catch (e) {
      NProgress.done()
      console.log(e)
    }
  }

  return (
    <>
      <HeaderAdmin breadcrumb={<span>{notebook?.tag ? notebook.name : 'New'}</span>}>
        <button
          onClick={async () => await postNotebook(state)}
          className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </HeaderAdmin>

      <div className="p-20">
        <EditNotebook
          customer={customer}
          notebook={state}
          initNotebook={initNotebook}
          dispatch={dispatch}
        />
      </div>
    </>
  )
}
