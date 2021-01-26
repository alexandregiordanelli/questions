import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { getCustomerByTag, getCustomerNotebooksByTag } from 'services/getCustomer'
import { getNotebookByTags } from 'services/getNotebook'
import { getQuestionByTags } from 'services/getQuestion'
import { CustomerWithNotebooks, NotebookWithTopicsAndSubTopics, QuestionWithAll } from 'lib/types'
import { Customer } from '@prisma/client'
import { Header } from 'components/Header'
import { EditCustomer } from 'components/EditCustomer'
import { EditNotebook } from 'components/EditNotebook'
import { EditQuestion } from 'components/EditQuestion'

type CustomerPageProps = {
  customer: CustomerWithNotebooks
}

type NotebookPageProps = {
  customer: Customer
  notebook: NotebookWithTopicsAndSubTopics
}

type QuestionPageProps = {
  customer: Customer
  notebook: NotebookWithTopicsAndSubTopics
  question: QuestionWithAll
}

type PageProps = CustomerPageProps | NotebookPageProps | QuestionPageProps

const CustomerPage: React.FC<CustomerPageProps> = (props) => {
  return (
    <>
      <Header />
      <EditCustomer customer={props.customer} />
    </>
  )
}

const NotebookPage: React.FC<NotebookPageProps> = (props) => {
  return (
    <>
      <Header />
      <EditNotebook customer={props.customer} notebook={props.notebook} />
    </>
  )
}

const QuestionPage: React.FC<QuestionPageProps> = (props) => {
  return (
    <>
      <Header />
      <EditQuestion customer={props.customer} notebook={props.notebook} question={props.question} />
    </>
  )
}

export const Page: NextPage<PageProps> = (props) => {
  if ('customer' in props && 'notebook' in props && 'question' in props) {
    return (
      <QuestionPage customer={props.customer} notebook={props.notebook} question={props.question} />
    )
  } else if ('customer' in props && 'notebook' in props) {
    return <NotebookPage customer={props.customer} notebook={props.notebook} />
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
