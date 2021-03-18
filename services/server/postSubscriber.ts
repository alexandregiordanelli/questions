import { prisma } from '../../prisma/prisma'
import { Subscriber } from '@prisma/client'
import { getSubscriberByCustomerId } from './getSubscriberByCustomerId'

export const postSubscriber = async (_subscriber: Subscriber): Promise<Subscriber[]> => {
  await prisma.subscriber.create({
    data: {
      customerId: _subscriber.customerId,
      notebookId: _subscriber.notebookId,
    },
  })

  return getSubscriberByCustomerId(_subscriber.customerId)
}
