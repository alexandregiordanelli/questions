import { VercelApiHandler } from '@vercel/node'
import postCustomer from 'services/postCustomer'
import { Customer } from '@prisma/client'
import { getCustomerByTag } from 'services/getCustomer'
import postNotebook from 'services/postNotebook'
import { NotebookWithTopicsAndSubTopics, QuestionWithAll } from 'lib/types'
import postQuestion from 'services/postQuestion'
import { getNotebookByTags } from 'services/getNotebook'
import { getQuestionByTags } from 'services/getQuestion'
import admin from 'lib/firebase-server'

const Controller: VercelApiHandler = async (req, res) => {
  try {
    const tags = (req.query.tags as string[]) ?? []

    const [customerTag, notebookTag, questionTag] = tags

    if (req.method == 'POST') {
      const tokenHeader = req.headers.authorization.substring('Bearer '.length) || req.cookies.token
      const token = await admin.auth().verifyIdToken(tokenHeader)

      if (tags.length == 0) {
        const _customer = req.body as Customer
        _customer.userId = token.uid
        const customer = await postCustomer(_customer)
        res.json(customer)
      } else if (tags.length == 1) {
        const customer = await getCustomerByTag(customerTag)
        if (customer.userId != token.uid) {
          throw new Error(`user not authorized to use this endpoint`)
        }
        const _notebook = req.body as NotebookWithTopicsAndSubTopics
        _notebook.customerId = customer.id
        const notebook = await postNotebook(_notebook)
        res.json(notebook)
      } else if (tags.length == 2) {
        const customer = await getCustomerByTag(customerTag)
        if (customer.userId != token.uid) {
          throw new Error(`user not authorized to use this endpoint`)
        }
        const _notebook = await getNotebookByTags(customerTag, notebookTag)
        const _question = req.body as QuestionWithAll
        _question.notebookId = _notebook.id
        const question = await postQuestion(_question)
        res.json(question)
      } else {
        throw new Error('more tags than necessary')
      }
    } else if (req.method == 'GET') {
      if (tags.length == 1) {
        const customer = await getCustomerByTag(customerTag)
        res.json(customer)
      } else if (tags.length == 2) {
        const notebook = await getNotebookByTags(customerTag, notebookTag)
        res.json(notebook)
      } else if (tags.length == 3) {
        const question = await getQuestionByTags(customerTag, notebookTag, questionTag)
        res.json(question)
      } else {
        throw new Error('more/less tags than necessary')
      }
    } else {
      throw new Error('method is not available')
    }
  } catch (e) {
    res.status(500).send(e.message)
  }
}
export default Controller
