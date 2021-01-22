import { NowRequest, NowResponse } from '@vercel/node'
import { getSession } from 'next-auth/client'
import { getUserIdByAccessToken } from 'services/getUserId'
import postUsername from 'services/postUsername'

const CustomerController = async (req: NowRequest, res: NowResponse): Promise<void> => {
  if (req.method == 'POST') {
    const session = await getSession({ req })

    if (!session || new Date(session.expires) < new Date()) {
      throw new Error(`token's expired`)
    }

    const userId = await getUserIdByAccessToken(session.accessToken)

    const username = req.body as string

    const newUsername = await postUsername(userId, username)

    res.json(newUsername)
  } else {
    throw new Error(`${req.method} not exists`)
  }
}
export default CustomerController
