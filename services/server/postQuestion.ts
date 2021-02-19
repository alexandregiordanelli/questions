import { Alternative } from '@prisma/client'
import { QuestionWithAll } from '../../lib/types'
import { prisma } from '../../prisma/prisma'
import _ from 'lodash'
import getQuestion from './getQuestion'

const postQuestion = async (questionOnRepo: QuestionWithAll): Promise<QuestionWithAll> => {
  const index = questionOnRepo.alternatives.findIndex(
    (x) => x.id == questionOnRepo.rightAlternative?.alternativeId
  )

  const data = {
    text: questionOnRepo.text,
    solution: questionOnRepo.solution,
    tag: questionOnRepo.tag,
    name: questionOnRepo.name,
    notebook: {
      connect: {
        id: questionOnRepo.notebookId,
      },
    },
  }

  const question = await prisma.question.upsert({
    create: {
      ...data,
      subTopic: questionOnRepo.subTopicId
        ? {
            connect: {
              id: questionOnRepo.subTopicId,
            },
          }
        : undefined,
    },
    update: {
      ...data,
      subTopic: questionOnRepo.subTopicId
        ? {
            connect: {
              id: questionOnRepo.subTopicId,
            },
          }
        : {
            disconnect: true,
          },
    },
    where: {
      id: questionOnRepo.id,
    },
  })

  const alternativesOriginal = await prisma.alternative.findMany({
    where: {
      questionId: question.id,
    },
  })

  const alternativesSent = questionOnRepo.alternatives

  const alternativesWillAdded = _.clone(alternativesSent).filter(
    (x) => !alternativesOriginal.some((y) => y.id == x.id)
  )
  const alternativesWillUpdated = _.clone(alternativesSent).filter((x) =>
    alternativesOriginal.some((y) => y.id == x.id)
  )
  const alternativesWillRemoved = _.clone(alternativesOriginal).filter(
    (x) => !alternativesSent.some((y) => y.id == x.id)
  )

  for (const alternativeWillRemoved of alternativesWillRemoved) {
    await prisma.rightAlternative.deleteMany({
      where: {
        alternativeId: alternativeWillRemoved.id,
      },
    })
  }

  await prisma.alternative.deleteMany({
    where: {
      id: {
        in: alternativesWillRemoved.map((x) => x.id),
      },
    },
  })

  const alternatives: Alternative[] = []

  for (const alternativeWillUpdated of alternativesWillUpdated) {
    const updateAlternative = await prisma.alternative.update({
      data: {
        text: alternativeWillUpdated.text,
        question: {
          connect: {
            id: question.id,
          },
        },
      },
      where: {
        id: alternativeWillUpdated.id,
      },
    })

    alternatives.push(updateAlternative)
  }

  for (const alternativeWillAdded of alternativesWillAdded) {
    const createAlternative = await prisma.alternative.create({
      data: {
        text: alternativeWillAdded.text,
        question: {
          connect: {
            id: question.id,
          },
        },
      },
    })

    alternatives.push(createAlternative)
  }

  if (index > -1) {
    await prisma.rightAlternative.upsert({
      create: {
        alternative: {
          connect: {
            id: alternatives[index].id,
          },
        },
        question: {
          connect: {
            id: question.id,
          },
        },
      },
      update: {
        alternativeId: alternatives[index].id,
      },
      where: {
        id: questionOnRepo.rightAlternative?.id,
      },
    })
  } else {
    await prisma.rightAlternative.deleteMany({
      where: {
        questionId: question.id,
      },
    })
  }

  const questionNew = await getQuestion(question.notebookId, question.tag)

  return questionNew
}
export default postQuestion
