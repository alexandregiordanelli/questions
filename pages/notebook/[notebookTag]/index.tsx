import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import getNotebook from '../../../services/getNotebook'
import getMenu from '../../../services/getMenu'
import { NotebookWithTopicsAndSubTopics, MenuWithQuestions } from '../../../lib/types'
import HeadHtml from '../../../components/HeadHtml'
import { Header } from '../../../components/Header'
import getNotebooks from '../../../services/getNotebooks'
import { LeftMenu } from '../../../components/Pages/Notebook/LeftMenu'
import { IndexQuestionPage } from '../../../components/Pages/Notebook/IndexQuestionPage'
import { useRouter } from 'next/router'

type PageProps = {
  notebook: NotebookWithTopicsAndSubTopics
  menu: MenuWithQuestions
}

const ReadNotebookPage: NextPage<PageProps> = (props) => {
  const router = useRouter()

  return (
    <>
      <HeadHtml />
      <div className="flex min-h-screen flex-col">
        <Header>
          <>
            <button
              className="bg-gray-700 text-white rounded-md px-4 py-2 mr-2 shadow-md"
              onClick={() => router.push(`/notebook/${props.notebook.tag}/question/add`)}
            >
              Add Question
            </button>
            <button
              className="bg-gray-800 text-white rounded-md px-4 py-2 mr-2 border-gray-700 border"
              onClick={() => router.push(`/notebook/edit/${props.notebook.tag}`)}
            >
              Edit Notebook
            </button>
          </>
        </Header>
        <div className="flex">
          <LeftMenu menu={props.menu} />
          <IndexQuestionPage notebook={props.notebook} />
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  try {
    const notebookTag = context.params.notebookTag as string

    const notebook = await getNotebook(notebookTag)

    if (!notebook) {
      return {
        notFound: true,
      }
    }

    if (!notebook.id) {
      return {
        notFound: true,
      }
    }

    const menu = await getMenu(notebook.tag)

    return {
      props: {
        notebook,
        menu,
      },
      revalidate: 1,
    }
  } catch (e) {
    console.log(e)

    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const notebooks = await getNotebooks()
  const paths = notebooks.map((x) => ({
    params: {
      notebookTag: x.tag,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
export default ReadNotebookPage
