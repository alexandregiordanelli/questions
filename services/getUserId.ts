import { prisma } from '../prisma/prisma'

export const getUserIdByAccessToken = async (accessToken: string): Promise<number> => {
  const session = await prisma.session.findUnique({
    where: {
      accessToken: accessToken,
    },
    select: {
      userId: true,
    },
  })

  return session.userId
}

export const getCustomerIdByUsername = async (username: string): Promise<number> => {
  const customer = await prisma.customer.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  })

  return customer.id
}
