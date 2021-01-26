import React from 'react'
import Link from 'next/link'
import { Logo, LogoTextual } from './Logo'
import { useRouter } from 'next/router'
import { useAuth } from 'lib/auth'
import firebase from 'lib/firebase-client'

export const Header: React.FC = (props) => {
  const router = useRouter()
  const { user } = useAuth()
  const offsetPaddingLeft =
    router.pathname == '/notebook/[notebookTag]' ||
    router.pathname == '/notebook/[notebookTag]/question/[questionTag]'

  return (
    <>
      <div
        className={`bg-gray-800 top-0 sticky h-16 items-center justify-between flex p-1 z-10 ${
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
          {/* <h1><Link href={ampUrl(isAmp, "enem")}><a>Enem</a></Link></h1> */}
        </div>
        {!user && (
          <Link href="/login">
            <a className="bg-gray-700 text-white text-sm rounded-md px-4 py-2 mr-2 shadow-md">
              Login
            </a>
          </Link>
        )}
        {user && (
          <div className="flex">
            {props.children}
            <button
              className="text-white px-4 py-2 mr-2 text-sm "
              onClick={() => firebase.auth().signOut()}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </>
  )
}
