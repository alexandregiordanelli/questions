import { NextPage, GetServerSideProps } from 'next'
import EditUsername from 'components/EditUsername'
import { Header } from 'components/Header'

const AddUsernamePage: NextPage = () => {
  return (
    <>
      <Header />
      <EditUsername />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // const session = await getSession(context)

    // if (!session) {
    //   return {
    //     notFound: true,
    //   }
    // }

    return {
      props: {},
    }
  } catch (e) {
    console.log(e)

    return {
      notFound: true,
    }
  }
}

export default AddUsernamePage
