import { useRouter } from 'next/router'
import { FileBadgeIcon, FileBinaryIcon, ChevronRightIcon, PlusIcon } from '@primer/octicons-react'
import Link from 'next/link'
import { Table } from 'components/Table'
import { EditQuestionPage, NewQuestionPage } from 'components/Pages/EditQuestionPage'
import { NextPage } from 'next'

const Page: NextPage = () => {
  const route = useRouter()
  const tag = route.query.tag as string
  const tags = route.query.tags as string

  const [customerTag, notebookTag, questionTag] = tags?.split('/').filter((x) => x) ?? []

  return (
    <div className="h-screen flex">
      <div className="w-60 bg-gray-800">
        <ul className="text-white">
          <li className="flex items-center mt-4">
            <Link href="/admin/notebooks">
              <a
                className={`flex-1 py-2 px-6 hover:bg-opacity-20 hover:bg-gray-700 ${
                  tag == 'notebooks' ? 'bg-opacity-20 bg-gray-700 text-white' : 'text-gray-500'
                }`}
              >
                <FileBadgeIcon />
                <span className="mx-3">Notebooks</span>
              </a>
            </Link>
          </li>
          <li className="flex items-center mt-4">
            <Link href="/admin/questions">
              <a
                className={`flex-1 py-2 px-6 hover:bg-opacity-20 hover:bg-gray-700 ${
                  tag == 'questions' ? 'bg-opacity-20 bg-gray-700 text-white' : 'text-gray-500'
                }`}
              >
                <FileBinaryIcon />
                <span className="mx-3">Questions</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="bg-gray-200 flex-1 overflow-auto">
        {tags && questionTag && (
          <>
            <EditQuestionPage
              customerTag={customerTag as string}
              notebookTag={notebookTag as string}
              questionTag={questionTag as string}
            />
          </>
        )}

        {tags && !questionTag && (
          <>
            <NewQuestionPage
              customerTag={customerTag as string}
              notebookTag={notebookTag as string}
            />
          </>
        )}

        {!tags && (
          <>
            <HeaderAdmin>
              <Link href="/admin/questions?tags=/giorda">
                <a
                  className={`justify-center align-middle items-center flex py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  <PlusIcon />
                  <span className="mx-1">Question</span>
                </a>
              </Link>
            </HeaderAdmin>
            <div className="p-20">
              <Table customerTag={'giorda'} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export const HeaderAdmin: React.FC<{
  breadcrumb?: JSX.Element
}> = (props) => {
  return (
    <div className="p-3 bg-white shadow flex justify-between sticky top-0 z-10 align-middle">
      <div className="flex items-center">
        <Link href="/admin/questions">
          <a className={`py-2`}>
            <FileBinaryIcon className="mx-3" />
            <span className="text-lg font-medium">Questions</span>
          </a>
        </Link>
        {props.breadcrumb && (
          <>
            <ChevronRightIcon className="mx-3" />
            {props.breadcrumb}
          </>
        )}
      </div>
      {props.children}
    </div>
  )
}

export default Page
