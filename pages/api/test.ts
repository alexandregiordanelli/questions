import nc from 'next-connect'
import { NowRequest, NowResponse } from '@vercel/node'
import { createNodeMiddleware, createProbot, Probot } from "probot"

const handler = nc<NowRequest, NowResponse>()


handler.use(createNodeMiddleware((app)=>{
    console.log("opaaa")
    app.log('Yay, the app was loaded!')
    app.webhooks.onAny(()=>{
        console.log("aqui")
    })
    app.on('issue_comment', async (context) => {
        console.log(context)
    })
}, {
    probot: new Probot({
      appId: process.env.APP_ID,
      privateKey: process.env.PRIVATE_KEY,
      secret: process.env.WEBHOOK_SECRET,
    }),
}));

handler.post(async (req, res) => {
    res.send('oi')
})

export default handler