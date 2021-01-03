import { PrismaClient } from '@prisma/client';
import getNotebook from './getNotebook';
export const getQuestion = async (notebookTag: string, tag: string) => {
    const prisma = new PrismaClient()

    const notebook = await getNotebook(notebookTag)

    const question = await prisma.question.findUnique({
        include: {
            alternatives: true,
            alternativeRight: true,
            notebook: true,
            subTopic: true
        },
        where: {
            notebookId_tag: {
                notebookId: notebook.id,
                tag: tag
            }
        }
    })

    return question
};
export default getQuestion;
