import { NowRequest, NowResponse } from '@vercel/node'
import getNotebook from '../../../services/getNotebook'

export default async function (req: NowRequest, res: NowResponse) {
    const questionsof = req.query.questionsof as string
    const questionofData = await getNotebook(questionsof)
    res.json(questionofData) 
}


