import { prisma } from '../../prisma/prisma'
import { Subscriber } from '@prisma/client'

export const getSubscriberByCustomerId = async (_customerId: number): Promise<Subscriber[]> => {
  const subscribers = await prisma.subscriber.findMany({
    where: {
      customerId: _customerId,
    },
  })

  return subscribers
}
