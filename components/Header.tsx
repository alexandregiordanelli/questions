import React from 'react'
import Link from 'next/link'
import { Logo, LogoTextual } from './Logo'
import { useRouter } from 'next/router'
import { useAuth } from 'lib/auth'
import firebase from 'lib/firebase-client'
import { ChevronDownIcon, ChevronRightIcon } from '@primer/octicons-react'
import NoSSR from 'react-no-ssr'
import { Login } from './Login'
import { getURLMedia } from 'lib/utils'

export const Header: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const tags = (router.query.tags as string[]) ?? []

  const [customerTag, notebookTag, questionTag] = tags

  const offsetPaddingLeft = !!questionTag

  return (
    <>
      <div
        className={`bg-green-100 shadow-lg top-0 sticky h-16 items-center justify-between flex p-1 z-10 ${offsetPaddingLeft ? 'pl-8 lg:px-4' : 'px-4'
          }`}
      >
        <div className="items-center flex">
          <Link href="/">
            <a className="items-center flex">
              <Logo size={32} color="#fff" className="mr-2" />
              <LogoTextual size={32} color="#fff" className="hidden sm:block" />
            </a>
          </Link>
          {!router.pathname.startsWith('/admin') && customerTag && (
            <>
              {!notebookTag && (
                <>
                  <h2 className=" text-white px-2 py-2 text-sm md:block">{`${customerTag}`}</h2>
                </>
              )}
              {notebookTag && (
                <>
                  <Link href={`/${customerTag}`}>
                    <a className="text-gray-400 px-2 py-2 text-sm hidden xl:block">{`${customerTag}`}</a>
                  </Link>
                  {!questionTag && (
                    <>
                      <div className="text-gray-700 hidden md:block">
                        <ChevronRightIcon />
                      </div>
                      <h2 className="text-white px-2 py-2 text-sm hidden md:block">{`${notebookTag}`}</h2>
                    </>
                  )}
                  {questionTag && (
                    <>
                      <div className="text-gray-700 hidden xl:block">
                        <ChevronRightIcon />
                      </div>
                      <Link href={`/${customerTag}/${notebookTag}`}>
                        <a className="text-white px-2 py-2 text-sm lg:text-gray-400">{`${notebookTag}`}</a>
                      </Link>
                      <div className="text-gray-700 hidden lg:block">
                        <ChevronRightIcon />
                      </div>
                      <h2 className="text-white px-2 py-2 text-sm hidden lg:block">{`${questionTag}`}</h2>
                    </>
                  )}
                </>
              )}
            </>
          )}
          {router.pathname.startsWith('/admin') && (
            <Link href={`/admin`}>
              <a className="text-white px-2 py-2 text-sm hidden md:block">Admin</a>
            </Link>
          )}
        </div>
        <NoSSR>
          {!user && <Login className="mr-2" />}
          {user && (
            <div className="flex items-center">
              {!router.pathname.startsWith('/admin') && (
                <button
                  className="bg-gray-800 text-white text-sm rounded-md px-4 py-2 mr-2 border-gray-700 border hidden md:block"
                  onClick={() => router.push(`/admin`)}
                >
                  Admin
                </button>
              )}
              <DropDownMenu />
            </div>
          )}
        </NoSSR>
      </div>
    </>
  )
}

const DropDownMenu: React.FC = () => {
  const { customer } = useAuth()

  return (
    <div className="relative inline-block text-left">
      <label htmlFor="dropDownMenu" className="flex items-center text-gray-700 cursor-pointer">
        <img
          className="h-8 w-8 mr-1 rounded-full"
          src={getURLMedia(customer?.media)}
          alt="avatar"
        />
        <ChevronDownIcon />
      </label>
      <input
        id="dropDownMenu"
        className="toggleVisibilityUL"
        type="checkbox"
      // onChange={(x) => setToggleMenu(x.target.checked)}
      // checked={toggleMenu}
      />

      <ul className="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
        <li className="py-1">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Edit
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Duplicate
          </a>
        </li>
        <li className="py-1">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Archive
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Move
          </a>
        </li>
        <li className="py-1">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Share
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Add to favorites
          </a>
        </li>
        <li className="py-1 flex">
          <button
            className="flex-1 text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            onClick={() => firebase.auth().signOut()}
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  )
}
