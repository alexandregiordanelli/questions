import { prisma } from "../prisma/prisma"
import { NotebookOnRepo } from "../lib/types"

const postNotebook = async (notebookOnRepo: NotebookOnRepo) => {

    const notebook = await prisma.notebook.create({
        data: {
            tag: notebookOnRepo.tag,
            name: notebookOnRepo.name,
            price: notebookOnRepo.price,
            topics: {
                create: notebookOnRepo.topics.map(x => ({
                    name: x.name,
                    subtopics: {
                        create: x.subtopics.map(y => ({
                            notebook: {
                                connect: {
                                    tag: notebookOnRepo.tag
                                }
                            },
                            tag: y.tag,
                            name: y.name
                        }))
                    }
                }))
            }
        }
    })

    return notebook
}
export default postNotebook