import { PrismaClient } from '@prisma/client'

const getNotebook = async (notebookTag: string) => {
    const prisma = new PrismaClient()
    
    const notebook = await prisma.notebook.findUnique({
        where: {
            tag: notebookTag
        }
    })
    return notebook
};
export default getNotebook
