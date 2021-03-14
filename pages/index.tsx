import { GetStaticProps } from 'next'
import React from 'react'
import { HeadHtml } from '../components/HeadHtml'
import { Header } from '../components/Header'
import { getNotebooks } from 'services/server/getNotebooks'
import { Notebook, Media, Customer } from '@prisma/client'
import { NotebookCardNew } from './[...tags]'
import { Img } from 'components/Img'
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
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-blue-50 mt-6 rounded-lg py-6 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-12 flex items-center relative">
          <div className="sm:w-1/2">
            <h1 className="text-center sm:text-left text-2xl sm:text-3xl text-secondary mb-2 leading-snug">
              A <strong className="underline">free repository</strong> for community components
              <a className="font-bold hover:underline">TailwindCSS</a>
            </h1>{' '}
            <p className="text-center sm:text-left text-gray-700 sm:text-lg mb-6 lg:pr-12">
              Open source Tailwind UI components and templates to bootstrap your new apps, projects
              or landing sites!
            </p>{' '}
          </div>{' '}
          <div className="hidden sm:block w-1/2 h-96 -my-20">
            <img
              className="h-full object-cover float-right"
              src="https://images.unsplash.com/photo-1552581466-ac9fec8dd978?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80"
              alt="oi"
            />
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl flex flex-col flex-grow h-full px-6 py-12 mx-auto">
        <div>
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
