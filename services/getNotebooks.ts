import { prisma } from '../prisma/prisma'
import { CustomerWithNotebooks } from '../lib/types'

const getNotebooks = async (customerId: number): Promise<CustomerWithNotebooks> => {
  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
    include: {
      notebooks: {
        include: {
          topics: {
            include: {
              subtopics: true,
            },
          },
        },
      },
    },
  })

  return customer
}
export default getNotebooks
