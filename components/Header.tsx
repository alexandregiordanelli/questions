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
// import { Modal } from './Modal'
// import { NotebookCard } from './NotebookCard'
import { NotebookWithTopicsAndSubTopics, QuestionWithAll } from 'lib/types'

export const Header: React.FC<{
  question?: QuestionWithAll
  notebook?: NotebookWithTopicsAndSubTopics
}> = (props) => {
  const {
    customer,
    // subscribers,
    user,
    showFocusOnLogin,
    // showNotebookCard,
    // setShowNotebookCard,
  } = useAuth()
  const router = useRouter()

  const offsetPaddingLeft = !!props.notebook

  // const hasThisNotebook = subscribers?.some((x) => x.notebookId == props.question?.notebook.id)

  // const showModal = !user && showNotebookCard && !hasThisNotebook

  return (
    <>
      <div
        className={`bg-gray-800 shadow-lg top-0 sm:sticky h-16 items-center justify-between flex p-1 z-10 ${
          offsetPaddingLeft ? 'pl-12 lg:px-4' : 'px-4'
        }`}
      >
        <div className="items-center flex">
          <Link href="/">
            <a className="items-center flex">
              <Logo size={32} color="#fff" className="mr-2" />
              <LogoTextual size={32} color="#fff" className="hidden sm:block" />
            </a>
          </Link>
          {!router.pathname.startsWith('/admin') && props.question && (
            <>
              {props.notebook && (
                <>
                  <div className="text-gray-700 block">
                    <ChevronRightIcon />
                  </div>
                  <Link href={`/${props.notebook.tag}`}>
                    <a className="text-white px-2 py-2 text-sm lg:text-gray-400">{`${props.notebook.name}`}</a>
                  </Link>
                </>
              )}
              <div className="text-gray-700 hidden lg:block">
                <ChevronRightIcon />
              </div>
              <h1 className="text-white px-2 py-2 text-sm hidden lg:block">{`${props.question.name}`}</h1>
            </>
          )}
          {router.pathname.startsWith('/admin') && (
            <Link href={`/admin`}>
              <a className="text-white px-2 py-2 text-sm hidden md:block">Admin</a>
            </Link>
          )}
        </div>
        <NoSSR>
          {/* {showModal && (
            <Modal showModal={setShowNotebookCard}>
              <NotebookCard notebook={props.question.notebook} hasThisNotebook={false} />
            </Modal>
          )}
          {!user && showFocusOnLogin && <FocusOnLogin />} */}
          {!user && (
            <Login className={`mr-2 z-30 ${showFocusOnLogin && 'border-red-500 border-2'}`} />
          )}
          {customer && <DropDownMenu />}
        </NoSSR>
      </div>
    </>
  )
}

// const FocusOnLogin: React.FC = () => {
//   const { setShowFocusOnLogin } = useAuth()
//   useEffect(() => {
//     const close = (e): void => {
//       if (e.keyCode === 27) {
//         setShowFocusOnLogin(false)
//       }
//     }
//     window.addEventListener('keydown', close)
//     return () => window.removeEventListener('keydown', close)
//   }, [setShowFocusOnLogin])

//   return (
//     <div
//       tabIndex={0}
//       role="button"
//       className="fixed z-20 inset-0 bg-black opacity-90"
//       onClick={() => setShowFocusOnLogin(false)}
//       onKeyDown={() => setShowFocusOnLogin(false)}
//     />
//   )
// }

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
          <Link href="/dashboard">
            <a
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              My Notebooks
            </a>
          </Link>
          {[18, 19].some((x) => x == customer.id) && (
            <Link href="/admin">
              <a
                className="hidden sm:block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Admin
              </a>
            </Link>
          )}
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
