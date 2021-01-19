import { prisma } from '../prisma/prisma'
import { Notebook } from '@prisma/client'

const getNotebooks = async (): Promise<Notebook[]> => {
  const notebooks = await prisma.notebook.findMany()

  return notebooks
}
export default getNotebooks
