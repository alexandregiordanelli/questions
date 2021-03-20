import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { getCustomerById } from 'services/server/getCustomer'
import { getNotebookByTag } from 'services/server/getNotebook'
import { getQuestionByTags } from 'services/server/getQuestion'

import {
  NotebookWithTopicsAndSubTopics,
  QuestionWithAll,
  MenuWithQuestions,
  Suggestions,
} from 'lib/types'
import { Customer, Media } from '@prisma/client'
import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'
import { HeadHtml } from 'components/HeadHtml'
import { ampCanonicalUrl } from 'lib/utils'
import { Header } from 'components/Header'
import { getMenu } from 'services/server/getMenu'
import { LeftMenu } from 'components/Pages/Notebook/LeftMenu'
import { QuestionFormWithRightMenu } from 'components/Pages/Notebook/QuestionFormWithRightMenu'
import { getSuggestions } from 'services/server/getSuggestions'
import { useData } from 'services/client/get'
import React from 'react'
import { LandingPage } from 'components/Pages/Notebook/LandingPage'
import Head from 'next/head'
import { Footer } from 'components/Footer'

type NotebookPageProps = {
  customer: Customer & {
    media: Media
  }
  notebook: NotebookWithTopicsAndSubTopics
  menu: MenuWithQuestions
}

type QuestionPageProps = {
  suggestions: Suggestions
  question: QuestionWithAll
} & NotebookPageProps

type PageProps = NotebookPageProps | QuestionPageProps

const NotebookPage: React.FC<NotebookPageProps> = (props) => {
  const router = useRouter()
  const isAmp = useAmp()
  return (
    <>
      <HeadHtml>
        <link
          rel={isAmp ? 'canonical' : 'amphtml'}
          href={`https://questionsof.com${ampCanonicalUrl(isAmp, router.asPath)}`}
        />
      </HeadHtml>
      <div className="flex min-h-screen flex-col">
        <Header />
        <Head>
          <title>questionsof - Questions of {props.notebook.name} for free</title>
          <meta
            name="description"
            content={`Questions of ${props.notebook.name} for free grouped by topics and solution in each question.`}
          ></meta>
        </Head>
        <div className="flex">
          <LandingPage notebook={props.notebook} customer={props.customer} menu={props.menu} />
        </div>
      </div>
      <Footer />
    </>
  )
}

const QuestionPage: React.FC<QuestionPageProps> = (props) => {
  const router = useRouter()
  const isAmp = useAmp()
  const { data: question } = useData<QuestionWithAll>(
    `/api/${props.customer.tag}/${props.notebook.tag}/${props.question.tag}`,
    props.question
  )

  return (
    <>
      <HeadHtml>
        <link
          rel={isAmp ? 'canonical' : 'amphtml'}
          href={`https://questionsof.com${ampCanonicalUrl(isAmp, router.asPath)}`}
        />
      </HeadHtml>

      <div className="flex min-h-screen flex-col">
        <Header question={question} />
        <div className="flex">
          <LeftMenu menu={props.menu} />
          <QuestionFormWithRightMenu
            question={question}
            suggestions={props.suggestions}
            customer={props.customer}
          />
        </div>
      </div>
    </>
  )
}

export const Page: NextPage<PageProps> = (props) => {
  if ('question' in props) {
    return (
      <QuestionPage
        customer={props.customer}
        notebook={props.notebook}
        menu={props.menu}
        suggestions={props.suggestions}
        question={props.question}
      />
    )
  } else if ('notebook' in props) {
    return <NotebookPage customer={props.customer} notebook={props.notebook} menu={props.menu} />
  } else return null
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  try {
    const tags = context.params.tags as string[]

    const [notebookTag, questionTag] = tags

    if (tags.length == 1) {
      const notebook = await getNotebookByTag(notebookTag)
      const customer = await getCustomerById(notebook.customerId)
      const menu = await getMenu(notebookTag)

      if (customer && notebook) {
        return {
          props: {
            customer,
            notebook,
            menu,
          },
          revalidate: 1,
        }
      }
    } else if (tags.length == 2) {
      const notebook = await getNotebookByTag(notebookTag)
      const customer = await getCustomerById(notebook.customerId)
      const question = await getQuestionByTags(notebookTag, questionTag)

      if (customer && notebook && question) {
        const menu = await getMenu(notebookTag)
        const suggestions = await getSuggestions(notebookTag, question.subTopicId)

        return {
          props: {
            customer,
            notebook,
            menu,
            suggestions,
            question,
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
export default Page
