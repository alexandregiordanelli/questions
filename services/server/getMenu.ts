import { prisma } from '../../prisma/prisma'
import { MenuWithQuestions } from '../../lib/types'

export const getMenu = async (notebookTag: string): Promise<MenuWithQuestions> => {
  const topicsOfNotebook = await prisma.topic.findMany({
    include: {
      subtopics: {
        include: {
          questionSubTopics: {
            include: {
              question: {
                select: {
                  tag: true,
                  id: true,
                  name: true,
                  rightAlternative: {
                    select: {
                      alternativeId: true,
                    },
                  },
                },
              },
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

  return topicsOfNotebook
}
