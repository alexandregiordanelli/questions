import React, { useState } from 'react'
import Link from 'next/link'
import { Logo, LogoTextual } from './Logo'
import { useRouter } from 'next/router'
import { ChevronRightIcon, SearchIcon } from '@primer/octicons-react'
import { Login } from './Login'
// import { Modal } from './Modal'
// import { NotebookCard } from './NotebookCard'
import { NotebookWithTopicsAndSubTopics, Question, QuestionWithAll } from 'lib/types'
import { supabase } from 'lib/supabase-client'
import { useAuth } from 'lib/auth'
import { DropDownMenu } from './DropDownMenu'
import NoSSR from 'react-no-ssr'

export const Header: React.FC<{
  question?: QuestionWithAll
  notebook?: NotebookWithTopicsAndSubTopics
}> = (props) => {
  const { customer } = useAuth()
  const router = useRouter()

  const offsetPaddingLeft = !!props.notebook

  const [search, setSearch] = useState('')

  const getSearch: React.FormEventHandler<HTMLFormElement> = async (e): Promise<void> => {
    e.preventDefault()

    const { data } = await supabase
      .from<Question>('Question')
      .select('*')
      .textSearch('text', search, {
        type: 'websearch',
      })

    if (data.length > 0) router.push(`/q/${data[0].tag}`)
  }
  // const hasThisNotebook = subscribers?.some((x) => x.notebookId == props.question?.notebook.id)

  // const showModal = !user && showNotebookCard && !hasThisNotebook

  return (
    <>
      <header
        className={`bg-gray-800 shadow-lg top-0 sticky h-16 items-center justify-between flex p-1 z-10 ${
          offsetPaddingLeft ? 'pl-12 lg:px-4' : 'px-4'
        }`}
      >
        <div className="items-center flex">
          <Link href="/">
            <a className="items-center flex" aria-label="questionsof">
              <Logo size={32} color="#fff" className="mr-2" />
              <LogoTextual size={32} color="#fff" className="hidden sm:block" />
            </a>
          </Link>
          <form
            onSubmit={(e) => getSearch(e)}
            className="flex items-center px-2 mr-2 bg-gray-700 rounded"
          >
            <SearchIcon size={18} className="text-white" />
            <input
              className="bg-gray-700 w-28 border-0 text-white focus:ring-0 rounded"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
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
          {!supabase.auth.user() && <Login />}
          {customer && <DropDownMenu />}
        </NoSSR>
      </header>
    </>
  )
}
