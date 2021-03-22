import { prisma } from '../../prisma/prisma'
import { MenuWithQuestions } from '../../lib/types'
import { Topic, SubTopic } from '@prisma/client'

export const getMenu = async (notebookTag: string): Promise<MenuWithQuestions> => {
  const topicsOfNotebook = await prisma.topic.findMany({
    include: {
      subtopics: {
        include: {
          questions: {
            select: {
              tag: true,
              id: true,
              rightAlternative: {
                select: {
                  alternativeId: true,
                },
              },
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

  const questionsWithoutSubTopic = await prisma.question.findMany({
    select: {
      id: true,
      tag: true,
      rightAlternative: {
        select: {
          alternativeId: true,
        },
      },
      notebookId: true,
    },
    orderBy: {
      order: 'asc',
    },
    where: {
      subTopicId: null,
      notebook: {
        tag: notebookTag,
      },
    },
  })

  if (questionsWithoutSubTopic.length > 0) {
    const topicsWithquestionsWithoutSubTopic: Topic & {
      notebook: {
        tag: string
      }
      subtopics: (SubTopic & {
        questions: {
          id: number
          tag: string
          rightAlternative: {
            alternativeId: number
          }
        }[]
      })[]
    } = {
      createdAt: null,
      id: 0,
      name: 'No Subject',
      notebookId: questionsWithoutSubTopic[0].notebookId,
      notebook: {
        tag: notebookTag,
      },
      order: 99,
      updatedAt: null,
      subtopics: [
        {
          createdAt: null,
          updatedAt: null,
          id: 0,
          name: 'All',
          order: 0,
          topicId: 0,
          questions: questionsWithoutSubTopic,
        },
      ],
    }

    return topicsOfNotebook.concat(topicsWithquestionsWithoutSubTopic)
  }

  return topicsOfNotebook
}
