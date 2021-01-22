import { NextPage, GetServerSideProps } from 'next'
import EditUsername from 'components/EditUsername'
import { Header } from 'components/Header'
import { getCustomerIdByUsername } from 'services/getUserId'
//import { getSession } from 'next-auth/client'

type PageProps = {
  username: string
}

const EditUsernamePage: NextPage<PageProps> = (props) => {
  return (
    <>
      <Header />
      <EditUsername username={props.username} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    // const session = await getSession(context)

    // if (!session) {
    //   return {
    //     notFound: true,
    //   }
    // }

    const username = context.params.username as string

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

export default EditUsernamePage
