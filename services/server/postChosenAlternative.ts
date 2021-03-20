import { prisma } from '../../prisma/prisma'
import { ChosenAlternative } from '@prisma/client'
import { getChosenAlternatives } from './getChosenAlternatives'

export const postChosenAlternative = async (
  _chosenAlternative: ChosenAlternative
): Promise<ChosenAlternative[]> => {
  const chosenAlternative = await prisma.chosenAlternative.upsert({
    create: {
      alternativeId: _chosenAlternative.alternativeId,
      questionId: _chosenAlternative.questionId,
      customerId: _chosenAlternative.customerId,
    },
    update: {
      alternativeId: _chosenAlternative.alternativeId,
    },
    where: {
      id: _chosenAlternative.id ?? 0,
    },
  })

  return getChosenAlternatives(chosenAlternative.customerId)
}
