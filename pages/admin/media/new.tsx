import { NextPage } from 'next'
import { postClient } from 'services/client/post'
import { Media } from '@prisma/client'
import firebase from 'lib/firebase-client'
import { HeaderAdmin } from '.'
import { Previews } from '../../../components/Previews'
import { useState } from 'react'
import { MediaWithUrl } from 'lib/types'
import { useAuth } from 'lib/auth'
import { TemplateAdmin } from 'components/TemplateAdmin'
import NProgress from 'nprogress'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const router = useRouter()
  const [medias, setMedias] = useState<MediaWithUrl[]>([])
  const auth = useAuth()
  const [files, setFiles] = useState<File[]>([])
  return (
    <TemplateAdmin>
      <>
        <HeaderAdmin breadcrumb={<span>New</span>}>
          <button
            className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={async () => {
              const _medias: Media[] = medias.map((x) => {
                delete x.url
                return {
                  ...x,
                  customerId: auth.customer.id,
                }
              })

              const promises = _medias.map((_, i) => {
                return firebase
                  .storage()
                  .ref(`/${_medias[i].customerId}/${_medias[i].tag}`)
                  .put(files[i])
              })

              try {
                NProgress.start()
                await Promise.all(promises)
                await postClient<Media[]>(_medias, `/api/media`)
                router.push(`/admin/media`)
              } catch (e) {
                NProgress.done()
                console.log(e)
              }
            }}
          >
            Save
          </button>
        </HeaderAdmin>

        <div className="p-20">
          <Previews medias={medias} setMedias={setMedias} files={files} setFiles={setFiles} />
        </div>
      </>
    </TemplateAdmin>
  )
}

export default Page
