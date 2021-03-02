import { VercelApiHandler } from '@vercel/node'
import postCustomer from 'services/server/postCustomer'
import { Customer } from '@prisma/client'
import {
  getCustomerByTag,
  getCustomerNotebooksByTag,
  getCustomerByUserId,
} from 'services/server/getCustomer'
import postNotebook from 'services/server/postNotebook'
import { NotebookWithTopicsAndSubTopics, QuestionWithAll } from 'lib/types'
import postQuestion from 'services/server/postQuestion'
import { getNotebookByTags } from 'services/server/getNotebook'
import { getQuestionByTags } from 'services/server/getQuestion'
import admin from 'lib/firebase-server'
import { deleteCustomerByTag } from 'services/server/deleteCustomer'
import { deleteNotebookByTags } from 'services/server/deleteNotebook'
import { deleteQuestionByTags } from 'services/server/deleteQuestion'
import getQuestions from 'services/server/getQuestions'
import jwt from 'jsonwebtoken'
import { getNotebooks } from 'services/server/getNotebooks'

const Controller: VercelApiHandler = async (req, res) => {
  try {
    const tags = (req.query.tags as string[]) ?? []

    const [customerTag, notebookTag, questionTag] = tags

    if (req.method == 'POST') {
      const isBearer = req.headers.authorization?.startsWith('Bearer')

      const tokenHeader = req.cookies.token
        ? req.cookies.token
        : isBearer
        ? req.headers.authorization.substring('Bearer '.length)
        : req.headers.authorization.substring('Apikey '.length)

      const token = isBearer
        ? await admin.auth().verifyIdToken(tokenHeader)
        : (jwt.verify(tokenHeader, 'questionsof') as {
            uid: string
          })

      if (tags.length > 0 && tags.length < 3) {
        const customer = await getCustomerByTag(customerTag)
        if (!customer) {
          throw new Error(`customer not exists`)
        }

        if (customer.userId != token.uid) {
          throw new Error(`user not authorized to use this endpoint`)
        }

        if (tags.length == 1) {
          const _notebook = req.body as NotebookWithTopicsAndSubTopics
          _notebook.customerId = customer.id
          const notebook = await postNotebook(_notebook)
          res.send(notebook)
        } else if (tags.length == 2) {
          const _notebook = await getNotebookByTags(customerTag, notebookTag)
          const _question = req.body as QuestionWithAll
          _question.notebookId = _notebook.id
          const question = await postQuestion(_question)
          res.send(question)
        }
      } else if (tags.length == 0) {
        const _customer = req.body as Customer
        if (_customer.userId != token.uid && token.uid != 'admin') {
          throw new Error(`user not authorized to use this endpoint`)
        }
        const customer = await postCustomer(_customer)
        res.send(customer)
      } else {
        throw new Error('more tags than necessary')
      }
    } else if (req.method == 'GET') {
      if (tags.length == 0) {
        const tokenHeader = req.cookies.token
          ? req.cookies.token
          : req.headers.authorization.substring('Bearer '.length)
        const token = await admin.auth().verifyIdToken(tokenHeader)
        const customer = await getCustomerByUserId(token.uid)
        res.send(customer)
      } else if (tags.length == 1) {
        if (req.query.notebooks) {
          if (customerTag == 'admin') {
            const notebooks = await getNotebooks()
            res.send(notebooks)
          } else {
            const customer = await getCustomerNotebooksByTag(customerTag)
            if (customer) res.send(customer)
            else throw new Error('not found')
          }
        } else if (req.query.questions) {
          const questions = await getQuestions(customerTag)
          if (questions) res.send(questions)
          else throw new Error('not found')
        } else {
          const customer = await getCustomerByTag(customerTag)
          if (customer) res.send(customer)
          else throw new Error('not found')
        }
      } else if (tags.length == 2) {
        const notebook = await getNotebookByTags(customerTag, notebookTag)
        if (notebook) res.send(notebook)
        else throw new Error('not found')
      } else if (tags.length == 3) {
        const question = await getQuestionByTags(customerTag, notebookTag, questionTag)
        if (question) res.send(question)
        else throw new Error('not found')
      } else {
        throw new Error('more/less tags than necessary')
      }
    } else if (req.method == 'DELETE') {
      const tokenHeader = req.cookies.token
        ? req.cookies.token
        : req.headers.authorization.substring('Bearer '.length)
      const token = await admin.auth().verifyIdToken(tokenHeader)

      if (tags.length > 0 && tags.length < 4) {
        const customer = await getCustomerByTag(customerTag)
        if (!customer) {
          throw new Error(`customer not exists`)
        }

        if (customer.userId != token.uid) {
          throw new Error(`user not authorized to use this endpoint`)
        }

        if (tags.length == 1) {
          const nRowsUpdated = await deleteCustomerByTag(customerTag)
          res.send(nRowsUpdated)
        } else if (tags.length == 2) {
          const nRowsUpdated = await deleteNotebookByTags(customerTag, notebookTag)
          res.send(nRowsUpdated)
        } else if (tags.length == 3) {
          const nRowsUpdated = await deleteQuestionByTags(customerTag, notebookTag, questionTag)
          res.send(nRowsUpdated)
        }
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
