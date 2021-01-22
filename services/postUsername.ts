import { prisma } from '../prisma/prisma'

const postUsername = async (userId: number, username: string): Promise<string> => {
  const customer = await prisma.customer.update({
    data: {
      username,
    },
    where: {
      userId,
    },
  })

  return customer.username
}
export default postUsername
