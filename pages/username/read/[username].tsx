import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import HeadHtml from 'components/HeadHtml'
import { Header } from 'components/Header'
import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'
import { urlEnv, ampCanonicalUrl } from 'lib/utils'
import { getCustomerIdByUsername } from 'services/getUserId'
import getUsernames from 'services/getUsernames'
import { NotebookListComponent } from 'components/NotebookListComponent'
import getNotebooks from 'services/getNotebooks'
import { CustomerWithNotebooks } from 'lib/types'

type PageProps = {
  customer: CustomerWithNotebooks
}

const ReadUsernamePage: NextPage<PageProps> = (props) => {
  const router = useRouter()
  const isAmp = useAmp()
  return (
    <>
      <HeadHtml>
        <link
          rel={isAmp ? 'canonical' : 'amphtml'}
          href={`${urlEnv}${ampCanonicalUrl(isAmp, router.asPath)}`}
        />
      </HeadHtml>

      <div className="flex min-h-screen flex-col">
        <Header>
          <button
            className="bg-gray-800 text-white text-sm rounded-md px-4 py-2 mr-2 border-gray-700 border"
            onClick={() => router.push(`/notebook/add/${props.customer.username}`)}
          >
            Add Notebook
          </button>
        </Header>

        <NotebookListComponent customer={props.customer} />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  try {
    const username = context.params.username as string

    const customerId = await getCustomerIdByUsername(username)

    if (!customerId) {
      return {
        notFound: true,
      }
    }

    const customer = await getNotebooks(customerId)

    return {
      props: {
        username,
        customer,
      },
      revalidate: 1,
    }
  } catch (e) {
    console.log(e)

    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const usernames = await getUsernames()
  const paths = usernames.map((x) => ({
    params: {
      username: x,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
export default ReadUsernamePage
