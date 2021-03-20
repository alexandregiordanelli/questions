import { GetStaticProps } from 'next'
import React from 'react'
import { HeadHtml } from '../components/HeadHtml'
import { Header } from '../components/Header'
import { getNotebooks } from 'services/server/getNotebooks'
import { Notebook, Media, Customer } from '@prisma/client'
import { NotebookCardNew } from './[...tags]'
import Head from 'next/head'
type PageProps = {
  notebooks: (Notebook & {
    media: Media
    customer: Customer & {
      media: Media
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
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const notebooks = await getNotebooks()

  return {
    props: {
      notebooks,
    },
    revalidate: 1,
  }
}
export default Index
