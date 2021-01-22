import { prisma } from '../prisma/prisma'

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
