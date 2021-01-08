import { NowRequest, NowResponse } from '@vercel/node'
import getQuestions from '../../../services/getQuestions';

export default async function (req: NowRequest, res: NowResponse) {
    
    const questionsof = req.query.questionsof as string

    if(req.method == 'GET'){
        const questionsListPath = await getQuestions(questionsof)
    
        res.json(questionsListPath)
    } else {
        throw new Error(`${req.method} not exists`)
    }
}

