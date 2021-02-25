import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { getCustomerByTag, getCustomerNotebooksByTag } from 'services/server/getCustomer'
import { getNotebookByTags } from 'services/server/getNotebook'
import { getQuestionByTags } from 'services/server/getQuestion'

import {
  CustomerWithNotebooks,
  NotebookWithTopicsAndSubTopics,
  QuestionWithAll,
  MenuWithQuestions,
  Suggestions,
} from 'lib/types'
import { Customer } from '@prisma/client'
import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'
import HeadHtml from 'components/HeadHtml'
import { urlEnv, ampCanonicalUrl, getURLMedia } from 'lib/utils'
import { Header } from 'components/Header'
import getMenu from 'services/server/getMenu'
import { LeftMenu } from 'components/Pages/Notebook/LeftMenu'
import { QuestionFormWithRightMenu } from 'components/Pages/Notebook/QuestionFormWithRightMenu'
import getSuggestions from 'services/server/getSuggestions'
import { useData } from 'services/client/get'
import { NotebookCard } from 'components/NotebookCard'
import React from 'react'
import { IndexQuestionPage } from 'components/Pages/Notebook/IndexQuestionPage'

type CustomerPageProps = {
  customer: CustomerWithNotebooks
}

type NotebookPageProps = {
  customer: Customer
  notebook: NotebookWithTopicsAndSubTopics
  menu: MenuWithQuestions
}

type QuestionPageProps = {
  suggestions: Suggestions
  question: QuestionWithAll
} & NotebookPageProps

type PageProps = CustomerPageProps | NotebookPageProps | QuestionPageProps

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
        className="flex min-h-screen bg-gray-100 flex-col"
        // style={{ backgroundImage: `url("/graph-paper.svg")` }}
      >
        <Header />
        <div className=" bg-white border-t border-b flex py-4 px-8">
          {customer.media && (
            <img className="rounded-full" src={getURLMedia(customer.media)} alt={customer.name} />
          )}
          <h1 className="text-xl font-medium text-black my-8 ml-8">{customer.tag}</h1>
        </div>
        <div className="flex flex-wrap">
          {props.customer.notebooks.map((x, i) => (
            <NotebookCard notebook={x} key={i} customerTag={props.customer.tag} className="m-8" />
          ))}
        </div>
      </div>
    </>
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
          <LeftMenu
            menu={props.menu}
            notebookTag={props.notebook.tag}
            customerTag={props.customer.tag}
          />
          <IndexQuestionPage notebook={props.notebook} />
        </div>
      </div>
    </>
  )
}

const QuestionPage: React.FC<QuestionPageProps> = (props) => {
  const router = useRouter()
  const isAmp = useAmp()
  const { data: customer } = useData<Customer>(`/api/${props.customer.tag}`, props.customer)
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
          <LeftMenu menu={props.menu} notebookTag={notebook.tag} customerTag={customer.tag} />
          <QuestionFormWithRightMenu
            question={question}
            suggestions={props.suggestions}
            notebookTag={notebook.tag}
            customerTag={customer.tag}
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
  } else if ('customer' in props) {
    return <CustomerPage customer={props.customer} />
  } else return null
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  try {
    const tags = context.params.tags as string[]

    const [customerTag, notebookTag, questionTag] = tags

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
    } else if (tags.length == 2) {
      const customer = await getCustomerByTag(customerTag)
      const notebook = await getNotebookByTags(customerTag, notebookTag)
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
    } else if (tags.length == 3) {
      const customer = await getCustomerByTag(customerTag)
      const notebook = await getNotebookByTags(customerTag, notebookTag)
      const question = await getQuestionByTags(customerTag, notebookTag, questionTag)

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
