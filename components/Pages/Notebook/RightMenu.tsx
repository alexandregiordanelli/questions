import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@primer/octicons-react'
import { Suggestions } from '../../../lib/types'
import Link from 'next/link'

const RightMenu: React.FC<{
  // title: JSX.Element,
  suggestions: Suggestions
  notebookTag: string
  customerTag: string
}> = (props) => {
  const router = useRouter()
  const [toggleMenu, setToggleMenu] = useState(false)

  useEffect(() => {
    setToggleMenu(false)
  }, [router.asPath])

  return (
    <>
      <div className="overflow-auto static top-24 bg-gray-100 p-4 border rounded mb-12 lg:ml-12 lg:max-w-xs w-full lg:border-0 lg:bg-transparent lg:p-0">
        <label className="flex align-middle justify-between cursor-pointer" htmlFor="rightMenu">
          <span>+ Questões</span>
          <span className="lg:hidden">
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
        <ul className="hidden lg:block">
          {props.suggestions?.map((x, i) => (
            <li key={i}>
              {/* activeClassName="ativo" */}
              <Link href={`/${props.customerTag}/${props.notebookTag}/${x.tag}`}>
                <a>{x.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        {/* div {
          max-height: calc(100vh - 110px - 24px);
          grid-area: table-of-contents / table-of-contents / table-of-contents / table-of-contents;
        } */}
      `}</style>
    </>
  )
}

export default RightMenu
