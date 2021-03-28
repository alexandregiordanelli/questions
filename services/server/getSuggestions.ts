import { prisma } from '../../prisma/prisma'

export const getSuggestions = async (
  subTopicId: number
): Promise<
  {
    name: string
    tag: string
    id: number
    rightAlternative: {
      alternativeId: number
    }
  }[]
> => {
  const questionsOfSubTopic = await prisma.question.findMany({
    select: {
      name: true,
      tag: true,
      id: true,
      rightAlternative: {
        select: {
          alternativeId: true,
        },
      },
    },
    where: {
      questionSubTopics: {
        every: {
          subTopicId,
        },
      },
    },
  })

  return questionsOfSubTopic
}
