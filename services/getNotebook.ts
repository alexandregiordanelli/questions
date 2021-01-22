import { prisma } from '../prisma/prisma'
import { CustomerWithNotebook, NotebookWithTopicsAndSubTopics } from '../lib/types'
import { getCustomerByTag } from './getCustomer'

const getNotebook = async (
  customerId: number,
  notebookTag?: string
): Promise<CustomerWithNotebook> => {
  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
    include: {
      notebooks: {
        where: {
          tag: notebookTag ?? '',
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

export const getNotebookByTags = async (
  customerTag: string,
  notebookTag: string
): Promise<NotebookWithTopicsAndSubTopics> => {
  const customer = await getCustomerByTag(customerTag)

  const notebook = await prisma.notebook.findUnique({
    where: {
      customerId_tag: {
        tag: notebookTag,
        customerId: customer.id,
      },
    },
    include: {
      topics: {
        include: {
          subtopics: true,
        },
      },
    },
  })

  return notebook
}

export default getNotebook
