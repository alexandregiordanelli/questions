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
        #right-answer:checked ~ #${letters[relativeAlternativeIndex]} + label {
          background-color: rgb(220, 255, 228);
          border-color: rgba(23, 111, 44, 0.2);
        }
      `}</style>

      <div className="flex-grow">
        <div className="flex flex-col lg:flex-row-reverse max-w-screen-xl mx-auto p-12">
          <RightMenu
            // title={title}
            customerTag={props.customerTag}
            notebookTag={props.notebookTag}
            suggestions={props.suggestions}
          />
          <div className="flex-grow">
            <h2>{props.question.name}</h2>
            <QuestionForm question={props.question} />
          </div>
        </div>
      </div>
    </>
  )
}
