import { prisma } from '../prisma/prisma'
import { QuestionWithAll } from '../lib/types'
import { getNotebookByTags } from './getNotebook'
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
      subTopic: true,
    },
  })

  return question
}

export const getQuestionByTags = async (
  customerTag: string,
  notebookTag: string,
  questionTag: string
): Promise<QuestionWithAll> => {
  const notebook = await getNotebookByTags(customerTag, notebookTag)

  const question = await prisma.question.findUnique({
    where: {
      notebookId_tag: {
        notebookId: notebook.id,
        tag: questionTag,
      },
    },
    include: {
      alternatives: true,
      rightAlternative: true,
      subTopic: true,
    },
  })

  return question
}
export default getQuestion
