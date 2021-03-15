import { Prisma, PrismaPromise } from '@prisma/client'
import { NotebookWithTopicsAndSubTopics } from '../../lib/types'
import { prisma } from '../../prisma/prisma'
import _ from 'lodash'
import { getNotebookByTag } from './getNotebook'

export const postNotebook = async (
  notebookOnRepo: NotebookWithTopicsAndSubTopics
): Promise<NotebookWithTopicsAndSubTopics> => {
  if (!notebookOnRepo.tag || !notebookOnRepo.name) {
    throw new Error('no tag or name')
  }

  if (notebookOnRepo.mediaId == 0) {
    notebookOnRepo.mediaId = null
  }

  const notebook = await prisma.notebook.upsert({
    create: {
      tag: notebookOnRepo.tag,
      name: notebookOnRepo.name,
      price: notebookOnRepo.price,
      text: notebookOnRepo.text,
      customerId: notebookOnRepo.customerId,
      mediaId: notebookOnRepo.mediaId,
    },
    update: {
      tag: notebookOnRepo.tag,
      name: notebookOnRepo.name,
      price: notebookOnRepo.price,
      text: notebookOnRepo.text,
      mediaId: notebookOnRepo.mediaId,
    },
    where: {
      id: notebookOnRepo.id,
    },
  })

  const notebookId = notebook.id

  const topicsWithSubtopicsOriginal = await prisma.topic.findMany({
    where: {
      notebookId,
    },
    select: {
      id: true,
      name: true,
      subtopics: true,
    },
  })

  const topicsWithSubtopicsSent = notebookOnRepo.topics

  const batch: PrismaPromise<unknown>[] = []

  const topicsWillAdded = _.clone(topicsWithSubtopicsSent)?.filter(
    (x) => !topicsWithSubtopicsOriginal?.some((y) => y.id == x.id)
  )
  const topicsWillUpdated = _.clone(topicsWithSubtopicsSent)?.filter((x) =>
    topicsWithSubtopicsOriginal?.some((y) => y.id == x.id)
  )
  const topicsWillRemoved = _.clone(topicsWithSubtopicsOriginal)?.filter(
    (x) => !topicsWithSubtopicsSent?.some((y) => y.id == x.id)
  )

  //https://github.com/prisma/prisma/issues/4650
  for (const topicWillRemoved of topicsWillRemoved ?? []) {
    const deleteSubtopic = prisma.subTopic.deleteMany({
      where: {
        topic: {
          id: topicWillRemoved.id,
        },
      },
    })

    batch.push(deleteSubtopic) //DELETE SUBTOPIC
  }

  const deleteTopics = prisma.topic.deleteMany({
    where: {
      id: {
        in: topicsWillRemoved?.map((x) => x.id),
      },
    },
  })

  batch.push(deleteTopics) //DELETE TOPICS

  for (const topicWillAdded of topicsWillAdded ?? []) {
    const createSubTopics: Prisma.SubTopicCreateNestedManyWithoutTopicInput = {
      create: topicWillAdded.subtopics?.map((x) => {
        delete x.id
        delete x.topicId
        return x
      }),
    }

    const createTopic = prisma.topic.create({
      data: {
        order: topicWillAdded.order,
        name: topicWillAdded.name,
        subtopics: createSubTopics,
        notebook: {
          connect: {
            id: notebookId,
          },
        },
      },
    })

    batch.push(createTopic) //ADD TOPICS
  }

  for (const topic of topicsWillUpdated ?? []) {
    const subtopicsOriginal = _.clone(topicsWithSubtopicsOriginal).find((x) => x.id == topic.id)
      .subtopics

    const subtopicsWillAdded = _.clone(topic.subtopics)?.filter(
      (x) => !subtopicsOriginal?.some((y) => y.id == x.id)
    )
    const subtopicsWillUpdated = _.clone(topic.subtopics)?.filter((x) =>
      subtopicsOriginal?.some((y) => y.id == x.id)
    )
    const subtopicsWillRemoved = _.clone(subtopicsOriginal)?.filter(
      (x) => !topic.subtopics?.some((y) => y.id == x.id)
    )

    const deleteSubtopics = prisma.subTopic.deleteMany({
      where: {
        id: {
          in: subtopicsWillRemoved?.map((x) => x.id),
        },
      },
    })

    batch.push(deleteSubtopics) //DELETE SUBTOPICS

    for (const subtopicWillAdded of subtopicsWillAdded ?? []) {
      delete subtopicWillAdded.id
      delete subtopicWillAdded.topicId

      const createSubtopic = prisma.subTopic.create({
        data: {
          ...subtopicWillAdded,
          topicId: topic.id,
        },
      })

      batch.push(createSubtopic) //ADD SUBTOPICS
    }

    for (const subtopicWillUpdated of subtopicsWillUpdated ?? []) {
      const id = subtopicWillUpdated.id
      const topicId = subtopicWillUpdated.topicId

      delete subtopicWillUpdated.id
      delete subtopicWillUpdated.topicId

      const updateSubtopic = prisma.subTopic.update({
        data: {
          ...subtopicWillUpdated,
          topicId: topicId,
        },
        where: {
          id,
        },
      })

      batch.push(updateSubtopic) //UPDATE SUBTOPICS
    }

    const updateTopic = prisma.topic.update({
      data: {
        name: topic.name,
        order: topic.order,
      },
      where: {
        id: topic.id,
      },
    })

    batch.push(updateTopic) //UPDATE TOPIC
  }

  await prisma.$transaction(batch)

  const _notebook = await getNotebookByTag(notebook.tag)

  return _notebook
}
