import { NextPage, GetServerSideProps } from 'next'
import EditUsername from 'components/EditUsername'
import { Header } from 'components/Header'
import { getCustomerIdByUsername } from 'services/getUserId'
import { getSession } from 'next-auth/client'

const AddUsernamePage: NextPage = () => {
  return (
    <>
      <Header />
      <EditUsername />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const username = context.params.username as string

    const session = await getSession(context)

    if (!session) {
      return {
        notFound: true,
      }
    }

    const userId = await getCustomerIdByUsername(username)

    if (!userId) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        username,
      },
    }
  } catch (e) {
    console.log(e)

    return {
      notFound: true,
    }
  }
}

export default AddUsernamePage
