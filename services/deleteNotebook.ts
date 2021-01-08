import { Alternative, PrismaClient } from "@prisma/client"
import { NotebookOnRepo, QuestionOnRepo } from "../lib/types"
import { prisma } from "../prisma/prisma"

const deleteNotebook = async (notebookId: number) => {

    const notebook = await prisma.notebook.delete({
        where: {
            id: notebookId
        }
    })

    return notebook
}
export default deleteNotebook