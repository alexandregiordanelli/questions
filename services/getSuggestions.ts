import { prisma } from "../prisma/prisma"

const getSuggestions = async (notebookTag: string, subTopicId: number) => {
    
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
                id: subTopicId
            }
        }
    })

    questionsOfSubTopic.forEach(x => {
        x.tag = notebookTag + '/' + x.tag
    })

    return questionsOfSubTopic;
};
export default getSuggestions;
