import { NextPage } from 'next'
import { TemplateAdmin } from 'components/TemplateAdmin'
import { useAuth } from 'lib/auth'
import { EditNotebookPage } from 'components/Pages/EditNotebookPage'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const auth = useAuth()
  const route = useRouter()
  const tags = route.query.tags as string
  const [, notebookTag] = tags?.split('/').filter((x) => x) ?? []

  return (
    <TemplateAdmin className="bg-gray-200">
      <EditNotebookPage customerTag={auth.customerLogged?.tag} notebookTag={notebookTag} />
    </TemplateAdmin>
  )
}

export default Page
