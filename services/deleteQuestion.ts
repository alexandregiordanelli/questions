import { prisma } from "../prisma/prisma"

const deleteQuestion = async (questionId: number) => {
    //https://github.com/prisma/prisma/issues/4650
    const nRowsUpdated = await prisma.$executeRaw`DELETE FROM Question WHERE id = ${questionId};`

    return nRowsUpdated
}
export default deleteQuestion