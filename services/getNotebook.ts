import { prisma } from "../prisma/prisma"

const getNotebook = async (notebookTag: string) => {
    
    const notebook = await prisma.notebook.findUnique({
        where: {
            tag: notebookTag,
        }
    })

    return notebook
};
export default getNotebook
