import { NextPage } from 'next'
import { NotebookWithTopicsAndSubTopics, QuestionWithAll } from 'lib/types'
import { Customer } from '@prisma/client'
import { Header } from 'components/Header'
import { EditCustomer } from 'components/EditCustomer'
import { EditNotebook } from 'components/EditNotebook'
import { EditQuestion } from 'components/EditQuestion'
import { useData } from 'services/client/get'
import { useRouter } from 'next/router'

type CustomerPageProps = {
  customerTag: string
}

type NotebookPageProps = {
  notebookTag: string
} & CustomerPageProps

type QuestionPageProps = {
  questionTag: string
} & NotebookPageProps

type PageProps = CustomerPageProps | NotebookPageProps | QuestionPageProps

const CustomerPage: React.FC<CustomerPageProps> = (props) => {
  const { data: customer } = useData<Customer>(`/api/${props.customerTag}`)

  return (
    <>
      <Header />
      <EditCustomer customer={customer} />
    </>
  )
}

const NotebookPage: React.FC<NotebookPageProps> = (props) => {
  const { data: customer } = useData<Customer>(`/api/${props.customerTag}`, null)
  const { data: notebook } = useData<NotebookWithTopicsAndSubTopics>(
    `/api/${props.customerTag}/${props.notebookTag}`
  )
  return (
    <>
      <Header />
      <EditNotebook customer={customer} notebook={notebook} />
    </>
  )
}

const QuestionPage: React.FC<QuestionPageProps> = (props) => {
  const { data: customer } = useData<Customer>(`/api/${props.customerTag}`, null)
  const { data: notebook } = useData<NotebookWithTopicsAndSubTopics>(
    `/api/${props.customerTag}/${props.notebookTag}`
  )
  const { data: question } = useData<QuestionWithAll>(
    `/api/${props.customerTag}/${props.notebookTag}/${props.questionTag}`
  )
  return (
    <>
      <Header />
      <EditQuestion customer={customer} notebook={notebook} question={question} />
    </>
  )
}

export const Page: NextPage<PageProps> = () => {
  const route = useRouter()
  const tags = (route.query.tags as string[]) ?? []

  const [customerTag, notebookTag, questionTag] = tags

  if (questionTag) {
    return (
      <QuestionPage customerTag={customerTag} notebookTag={notebookTag} questionTag={questionTag} />
    )
  } else if (notebookTag) {
    return <NotebookPage customerTag={customerTag} notebookTag={notebookTag} />
  } else if (customerTag) {
    return <CustomerPage customerTag={customerTag} />
  } else null
}
export default Page
