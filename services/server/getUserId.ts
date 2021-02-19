import { prisma } from '../../prisma/prisma'

export const getCustomerIdByUsername = async (tag: string): Promise<number> => {
  const customer = await prisma.customer.findUnique({
    where: {
      tag,
    },
    select: {
      id: true,
    },
  })

  return customer.id
}
