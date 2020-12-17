import { NowRequest, NowResponse } from '@vercel/node'
import getQuestionof from '../../../services/getQuestionof'

export default async function (req: NowRequest, res: NowResponse) {
    const questionsof = req.query.questionsof as string
    const questionofData = await getQuestionof(questionsof)
    res.json(questionofData) 
}


