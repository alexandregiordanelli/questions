import { useRouter } from 'next/router'
import { QuestionWithAll, CustomerWithNotebooks } from 'lib/types'
import { useData } from 'services/client/get'
import { Alternative, RightAlternative } from '@prisma/client'
import { EditQuestion } from 'components/EditQuestion'
import _ from 'lodash'
import { useReducer, useEffect } from 'react'

import NProgress from 'nprogress'
import { postClient } from 'services/client/post'
import { mutate } from 'swr'
import { HeaderAdmin } from 'pages/admin/questions'

export enum ActionType {
  UPDATE_NOTEBOOK_ID,
  UPDATE_NOTEBOOK,
  UPDATE_RIGHT_ALTERNATIVE,
  UPDATE_ALTERNATIVES,
  UPDATE_QUESTION,
  UPDATE_SOLUTION,
  UPDATE_TITLE,
  UPDATE_TAG,
  UPDATE_TEXT,
  UPDATE_SUBTOPIC,
}

export type Action =
  | {
      type: ActionType.UPDATE_NOTEBOOK_ID
      notebookId: number
    }
  | {
      type: ActionType.UPDATE_NOTEBOOK
      notebook: {
        name: string
        tag: string
      }
    }
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
      type: ActionType.UPDATE_TEXT
      text: string
    }
  | {
      type: ActionType.UPDATE_TITLE
      name: string
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

const initState: QuestionWithAll = {
  id: 0,
  tag: '',
  order: 0,
  subTopic: {
    id: 0,
    name: '',
    topicId: 0,
    createdAt: null,
    updatedAt: null,
    order: 0,
  },
  notebook: {
    name: '',
    tag: '',
  },
  text: '',
  notebookId: 0,
  solution: '',
  name: '',
  subTopicId: 0,
  alternatives: [],
  rightAlternative: null,
  createdAt: null,
  updatedAt: null,
}

const reducer = (state: QuestionWithAll, action: Action): QuestionWithAll => {
  switch (action.type) {
    case ActionType.UPDATE_NOTEBOOK: {
      const newState = _.cloneDeep(state)
      newState.notebook = action.notebook
      return newState
    }
    case ActionType.UPDATE_NOTEBOOK_ID: {
      const newState = _.cloneDeep(state)
      newState.notebookId = action.notebookId
      return newState
    }
    case ActionType.UPDATE_RIGHT_ALTERNATIVE: {
      const newState = _.cloneDeep(state)
      newState.rightAlternative = action.rightAlternative
      return newState
    }
    case ActionType.UPDATE_TEXT: {
      const newState = _.cloneDeep(state)
      newState.text = action.text
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
      newState.name = action.name
      return newState
    }
    case ActionType.UPDATE_SUBTOPIC: {
      const newState = _.cloneDeep(state)
      newState.subTopicId = action.subTopicId
      return newState
    }
    default:
      break
  }
  return state
}

type QuestionPageProps = {
  customerTag: string
  notebookTag?: string
  questionTag?: string
}

export const EditQuestionPage: React.FC<QuestionPageProps> = (props) => {
  const { data: customer } = useData<CustomerWithNotebooks>(
    `/api/${props.customerTag}?notebooks=true`,
    null
  )

  const { data: question } = useData<QuestionWithAll>(
    props.questionTag ? `/api/${props.customerTag}/${props.notebookTag}/${props.questionTag}` : null
  )

  const initQuestion = question ? question : initState

  const router = useRouter()

  const [state, dispatch] = useReducer(reducer, initQuestion)

  useEffect(() => {
    dispatch({ type: ActionType.UPDATE_QUESTION, question: initQuestion })
  }, [initQuestion])

  const postQuestion = async (_question: QuestionWithAll): Promise<void> => {
    try {
      NProgress.start()
      const question = await postClient<QuestionWithAll>(
        _question,
        `/api/${customer.tag}/${_question.notebook.tag}`
      )
      mutate(`/api/${customer.tag}/${question.notebook.tag}/${question.tag}`, question)
      router.push(`/admin/questions`)
    } catch (e) {
      NProgress.done()
      console.log(e)
    }
  }

  return (
    <>
      <HeaderAdmin breadcrumb={<span>{question?.tag ? question.name : 'New'}</span>}>
        <button
          onClick={async () => await postQuestion(state)}
          className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </HeaderAdmin>

      <div className="p-20">
        <EditQuestion customer={customer} question={state} dispatch={dispatch} />
      </div>
    </>
  )
}
