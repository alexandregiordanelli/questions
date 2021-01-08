import { prisma } from "../prisma/prisma"

const getNotebook = async (notebookTag: string) => {
    
    const notebook = await prisma.notebook.findUnique({
        where: {
            tag: notebookTag,
        },
        include: {
            topics: {
                include: {
                    subtopics: true
                }
            }
        }
    })

    return notebook
};
export default getNotebook
