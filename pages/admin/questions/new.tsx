import { EditQuestionPage } from 'components/Pages/EditQuestionPage'
import { NextPage } from 'next'
import { TemplateAdmin } from 'components/TemplateAdmin'
import { useAuth } from 'lib/auth'

const Page: NextPage = () => {
  const auth = useAuth()

  return (
    <TemplateAdmin className="bg-gray-200">
      <EditQuestionPage customerTag={auth.customerLogged.tag} />
    </TemplateAdmin>
  )
}

export default Page
