import { prisma } from '../prisma/prisma'
import { CustomerWithNotebook } from '../lib/types'

const getNotebook = async (
  customerId?: number,
  notebookTag?: string
): Promise<CustomerWithNotebook> => {
  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
    include: {
      notebooks: {
        where: {
          tag: notebookTag,
        },
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

  const customerWithOneNotebook: CustomerWithNotebook = {
    id: customer.id,
    userId: customer.userId,
    username: customer.username,
    notebook: customer.notebooks.length == 1 ? customer.notebooks[0] : null,
  }

  return customerWithOneNotebook
}
export default getNotebook
