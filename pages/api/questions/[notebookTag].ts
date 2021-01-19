import { NowRequest, NowResponse } from '@vercel/node'
import getQuestions from '../../../services/getQuestions'

export default async function (req: NowRequest, res: NowResponse): Promise<void> {
  const notebookTag = req.query.notebookTag as string

  if (req.method == 'GET') {
    const questionsListPath = await getQuestions(notebookTag)

    res.json(questionsListPath)
  } else {
    throw new Error(`${req.method} not exists`)
  }
}
