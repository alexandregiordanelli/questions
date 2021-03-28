import { QuestionForm } from 'components/Pages/Notebook/QuestionForm'
import { QuestionWithAll } from 'lib/types'
import { letters } from 'lib/utils'
import Head from 'next/head'
import React from 'react'

export const QuestionFormWraper: React.FC<{
  question: QuestionWithAll
}> = (props) => {
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
          <div className="flex-grow p-6 md:p-0">
            <QuestionForm question={props.question} />
          </div>
        </div>
      </div>
    </>
  )
}
