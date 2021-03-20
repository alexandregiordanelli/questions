import { prisma } from '../../prisma/prisma'
import { Subscriber } from '@prisma/client'
import { getSubscriberByCustomerId } from './getSubscriberByCustomerId'
import { MyNotebooks } from 'lib/types'

export const postSubscriber = async (_subscriber: Subscriber): Promise<MyNotebooks> => {
  await prisma.subscriber.create({
    data: {
      customerId: _subscriber.customerId,
      notebookId: _subscriber.notebookId,
    },
  })

  return getSubscriberByCustomerId(_subscriber.customerId)
}
