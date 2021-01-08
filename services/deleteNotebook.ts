import { Alternative, PrismaClient } from "@prisma/client"
import { NotebookOnRepo, QuestionOnRepo } from "../lib/types"
import { prisma } from "../prisma/prisma"

const deleteNotebook = async (notebookId: number) => {
    //https://github.com/prisma/prisma/issues/4650
    const notebook = await prisma.$executeRaw`DELETE FROM Notebook WHERE id = ${notebookId};`

    return notebook
}
export default deleteNotebook