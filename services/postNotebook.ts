import { Prisma, SubTopic } from "@prisma/client"
import { NotebookOnRepo } from "../lib/types"
import { prisma } from "../prisma/prisma"
import _ from 'lodash'
import getNotebook from "./getNotebook"

const postNotebook = async (notebookOnRepo: NotebookOnRepo) => {

    const notebook = await prisma.notebook.upsert({
        create: {
            tag: notebookOnRepo.tag,
            name: notebookOnRepo.name,
            price: notebookOnRepo.price,
        },
        update: {
            tag: notebookOnRepo.tag,
            name: notebookOnRepo.name,
            price: notebookOnRepo.price,
        },
        where: {
            id: notebookOnRepo.id
        }
    })

    const notebookId = notebook.id

    const topicsWithSubtopicsOriginal = await prisma.topic.findMany({
        where: {
            notebookId,
        },
        select: {
            id: true,
            name: true,
            subtopics: true
        }
    })

    const topicsWithSubtopicsSent = notebookOnRepo.topics.map(x => ({
        id: x.id,
        name: x.name,
        subtopics: x.subtopics.map(y => ({
            id: y.id,
            tag: y.tag,
            name: y.name
        } as SubTopic))
    }))

    const batch: any[] = []

    const topicsWillAdded = _.clone(topicsWithSubtopicsSent).filter(x => !topicsWithSubtopicsOriginal.some(y => y.id == x.id))
    const topicsWillUpdated = _.clone(topicsWithSubtopicsSent).filter(x => topicsWithSubtopicsOriginal.some(y => y.id == x.id))
    const topicsWillRemoved = _.clone(topicsWithSubtopicsOriginal).filter(x => !topicsWithSubtopicsSent.some(y => y.id == x.id))

    //https://github.com/prisma/prisma/issues/4650
    for(let topicWillRemoved of topicsWillRemoved){
        const deleteSubtopic = prisma.subTopic.deleteMany({
            where: {
                topic: {
                    id: topicWillRemoved.id
                }
            }
        })

        batch.push(deleteSubtopic) //DELETE SUBTOPIC
    }

    
    const deleteTopics = prisma.topic.deleteMany({
        where: {
            id: {
                in: topicsWillRemoved.map(x => x.id)
            }
        }
    })

    batch.push(deleteTopics) //DELETE TOPICS

    for(let topicWillAdded of topicsWillAdded){
        const createSubTopics:Prisma.SubTopicCreateManyWithoutTopicInput = {
            create: topicWillAdded.subtopics.map(x => { 
                delete x.id
                return {
                    ...x,
                    notebook: {
                        connect: {
                            id: notebookId
                        }
                    }
                }
            })
        }

        const createTopic = prisma.topic.create({
            data: {
                name: topicWillAdded.name,
                subtopics: createSubTopics,
                notebook: {
                    connect: {
                        id: notebookId
                    }
                }
            }
        })

        batch.push(createTopic) //ADD TOPICS
    }

    for(let topic of topicsWillUpdated){
        const subtopicsOriginal = _.clone(topicsWithSubtopicsOriginal).find(x => x.id == topic.id).subtopics

        const subtopicsWillAdded = _.clone(topic.subtopics).filter(x => !subtopicsOriginal.some(y => y.id == x.id))
        const subtopicsWillUpdated = _.clone(topic.subtopics).filter(x => subtopicsOriginal.some(y => y.id == x.id))
        const subtopicsWillRemoved = _.clone(subtopicsOriginal).filter(x => !topic.subtopics.some(y => y.id == x.id))

        const deleteSubtopics = prisma.subTopic.deleteMany({
            where: {
                id: {
                    in: subtopicsWillRemoved.map(x => x.id)
                }
            }
        })

        batch.push(deleteSubtopics) //DELETE SUBTOPICS

        for(let subtopicWillAdded of subtopicsWillAdded){
            delete subtopicWillAdded.id
            const createSubtopic = prisma.subTopic.create({
                data: {
                    ...subtopicWillAdded,
                    notebook: {
                        connect: {
                            id: notebookId
                        }
                    },
                    topic: {
                        connect: {
                            id: topic.id
                        }
                    }
                }
            })

            batch.push(createSubtopic) //ADD SUBTOPICS
        }

        for(let subtopicWillUpdated of subtopicsWillUpdated){
            const id = subtopicWillUpdated.id
            delete subtopicWillUpdated.id
            const updateSubtopic = prisma.subTopic.update({
                data: {
                    ...subtopicWillUpdated,
                },
                where: {
                    id
                }
            })

            batch.push(updateSubtopic) //UPDATE SUBTOPICS
        }

        const updateTopic = prisma.topic.update({
            data: {
                name: topic.name
            },
            where: {
                id: topic.id
            }
        })

        batch.push(updateTopic) //UPDATE TOPIC
    }

    await prisma.$transaction(batch)

    const notebookNew = await getNotebook(notebook.tag)

    return notebookNew
}
export default postNotebook

