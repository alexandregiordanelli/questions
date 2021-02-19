import { VercelApiHandler } from '@vercel/node'
import admin from 'lib/firebase-server'
import { getCustomerByUserId } from 'services/server/getCustomer'
import { Media } from '@prisma/client'
import postMedias from 'services/server/postMedias'

const MediaController: VercelApiHandler = async (req, res) => {
  if (req.method == 'POST') {
    const tokenHeader = req.cookies.token
      ? req.cookies.token
      : req.headers.authorization.substring('Bearer '.length)
    const token = await admin.auth().verifyIdToken(tokenHeader)

    const customer = await getCustomerByUserId(token.uid)
    const medias = req.body as Media[]

    if (medias[0].customerId != customer.id) {
      throw new Error(`customerId is different of others customerId from list.`)
    }

    res.send(await postMedias(medias))
  }
}

export default MediaController
