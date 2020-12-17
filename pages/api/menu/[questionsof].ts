import { NowRequest, NowResponse } from '@vercel/node'
import getMenu from '../../../services/getMenu';
export default async function (req: NowRequest, res: NowResponse) {
    
    const questionsof = req.query.questionsof

    const menu = await getMenu(questionsof as string)

    res.json(menu)
}

