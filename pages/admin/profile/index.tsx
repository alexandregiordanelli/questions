import { NextPage } from 'next'
import { TemplateAdmin } from 'components/TemplateAdmin'
import { useAuth } from 'lib/auth'
import { EditCustomerPage } from 'components/Pages/EditCustomerPage'

const Page: NextPage = () => {
  const auth = useAuth()

  return (
    <TemplateAdmin className="bg-gray-200">
      <EditCustomerPage customerTag={auth.customerLogged?.tag} />
    </TemplateAdmin>
  )
}

export default Page
