import React, { Fragment, useEffect, useState } from 'react'
import 'katex/dist/contrib/mhchem.js'
import { QuestionWithAll } from '../../../lib/types'
import { letters } from '../../../lib/utils'
import { MarkdownText } from '../../MarkdownText'
import { ChosenAlternative } from 'lib/types'
import { useAuth } from 'lib/auth'
import { useRouter } from 'next/router'
import pt from '../../../lib/locales/pt'
import en from '../../../lib/locales/en'
import { supabase } from 'lib/supabase-client'
export const QuestionForm: React.FC<{
  // customer: Customer & { media: Media }
  question: QuestionWithAll
}> = (props) => {
  const { locale } = useRouter()
  const t = locale == 'pt' ? pt : en
  const auth = useAuth()
  const stats = auth.stats?.find((x) => x.questionId == props.question.id)
  const [alternativeIdChosen, setAlternativeIdChosen] = useState(stats?.alternativeId ?? 0)
  const [, setShowSolution] = useState(false)

  useEffect(() => {
    setAlternativeIdChosen(stats?.alternativeId ?? 0)
  }, [stats])

  useEffect(() => {
    setShowSolution(false)
  }, [props.question])

  const html = [
    <input
      key={0}
      type="checkbox"
      role="button"
      id="right-answer"
      checked={!!stats}
      disabled={!!stats}
      onChange={async () => {
        if (auth.customer) {
          await supabase.from<ChosenAlternative>('ChosenAlternative').insert([
            {
              alternativeId: alternativeIdChosen,
              questionId: props.question.id,
              customerId: auth.customer.id,
              id: stats?.id ?? 0,
            },
          ])
        }
      }}
    />,
    <label key={1} htmlFor="right-answer">
      {t.rightanswer}
    </label>,
    <div key={2} className="q mb-4">
      <MarkdownText md={props.question.text} customerId={0} />
    </div>,
  ]

  props.question.alternatives.forEach((x, i) => {
    const letter = letters[i]
    html.push(
      <Fragment key={3 + i.toString()}>
        <input
          type="radio"
          id={letter}
          name="alternative"
          checked={x.id == alternativeIdChosen}
          value={x.id}
          onChange={(y) => !stats?.alternativeId && setAlternativeIdChosen(Number(y.target.value))}
        />
        <label htmlFor={letter}>
          <MarkdownText md={x.text} customerId={0} />
        </label>
      </Fragment>
    )
  })

  // html.push(
  //   ...[
  //     <input
  //       key={5}
  //       type="checkbox"
  //       id="solution"
  //       checked={showSolution}
  //       onChange={(x) => setShowSolution(x.target.checked)}
  //     />,
  //     <label key={6} htmlFor="solution">
  //       Solution
  //     </label>,
  //     <div key={7} className="s my-4">
  //       <img
  //         className="rounded-full mr-4 mb-3 float-left h-20 w-20"
  //         src={getURLMedia(props.customer.media)}
  //         alt="avatar"
  //       />
  //       <p className="font-medium mb-2">
  //         <Link href={`/u/${props.customer.tag}`}>
  //           <a className="hover:underline">{props.customer.name}</a>
  //         </Link>{' '}
  //         says:
  //       </p>
  //       {/* <MarkdownText
  //         md={props.question.solution}
  //         customerId={props.question.notebook.customerId}
  //       /> */}
  //     </div>,
  //   ]
  // )

  return (
    <form id="main-form" action="/api/hello" target="_blank">
      {html}
    </form>
  )
}
