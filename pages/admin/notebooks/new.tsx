import { NextPage } from 'next'
import { TemplateAdmin } from 'components/TemplateAdmin'
import { useAuth } from 'lib/auth'
import { EditNotebookPage } from 'components/Pages/EditNotebookPage'

const Page: NextPage = () => {
  const auth = useAuth()

  return (
    <TemplateAdmin className="bg-gray-200">
      <EditNotebookPage customerTag={auth.customer?.tag} />
    </TemplateAdmin>
  )
}

export default Page
