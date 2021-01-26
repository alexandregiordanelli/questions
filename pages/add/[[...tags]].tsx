import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { getCustomerByTag } from 'services/getCustomer'
import { getNotebookByTags } from 'services/getNotebook'
import { CustomerWithNotebooks, NotebookWithTopicsAndSubTopics } from 'lib/types'
import { Customer } from '@prisma/client'
import { Header } from 'components/Header'
import { EditCustomer } from 'components/EditCustomer'
import { EditNotebook } from 'components/EditNotebook'
import { EditQuestion } from 'components/EditQuestion'

// eslint-disable-next-line @typescript-eslint/ban-types
type CustomerPageProps = {}
type NotebookPageProps = {
  customer: CustomerWithNotebooks
}

type QuestionPageProps = {
  customer: Customer
  notebook: NotebookWithTopicsAndSubTopics
}

type PageProps = CustomerPageProps | NotebookPageProps | QuestionPageProps

const CustomerPage: React.FC<CustomerPageProps> = () => {
  return (
    <>
      <Header />
      <EditCustomer />
    </>
  )
}

const NotebookPage: React.FC<NotebookPageProps> = (props) => {
  return (
    <>
      <Header />
      <EditNotebook customer={props.customer} />
    </>
  )
}

const QuestionPage: React.FC<QuestionPageProps> = (props) => {
  return (
    <>
      <Header />
      <EditQuestion customer={props.customer} notebook={props.notebook} />
    </>
  )
}

export const Page: NextPage<PageProps> = (props) => {
  if ('customer' in props && 'notebook' in props) {
    return <QuestionPage customer={props.customer} notebook={props.notebook} />
  } else if ('customer' in props) {
    return <NotebookPage customer={props.customer} />
  } else {
    return <CustomerPage />
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const tags = (context.params.tags as string[]) ?? []

  const [customerTag, notebookTag] = tags

  if (tags.length == 0) {
    return {
      props: {},
    }
  } else if (tags.length == 1) {
    const customer = await getCustomerByTag(customerTag)

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

    if (customer && notebook) {
      return {
        props: {
          customer,
          notebook,
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
