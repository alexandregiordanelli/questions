import { prisma } from '../../prisma/prisma'
import { NotebookWithTopicsAndSubTopics } from '../../lib/types'
import { getCustomerByTag } from './getCustomer'

export const getNotebook = async (
  customerId: number,
  notebookTag: string
): Promise<NotebookWithTopicsAndSubTopics> => {
  const notebook = await prisma.notebook.findUnique({
    where: {
      customerId_tag: {
        customerId: customerId,
        tag: notebookTag,
      },
    },
    include: {
      topics: {
        include: {
          subtopics: {
            orderBy: {
              order: 'asc',
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      },
      media: true,
    },
  })

  return notebook
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
          subtopics: {
            orderBy: {
              order: 'asc',
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      },
      media: true,
    },
  })

  return notebook
}
