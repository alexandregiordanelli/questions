import { Customer, CustomerWithNotebooks, Media, Notebook } from 'lib/types'
import { HeadHtml } from 'components/HeadHtml'
import { getURLMedia } from 'lib/utils'
// import { Header } from 'components/Header'
import React from 'react'
import { NotebookCardNew } from 'components/NotebookCardNew'
import { GetStaticPaths, GetStaticProps } from 'next'
import { supabase } from 'lib/supabase-client'

type CustomerPageProps = {
  customer: CustomerWithNotebooks
}

const CustomerPage: React.FC<CustomerPageProps> = (props) => {
  return (
    <>
      <HeadHtml />

      <div
        className="flex min-h-screen flex-col"
        // style={{ backgroundImage: `url("/graph-paper.svg")` }}
      >
        {/* <Header /> */}

        <div className="flex items-end justify-center py-4 bg-gray-100 border-b border-gray-200">
          <h1 className="relative flex flex-col items-center w-1/2 text-center">
            <span className="relative w-16 h-16 mb-4 overflow-hidden rounded-full sm:h-20 sm:w-20">
              <img src={getURLMedia(props.customer.Media)} alt={props.customer.name} />
            </span>
            <div className="flex flex-col leading-none">
              <div className="mb-2 text-2xl font-bold text-secondary">{props.customer.name}</div>
              <div className="text-gray-600">{props.customer.notebooks.length} notebooks</div>
            </div>
          </h1>
        </div>

        <div className="max-w-screen-xl flex flex-col flex-grow h-full px-6 py-12 mx-auto">
          <div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {props.customer.notebooks.map((x, i) => {
                return <NotebookCardNew key={i} notebook={x} customer={props.customer} />
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
    const customerTag = context.params.customerTag as string

    const { data: customer } = await supabase
      .from<Customer>('Customer')
      .select('*')
      .eq('tag', customerTag)
      .single()

    const { data: media } = await supabase
      .from<Media>('Media')
      .select('*')
      .eq('id', customer.mediaId)
      .single()

    const { data: notebooks } = await supabase
      .from<
        Notebook & {
          Media: Media
        }
      >('Notebook')
      .select('*, Media (*)')
      .eq('customerId', customer.id)

    const customerWithNotebooks: CustomerWithNotebooks = {
      ...customer,
      Media: media,
      notebooks,
    }

    if (customerWithNotebooks) {
      return {
        props: {
          customer: customerWithNotebooks,
        },
        revalidate: 1,
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
