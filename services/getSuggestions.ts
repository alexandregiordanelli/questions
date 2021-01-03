import { PrismaClient } from '@prisma/client';

const getSuggestions = async (notebookTag: string, subTopicTag: string) => {
    const prisma = new PrismaClient()

    const questionsOfSubTopic = await prisma.question.findMany({
        select: {
            title: true,
            tag: true
        },
        where: {
            subTopicTag: subTopicTag,
            notebook: {
                tag: notebookTag
            }
        }
    })

    return questionsOfSubTopic;
};
export default getSuggestions;
