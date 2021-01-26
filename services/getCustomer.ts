import { prisma } from '../prisma/prisma'
import { Customer } from '@prisma/client'
import { CustomerWithNotebooks } from 'lib/types'
export const getCustomerByUserId = async (userId: string): Promise<Customer> => {
  const customer = await prisma.customer.findUnique({
    where: {
      userId,
    },
  })

  return customer
}

export const getCustomerById = async (id: number): Promise<Customer> => {
  const customer = await prisma.customer.findUnique({
    where: {
      id,
    },
  })

  return customer
}

export const getCustomerNotebooksByTag = async (
  customerTag: string
): Promise<CustomerWithNotebooks> => {
  const customer = await prisma.customer.findUnique({
    where: {
      username: customerTag,
    },
    include: {
      notebooks: true,
    },
  })

  return customer
}

export const getCustomerByTag = async (username: string): Promise<Customer> => {
  const customer = await prisma.customer.findUnique({
    where: {
      username,
    },
  })

  return customer
}
