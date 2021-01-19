import { NextPage, GetServerSideProps } from 'next'
import EditNotebook from '../../../components/EditNotebook'
import { NotebookWithTopicsAndSubTopics } from '../../../lib/types'
import getNotebook from '../../../services/getNotebook'
import { Header } from '../../../components/Header'

type PageProps = {
  notebook: NotebookWithTopicsAndSubTopics
}

const EditNotebookPage: NextPage<PageProps> = (props) => {
  return (
    <>
      <Header />
      <EditNotebook notebook={props.notebook} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    const notebookTag = context.params.notebookTag as string

    const notebook = await getNotebook(notebookTag)

    if (!notebook || !notebook.id) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        notebook,
      },
    }
  } catch (e) {
    console.log(e)

    return {
      notFound: true,
    }
  }
}

export default EditNotebookPage