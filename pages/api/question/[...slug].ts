import { NowRequest, NowResponse } from '@vercel/node'
import getNotebook from '../../../services/getNotebook';
import { getQuestion } from '../../../services/getQuestion';

export default async function (req: NowRequest, res: NowResponse) {
    const questionsof = req.query.slug[0];
    const questionUrl = req.query.slug[1];

    const notebook = await getNotebook(questionsof)

    const question = await getQuestion(notebook.id, questionUrl);

    res.json(question)
}

