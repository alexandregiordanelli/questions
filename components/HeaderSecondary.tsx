import { useRouter } from 'next/router'
import { useAuth } from 'lib/auth'
import { PencilIcon, EyeIcon, TrashIcon, PlusIcon } from '@primer/octicons-react'

export const HeaderSecondary: React.FC = () => {
  const router = useRouter()
  const tags = (router.query.tags as string[]) ?? []
  const { customerLogged } = useAuth()
  const tagsN = tags.length

  if (tagsN > 0 && customerLogged?.tag != tags[0]) {
    return null
  }

  const viewUrl = `/${tags.join('/')}`
  const editUrl = `/edit${viewUrl}`
  const addUrl = `/add${viewUrl}`

  let page = ''
  let nextPage = ''
  if (tagsN == 1) {
    page = 'User'
    nextPage = 'Notebook'
  } else if (tagsN == 2) {
    page = 'Notebook'
    nextPage = 'Question'
  } else if (tagsN == 3) {
    page = 'Question'
  }

  return (
    <div className="bg-gray-700 flex justify-between p-2">
      <div className="bg-gray-900 rounded-md shadow-inner">
        <span className="uppercase text-gray-500 text-xs px-4">{page}</span>
        <button
          className={`text-sm rounded-md px-4 py-2 mr-2 ${
            router.asPath == viewUrl ? 'text-white' : 'text-gray-400'
          }`}
          onClick={() => router.push(viewUrl)}
        >
          <EyeIcon />
        </button>
        <button
          className={`text-sm rounded-md px-4 py-2 mr-2 ${
            router.asPath == editUrl ? 'text-white' : 'text-gray-400'
          }`}
          onClick={() => router.push(editUrl)}
        >
          <PencilIcon />
        </button>
        <button
          className={`text-sm rounded-md px-4 py-2 mr-2 ${
            router.asPath == editUrl ? 'text-white' : 'text-gray-400'
          }`}
          onClick={() => router.push(editUrl)}
        >
          <TrashIcon />
        </button>
      </div>
      {tags.length < 3 && (
        <button
          className={`text-sm font-medium rounded-md px-4 py-2 mr-2 bg-green-500 ${
            router.asPath == addUrl ? 'text-white' : 'text-white'
          }`}
          onClick={() => router.push(addUrl)}
        >
          <PlusIcon /> {nextPage}
        </button>
      )}
    </div>
  )
}
