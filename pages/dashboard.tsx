import { Header } from 'components/Header'
import { HeadHtml } from 'components/HeadHtml'
import { useAuth } from 'lib/auth'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { NotebookCardNew } from '../components/NotebookCardNew'

const Page: NextPage = () => {
  const auth = useAuth()
  return (
    <>
      <HeadHtml />
      <Header />
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="max-w-screen-xl flex flex-col flex-grow h-full px-6 py-12 mx-auto">
        <div>
          <h3 className="text-2xl font-bold text-secondary mb-1">My notebooks</h3>
          <p className="text-gray-600 mb-6">Notebooks that you subscribed to</p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {auth.subscribers?.map((x, i) => {
              return (
                <NotebookCardNew key={i} notebook={x.notebook} customer={x.notebook.customer} />
              )
            })}
          </div>
        </div>
        <div className="py-8 mt-auto"></div>
      </div>
    </>
  )
}

export default Page
