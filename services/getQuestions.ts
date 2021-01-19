import { prisma } from '../prisma/prisma'
import { Path } from '../lib/types'

const getQuestions = async (notebookTag: string): Promise<Path[]> => {
  const questions = await prisma.question.findMany({
    where: {
      notebook: {
        tag: notebookTag,
      },
    },
  })

  const questionsListPath = questions.map(
    (x) =>
      ({
        params: {
          slug: [notebookTag].concat(x.tag), // [enem,questao1]
        },
      } as Path)
  )

  return questionsListPath
}
export default getQuestions
