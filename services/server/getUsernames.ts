import { prisma } from '../../prisma/prisma'

const getUsernames = async (): Promise<string[]> => {
  const customer = await prisma.customer.findMany({
    select: {
      tag: true,
    },
  })

  return customer.map((x) => x.tag)
}
export default getUsernames
