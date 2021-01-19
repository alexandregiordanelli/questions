import { prisma } from '../prisma/prisma'

const deleteNotebook = async (notebookId: number): Promise<number> => {
  //https://github.com/prisma/prisma/issues/4650
  const nRowsUpdated = await prisma.$executeRaw`DELETE FROM Notebook WHERE id = ${notebookId};`

  return nRowsUpdated
}
export default deleteNotebook
