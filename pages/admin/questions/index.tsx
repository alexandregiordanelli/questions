import { FileBinaryIcon, ChevronRightIcon, PlusIcon } from '@primer/octicons-react'
import Link from 'next/link'
import { Table } from 'components/Table'
import { NextPage } from 'next'
import { TemplateAdmin } from 'components/TemplateAdmin'
import { useAuth } from 'lib/auth'

const Page: NextPage = () => {
  const auth = useAuth()
  return (
    <TemplateAdmin className="bg-gray-200">
      <>
        <HeaderAdmin>
          <Link href="/admin/questions/new">
            <a
              className={`justify-center align-middle items-center flex py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              <PlusIcon />
              <span className="mx-1">Question</span>
            </a>
          </Link>
        </HeaderAdmin>
        <div className="p-20">
          <Table customerTag={auth.customer?.tag} />
        </div>
      </>
    </TemplateAdmin>
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
