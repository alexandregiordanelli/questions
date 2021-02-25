import { prisma } from '../../prisma/prisma'
import { Customer } from '@prisma/client'

const postCustomer = async (_customer: Customer): Promise<Customer> => {
  let customer = await prisma.customer.upsert({
    create: {
      tag: _customer.tag,
      userId: _customer.userId,
      name: _customer.name,
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

  if (_customer.id != customer.id) {
    const media = await prisma.media.create({
      data: {
        customerId: customer.id,
        ext: 'jpg',
        mime: 'image/jpeg',
        name: 'profile.jpg',
        size: 0,
        tag: 'profile.jpg',
      },
    })

    customer = await prisma.customer.update({
      data: {
        mediaId: media.id,
      },
      where: {
        id: customer.id,
      },
    })
  }

  return customer
}
export default postCustomer
