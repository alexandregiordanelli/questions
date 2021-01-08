import { NowRequest, NowResponse } from '@vercel/node'
import { NotebookOnRepo } from '../../../lib/types'
import deleteNotebook from '../../../services/deleteNotebook'
import getNotebook from '../../../services/getNotebook'
import postNotebook from '../../../services/postNotebook'

export default async function (req: NowRequest, res: NowResponse) {
    const notebookSlug = req.query.notebookSlug as string[]

    if(req.method == "GET" && notebookSlug.length == 1){

        const notebook = await getNotebook(notebookSlug[0])

        res.json(notebook) 

    } else if(req.method == "POST"){

        const notebookOnRepo = req.body as NotebookOnRepo
        const notebook = await postNotebook(notebookOnRepo)

        res.json(notebook)

    } else if(req.method == "DELETE"){
        
        const notebookId = req.body.notebookId as number
        const notebook = await deleteNotebook(notebookId)

        res.json(notebook) 
    } else {
        throw new Error(`${req.method} not exists`)
    }
}


