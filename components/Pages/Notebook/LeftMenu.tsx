import { ThreeBarsIcon } from '@primer/octicons-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MenuWithQuestions } from '../../../lib/types'
import { MenuItem } from './MenuItem'
import Link from 'next/link'

export const MenuCore: React.FC<{
  menu: MenuWithQuestions
  preview?: boolean
}> = (props) => {
  return (
    <>
      <ul className={'menu'}>
        {props.menu.map((x, i) => {
          const firstSubtopicQuestion = x.subtopics[0]?.questions
          return (
            <li key={`${i}.0`} className={'menu-block'}>
              <MenuItem
                url={
                  firstSubtopicQuestion && firstSubtopicQuestion.length
                    ? `${x.notebook.tag}/${firstSubtopicQuestion[0].tag}`
                    : null
                }
                title={x.name}
                hasExpanded={x.subtopics.length > 1}
              />
              <ul className={'submenu'}>
                {x.subtopics.map((y, j) => {
                  const anotherSubtopicQuestion = y.questions[0]
                  if (anotherSubtopicQuestion) {
                    return (
                      <li key={`${i}.${j}`}>
                        <Link href={`/${x.notebook.tag}/${anotherSubtopicQuestion.tag}`}>
                          <a>{y.name}</a>
                        </Link>
                      </li>
                    )
                  } else {
                    return <li key={`${i}.${j}`}>{y.name}</li>
                  }
                })}
              </ul>
            </li>
          )
        })}
      </ul>
      <style jsx>{`
        .menu {
          top: 62px;
          height: calc(100vh - 62px);
          overflow: auto;
          color: rgb(47, 54, 61);
          background-color: rgb(250, 251, 252);
          width: 260px;
          position: sticky;
          border-width: 0px 1px 0px 0px;
          border-style: solid;
          border-color: rgb(225, 228, 232);
          display: block;
          z-index: 1;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .menu a:hover {
          text-decoration: underline;
        }
        .submenu {
          font-size: 14px;
          list-style: none;
          padding: 0;
          margin: 0;
          margin-top: 16px;
          display: none;
        }

        .submenu a {
          text-decoration: none;
          font-size: 14px;
          display: block;
          padding-top: 4px;
          padding-bottom: 4px;
          margin-top: 8px;
          color: rgb(3, 102, 214);
        }

        .menu a.active,
        .submenu a.active {
          font-weight: 600;
          color: rgb(47, 54, 61);
        }

        .menu-block {
          padding: 24px;
          border-width: 1px 0px 0px;
          border-radius: 0px;
          border-style: solid;
          border-color: rgb(225, 228, 232);
        }

        @media screen and (max-width: 1012px) {
          .menu {
            left: -260px;
            position: fixed;
            border-width: 0px 1px 0px 0px;
            transition: 0.5s;
          }
        }

        #menu-check {
          display: none;
        }

        .menu-check-label {
          z-index: 1;
          left: 14px;
          top: 14px;
          position: fixed;
          padding: 6px 16px;
          display: none;
          cursor: pointer;
          line-height: 20px;
          border-radius: 6px;
          font-size: 14px;
          color: rgb(200, 225, 255);
          border: 1px solid rgb(68, 77, 86);
        }

        .menu-check-label:hover {
          color: rgb(255, 255, 255);
          background-color: rgb(3, 102, 214);
          border-color: rgba(27, 31, 35, 0.15);
          box-shadow: rgba(27, 31, 35, 0.1) 0px 1px 0px, rgba(255, 255, 255, 0.03) 0px 2px 0px inset;
        }

        :global(.menuItemLabel) {
          display: none;
        }
        :global(.menuItemLabel:checked ~ ul) {
          display: block;
        }

        @media screen and (max-width: 1012px) {
          .menu-check-label {
            display: block;
          }

          :global(#menu-check:checked ~ ul) {
            left: 0;
          }
        }
      `}</style>
    </>
  )
}

export const LeftMenu: React.FC<{ menu: MenuWithQuestions }> = (props) => {
  const router = useRouter()
  const [toggleMenu, setToggleMenu] = useState(false)

  useEffect(() => {
    setToggleMenu(false)
  }, [router.asPath])

  return (
    <>
      <div>
        <label
          htmlFor="menu-check"
          className="z-50 fixed sm:hidden cursor-pointer leading-5 rounded-md text-sm left-3 top-5 text-white"
        >
          <ThreeBarsIcon />
        </label>
        <input
          id="menu-check"
          type="checkbox"
          onChange={(x) => setToggleMenu(x.target.checked)}
          checked={toggleMenu}
        />
        <MenuCore menu={props.menu} />
      </div>

      <style jsx>{`
        .menu {
          top: 62px;
          height: calc(100vh - 62px);
          overflow: auto;
          color: rgb(47, 54, 61);
          background-color: rgb(250, 251, 252);
          width: 260px;
          position: sticky;
          border-width: 0px 1px 0px 0px;
          border-style: solid;
          border-color: rgb(225, 228, 232);
          display: block;
          z-index: 1;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .menu a:hover {
          text-decoration: underline;
        }
        .submenu {
          font-size: 14px;
          list-style: none;
          padding: 0;
          margin: 0;
          margin-top: 16px;
          display: none;
        }

        .submenu a {
          text-decoration: none;
          font-size: 14px;
          display: block;
          padding-top: 4px;
          padding-bottom: 4px;
          margin-top: 8px;
          color: rgb(3, 102, 214);
        }

        .menu a.active,
        .submenu a.active {
          font-weight: 600;
          color: rgb(47, 54, 61);
        }

        .menu-block {
          padding: 24px;
          border-width: 1px 0px 0px;
          border-radius: 0px;
          border-style: solid;
          border-color: rgb(225, 228, 232);
        }

        @media screen and (max-width: 1012px) {
          .menu {
            left: -260px;
            position: fixed;
            border-width: 0px 1px 0px 0px;
            transition: 0.5s;
          }
        }

        #menu-check {
          display: none;
        }

        .menu-check-label {
          z-index: 50;
          left: 14px;
          top: 14px;
          position: fixed;
          padding: 6px 16px;
          display: none;
          cursor: pointer;
          line-height: 20px;
          border-radius: 6px;
          font-size: 14px;
          color: rgb(200, 225, 255);
          border: 1px solid rgb(68, 77, 86);
        }

        .menu-check-label:hover {
          color: rgb(255, 255, 255);
          background-color: rgb(3, 102, 214);
          border-color: rgba(27, 31, 35, 0.15);
          box-shadow: rgba(27, 31, 35, 0.1) 0px 1px 0px, rgba(255, 255, 255, 0.03) 0px 2px 0px inset;
        }

        :global(.menuItemLabel) {
          display: none;
        }
        :global(.menuItemLabel:checked ~ ul) {
          display: block;
        }

        @media screen and (max-width: 1012px) {
          .menu-check-label {
            display: block;
          }

          :global(#menu-check:checked ~ ul) {
            left: 0;
          }
        }
      `}</style>
    </>
  )
}
