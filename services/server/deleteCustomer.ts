import { prisma } from '../../prisma/prisma'

export const deleteCustomerById = async (customerId: number): Promise<number> => {
  //https://github.com/prisma/prisma/issues/4650
  const nRowsUpdated = await prisma.$executeRaw`DELETE FROM Customer WHERE id = ${customerId};`

  return nRowsUpdated
}
export const deleteCustomerByUserId = async (userId: string): Promise<number> => {
  //https://github.com/prisma/prisma/issues/4650
  const nRowsUpdated = await prisma.$executeRaw`DELETE FROM Customer WHERE userId = ${userId};`

  return nRowsUpdated
}

export const deleteCustomerByTag = async (customerTag: string): Promise<number> => {
  //https://github.com/prisma/prisma/issues/4650
  const nRowsUpdated = await prisma.$executeRaw`DELETE FROM Customer WHERE tag = ${customerTag};`

  return nRowsUpdated
}
