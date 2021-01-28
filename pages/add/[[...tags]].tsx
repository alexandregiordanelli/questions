import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { getCustomerByTag } from 'services/getCustomer'
import { getNotebookByTags } from 'services/getNotebook'
import { NotebookWithTopicsAndSubTopics } from 'lib/types'
import { Customer } from '@prisma/client'
import { Header } from 'components/Header'
import { EditCustomer } from 'components/EditCustomer'
import { EditNotebook } from 'components/EditNotebook'
import { EditQuestion } from 'components/EditQuestion'
import { useData } from 'services/client/get'

// eslint-disable-next-line @typescript-eslint/ban-types
type CustomerPageProps = {}
type NotebookPageProps = {
  customer: Customer
} & CustomerPageProps
type QuestionPageProps = {
  notebook: NotebookWithTopicsAndSubTopics
} & NotebookPageProps

type PageProps = CustomerPageProps | NotebookPageProps | QuestionPageProps

const CustomerPage: React.FC<CustomerPageProps> = () => {
  return (
    <>
      {/* <Header /> */}
      <EditCustomer />
    </>
  )
}

const NotebookPage: React.FC<NotebookPageProps> = (props) => {
  const { data: customer } = useData<Customer>(`/api/${props.customer.username}`, props.customer)
  return (
    <>
      <Header />
      <EditNotebook customer={customer} />
    </>
  )
}

const QuestionPage: React.FC<QuestionPageProps> = (props) => {
  const { data: customer } = useData<Customer>(`/api/${props.customer.username}`, props.customer)
  const { data: notebook } = useData<NotebookWithTopicsAndSubTopics>(
    `/api/${props.customer.username}/${props.notebook.tag}`,
    props.notebook
  )
  return (
    <>
      <Header />
      <EditQuestion customer={customer} notebook={notebook} />
    </>
  )
}

export const Page: NextPage<PageProps> = (props) => {
  if ('notebook' in props) {
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
