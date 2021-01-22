import { prisma } from '../prisma/prisma'
import { Customer } from '@prisma/client'

const postCustomer = async (_customer: Customer): Promise<Customer> => {
  const customer = await prisma.customer.upsert({
    create: {
      username: _customer.username,
      userId: _customer.userId,
    },
    update: {
      username: _customer.username,
    },
    where: {
      id: _customer.id,
    },
  })

  return customer
}
export default postCustomer
