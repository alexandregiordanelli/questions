import { prisma } from '../../prisma/prisma'
import { Suggestions } from '../../lib/types'

const getSuggestions = async (notebookTag: string, subTopicId: number): Promise<Suggestions> => {
  const questionsOfSubTopic = await prisma.question.findMany({
    select: {
      name: true,
      tag: true,
      notebook: {
        select: {
          tag: true,
        },
      },
    },
    where: {
      notebook: {
        tag: notebookTag,
      },
      subTopic: {
        id: subTopicId ?? 0,
      },
    },
    orderBy: {
      order: 'asc',
    },
  })

  return questionsOfSubTopic
}
export default getSuggestions
