import { NowRequest, NowResponse } from '@vercel/node'
import getSuggestions from '../../../services/getSuggestions'

const SuggestionsController = async (req: NowRequest, res: NowResponse): Promise<void> => {
  const notebookTag = req.query.slug[0]
  const subTopicId = Number(req.query.slug[1])

  if (req.method == 'GET') {
    const questionSuggestions = await getSuggestions(notebookTag, subTopicId)

    res.json(questionSuggestions)
  } else {
    throw new Error(`${req.method} not exists`)
  }
}

export default SuggestionsController
