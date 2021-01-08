import { NowRequest, NowResponse } from '@vercel/node'
import { NotebookOnRepo } from '../../../lib/types'
import deleteNotebook from '../../../services/deleteNotebook'
import getNotebook from '../../../services/getNotebook'
import postNotebook from '../../../services/postNotebook'
import putNotebook from '../../../services/putNotebook'

export default async function (req: NowRequest, res: NowResponse) {
    const notebookSlug = req.query.notebookSlug as string[]

    if(req.method == "GET" && notebookSlug.length == 1){
        const notebook = await getNotebook(notebookSlug[0])

        res.json(notebook) 

    } else if(req.method == "POST"){

        const notebookOnRepo = req.body.notebookOnRepo as NotebookOnRepo
        const notebook = await postNotebook(notebookOnRepo)

        res.json(notebook) 

    } else if(req.method == "PUT"){

        const notebookId = req.body.notebookId as number
        const notebookOnRepo = req.body.notebookOnRepo as NotebookOnRepo
        const [batch1, batch2, notebook] = await putNotebook(notebookId, notebookOnRepo)

        res.json(notebook) 

    } else if(req.method == "DELETE"){
        
        const notebookId = req.body.notebookId as number
        const notebook = await deleteNotebook(notebookId)

        res.json(notebook) 
    } else {
        res.send('not match')
    }
}


