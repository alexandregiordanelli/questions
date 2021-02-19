import { useRouter } from 'next/router'
import {
  FileBadgeIcon,
  FileBinaryIcon,
  ChevronRightIcon,
  PlusIcon,
  FileMediaIcon,
} from '@primer/octicons-react'
import Link from 'next/link'
import { NextPage } from 'next'
import { useDropzone } from 'react-dropzone'
import { useEffect, useState } from 'react'

const Page: NextPage = () => {
  const route = useRouter()
  const uid = route.query.uid as string
  const isNew = !!(route.query.new as string)

  return (
    <div className="h-screen flex">
      <div className="w-60 bg-gray-800">
        <ul className="text-white">
          <li className="flex items-center mt-4">
            <Link href="/admin/notebooks">
              <a
                className={`flex-1 py-2 px-6 hover:bg-opacity-20 hover:bg-gray-700 ${
                  route.route == '/admin/notebooks'
                    ? 'bg-opacity-20 bg-gray-700 text-white'
                    : 'text-gray-500'
                }`}
              >
                <FileBadgeIcon />
                <span className="mx-3">Notebooks</span>
              </a>
            </Link>
          </li>
          <li className="flex items-center mt-4">
            <Link href="/admin/questions">
              <a
                className={`flex-1 py-2 px-6 hover:bg-opacity-20 hover:bg-gray-700 ${
                  route.route == '/admin/questions'
                    ? 'bg-opacity-20 bg-gray-700 text-white'
                    : 'text-gray-500'
                }`}
              >
                <FileBinaryIcon />
                <span className="mx-3">Questions</span>
              </a>
            </Link>
          </li>
          <li className="flex items-center mt-4">
            <Link href="/admin/media">
              <a
                className={`flex-1 py-2 px-6 hover:bg-opacity-20 hover:bg-gray-700 ${
                  route.route == '/admin/media'
                    ? 'bg-opacity-20 bg-gray-700 text-white'
                    : 'text-gray-500'
                }`}
              >
                <FileMediaIcon />
                <span className="mx-3">Media Library</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="bg-white flex-1 overflow-auto">
        {uid && <></>}

        {isNew && (
          <>
            <HeaderAdmin breadcrumb={<span>New</span>}>
              <button className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
              </button>
            </HeaderAdmin>

            <div className="p-20">
              <Previews />
            </div>
          </>
        )}

        {!uid && !isNew && (
          <>
            <HeaderAdmin>
              <Link href="/admin/media?new=true">
                <a
                  className={`justify-center align-middle items-center flex py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  <PlusIcon />
                  <span className="mx-1">Media</span>
                </a>
              </Link>
            </HeaderAdmin>
            <div className="p-20"></div>
          </>
        )}
      </div>
    </div>
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

type FileWithPreview = {
  preview: string
} & File

const Previews: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const thumbs = files.map((file) => {
    return (
      <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 flex flex-col m-3" key={file.name}>
        <div className="bg-gray-800 flex-grow flex items-center justify-center">
          <img src={file.preview} alt={file.name} />
        </div>
        <div className="flex items-baseline mt-2">
          <p className="text-xs font-medium truncate">{file.name}</p>
          <span className="uppercase bg-gray-100 text-xs text-gray-300 p-1 rounded">
            {file.type}
          </span>
        </div>
        <p className="text-xs text-gray-300">{Math.round(file.size / 1024)} KB</p>
      </div>
    )
  })

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <section className="container">
      <div
        {...getRootProps({
          className:
            'dropzone mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-white',
        })}
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Upload a file</span>
              <input {...getInputProps()} />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      <aside className="flex flex-wrap">{thumbs}</aside>
    </section>
  )
}

export default Page
