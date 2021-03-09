import React from 'react'
import { QuestionForm } from './QuestionForm'
import { letters } from '../../../lib/utils'
import Head from 'next/head'
import RightMenu from './RightMenu'
import { QuestionWithAll, Suggestions } from '../../../lib/types'

export const QuestionFormWithRightMenu: React.FC<{
  question: QuestionWithAll
  suggestions: Suggestions
  notebookTag: string
  customerTag: string
}> = (props) => {
  //const menuFiltered = props.menu.find(x => x.topics.some(y => y.topic == props.question.topic))

  //const title = menuFiltered.topics.length > 1 ? <>{menuFiltered.title}<ChevronRightIcon className="icon-menu-right"/>{menuFiltered.topics.find(x => x.topic == props.question.topic).title}</>: <>{menuFiltered.title}</>

  const relativeAlternativeIndex = props.question.alternatives.findIndex(
    (x) => x.id == props.question.rightAlternative?.alternativeId
  )

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
          <RightMenu
            // title={title}
            customerTag={props.customerTag}
            notebookTag={props.notebookTag}
            suggestions={props.suggestions}
          />
          <div className="flex-grow p-6 md:p-0">
            <h2 className="text-lg font-medium mb-2">{props.question.name}</h2>
            <QuestionForm question={props.question} />
          </div>
        </div>
      </div>
    </>
  )
}
