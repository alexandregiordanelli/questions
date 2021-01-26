import { prisma } from '../prisma/prisma'
import { getNotebookByTags } from './getNotebook'

export const deleteQuestionById = async (questionId: number): Promise<number> => {
  //https://github.com/prisma/prisma/issues/4650
  const nRowsUpdated = await prisma.$executeRaw`DELETE FROM Question WHERE id = ${questionId};`

  return nRowsUpdated
}

export const deleteQuestionByTags = async (
  customerTag: string,
  notebookTag: string,
  questionTag: string
): Promise<number> => {
  const notebook = await getNotebookByTags(customerTag, notebookTag)
  //https://github.com/prisma/prisma/issues/4650
  const nRowsUpdated = await prisma.$executeRaw`DELETE FROM Question WHERE notebookId = ${notebook.id} AND tag = ${questionTag};`

  return nRowsUpdated
}
