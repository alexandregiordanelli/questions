import { prisma } from '../../prisma/prisma'
import { QuestionWithAll } from '../../lib/types'
export const getQuestion = async (tag: string): Promise<QuestionWithAll> => {
  const question = await prisma.question.findUnique({
    where: {
      tag,
    },
    include: {
      alternatives: true,
      rightAlternative: true,
    },
  })

  return question
}
