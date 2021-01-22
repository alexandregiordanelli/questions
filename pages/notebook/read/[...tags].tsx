import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import getNotebook from 'services/getNotebook'
import getMenu from 'services/getMenu'
import { MenuWithQuestions, CustomerWithNotebook } from 'lib/types'
import HeadHtml from 'components/HeadHtml'
import { Header } from 'components/Header'
import { LeftMenu } from 'components/Pages/Notebook/LeftMenu'
import { IndexQuestionPage } from 'components/Pages/Notebook/IndexQuestionPage'
import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'
import { urlEnv, ampCanonicalUrl } from 'lib/utils'
import { getCustomerIdByUsername } from 'services/getUserId'

type PageProps = {
  customer: CustomerWithNotebook
  menu: MenuWithQuestions
  username: string
}

const ReadNotebookPage: NextPage<PageProps> = (props) => {
  const router = useRouter()
  const isAmp = useAmp()
  return (
    <>
      <HeadHtml>
        <link
          rel={isAmp ? 'canonical' : 'amphtml'}
          href={`${urlEnv}${ampCanonicalUrl(isAmp, router.asPath)}`}
        />
      </HeadHtml>
      <div className="flex min-h-screen flex-col">
        <Header>
          <>
            <button
              className="bg-gray-700 text-white text-sm rounded-md px-4 py-2 mr-2 shadow-md"
              onClick={() => router.push(`/notebook/${props.customer.notebook.tag}/question/add`)}
            >
              Add Question
            </button>
            <button
              className="bg-gray-800 text-white text-sm rounded-md px-4 py-2 mr-2 border-gray-700 border"
              onClick={() => router.push(`/notebook/edit/${props.customer.notebook.tag}`)}
            >
              Edit Notebook
            </button>
          </>
        </Header>
        <div className="flex">
          <LeftMenu menu={props.menu} />
          <IndexQuestionPage notebook={props.customer.notebook} />
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  try {
    if (context.params.tags.length != 2) {
      return {
        notFound: true,
      }
    }

    const username = context.params.tags[0]

    const customerId = await getCustomerIdByUsername(username)

    if (!customerId) {
      return {
        notFound: true,
      }
    }

    const notebookTag = context.params.tags[1]

    const customer = await getNotebook(customerId, notebookTag)

    if (!customer.notebook || !customer.notebook.id) {
      return {
        notFound: true,
      }
    }

    const menu = await getMenu(customer.notebook.tag)

    return {
      props: {
        customer,
        menu,
        username,
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
  return {
    paths: [],
    fallback: 'blocking',
  }
}
export default ReadNotebookPage
