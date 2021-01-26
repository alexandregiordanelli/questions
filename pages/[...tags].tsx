import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { getCustomerByTag, getCustomerNotebooksByTag } from 'services/getCustomer'
import { getNotebookByTags } from 'services/getNotebook'
import { getQuestionByTags } from 'services/getQuestion'
import {
  CustomerWithNotebooks,
  NotebookWithTopicsAndSubTopics,
  QuestionWithAll,
  MenuWithQuestions,
  Suggestions,
} from 'lib/types'
import { Customer } from '@prisma/client'
import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'
import HeadHtml from 'components/HeadHtml'
import { urlEnv, ampCanonicalUrl } from 'lib/utils'
import { Header } from 'components/Header'
import { NotebookListComponent } from 'components/NotebookListComponent'
import getMenu from 'services/getMenu'
import { LeftMenu } from 'components/Pages/Notebook/LeftMenu'
import { IndexQuestionPage } from 'components/Pages/Notebook/IndexQuestionPage'
import { QuestionFormWithRightMenu } from 'components/Pages/Notebook/QuestionFormWithRightMenu'
import getSuggestions from 'services/getSuggestions'

type CustomerPageProps = {
  customer: CustomerWithNotebooks
}

type NotebookPageProps = {
  customer: Customer
  notebook: NotebookWithTopicsAndSubTopics
  menu: MenuWithQuestions
}

type QuestionPageProps = {
  customer: Customer
  notebook: NotebookWithTopicsAndSubTopics
  menu: MenuWithQuestions
  suggestions: Suggestions
  question: QuestionWithAll
}

type PageProps = CustomerPageProps | NotebookPageProps | QuestionPageProps

const CustomerPage: React.FC<CustomerPageProps> = (props) => {
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
          <button
            className="bg-gray-800 text-white text-sm rounded-md px-4 py-2 mr-2 border-gray-700 border"
            onClick={() => router.push(`/add/${props.customer.username}`)}
          >
            Add Notebook
          </button>
        </Header>

        <NotebookListComponent customer={props.customer} />
      </div>
    </>
  )
}

const NotebookPage: React.FC<NotebookPageProps> = (props) => {
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
              onClick={() => router.push(`/add/${props.customer.username}/${props.notebook.tag}`)}
            >
              Add Question
            </button>
            <button
              className="bg-gray-800 text-white text-sm rounded-md px-4 py-2 mr-2 border-gray-700 border"
              onClick={() => router.push(`/edit/${props.customer.username}/${props.notebook.tag}`)}
            >
              Edit Notebook
            </button>
          </>
        </Header>
        <div className="flex">
          <LeftMenu
            menu={props.menu}
            notebookTag={props.notebook.tag}
            customerTag={props.customer.username}
          />
          <IndexQuestionPage notebook={props.notebook} />
        </div>
      </div>
    </>
  )
}

const QuestionPage: React.FC<QuestionPageProps> = (props) => {
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
              className="bg-gray-700 text-sm text-white rounded-md px-4 py-2 mr-2 shadow-md"
              onClick={() =>
                router.push(
                  `/edit/${props.customer.username}/${props.notebook.tag}/${props.question.tag}`
                )
              }
            >
              Edit Question
            </button>
            <button
              className="bg-gray-800 text-sm text-white rounded-md px-4 py-2 mr-2 border-gray-700 border"
              onClick={() => router.push(`/edit/${props.customer.username}/${props.notebook.tag}`)}
            >
              Edit Notebook
            </button>
          </>
        </Header>
        <div className="flex">
          <LeftMenu
            menu={props.menu}
            notebookTag={props.notebook.tag}
            customerTag={props.customer.username}
          />
          <QuestionFormWithRightMenu
            question={props.question}
            suggestions={props.suggestions}
            notebookTag={props.notebook.tag}
            customerTag={props.customer.username}
          />
        </div>
      </div>
    </>
  )
}

export const Page: NextPage<PageProps> = (props) => {
  if ('customer' in props && 'notebook' in props && 'question' in props) {
    return (
      <QuestionPage
        customer={props.customer}
        notebook={props.notebook}
        menu={props.menu}
        suggestions={props.suggestions}
        question={props.question}
      />
    )
  } else if ('customer' in props && 'notebook' in props) {
    return <NotebookPage customer={props.customer} notebook={props.notebook} menu={props.menu} />
  } else if ('customer' in props) {
    return <CustomerPage customer={props.customer} />
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const tags = context.params.tags as string[]

  const [customerTag, notebookTag, questionTag] = tags

  if (tags.length == 1) {
    const customer = await getCustomerNotebooksByTag(customerTag)

    if (customer) {
      return {
        props: {
          customer,
        },
      }
    }
  } else if (tags.length == 2) {
    const customer = await getCustomerByTag(customerTag)
    const notebook = await getNotebookByTags(customerTag, notebookTag)
    const menu = await getMenu(notebookTag)

    if (customer && notebook) {
      return {
        props: {
          customer,
          notebook,
          menu,
        },
      }
    }
  } else if (tags.length == 3) {
    const customer = await getCustomerByTag(customerTag)
    const notebook = await getNotebookByTags(customerTag, notebookTag)
    const question = await getQuestionByTags(customerTag, notebookTag, questionTag)
    const menu = await getMenu(notebookTag)
    const suggestions = await getSuggestions(notebookTag, question.subTopicId)

    if (customer && notebook && question) {
      return {
        props: {
          customer,
          notebook,
          menu,
          suggestions,
          question,
        },
      }
    }
  }

  return {
    notFound: true,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
export default Page
