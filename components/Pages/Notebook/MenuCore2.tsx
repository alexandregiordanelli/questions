import React from 'react'
import { MenuWithQuestions } from '../../../lib/types'
import { MenuItem } from './MenuItem'
import { MenuSubItem } from './MenuSubItem'
import { useRouter } from 'next/router'
import { useAuth } from 'lib/auth'

export const MenuCore2: React.FC<{
  menu: MenuWithQuestions
}> = (props) => {
  const auth = useAuth()
  const router = useRouter()
  return (
    <>
      <ul className={' bg-gray-50 border-l border-r border-b border-gray-200'}>
        {props.menu.map((x, i) => {
          return (
            <li key={`${i}.0`} className={'p-5 border-t border-gray-200'}>
              <MenuItem
                title={x.name}
                countGreen={x.subtopics.reduce((a1, b1) => {
                  return (
                    a1 +
                    b1.questionSubTopics.reduce((a2, b2) => {
                      return (
                        a2 +
                        (auth.stats?.some(
                          (x) =>
                            b2.question.rightAlternative?.alternativeId == x.alternativeId &&
                            b2.question.id == x.questionId
                        )
                          ? 1
                          : 0)
                      )
                    }, 0)
                  )
                }, 0)}
                countRed={x.subtopics.reduce((a1, b1) => {
                  return (
                    a1 +
                    b1.questionSubTopics.reduce((a2, b2) => {
                      return (
                        a2 +
                        (auth.stats?.some(
                          (x) =>
                            b2.question.rightAlternative?.alternativeId != x.alternativeId &&
                            b2.question.id == x.questionId
                        )
                          ? 1
                          : 0)
                      )
                    }, 0)
                  )
                }, 0)}
                countTotal={x.subtopics.reduce((a, b) => a + b.questionSubTopics.length, 0)}
              />
              <ul className="hidden mt-4 bg-white -mx-5 -mb-5 p-5 border-t border-gray-200">
                {x.subtopics.map((y, j) => {
                  const anotherSubtopicQuestion = y.questionSubTopics[0]?.question //always the first question of this subtopic (start)
                  const url = anotherSubtopicQuestion
                    ? `/${x.notebook.tag}/${anotherSubtopicQuestion.tag}`
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
                      <span className="text-xs font-thin">{y.questionSubTopics.length}</span>
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
