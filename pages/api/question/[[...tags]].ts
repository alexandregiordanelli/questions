import { NowRequest, NowResponse } from '@vercel/node'
import { QuestionWithAll } from '../../../lib/types'
import deleteQuestion from '../../../services/deleteQuestion'
import { getQuestion } from '../../../services/getQuestion'
import postQuestion from '../../../services/postQuestion'
import { getSession } from 'next-auth/client'

const QuestionController = async (req: NowRequest, res: NowResponse): Promise<void> => {
  if (req.method == 'GET') {
    const notebookId = Number(req.query.tags[0])
    const questionTag = req.query.tags[1]

    const question = await getQuestion(notebookId, questionTag)

    res.json(question)
  } else if (req.method == 'POST') {
    const session = await getSession({ req })

    if (!session || new Date(session.expires) < new Date()) {
      throw new Error(`token's expired`)
    }

    const questionOnRepo = req.body as QuestionWithAll

    const question = await postQuestion(questionOnRepo)

    res.json(question)
  } else if (req.method == 'DELETE') {
    const session = await getSession({ req })

    if (!session || new Date(session.expires) < new Date()) {
      throw new Error(`token's expired`)
    }

    const questionId = req.body.questionId as number
    const nRowsUpdated = await deleteQuestion(questionId)

    res.json(nRowsUpdated)
  } else {
    throw new Error(`${req.method} not exists`)
  }
}
export default QuestionController
