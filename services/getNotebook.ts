import { prisma } from '../prisma/prisma'
import { NotebookWithTopicsAndSubTopics } from '../lib/types'

const getNotebook = async (notebookTag: string): Promise<NotebookWithTopicsAndSubTopics> => {
  const notebook = await prisma.notebook.findUnique({
    where: {
      tag: notebookTag,
    },
    include: {
      topics: {
        include: {
          subtopics: true,
        },
      },
    },
  })

  return notebook
}
export default getNotebook
