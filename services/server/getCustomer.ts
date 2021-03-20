import { prisma } from '../../prisma/prisma'
import { Customer, Media } from '@prisma/client'
import { CustomerWithNotebooks } from 'lib/types'
export const getCustomerByUserId = async (userId: string): Promise<Customer & { media: Media }> => {
  const customer = await prisma.customer.findUnique({
    where: {
      userId,
    },
    include: {
      media: true,
    },
  })

  return customer
}

export const getCustomerById = async (id: number): Promise<Customer & { media: Media }> => {
  const customer = await prisma.customer.findUnique({
    where: {
      id,
    },
    include: {
      media: true,
    },
  })

  return customer
}

export const getCustomerNotebooksByTag = async (
  customerTag: string
): Promise<CustomerWithNotebooks> => {
  const customer = await prisma.customer.findUnique({
    where: {
      tag: customerTag,
    },
    include: {
      media: true,
      notebooks: {
        include: {
          media: true,
        },
      },
    },
  })

  return customer
}

export const getCustomerByTag = async (tag: string): Promise<Customer & { media: Media }> => {
  const customer = await prisma.customer.findUnique({
    where: {
      tag,
    },
    include: {
      media: true,
    },
  })

  return customer
}
