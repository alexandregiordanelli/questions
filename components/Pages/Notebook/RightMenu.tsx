import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@primer/octicons-react'
import { Suggestions } from '../../../lib/types'
import Link from 'next/link'
import { useAuth } from 'lib/auth'

export const RightMenu: React.FC<{
  title: string
  suggestions: Suggestions
  notebookTag: string
}> = (props) => {
  const router = useRouter()
  const [toggleMenu, setToggleMenu] = useState(false)
  const auth = useAuth()

  useEffect(() => {
    setToggleMenu(false)
  }, [router.asPath])

  return (
    <>
      <style jsx>{`
        .right-menu {
          max-height: calc(100vh - theme('spacing.16') - theme('spacing.12'));
        }
        @screen xl {
          .right-menu {
            max-height: calc(100vh - theme('spacing.16') - 2 * theme('spacing.12'));
          }
        }
      `}</style>
      <div className="right-menu overflow-auto sticky md:static xl:sticky xl:self-start top-16 md:top-24 bg-gray-100 p-4 border rounded md:mb-12 xl:mb-0 xl:ml-12 xl:w-80 flex-shrink-0 xl:border-0 xl:bg-transparent xl:p-0">
        <label className="flex align-middle justify-between cursor-pointer" htmlFor="rightMenu">
          <span className="mb-1 font-medium">Questions of {props.title}</span>
          <span className="xl:hidden">
            <ChevronDownIcon verticalAlign="middle" />
          </span>
        </label>
        <input
          id="rightMenu"
          type="checkbox"
          className="toggleVisibilityUL"
          onChange={(x) => setToggleMenu(x.target.checked)}
          checked={toggleMenu}
        />
        <ul className="hidden xl:block text-sm text-gray-700">
          {props.suggestions?.map((x, i) => {
            const solved = auth.stats?.find((y) => y.questionId == x.id)?.alternativeId ?? 0
            const gotItRight = x.rightAlternative?.alternativeId == solved
            const url = `/${props.notebookTag}/${x.tag}`
            const active = router.asPath == url
            return (
              <li key={i}>
                <Link href={url}>
                  <a className={`py-1 inline-block ${active && 'font-bold'}`}>
                    <span
                      className={`${
                        solved != 0
                          ? `line-through hover:no-underline ${
                              gotItRight ? 'text-green-400' : 'text-red-400'
                            }`
                          : 'hover:underline'
                      }`}
                    >
                      <span className="text-gray-900">{x.name}</span>
                    </span>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
