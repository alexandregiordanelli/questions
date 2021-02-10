import { NextPage } from 'next'
import { NotebookWithTopicsAndSubTopics } from 'lib/types'
import { Customer } from '@prisma/client'
import { Header } from 'components/Header'
import { EditCustomer } from 'components/EditCustomer'
import { EditNotebook } from 'components/EditNotebook'
import { EditQuestion } from 'components/EditQuestion'
import { useData } from 'services/client/get'
import { useRouter } from 'next/router'
import { HeaderSecondary } from 'components/HeaderSecondary'

// eslint-disable-next-line @typescript-eslint/ban-types
type CustomerPageProps = {}
type NotebookPageProps = {
  customerTag: string
} & CustomerPageProps
type QuestionPageProps = {
  notebookTag: string
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
  const { data: customer } = useData<Customer>(`/api/${props.customerTag}`)
  return (
    <>
      <Header />
      <HeaderSecondary />
      <EditNotebook customer={customer} />
    </>
  )
}

const QuestionPage: React.FC<QuestionPageProps> = (props) => {
  const { data: customer } = useData<Customer>(`/api/${props.customerTag}`)
  const { data: notebook } = useData<NotebookWithTopicsAndSubTopics>(
    `/api/${props.customerTag}/${props.notebookTag}`
  )
  return (
    <>
      <Header />
      <HeaderSecondary />
      <EditQuestion customer={customer} notebook={notebook} />
    </>
  )
}

export const Page: NextPage<PageProps> = () => {
  const route = useRouter()
  const tags = (route.query.tags as string[]) ?? []

  const [customerTag, notebookTag] = tags

  if (tags.length > 2) {
    throw new Error('not exists')
  }

  if (notebookTag) {
    return <QuestionPage customerTag={customerTag} notebookTag={notebookTag} />
  } else if (customerTag) {
    return <NotebookPage customerTag={customerTag} />
  } else {
    return <CustomerPage />
  }
}
export default Page
