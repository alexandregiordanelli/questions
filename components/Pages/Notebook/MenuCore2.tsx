import React from 'react'
import { MenuWithQuestions } from '../../../lib/types'
import { MenuItem } from './MenuItem'
import { MenuSubItem } from './MenuSubItem'
import { useRouter } from 'next/router'

export const MenuCore2: React.FC<{
  menu: MenuWithQuestions
  customerTag: string
}> = (props) => {
  const router = useRouter()
  return (
    <>
      <ul className={' bg-gray-50 border-l border-r border-b border-gray-200'}>
        {props.menu.map((x, i) => {
          const firstSubtopicQuestion = x.subtopics[0]?.questions
          return (
            <li key={`${i}.0`} className={'p-5 border-t border-gray-200'}>
              <MenuItem
                url={
                  firstSubtopicQuestion && firstSubtopicQuestion.length
                    ? `/${props.customerTag}/${x.notebook.tag}/${firstSubtopicQuestion[0].tag}`
                    : null
                }
                title={x.name}
                count={x.subtopics.reduce((a, b) => a + b.questions.length, 0)}
              />
              <ul className="hidden mt-4 bg-white -mx-5 -mb-5 p-5 border-t border-gray-200">
                {x.subtopics.map((y, j) => {
                  const anotherSubtopicQuestion = y.questions[0]
                  const url = anotherSubtopicQuestion
                    ? `/${props.customerTag}/${x.notebook.tag}/${anotherSubtopicQuestion.tag}`
                    : null
                  const active = router.asPath == url
                  return (
                    <li
                      key={`${i}.${j}`}
                      className="text-base py-2 flex justify-between items-start"
                    >
                      <MenuSubItem
                        title={y.name}
                        className={`${
                          active ? 'font-medium text-gray-900' : 'text-blue-600 hover:underline'
                        }`}
                        url={url}
                      />
                      <span className="text-xs font-thin">{y.questions.length}</span>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </>
  )
}
