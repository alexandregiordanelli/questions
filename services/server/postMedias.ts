import { prisma } from '../../prisma/prisma'
import { Media } from '@prisma/client'

const postMedias = async (medias: Media[]): Promise<boolean> => {
  const batch: unknown[] = []

  const customerId = medias[0].customerId

  for (const _file of medias) {
    if (_file.customerId != customerId) {
      throw new Error(`customerId is different of others customerId from list.`)
    }
    delete _file.id
    const media = prisma.media.create({
      data: _file,
    })

    batch.push(media)
  }

  const media = await prisma.$transaction(batch)

  return !!media
}
export default postMedias
