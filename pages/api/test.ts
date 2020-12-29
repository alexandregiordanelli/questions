import nc from 'next-connect'
import { NowRequest, NowResponse } from '@vercel/node'
import { createNodeMiddleware, createProbot, Probot } from "probot"

const handler = nc<NowRequest, NowResponse>()

console.log(process.env)

handler.use(createNodeMiddleware((app)=>{
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

handler.get(async (req, res) => {
    res.send('oi')
})

export default handler