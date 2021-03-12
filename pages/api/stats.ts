import { VercelApiHandler } from '@vercel/node'
import admin from 'lib/firebase-server'
import { getCustomerByUserId } from 'services/server/getCustomer'
import { ChosenAlternative } from '@prisma/client'
import { getChosenAlternatives } from 'services/server/getChosenAlternatives'
import { postChosenAlternative } from 'services/server/postChosenAlternative'

const StatsController: VercelApiHandler = async (req, res) => {
  const tokenHeader = req.cookies.token
    ? req.cookies.token
    : req.headers.authorization.substring('Bearer '.length)
  const token = await admin.auth().verifyIdToken(tokenHeader)

  const customer = await getCustomerByUserId(token.uid)

  if (req.method == 'POST') {
    const chosenAlternative = req.body as ChosenAlternative

    if (chosenAlternative.customerId != customer.id) {
      throw new Error(`customerId is different of others customerId from list.`)
    }

    res.send(await postChosenAlternative(chosenAlternative))
  } else if (req.method == 'GET') {
    const chosenAlternatives = await getChosenAlternatives(customer.id)
    res.send(chosenAlternatives)
  }
}

export default StatsController
