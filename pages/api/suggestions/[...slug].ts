import { NowRequest, NowResponse } from '@vercel/node'
import getSuggestions from '../../../services/getSuggestions';

export default async function (req: NowRequest, res: NowResponse) {
    
    const questionsof = req.query.slug[0];
    const topic = req.query.slug[1];

    const questionSuggestions = await getSuggestions(questionsof, topic);

    res.json(questionSuggestions)
}
