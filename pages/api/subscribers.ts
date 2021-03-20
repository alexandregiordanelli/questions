import { VercelApiHandler } from '@vercel/node'
import admin from 'lib/firebase-server'
import { getCustomerByUserId } from 'services/server/getCustomer'
import { Subscriber } from '@prisma/client'
import { postSubscriber } from 'services/server/postSubscriber'
import { getSubscriberByCustomerId } from 'services/server/getSubscriberByCustomerId'

const SubscriberController: VercelApiHandler = async (req, res) => {
  const tokenHeader = req.cookies.token
    ? req.cookies.token
    : req.headers.authorization.substring('Bearer '.length)
  const token = await admin.auth().verifyIdToken(tokenHeader)

  const customer = await getCustomerByUserId(token.uid)

  if (req.method == 'POST') {
    const subscriber = req.body as Subscriber

    if (subscriber.customerId != customer.id) {
      throw new Error(`customerId is different of others customerId from list.`)
    }

    res.send(await postSubscriber(subscriber))
  } else if (req.method == 'GET') {
    const subscribers = await getSubscriberByCustomerId(customer.id)
    res.send(subscribers)
  }
}

export default SubscriberController
