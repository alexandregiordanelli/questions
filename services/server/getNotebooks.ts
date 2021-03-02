import { prisma } from '../../prisma/prisma'
import { Media, Notebook } from '@prisma/client'

export const getNotebooks = async (): Promise<
  (Notebook & {
    media: Media
    customer: {
      tag: string
    }
  })[]
> => {
  const notebooks = await prisma.notebook.findMany({
    include: {
      media: true,
      customer: {
        select: {
          tag: true,
        },
      },
    },
  })

  return notebooks
}
