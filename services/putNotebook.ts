import { SubTopic } from "@prisma/client"
import { NotebookOnRepo } from "../lib/types"
import { prisma } from "../prisma/prisma"

const putNotebook = async (notebookId: number, notebookOnRepo: NotebookOnRepo) => {

    let topicsWithSubtopicsOriginal = await prisma.topic.findMany({
        where: {
            notebookId,
        },
        select: {
            id: true,
            name: true,
            subtopics: true
        }
    })

    const topicsWithSubtopicsNew = notebookOnRepo.topics.map(x => ({
        id: x.id,
        name: x.name,
        subtopics: x.subtopics.map(y => ({
            id: y.id,
            tag: y.tag,
            name: y.name
        } as SubTopic))
    }))

    topicsWithSubtopicsOriginal = topicsWithSubtopicsOriginal.filter(x => topicsWithSubtopicsNew.some(y => y.id == x.id))

    topicsWithSubtopicsOriginal.forEach(topicOriginal => {

        const topicNew = topicsWithSubtopicsNew.find(x => x.id == topicOriginal.id)

        topicOriginal.name = topicNew.name 

        const subtopicsNew = topicNew.subtopics
        const subtopicsOriginal = topicOriginal.subtopics.filter(x => subtopicsNew.some(y => y.id == x.id))

        subtopicsOriginal.forEach(subtopicOriginal => {
            const subtopicNew = subtopicsNew.find(x => x.id == subtopicOriginal.id)

            subtopicOriginal.name = subtopicNew.name
            subtopicOriginal.tag = subtopicNew.tag
        })

        subtopicsNew.filter(x => !x.id).forEach(subtopicWithId0New => {
            subtopicsOriginal.push(subtopicWithId0New)
        })
    })

    topicsWithSubtopicsNew.filter(x => !x.id).forEach(topicWithId0New => {
        topicsWithSubtopicsOriginal.push(topicWithId0New)
    })


    const deleteAllSubTopics = prisma.subTopic.deleteMany({
        where: {
            notebookId: notebookId
        }
    })

    const deleteAllTopics = prisma.topic.deleteMany({
        where: {
            notebookId: notebookId
        }
    })

    const createAllTopics = prisma.notebook.update({
        where: {
            id: notebookId
        },
        data: {
            tag: notebookOnRepo.tag,
            name: notebookOnRepo.name,
            price: notebookOnRepo.price,
            topics: {
                connectOrCreate: topicsWithSubtopicsOriginal.map(x => ({
                    create: {
                        name: x.name,
                        subtopics: {
                            connectOrCreate: x.subtopics.map(y => ({
                                create: {
                                    notebook: {
                                        connect: {
                                            id: notebookId
                                        }
                                    },
                                    tag: y.tag,
                                    name: y.name
                                },
                                where: {
                                    id: y.id ?? 0
                                }
                            }))
                        }
                    },
                    where: {
                        id: x.id ?? 0,
                    }
                }))
            }
        }
    })

    return await prisma.$transaction([deleteAllSubTopics, deleteAllTopics, createAllTopics])

}
export default putNotebook

