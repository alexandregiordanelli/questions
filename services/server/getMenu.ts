import { prisma } from '../../prisma/prisma'
import { MenuWithQuestions } from '../../lib/types'

export const getMenu = async (notebookTag: string): Promise<MenuWithQuestions> => {
  const topicsOfNotebook = await prisma.topic.findMany({
    include: {
      subtopics: {
        include: {
          questions: {
            select: {
              tag: true,
            },
            orderBy: {
              order: 'asc',
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      },
      notebook: {
        select: {
          tag: true,
        },
      },
    },
    where: {
      notebook: {
        tag: notebookTag,
      },
    },
    orderBy: {
      order: 'asc',
    },
  })

  // topicsOfNotebook.forEach((x) => {
  //   x.subtopics.forEach((y) => {
  //     if (y.questions.length) y.questions[0].tag = notebookTag + '/' + y.questions[0].tag
  //   })
  // })

  return topicsOfNotebook
}
