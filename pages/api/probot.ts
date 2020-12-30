import nc from 'next-connect'
import { NowResponse } from '@vercel/node'
import listenerProbot from '../../services/listenerProbot';
import { ProbotRequest } from '../../lib/types';
import { probotMiddleWare } from '../../lib/probot-middleware';

const handler = nc<ProbotRequest, NowResponse>()
    .use(probotMiddleWare(listenerProbot))
    .post(async (req, res) => {
        res.send('okk')
    })

export default handler