import React from 'react'
import { QuestionForm } from './QuestionForm'
import { letters } from '../../../lib/utils'
import Head from 'next/head'
import { RightMenu } from './RightMenu'
import { MenuWithQuestions, QuestionWithAll } from '../../../lib/types'
import { Customer, Media } from '@prisma/client'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react'

export const QuestionFormWithRightMenu: React.FC<{
  customer: Customer & { media: Media }
  notebookTag: string
  question: QuestionWithAll
  menu: MenuWithQuestions
}> = (props) => {
  let suggestions: {
    id: number
    tag: string
    name: string
    rightAlternative: {
      alternativeId: number
    }
  }[] = null

  let title = ''

  for (const topic of props.menu) {
    for (const subTopic of topic.subtopics) {
      for (const questionSubTopic of subTopic.questionSubTopics) {
        if (questionSubTopic.questionId == props.question.id) {
          suggestions = subTopic.questionSubTopics.map((x) => ({
            id: x.question.id,
            tag: x.question.tag,
            name: x.question.name,
            rightAlternative: {
              alternativeId: x.question.rightAlternative?.alternativeId,
            },
          }))
          title = subTopic.name
          break
        }
      }
    }
  }

  const relativeAlternativeIndex = props.question.alternatives.findIndex(
    (x) => x.id == props.question.rightAlternative?.alternativeId
  )

  const suggestionCurrentIndex = suggestions.findIndex((x) => x.tag == props.question.tag)
  const suggestionNextIndex =
    suggestionCurrentIndex == suggestions.length - 1 ? -1 : suggestionCurrentIndex + 1
  const suggestionPreviousIndex = suggestionCurrentIndex == 0 ? -1 : suggestionCurrentIndex - 1

  return (
    <>
      <Head>
        <title>{props.question.name}</title>
        <meta name="description" content={props.question.name}></meta>
        {relativeAlternativeIndex > -1 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: props.question.text,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: props.question.alternatives[relativeAlternativeIndex].text,
                    },
                  },
                ],
              }),
            }}
          />
        )}
      </Head>
      <style jsx global>{`
        #main-form #right-answer:checked ~ #${letters[relativeAlternativeIndex]} {
          @apply border-green-500;
        }
        #main-form #right-answer:checked ~ #${letters[relativeAlternativeIndex]}:checked {
          @apply bg-green-500 ring-green-500;
        }
        #main-form #right-answer:checked ~ #${letters[relativeAlternativeIndex]} + label {
          @apply bg-green-200 border-green-300;
        }
      `}</style>

      <div className="flex-grow">
        <div className="flex flex-col xl:flex-row-reverse max-w-screen-xl mx-auto md:p-12">
          <RightMenu title={title} notebookTag={props.notebookTag} suggestions={suggestions} />
          <div className="flex-grow p-6 md:p-0">
            <QuestionForm question={props.question} />
            <div className="flex justify-end">
              {suggestionPreviousIndex > -1 ? (
                <Link href={`/${props.notebookTag}/${suggestions[suggestionPreviousIndex].tag}`}>
                  <a className="text-white text-sm my-4 mr-2 inline-block font-semibold flex-none border border-blue-600 bg-blue-500 hover:bg-blue-600 rounded p-2">
                    <ChevronLeftIcon />
                    Previous
                  </a>
                </Link>
              ) : (
                <button
                  disabled
                  className="text-white text-sm my-4 mr-2 inline-block font-semibold flex-none border border-blue-600 bg-blue-500 hover:bg-blue-600 rounded p-2"
                >
                  <ChevronLeftIcon />
                  Previous
                </button>
              )}
              {suggestionNextIndex > -1 ? (
                <Link href={`/${props.notebookTag}/${suggestions[suggestionNextIndex].tag}`}>
                  <a className="text-white text-sm my-4 mr-2 inline-block font-semibold flex-none border border-blue-600 bg-blue-500 hover:bg-blue-600 rounded p-2">
                    Next
                    <ChevronRightIcon />
                  </a>
                </Link>
              ) : (
                <button
                  disabled
                  className="text-white text-sm my-4 mr-2 inline-block font-semibold flex-none border rounded p-2 bg-blue-600 opacity-75 text-opacity-80 cursor-not-allowed"
                >
                  Next
                  <ChevronRightIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
