import { prisma } from "../prisma/prisma"

const getMenu = async (notebookTag: string) => {

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

    topicsOfNotebook.forEach(x => {
        x.subtopics.forEach(y => {
            if(y.questions.length)
                y.questions[0].tag = notebookTag + '/' + y.questions[0].tag
        })
    })
    // const topics = topicsOfNotebook.map(x => ({
    //     ...x,
    //     subtopics: x.subtopics.map(y => ({
    //         ...y,
    //         questions: y.questions.length ? [y.questions[0]]: []
    //     }))
    // }))

    return topicsOfNotebook
}
export default getMenu