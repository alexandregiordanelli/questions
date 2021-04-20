import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import {
  NotebookWithTopicsAndSubTopics,
  QuestionWithAll,
  MenuWithQuestions,
  Alternative,
  Question,
  RightAlternative,
} from 'lib/types'
import { Customer, Media } from 'lib/types'
import { HeadHtml } from 'components/HeadHtml'
import { Header } from 'components/Header'
import { LeftMenu } from 'components/Pages/Notebook/LeftMenu'
import { QuestionFormWithRightMenu } from 'components/Pages/Notebook/QuestionFormWithRightMenu'
// import { useData } from 'services/client/get'
import React from 'react'
import { LandingPage } from 'components/Pages/Notebook/LandingPage'
import Head from 'next/head'
import { Footer } from 'components/Footer'
import { supabase } from 'lib/supabase-client'

type NotebookPageProps = {
  customer: Customer & {
    Media: Media
  }
  notebook: NotebookWithTopicsAndSubTopics
  menu: MenuWithQuestions[]
}

type QuestionPageProps = {
  question: QuestionWithAll
} & NotebookPageProps

type PageProps = NotebookPageProps | QuestionPageProps

const NotebookPage: React.FC<NotebookPageProps> = (props) => {
  return (
    <>
      <HeadHtml />
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
  return (
    <>
      <HeadHtml>
        <link rel={'canonical'} href={`https://questionsof.com/q/${props.question.tag}`} />
      </HeadHtml>

      <div className="flex min-h-screen flex-col">
        <Header question={props.question} notebook={props.notebook} />
        <div className="flex">
          <LeftMenu menu={props.menu} />
          <QuestionFormWithRightMenu
            question={props.question}
            customer={props.customer}
            menu={props.menu}
            notebookTag={props.notebook.tag}
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

    const { data: notebook } = await supabase
      .from<NotebookWithTopicsAndSubTopics>('Notebook')
      .select('*, Media(*), Topic(*, SubTopic(*))')
      .eq('tag', notebookTag)
      .single()

    const { data: menu } = await supabase
      .from<MenuWithQuestions>('Topic')
      .select(
        '*, SubTopic(*, QuestionSubTopic(*, Question(*, RightAlternative(*)))), Notebook(tag)'
      )
      .eq('notebookId', notebook.id)

    const { data: customer } = await supabase
      .from<Customer>('Customer')
      .select('*')
      .eq('id', notebook.customerId)
      .single()

    const { data: media } = await supabase
      .from<Media>('Media')
      .select('*')
      .eq('customerId', customer.id)
      .single()

    const customerMedia: Customer & {
      Media: Media
    } = {
      ...customer,
      Media: media,
    }

    if (tags.length == 1) {
      if (customer && notebook) {
        return {
          props: {
            customer: customerMedia,
            notebook,
            menu,
          },
          revalidate: 1,
        }
      }
    } else if (tags.length == 2) {
      const { data: question } = await supabase
        .from<Question>('Question')
        .select('*')
        .eq('tag', questionTag)
        .single()

      const { data: alternatives } = await supabase
        .from<Alternative>('Alternative')
        .select('*')
        .eq('questionId', question.id)

      const { data: rightAlternative } = await supabase
        .from<RightAlternative>('RightAlternative')
        .select('*')
        .eq('questionId', question.id)
        .single()

      const questionWithAll: QuestionWithAll = {
        ...question,
        alternatives,
        rightAlternative,
      }
      if (customer && notebook && question) {
        return {
          props: {
            customer: customerMedia,
            notebook,
            menu,
            question: questionWithAll,
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
