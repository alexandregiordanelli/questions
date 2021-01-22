import { prisma } from '../prisma/prisma'
import { Customer } from '@prisma/client'

const getCustomer = async (userId: number): Promise<Customer> => {
  const customer = await prisma.customer.findUnique({
    where: {
      userId,
    },
  })

  return customer
}
export default getCustomer
