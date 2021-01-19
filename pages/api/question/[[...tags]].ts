import { NowRequest, NowResponse } from '@vercel/node'
import { QuestionWithAll } from '../../../lib/types'
import deleteQuestion from '../../../services/deleteQuestion'
import { getQuestion } from '../../../services/getQuestion'
import postQuestion from '../../../services/postQuestion'

export default async function (req: NowRequest, res: NowResponse): Promise<void> {
  if (req.method == 'GET') {
    const notebookId = Number(req.query.tags[0])
    const questionTag = req.query.tags[1]

    const question = await getQuestion(notebookId, questionTag)

    res.json(question)
  } else if (req.method == 'POST') {
    const questionOnRepo = req.body as QuestionWithAll

    const question = await postQuestion(questionOnRepo)

    res.json(question)
  } else if (req.method == 'DELETE') {
    const questionId = req.body.questionId as number
    const nRowsUpdated = await deleteQuestion(questionId)

    res.json(nRowsUpdated)
  } else {
    throw new Error(`${req.method} not exists`)
  }
}
