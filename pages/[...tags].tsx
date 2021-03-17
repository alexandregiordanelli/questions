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
import { Customer, Media, Notebook } from '@prisma/client'
import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'
import { HeadHtml } from 'components/HeadHtml'
import { urlEnv, ampCanonicalUrl, getURLMedia } from 'lib/utils'
import { Header } from 'components/Header'
import { getMenu } from 'services/server/getMenu'
import { LeftMenu } from 'components/Pages/Notebook/LeftMenu'
import { QuestionFormWithRightMenu } from 'components/Pages/Notebook/QuestionFormWithRightMenu'
import { getSuggestions } from 'services/server/getSuggestions'
import { useData } from 'services/client/get'
import React from 'react'
import { IndexQuestionPage } from 'components/Pages/Notebook/IndexQuestionPage'
import Link from 'next/link'

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

export const NotebookCardNew: React.FC<{
  notebook: Notebook & {
    media: Media
  }
  customer: Customer & { media: Media }
}> = (props) => {
  return (
    <Link href={`/${props.notebook.tag}`}>
      <a title="TailwindCSS fintess gym" className="flex flex-col overflow-hidden rounded">
        <div className="relative h-48 overflow-hidden rounded-lg xl:h-64">
          <img
            src={getURLMedia(props.notebook.media)}
            alt={props.notebook.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-3">
          <div className="flex">
            <div className="relative flex-shrink-0 w-8 h-8 mt-1 mr-3 overflow-hidden rounded-full shadow-inner">
              <img
                src={getURLMedia(props.customer.media)}
                alt={props.customer.name}
                className="absolute inset-0 w-full h-full z-negative"
              />
            </div>
            <div className="flex-1 w-0 leading-snug">
              <h4 className="font-bold truncate whitespace-nowrap text-secondary hover:text-primary">
                {props.notebook.name}
              </h4>
              <p className="text-sm text-gray-600">{props.customer.name}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

const NotebookPage: React.FC<NotebookPageProps> = (props) => {
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
        <Header />
        <div className="flex">
          {/* <LeftMenu
            menu={props.menu}
            notebookTag={props.notebook.tag}
            customerTag={props.customer.tag}
          /> */}
          <IndexQuestionPage
            notebook={props.notebook}
            customer={props.customer}
            menu={props.menu}
          />
        </div>
      </div>
    </>
  )
}

const QuestionPage: React.FC<QuestionPageProps> = (props) => {
  const router = useRouter()
  const isAmp = useAmp()
  const { data: notebook } = useData<NotebookWithTopicsAndSubTopics>(
    `/api/${props.customer.tag}/${props.notebook.tag}`,
    props.notebook
  )
  const { data: question } = useData<QuestionWithAll>(
    `/api/${props.customer.tag}/${props.notebook.tag}/${props.question.tag}`,
    props.question
  )
  return (
    <>
      <HeadHtml>
        <link
          rel={isAmp ? 'canonical' : 'amphtml'}
          href={`${urlEnv}${ampCanonicalUrl(isAmp, router.asPath)}`}
        />
      </HeadHtml>

      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex">
          <LeftMenu menu={props.menu} />
          <QuestionFormWithRightMenu
            question={question}
            suggestions={props.suggestions}
            notebookTag={notebook.tag}
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
