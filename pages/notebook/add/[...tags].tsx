import { NextPage, GetServerSideProps } from 'next'
import EditNotebook from 'components/EditNotebook'
import { Header } from 'components/Header'
import { getCustomerIdByUsername } from 'services/getUserId'
import { CustomerWithNotebook } from 'lib/types'
import getNotebook from 'services/getNotebook'

type PageProps = {
  customer: CustomerWithNotebook
}

const AddNotebookPage: NextPage<PageProps> = (props) => {
  return (
    <>
      <Header />
      <EditNotebook customer={props.customer} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    if (context.params.tags.length != 1) {
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

    const customer = await getNotebook(customerId)

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

export default AddNotebookPage
