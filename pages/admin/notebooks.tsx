import { useRouter } from 'next/router'
import { FileBadgeIcon, FileBinaryIcon, ChevronRightIcon, PlusIcon } from '@primer/octicons-react'
import Link from 'next/link'
import { TableNotebooks } from 'components/Table'
import { NextPage } from 'next'
import { EditNotebookPage } from 'components/Pages/EditNotebookPage'

const Page: NextPage = () => {
  const route = useRouter()
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
                  route.route == '/admin/notebooks'
                    ? 'bg-opacity-20 bg-gray-700 text-white'
                    : 'text-gray-500'
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
                  route.route == '/admin/questions'
                    ? 'bg-opacity-20 bg-gray-700 text-white'
                    : 'text-gray-500'
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
            <EditNotebookPage
              customerTag={customerTag as string}
              notebookTag={notebookTag as string}
            />
          </>
        )}

        {tags && !questionTag && (
          <>
            <EditNotebookPage
              customerTag={customerTag as string}
              notebookTag={notebookTag as string}
            />
          </>
        )}

        {!tags && (
          <>
            <HeaderAdmin>
              <Link href="/admin/notebooks?tags=/giorda">
                <a
                  className={`justify-center align-middle items-center flex py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  <PlusIcon />
                  <span className="mx-1">Notebook</span>
                </a>
              </Link>
            </HeaderAdmin>
            <div className="p-20">
              <TableNotebooks customerTag={'giorda'} />
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
        <Link href="/admin/notebooks">
          <a className={`py-2`}>
            <FileBadgeIcon className="mx-3" />
            <span className="text-lg font-medium">Notebooks</span>
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
