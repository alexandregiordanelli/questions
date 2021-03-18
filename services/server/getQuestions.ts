import { prisma } from '../../prisma/prisma'
import { QuestionWithAll } from '../../lib/types'

export const getQuestions = async (customerTag: string): Promise<QuestionWithAll[]> => {
  const questions = await prisma.question.findMany({
    where: {
      notebook: {
        customer: {
          tag: customerTag,
        },
      },
    },
    include: {
      alternatives: true,
      rightAlternative: true,
      subTopic: true,
      notebook: {
        include: {
          media: true,
        },
      },
    },
    orderBy: [
      {
        notebook: {
          name: 'asc',
        },
      },
      {
        subTopic: {
          topic: {
            order: 'asc',
          },
        },
      },
      {
        subTopic: {
          order: 'asc',
        },
      },
      {
        order: 'asc',
      },
    ],
  })

  return questions
}
