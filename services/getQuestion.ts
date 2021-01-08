import { prisma } from '../prisma/prisma';
export const getQuestion = async (notebookId: number, tag: string) => {

    const question = await prisma.question.findUnique({
        where: {
            notebookId_tag: {
                notebookId: notebookId,
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
