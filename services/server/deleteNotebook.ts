import { prisma } from '../../prisma/prisma'

export const deleteNotebookById = async (notebookId: number): Promise<number> => {
  //https://github.com/prisma/prisma/issues/4650
  const nRowsUpdated = await prisma.$executeRaw`DELETE FROM Notebook WHERE id = ${notebookId};`

  return nRowsUpdated
}
export const deleteNotebookByTag = async (notebookTag: string): Promise<number> => {
  //https://github.com/prisma/prisma/issues/4650
  const nRowsUpdated = await prisma.$executeRaw`DELETE FROM Notebook WHERE tag = ${notebookTag};`

  return nRowsUpdated
}
