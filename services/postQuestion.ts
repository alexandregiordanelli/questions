import { Alternative } from "@prisma/client"
import { QuestionOnRepo } from "../lib/types"
import { prisma } from "../prisma/prisma"

const postQuestion = async (notebookId: number, questionOnRepo: QuestionOnRepo) => {

    let question = await prisma.question.findUnique({
        where: {
            notebookId_tag: {
                notebookId,
                tag: questionOnRepo.topic
            }
        }
    })
    
    if(!question){
        question = await prisma.question.create({
            data: {
                question: questionOnRepo.question,
                solution: questionOnRepo.solution,
                tag: questionOnRepo.url,
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
    }

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
        await prisma.rightAlternative.create({
            data: {
                alternative: {
                    connect: {
                        id: alternatives[questionOnRepo.answer].id
                    }
                },
                question: {
                    connect: {
                        id: question.id
                    }
                }
            }
        })
    }

    return question
}
export default postQuestion