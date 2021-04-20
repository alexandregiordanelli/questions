import { Header } from 'components/Header'
import { HeadHtml } from 'components/HeadHtml'
import { QuestionFormWraper } from 'components/QuestionFormWraper'
import { supabase } from 'lib/supabase-client'
import { Alternative, QuestionWithAll, RightAlternative } from 'lib/types'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

type QuestionPageProps = {
  question: QuestionWithAll
}

const Page: NextPage<QuestionPageProps> = (props) => {
  const router = useRouter()
  return (
    <>
      <HeadHtml>
        <link rel={'canonical'} href={`https://questionsof.com${router.asPath}`} />
      </HeadHtml>

      <div className="flex min-h-screen flex-col">
        <Header question={props.question} />
        <div className="flex">
          <QuestionFormWraper question={props.question} />
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<QuestionPageProps> = async (context) => {
  try {
    const questionTag = context.params.questionTag as string

    if (questionTag) {
      const { data: question } = await supabase
        .from<QuestionWithAll>('Question')
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
      //const question = await getQuestion(questionTag)

      if (questionWithAll) {
        return {
          props: {
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
export const config = { amp: true }

export default Page
