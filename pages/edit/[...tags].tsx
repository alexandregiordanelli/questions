import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { getCustomerByTag } from 'services/getCustomer'
import { getNotebookByTags } from 'services/getNotebook'
import { getQuestionByTags } from 'services/getQuestion'
import { NotebookWithTopicsAndSubTopics, QuestionWithAll } from 'lib/types'
import { Customer } from '@prisma/client'
import { Header } from 'components/Header'
import { EditCustomer } from 'components/EditCustomer'
import { EditNotebook } from 'components/EditNotebook'
import { EditQuestion } from 'components/EditQuestion'
import { useCustomer, useNotebook, useQuestion } from 'services/client/get'

type CustomerPageProps = {
  customer: Customer
}

type NotebookPageProps = {
  notebook: NotebookWithTopicsAndSubTopics
} & CustomerPageProps

type QuestionPageProps = {
  question: QuestionWithAll
} & NotebookPageProps

type PageProps = CustomerPageProps | NotebookPageProps | QuestionPageProps

const CustomerPage: React.FC<CustomerPageProps> = (props) => {
  const { customer } = useCustomer(props.customer)

  return (
    <>
      <Header />
      <EditCustomer customer={customer} />
    </>
  )
}

const NotebookPage: React.FC<NotebookPageProps> = (props) => {
  const { customer } = useCustomer(props.customer)
  const { notebook } = useNotebook(customer.username, props.notebook)
  return (
    <>
      <Header />
      <EditNotebook customer={customer} notebook={notebook} />
    </>
  )
}

const QuestionPage: React.FC<QuestionPageProps> = (props) => {
  const { customer } = useCustomer(props.customer)
  const { notebook } = useNotebook(customer.username, props.notebook)
  const { question } = useQuestion(customer.username, notebook.tag, props.question)
  return (
    <>
      <Header />
      <EditQuestion customer={props.customer} notebook={props.notebook} question={question} />
    </>
  )
}

export const Page: NextPage<PageProps> = (props) => {
  if ('question' in props) {
    return (
      <QuestionPage customer={props.customer} notebook={props.notebook} question={props.question} />
    )
  } else if ('notebook' in props) {
    return <NotebookPage customer={props.customer} notebook={props.notebook} />
  } else if ('customer' in props) {
    return <CustomerPage customer={props.customer} />
  } else null
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const tags = context.params.tags as string[]

  const [customerTag, notebookTag, questionTag] = tags

  if (tags.length == 1) {
    const customer = await getCustomerByTag(customerTag)

    if (customer) {
      return {
        props: {
          customer,
        },
        revalidate: 1,
      }
    }
  } else if (tags.length == 2) {
    const customer = await getCustomerByTag(customerTag)
    const notebook = await getNotebookByTags(customerTag, notebookTag)

    if (customer && notebook) {
      return {
        props: {
          customer,
          notebook,
        },
        revalidate: 1,
      }
    }
  } else if (tags.length == 3) {
    const customer = await getCustomerByTag(customerTag)
    const notebook = await getNotebookByTags(customerTag, notebookTag)
    const question = await getQuestionByTags(customerTag, notebookTag, questionTag)

    if (customer && notebook && question) {
      return {
        props: {
          customer,
          notebook,
          question,
        },
        revalidate: 1,
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
