import { prisma } from '../prisma/prisma'

const getUserId = async (accessToken: string): Promise<number> => {
  const session = await prisma.session.findUnique({
    where: {
      accessToken: accessToken,
    },
    select: {
      userId: true,
    },
  })

  return session.userId
}

export default getUserId
