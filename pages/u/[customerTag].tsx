import { CustomerWithNotebooks } from 'lib/types'
import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'
import { HeadHtml } from 'components/HeadHtml'
import { urlEnv, ampCanonicalUrl, getURLMedia } from 'lib/utils'
import { Header } from 'components/Header'
import { useData } from 'services/client/get'
import React from 'react'
import { NotebookCardNew } from 'pages/[...tags]'
import { getCustomerNotebooksByTag } from 'services/server/getCustomer'
import { GetStaticPaths, GetStaticProps } from 'next'

type CustomerPageProps = {
  customer: CustomerWithNotebooks
}

const CustomerPage: React.FC<CustomerPageProps> = (props) => {
  const router = useRouter()
  const isAmp = useAmp()
  const { data: customer } = useData<CustomerWithNotebooks>(
    `/api/${props.customer.tag}?notebooks=true`,
    props.customer
  )

  return (
    <>
      <HeadHtml>
        <link
          rel={isAmp ? 'canonical' : 'amphtml'}
          href={`${urlEnv}${ampCanonicalUrl(isAmp, router.asPath)}`}
        />
      </HeadHtml>

      <div
        className="flex min-h-screen flex-col"
        // style={{ backgroundImage: `url("/graph-paper.svg")` }}
      >
        <Header />

        <div className="flex items-end justify-center py-4 bg-gray-100 border-b border-gray-200">
          <h1 className="relative flex flex-col items-center w-1/2 text-center">
            <span className="relative w-16 h-16 mb-4 overflow-hidden rounded-full sm:h-20 sm:w-20">
              <img src={getURLMedia(customer.media)} alt={customer.name} />
            </span>
            <div className="flex flex-col leading-none">
              <div className="mb-2 text-2xl font-bold text-secondary">{customer.name}</div>
              <div className="text-gray-600">{props.customer.notebooks.length} notebooks</div>
            </div>
          </h1>
        </div>

        <div className="max-w-screen-xl flex flex-col flex-grow h-full px-6 py-12 mx-auto">
          <div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {customer.notebooks.map((x, i) => {
                return <NotebookCardNew key={i} notebook={x} customer={customer} />
              })}
            </div>
          </div>
          <div className="py-8 mt-auto"></div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<CustomerPageProps> = async (context) => {
  try {
    const tags = context.params.tags as string[]

    const [customerTag] = tags

    if (tags.length == 1) {
      const customer = await getCustomerNotebooksByTag(customerTag)

      if (customer) {
        return {
          props: {
            customer,
          },
          revalidate: 1,
        }
      }
    }

    return {
      notFound: true,
    }
  } catch (e) {
    console.log(e)
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
export default CustomerPage
