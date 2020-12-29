import { NowResponse } from "@vercel/node";
import { Probot } from "probot";
import { ApplicationFunction } from "probot/lib/types";
import { ProbotRequest } from "./types";
import { WebhookEvents } from "@octokit/webhooks";

export const probotMiddleWare = (appFn: ApplicationFunction) => async (req: ProbotRequest, res: NowResponse, next: () => void) => {
    if (req.probot) {
        return next()
    }
    
    req.probot = new Probot({
        appId: process.env.GITHUB_APP_APP_ID,
        privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
        secret: process.env.GITHUB_APP_WEBHOOK_SECRET,
    })

    req.probot.load(appFn);

    const id = (req.headers['x-github-delivery'] || req.headers['X-GitHub-Delivery']) as string
    const name = (req.headers['x-github-event'] || req.headers['X-GitHub-Event']) as WebhookEvents

    await req.probot.receive({
        id,
        name,
        payload: req.body
    });

    next()
}