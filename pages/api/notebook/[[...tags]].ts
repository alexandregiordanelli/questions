import { NowRequest, NowResponse } from '@vercel/node'
import { NotebookWithTopicsAndSubTopics, SessionWithCustomer } from '../../../lib/types'
import deleteNotebook from '../../../services/deleteNotebook'
import getNotebook from '../../../services/getNotebook'
import postNotebook from '../../../services/postNotebook'
import { getSession } from 'next-auth/client'
import { getCustomerIdByUsername } from '../../../services/getUserId'

const NotebookController = async (req: NowRequest, res: NowResponse): Promise<void> => {
  try {
    const tags = req.query.tags as string[]

    if (req.method == 'GET' && tags.length == 2) {
      const customerTag = tags[0]
      const notebookTag = tags[1]

      const customerId = await getCustomerIdByUsername(customerTag)
      const notebook = await getNotebook(customerId, notebookTag)

      if (notebook) res.json(notebook)
      else throw new Error(`notebook ${notebookTag} not exists`)
    } else if (req.method == 'POST') {
      const session: SessionWithCustomer = await getSession({ req })

      if (!session || new Date(session.expires) < new Date()) {
        throw new Error(`token's expired`)
      }

      const notebookOnRepo = req.body as NotebookWithTopicsAndSubTopics
      notebookOnRepo.customerId = session.customer.id
      const notebook = await postNotebook(notebookOnRepo)

      res.json(notebook)
    } else if (req.method == 'DELETE') {
      const session = await getSession({ req })

      if (!session || new Date(session.expires) < new Date()) {
        throw new Error(`token's expired`)
      }

      const notebookId = req.body.notebookId as number
      const nRowsUpdated = await deleteNotebook(notebookId)

      res.json(nRowsUpdated)
    } else {
      throw new Error(`${req.method} not exists`)
    }
  } catch (e) {
    console.log(e)
    res.end(e.toString())
  }
}

export default NotebookController
