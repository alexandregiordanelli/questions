import { NowRequest, NowResponse } from '@vercel/node'
import postNotebook from '../../services/postNotebook'
import { readFile } from 'fs/promises'
import { parseQuestionMd, parseReadMd } from '../../lib/utils'
import { resolve } from 'path'
import postQuestion from '../../services/postQuestion'
export default async function (req: NowRequest, res: NowResponse) {
    
    //const questionsof = req.query.questionsof as string

    

    // const md = (await readFile(resolve('./public', 'README.md'))).toString()
    // const notebookOnRepo = await parseReadMd(md)
    // const notebook = await postNotebook(notebookOnRepo)

    const md = (await readFile(resolve('./public', '985/985.md'))).toString()
    const questionOnRepo = await parseQuestionMd(md)
    const question = await postQuestion(1, questionOnRepo, '985/985.md')
   
    res.send('sucesso')
}