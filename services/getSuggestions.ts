import { prisma } from '../prisma/prisma'
import { Suggestions } from '../lib/types'

const getSuggestions = async (notebookTag: string, subTopicId: number): Promise<Suggestions> => {
  const questionsOfSubTopic = await prisma.question.findMany({
    select: {
      title: true,
      tag: true,
    },
    where: {
      notebook: {
        tag: notebookTag,
      },
      subTopic: {
        id: subTopicId,
      },
    },
  })

  questionsOfSubTopic.forEach((x) => {
    x.tag = notebookTag + '/' + x.tag
  })

  return questionsOfSubTopic
}
export default getSuggestions
