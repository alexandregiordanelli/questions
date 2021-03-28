import React from 'react'
import { MenuWithQuestions } from '../../../lib/types'
import { MenuItem } from './MenuItem'
import { MenuSubItem } from './MenuSubItem'
import { useRouter } from 'next/router'
import { useAuth } from 'lib/auth'

export const MenuCore: React.FC<{
  menu: MenuWithQuestions
}> = (props) => {
  const router = useRouter()
  const auth = useAuth()
  return (
    <>
      <ul
        className={
          'menu bg-gray-50 fixed hidden lg:block lg:sticky top-16 w-64 overflow-auto border-r border-gray-200 z-10 lg:z-0'
        }
      >
        {props.menu.map((x, i) => {
          const firstSubtopicQuestion = x.subtopics[0]?.questionSubTopics
          return (
            <li key={`${i}.0`} className={'p-5 border-t border-gray-200'}>
              <MenuItem
                url={
                  firstSubtopicQuestion && firstSubtopicQuestion.length
                    ? `/${x.notebook.tag}/${firstSubtopicQuestion[0].question.tag}`
                    : null
                }
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
              <ul className="hidden mt-4">
                {x.subtopics.map((y, j) => {
                  const anotherSubtopicQuestion = y.questionSubTopics[0]
                  const url = anotherSubtopicQuestion
                    ? `/${x.notebook.tag}/${anotherSubtopicQuestion.question.tag}`
                    : null
                  const active = router.asPath == url
                  return (
                    <li
                      key={`${i}.${j}`}
                      className="text-sm py-1 mt-2 flex justify-between items-start"
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
      <style jsx>{`
        .menu {
          height: calc(100vh - theme('spacing.16'));
        }
      `}</style>
    </>
  )
}
