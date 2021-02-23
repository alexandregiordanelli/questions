import { prisma } from '../../prisma/prisma'
import { CustomerWithNotebooks } from '../../lib/types'

export const getCustomers = async (): Promise<CustomerWithNotebooks[]> => {
  const customers = await prisma.customer.findMany({
    include: {
      notebooks: {
        include: {
          media: true,
        },
      },
    },
  })

  return customers
}
