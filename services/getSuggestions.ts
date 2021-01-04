import { prisma } from "../prisma/prisma"

const getSuggestions = async (notebookTag: string, subTopicTag: string) => {
    
    const questionsOfSubTopic = await prisma.question.findMany({
        select: {
            title: true,
            tag: true
        },
        where: {
            notebook: {
                tag: notebookTag
            },
            subTopic: {
                tag: subTopicTag
            }
        }
    })

    return questionsOfSubTopic;
};
export default getSuggestions;
