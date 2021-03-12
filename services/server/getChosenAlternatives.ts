import { prisma } from '../../prisma/prisma'
import { ChosenAlternative } from '@prisma/client'

export const getChosenAlternatives = async (_customerId: number): Promise<ChosenAlternative[]> => {
  const chosenAlternatives = await prisma.chosenAlternative.findMany({
    where: {
      customerId: _customerId,
    },
  })

  return chosenAlternatives
}
