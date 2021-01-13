import { Notebook } from '@prisma/client'
import { NowRequest, NowResponse } from '@vercel/node'
import { NotebookOnRepo, NotebookWithTopicsAndSubTopics } from '../../../lib/types'
import deleteNotebook from '../../../services/deleteNotebook'
import getNotebook from '../../../services/getNotebook'
import postNotebook from '../../../services/postNotebook'

export default async function (req: NowRequest, res: NowResponse) {
    const notebookTag = req.query.notebookTag as string[]

        try{
        if(req.method == "GET" && notebookTag.length == 1){

            const notebook = await getNotebook(notebookTag[0])

            if(notebook)
                res.json(notebook)
            throw new Error(`notebook ${notebookTag} not exists`)

        } else if(req.method == "POST"){

            const notebookOnRepo = req.body as NotebookWithTopicsAndSubTopics
            const notebook = await postNotebook(notebookOnRepo)

            res.json(notebook)

        } else if(req.method == "DELETE"){
            
            const notebookId = req.body.notebookId as number
            const nRowsUpdated = await deleteNotebook(notebookId)

            res.json(nRowsUpdated) 
        } else {
            throw new Error(`${req.method} not exists`)
        }
    } catch(e){
        console.log(e)
    }
}

