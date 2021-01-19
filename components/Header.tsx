import React from 'react'
import Link from 'next/link'
import { Logo, LogoTextual } from './Logo'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/client'
export const Header: React.FC = () => {
  const [session] = useSession()
  const router = useRouter()

  const isInitialPage = router.asPath == '/'

  return (
    <>
      <div
        className={`bg-gray-800 top-0 sticky h-16 items-center justify-between flex p-1 z-10  sm:pl-2 ${
          isInitialPage ? 'pl-2' : 'pl-8'
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
        {!session && (
          <>
            Not signed in <br />
            <button
              className="bg-gray-700 text-white rounded-md px-4 py-2 mr-2 shadow-md"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </>
        )}
        {session && (
          <div className="flex">
            {isInitialPage ? (
              <button
                className="bg-gray-700 text-white rounded-md px-4 py-2 mr-2 shadow-md"
                onClick={() =>
                  router.push(`${router.asPath}?add=true`, undefined, { shallow: true })
                }
              >
                Add Notebook
              </button>
            ) : (
              <>
                <button
                  className="bg-gray-700 text-white rounded-md px-4 py-2 mr-2 shadow-md"
                  onClick={() =>
                    router.push(`${router.asPath}?add=true`, undefined, { shallow: true })
                  }
                >
                  Add Question
                </button>
                <button
                  className="bg-gray-800 text-white rounded-md px-4 py-2 mr-2 border-gray-700 border"
                  onClick={() =>
                    router.push(`${router.asPath}?edit=true`, undefined, { shallow: true })
                  }
                >
                  Edit Notebook
                </button>
              </>
            )}
            <button className="text-white px-4 py-2 mr-2 " onClick={() => signOut()}>
              Sign out
            </button>
          </div>
        )}
      </div>
    </>
  )
}
