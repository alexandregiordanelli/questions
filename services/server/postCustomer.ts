import { prisma } from '../../prisma/prisma'
import { Customer } from '@prisma/client'

const postCustomer = async (_customer: Customer): Promise<Customer> => {
  const customer = await prisma.customer.upsert({
    create: {
      tag: _customer.tag,
      userId: _customer.userId,
      name: _customer.name,
      media: {
        create: {
          ext: 'jpg',
          mime: 'image/jpeg',
          name: 'profile.jpg',
          size: 0,
          tag: 'profile.jpg',
        },
      },
    },
    update: {
      tag: _customer.tag,
      mediaId: _customer.mediaId,
      name: _customer.name,
    },
    where: {
      id: _customer.id ?? 0,
    },
  })

  return customer
}
export default postCustomer
