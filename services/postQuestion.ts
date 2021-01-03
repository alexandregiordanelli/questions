import { Alternative, PrismaClient } from "@prisma/client"
import { QuestionOnRepo } from "../lib/types"

const postQuestion = async (notebookId: number, questionOnRepo: QuestionOnRepo, questionFilename: string) => {
    const prisma = new PrismaClient()

    const questionFilenameEncoded = encodeURIComponent(questionFilename)

    let question = await prisma.question.create({
        data: {
            question: questionOnRepo.question,
            solution: questionOnRepo.solution,
            tag: questionOnRepo.url,
            questionFilename: questionFilenameEncoded,
            title: questionOnRepo.title,
            notebook: {
                connect: {
                    id: notebookId
                }
            },
            subTopic: {
                connect: {
                    notebookId_tag: {
                        notebookId: notebookId,
                        tag: questionOnRepo.topic
                    }
                }
            }
        }
    })

    const alternatives: Alternative[] = []

    for await (const option of questionOnRepo.options) {
        const alternative = await prisma.alternative.create({
            data: {
                alternative: option,
                question: {
                    connect: {
                        id: question.id
                    }
                }
            }
        })

        alternatives.push(alternative)
    }

    if(questionOnRepo.answer > -1){
        question = await prisma.question.update({
            data: {
                alternativeRight: {
                    connect: {
                        id: alternatives[questionOnRepo.answer].id
                    }
                }
            },
            where: {
                id: question.id
            }
        })
    }

    return question
}
export default postQuestion