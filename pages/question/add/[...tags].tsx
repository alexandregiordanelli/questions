import { NextPage, GetServerSideProps } from 'next'
import EditQuestion from 'components/EditQuestion'
import getNotebook from 'services/getNotebook'
import { CustomerWithNotebook } from 'lib/types'
import { Header } from 'components/Header'
import { getCustomerIdByUsername } from 'services/getUserId'

type PageProps = {
  customer: CustomerWithNotebook
}

const AddQuestionPage: NextPage<PageProps> = (props) => {
  return (
    <>
      <Header />
      <EditQuestion customer={props.customer} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    if (context.params.tags.length != 2) {
      return {
        notFound: true,
      }
    }

    // const session = await getSession(context)

    // if (!session) {
    //   return {
    //     notFound: true,
    //   }
    // }

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

    return {
      props: {
        customer,
      },
    }
  } catch (e) {
    console.log(e)

    return {
      notFound: true,
    }
  }
}

export default AddQuestionPage
