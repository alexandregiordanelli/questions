import { EditQuestionPage } from 'components/Pages/EditQuestionPage'
import { NextPage } from 'next'
import { TemplateAdmin } from 'components/TemplateAdmin'
import { useAuth } from 'lib/auth'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const auth = useAuth()
  const route = useRouter()
  const tags = route.query.tags as string
  const [, notebookTag, questionTag] = tags?.split('/').filter((x) => x) ?? []
  return (
    <TemplateAdmin className="bg-gray-200">
      <EditQuestionPage
        customerTag={auth.customerLogged.tag}
        notebookTag={notebookTag}
        questionTag={questionTag}
      />
    </TemplateAdmin>
  )
}

export default Page
