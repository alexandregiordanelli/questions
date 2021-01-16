import { prisma } from "../prisma/prisma"

const getNotebooks = async () => {

    const notebooks = await prisma.notebook.findMany()

    return notebooks;
};
export default getNotebooks;
