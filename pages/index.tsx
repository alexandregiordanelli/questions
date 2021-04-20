import { GetStaticProps } from 'next'
import React from 'react'
import { HeadHtml } from '../components/HeadHtml'
import { Header } from '../components/Header'
import { Notebook, Media, Customer } from 'lib/types'
import { NotebookCardNew } from '../components/NotebookCardNew'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { supabase } from 'lib/supabase-client'
type PageProps = {
  notebooks: (Notebook & {
    Media: Media
    customer: Customer & {
      Media: Media
    }
  })[]
}

const Index: React.FC<PageProps> = (props) => {
  return (
    <>
      <HeadHtml />
      <Header />
      <Head>
        <title>questionsof - A repository for community questions</title>
        <meta
          name="description"
          content="A repository for community questions. Notebooks of questions of any subject. Questions help you answer your questions"
        ></meta>
      </Head>
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-blue-50 mt-6 rounded-lg py-6 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-12 sm:flex items-center relative">
          <div className="sm:w-1/2">
            <h1 className="text-center sm:text-left text-2xl sm:text-3xl mb-2 ">
              A <strong className="underline">repository </strong> for community{' '}
              <strong className="underline"> questions</strong>
            </h1>{' '}
            <p className="text-center sm:text-left text-gray-700 sm:text-lg lg:pr-12">
              Questions help you answer your questions
            </p>{' '}
          </div>{' '}
          <div className="hidden sm:block absolute bottom-0 right-0 md:right-12 lg:right-28 w-56 md:w-44 lg:w-56">
            <img className="object-cover w-full h-full" src="man.png" alt="oi" />
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl flex flex-col flex-grow h-full px-6 py-12 mx-auto">
        <div>
          <h3 className="text-2xl font-bold text-secondary mb-1">Featured notebooks</h3>
          <p className="text-gray-600 mb-6">The newest featured notebooks from the community</p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {props.notebooks.map((x, i) => {
              return <NotebookCardNew key={i} notebook={x} customer={x.customer} />
            })}
          </div>
        </div>
        <div className="py-8 mt-auto"></div>
      </div>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { data: notebooks } = await supabase
    .from<
      Notebook & {
        Media: Media
      }
    >('Notebook')
    .select('*, Media (*)')

  const { data: customer } = await supabase
    .from<Customer>('Customer')
    .select('*')
    .in(
      'id',
      notebooks.map((x) => x.customerId)
    )

  const { data: media } = await supabase
    .from<Media>('Media')
    .select('*')
    .in(
      'id',
      customer.map((x) => x.mediaId)
    )

  const customerMedia: (Customer & {
    Media: Media
  })[] = customer.map((x) => {
    return {
      ...x,
      Media: media.find((y) => y.id == x.mediaId),
    }
  })

  return {
    props: {
      notebooks: notebooks.map((x) => {
        return {
          ...x,
          customer: customerMedia.find((y) => y.id == x.customerId),
        }
      }),
    },
    revalidate: 1,
  }
}
export default Index
