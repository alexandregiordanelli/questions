import { NextPage, GetServerSideProps } from 'next'
import { NotebookWithTopicsAndSubTopics, QuestionWithAll } from '../../../../../lib/types'
import getNotebook from '../../../../../services/getNotebook'
import EditQuestion from '../../../../../components/EditQuestion'
import getQuestion from '../../../../../services/getQuestion'
import { Header } from '../../../../../components/Header'

type PageProps = {
  notebook: NotebookWithTopicsAndSubTopics
  question: QuestionWithAll
}

const EditQuestionPage: NextPage<PageProps> = (props) => {
  return (
    <>
      <Header />
      <EditQuestion notebook={props.notebook} question={props.question} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    const notebookTag = context.params.notebookTag as string
    const questionTag = context.params.questionTag as string

    const notebook = await getNotebook(notebookTag)

    if (!notebook || !notebook.id) {
      return {
        notFound: true,
      }
    }

    const question = await getQuestion(notebook.id, questionTag)

    if (!question) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        notebook,
        question,
      },
    }
  } catch (e) {
    console.log(e)

    return {
      notFound: true,
    }
  }
}

export default EditQuestionPage
