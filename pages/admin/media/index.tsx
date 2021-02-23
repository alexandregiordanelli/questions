import { useRouter } from 'next/router'
import Link from 'next/link'
import { NextPage } from 'next'
import { PlusIcon, FileMediaIcon, ChevronRightIcon } from '@primer/octicons-react'
import { TemplateAdmin } from '../../../components/TemplateAdmin'
import { Media } from '@prisma/client'
import { useData } from 'services/client/get'
import { Thumbs } from 'components/Thumbs'
import { MediaWithUrl } from 'lib/types'

const Page: NextPage = () => {
  const route = useRouter()
  const uid = route.query.uid as string
  const { data: medias } = useData<Media[]>(`/api/media`)

  const mediasWithURL: MediaWithUrl[] = medias?.map((x) => {
    return {
      ...x,
      url: `https://assets.questionsof.com/${x.customerId}/${x.tag}`,
    }
  })

  return (
    <TemplateAdmin>
      {!uid && (
        <>
          <HeaderAdmin>
            <Link href="/admin/media/new">
              <a
                className={`justify-center align-middle items-center flex py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <PlusIcon />
                <span className="mx-1">Media</span>
              </a>
            </Link>
          </HeaderAdmin>
          <div className="p-20">
            <Thumbs medias={mediasWithURL} />
          </div>
        </>
      )}
    </TemplateAdmin>
  )
}

export const HeaderAdmin: React.FC<{
  breadcrumb?: JSX.Element
}> = (props) => {
  return (
    <div className="p-3 bg-white shadow flex justify-between sticky top-0 z-10 align-middle">
      <div className="flex items-center">
        <Link href="/admin/media">
          <a className={`py-2`}>
            <FileMediaIcon className="mx-3" />
            <span className="text-lg font-medium">Media</span>
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
