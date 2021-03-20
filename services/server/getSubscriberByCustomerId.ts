import { prisma } from '../../prisma/prisma'
import { MyNotebooks } from 'lib/types'

export const getSubscriberByCustomerId = async (_customerId: number): Promise<MyNotebooks> => {
  const subscribers = await prisma.subscriber.findMany({
    where: {
      customerId: _customerId,
    },
    include: {
      notebook: {
        include: {
          media: true,
          customer: {
            include: {
              media: true,
            },
          },
        },
      },
    },
  })

  return subscribers
}
