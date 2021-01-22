import { prisma } from '../prisma/prisma'

const getUsernames = async (): Promise<string[]> => {
  const customer = await prisma.customer.findMany({
    select: {
      username: true,
    },
  })

  return customer.map((x) => x.username)
}
export default getUsernames
