import { prisma } from '../../prisma/prisma'
import { Customer } from '@prisma/client'

const postCustomer = async (_customer: Customer): Promise<Customer> => {
  const customer = await prisma.customer.upsert({
    create: {
      tag: _customer.tag,
      userId: _customer.userId,
    },
    update: {
      tag: _customer.tag,
    },
    where: {
      id: _customer.id,
    },
  })

  return customer
}
export default postCustomer
