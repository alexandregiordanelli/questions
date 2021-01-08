import { prisma } from '../prisma/prisma';
export const getQuestion = async (notebookTag: string, tag: string) => {

    const notebook = await prisma.notebook.findUnique({
        where: {
            tag: notebookTag
        },
        select: {
            id: true
        }
    })

    const question = await prisma.question.findUnique({
        where: {
            notebookId_tag: {
                notebookId: notebook.id,
                tag: tag
            }
        },
        include: {
            alternatives: true,
            rightAlternative: true,
            notebook: true,
            subTopic: true
        },
    })

    return question
};
export default getQuestion;
