import { NextPage, GetServerSideProps } from 'next'
import { QuestionWithAll, CustomerWithNotebook } from 'lib/types'
import getNotebook from 'services/getNotebook'
import EditQuestion from 'components/EditQuestion'
import getQuestion from 'services/getQuestion'
import { Header } from 'components/Header'
import { getCustomerIdByUsername } from 'services/getUserId'
import { getSession } from 'next-auth/client'

type PageProps = {
  customer: CustomerWithNotebook
  question: QuestionWithAll
}

const EditQuestionPage: NextPage<PageProps> = (props) => {
  return (
    <>
      <Header />
      <EditQuestion customer={props.customer} question={props.question} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    if (context.params.tags.length != 3) {
      return {
        notFound: true,
      }
    }

    const session = await getSession(context)

    if (!session) {
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

    const questionTag = context.params.tags[2]

    const question = await getQuestion(customer.notebook.id, questionTag)

    if (!question) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        customer,
        question,
      },
    }
  } catch (e) {
    console.log(e)

    return {
      notFound: true,
    }
  }
}

export default EditQuestionPage
