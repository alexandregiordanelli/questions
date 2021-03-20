import { prisma } from '../../prisma/prisma'
import { NotebookWithTopicsAndSubTopics } from '../../lib/types'

export const getNotebookById = async (id: number): Promise<NotebookWithTopicsAndSubTopics> => {
  const notebook = await prisma.notebook.findUnique({
    where: {
      id,
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

export const getNotebookByTag = async (
  notebookTag: string
): Promise<NotebookWithTopicsAndSubTopics> => {
  const notebook = await prisma.notebook.findUnique({
    where: {
      tag: notebookTag,
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
