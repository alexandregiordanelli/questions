import { NowRequest, NowResponse } from '@vercel/node'
import getNotebook from '../../../services/getNotebook';
import { getQuestion } from '../../../services/getQuestion';

export default async function (req: NowRequest, res: NowResponse) {
    // const notebookTag = req.query.tags[0];
    // const questionTag = req.query.tags[1];

    //const notebook = await getNotebook(notebookTag)

   // const question = await getQuestion(notebook.id, questionTag);

    //res.json(question)
    res.json(req.query)
}

