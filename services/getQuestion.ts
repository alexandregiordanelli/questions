import { prisma } from '../prisma/prisma'
import { QuestionWithAll } from '../lib/types'
export const getQuestion = async (notebookId: number, tag: string): Promise<QuestionWithAll> => {
  const question = await prisma.question.findUnique({
    where: {
      notebookId_tag: {
        notebookId: notebookId,
        tag: tag,
      },
    },
    include: {
      alternatives: true,
      rightAlternative: true,
      notebook: true,
      subTopic: true,
    },
  })

  return question
}
export default getQuestion
