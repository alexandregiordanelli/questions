import { NowRequest, NowResponse } from '@vercel/node'
import getQuestions from '../../../services/getQuestions';

export default async function (req: NowRequest, res: NowResponse) {
    
    const questionsof = req.query.questionsof as string

    const questionsListPath = await getQuestions(questionsof)
   
    res.json(questionsListPath)
}

