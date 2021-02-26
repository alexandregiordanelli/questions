import React from 'react'
import { MenuWithQuestions } from '../../../lib/types'
import { MenuItem } from './MenuItem'
import { MenuSubItem } from './MenuSubItem'
import { useRouter } from 'next/router'

export const MenuCore: React.FC<{
  menu: MenuWithQuestions
  notebookTag: string
  customerTag: string
}> = (props) => {
  const router = useRouter()
  return (
    <>
      <ul
        className={
          'menu bg-gray-50 fixed hidden lg:block lg:sticky top-16 w-64 overflow-auto border-r border-gray-200'
        }
      >
        {props.menu.map((x, i) => {
          const firstSubtopicQuestion = x.subtopics[0]?.questions
          return (
            <li key={`${i}.0`} className={'p-5 border-t border-gray-200'}>
              <MenuItem
                url={
                  firstSubtopicQuestion && firstSubtopicQuestion.length
                    ? `/${props.customerTag}/${props.notebookTag}/${firstSubtopicQuestion[0].tag}`
                    : null
                }
                title={x.name}
                hasExpanded={x.subtopics.length > 0}
              />
              <ul className="hidden mt-4">
                {x.subtopics.map((y, j) => {
                  const anotherSubtopicQuestion = y.questions[0]
                  const url = anotherSubtopicQuestion
                    ? `/${props.customerTag}/${props.notebookTag}/${anotherSubtopicQuestion.tag}`
                    : null
                  const active = router.asPath == url
                  return (
                    <li key={`${i}.${j}`} className="text-sm py-1 mt-2">
                      <MenuSubItem
                        title={y.name}
                        className={`${
                          active ? 'font-medium text-gray-900' : 'text-blue-600 hover:underline'
                        }`}
                        url={url}
                      />
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
          height: calc(100vh - 64px);
        }
      `}</style>
    </>
  )
}
