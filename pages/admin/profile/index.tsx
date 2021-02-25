import { NextPage } from 'next'
import { TemplateAdmin } from 'components/TemplateAdmin'
import { useAuth } from 'lib/auth'
import { EditCustomerPage } from 'components/Pages/EditCustomerPage'
import { PersonIcon } from '@primer/octicons-react'
import Link from 'next/link'

const Page: NextPage = () => {
  const auth = useAuth()

  return (
    <TemplateAdmin className="bg-gray-200">
      <EditCustomerPage customerTag={auth.customerLogged?.tag} />
    </TemplateAdmin>
  )
}

export const HeaderAdmin: React.FC<{
  breadcrumb?: JSX.Element
}> = (props) => {
  return (
    <div className="p-3 bg-white shadow flex justify-between sticky top-0 z-10 align-middle">
      <div className="flex items-center">
        <Link href="/admin/profile">
          <a className={`py-2`}>
            <PersonIcon className="mx-3" />
            <span className="text-lg font-medium">Profile</span>
          </a>
        </Link>
      </div>
      {props.children}
    </div>
  )
}

export default Page
