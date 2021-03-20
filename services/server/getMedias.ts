import { prisma } from '../../prisma/prisma'
import { Media } from '@prisma/client'

export const getMedias = async (customerId: number): Promise<Media[]> => {
  const medias = await prisma.media.findMany({
    where: {
      customerId,
    },
    orderBy: {
      id: 'desc',
    },
  })

  return medias
}
