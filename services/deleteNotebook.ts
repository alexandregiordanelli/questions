import { prisma } from '../prisma/prisma'
import { getCustomerByTag } from './getCustomer'

export const deleteNotebookById = async (notebookId: number): Promise<number> => {
  //https://github.com/prisma/prisma/issues/4650
  const nRowsUpdated = await prisma.$executeRaw`DELETE FROM Notebook WHERE id = ${notebookId};`

  return nRowsUpdated
}
export const deleteNotebookByTags = async (
  customerTag: string,
  notebookTag: string
): Promise<number> => {
  const customer = await getCustomerByTag(customerTag)
  //https://github.com/prisma/prisma/issues/4650
  const nRowsUpdated = await prisma.$executeRaw`DELETE FROM Notebook WHERE tag = ${notebookTag} AND customerId = ${customer.id};`

  return nRowsUpdated
}
