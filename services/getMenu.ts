import { PrismaClient } from "@prisma/client"

const getMenu = async (notebookTag: string) => {

    const prisma = new PrismaClient()

    const topicsOfNotebook = await prisma.topic.findMany({
        include: {
            subtopics: {
                include: {
                    questions: {
                        select: {
                            tag: true
                        }
                    }
                }
            }
        },
        where: {
            notebook: {
                tag: notebookTag
            }
        }

    })

    const topics = topicsOfNotebook.map(x => ({
        ...x,
        subtopics: x.subtopics.map(y => ({
            ...y,
            questions: [y.questions[0]]
        }))
    }))

    return topics
}
export default getMenu