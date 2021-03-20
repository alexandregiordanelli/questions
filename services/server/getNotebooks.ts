import { prisma } from '../../prisma/prisma'
import { Customer, Media, Notebook } from '@prisma/client'

export const getNotebooks = async (): Promise<
  (Notebook & {
    media: Media
    customer: Customer & {
      media: Media
    }
  })[]
> => {
  const notebooks = await prisma.notebook.findMany({
    include: {
      media: true,
      customer: {
        include: {
          media: true,
        },
      },
    },
  })

  return notebooks
}
