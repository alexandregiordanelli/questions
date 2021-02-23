import { prisma } from '../../prisma/prisma'
import { QuestionWithAll } from '../../lib/types'

const getQuestions = async (customerTag: string): Promise<QuestionWithAll[]> => {
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
        select: {
          name: true,
          tag: true,
        },
      },
    },
  })

  return questions
}
export default getQuestions