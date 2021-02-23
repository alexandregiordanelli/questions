import { VercelApiHandler } from '@vercel/node'
import admin from 'lib/firebase-server'
import { getCustomerByUserId } from 'services/server/getCustomer'
import { Media } from '@prisma/client'
import postMedias from 'services/server/postMedias'
import { getMedias } from 'services/server/getMedias'

const MediaController: VercelApiHandler = async (req, res) => {
  const tokenHeader = req.cookies.token
    ? req.cookies.token
    : req.headers.authorization.substring('Bearer '.length)
  const token = await admin.auth().verifyIdToken(tokenHeader)

  const customer = await getCustomerByUserId(token.uid)

  if (req.method == 'POST') {
    const medias = req.body as Media[]

    if (medias[0].customerId != customer.id) {
      throw new Error(`customerId is different of others customerId from list.`)
    }

    res.send(await postMedias(medias))
  } else if (req.method == 'GET') {
    const medias = await getMedias(customer.id)
    res.send(medias)
  }
}

export default MediaController
