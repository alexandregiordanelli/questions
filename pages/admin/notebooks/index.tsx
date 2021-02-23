import { FileBadgeIcon, ChevronRightIcon, PlusIcon } from '@primer/octicons-react'
import Link from 'next/link'
import { TableNotebooks } from 'components/Table'
import { NextPage } from 'next'
import { TemplateAdmin } from 'components/TemplateAdmin'
import { useAuth } from 'lib/auth'

const Page: NextPage = () => {
  const auth = useAuth()
  return (
    <TemplateAdmin className="bg-gray-200">
      <HeaderAdmin>
        <Link href="/admin/notebooks/new">
          <a
            className={`justify-center align-middle items-center flex py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            <PlusIcon />
            <span className="mx-1">Notebook</span>
          </a>
        </Link>
      </HeaderAdmin>
      <div className="p-20">
        <TableNotebooks customerTag={auth.customerLogged?.tag} />
      </div>
    </TemplateAdmin>
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
