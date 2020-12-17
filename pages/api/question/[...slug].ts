import { NowRequest, NowResponse } from '@vercel/node'
import { getQuestion } from '../../../services/getQuestion';

export default async function (req: NowRequest, res: NowResponse) {
    const questionsof = req.query.slug[0];
    const questionUrl = req.query.slug[1];

    const question = await getQuestion(questionsof, questionUrl);

    res.json(question)
}

