import React from 'react'
import Link from 'next/link'
import { Logo, LogoTextual } from './Logo'
import { useRouter } from 'next/router'
import { useAuth } from 'lib/auth'
import firebase from 'lib/firebase-client'
import { ChevronRightIcon } from '@primer/octicons-react'
import NoSSR from 'react-no-ssr'

export const Header: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const tags = (router.query.tags as string[]) ?? []

  const [customerTag, notebookTag, questionTag] = tags

  const offsetPaddingLeft = questionTag || notebookTag

  return (
    <>
      <div
        className={`bg-gray-800 shadow-lg top-0 sticky h-16 items-center justify-between flex p-1 z-10 ${
          offsetPaddingLeft ? 'pl-8 lg:pl-2' : 'pl-2'
        }`}
      >
        <div className="items-center flex">
          <Link href="/">
            <a className="items-center flex">
              <Logo size={32} color="#fff" className="mx-2" />
              <LogoTextual size={32} color="#fff" className="hidden sm:block" />
            </a>
          </Link>
          {!router.pathname.startsWith('/admin') && customerTag && (
            <>
              {!notebookTag && (
                <>
                  <h2 className="text-white px-2 py-2 text-sm">{`${customerTag}`}</h2>
                </>
              )}
              {notebookTag && (
                <>
                  <Link href={`/${customerTag}`}>
                    <a className="text-gray-400 px-2 py-2 text-sm">{`${customerTag}`}</a>
                  </Link>
                  {!questionTag && (
                    <>
                      <ChevronRightIcon className="text-gray-700" />
                      <h2 className="text-white px-2 py-2 text-sm">{`${notebookTag}`}</h2>
                    </>
                  )}
                  {questionTag && (
                    <>
                      <ChevronRightIcon className="text-gray-700" />
                      <Link href={`/${customerTag}/${notebookTag}`}>
                        <a className="text-gray-400 px-2 py-2 text-sm">{`${notebookTag}`}</a>
                      </Link>
                      <ChevronRightIcon className="text-gray-700" />
                      <h2 className="text-white px-2 py-2 text-sm">{`${questionTag}`}</h2>
                    </>
                  )}
                </>
              )}
            </>
          )}
          {router.pathname.startsWith('/admin') && (
            <Link href={`/admin`}>
              <a className="text-white px-2 py-2 text-sm">Admin</a>
            </Link>
          )}
        </div>
        <NoSSR>
          {!user && (
            <Link href="/login">
              <a className="bg-gray-700 text-white text-sm rounded-md px-4 py-2 mr-2 shadow-md">
                Login
              </a>
            </Link>
          )}
          {user && (
            <div className="flex">
              {!router.pathname.startsWith('/admin') && (
                <button
                  className="bg-gray-800 text-white text-sm rounded-md px-4 py-2 mr-2 border-gray-700 border"
                  onClick={() => router.push(`/admin`)}
                >
                  Admin
                </button>
              )}
              <button
                className="text-white px-4 py-2 mr-2 text-sm "
                onClick={() => firebase.auth().signOut()}
              >
                Sign out
              </button>
            </div>
          )}
        </NoSSR>
      </div>
    </>
  )
}
