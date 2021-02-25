import { useRouter } from 'next/router'
import { FileBadgeIcon, FileBinaryIcon, FileMediaIcon, PersonIcon } from '@primer/octicons-react'
import Link from 'next/link'

export const MenuAdmin: React.FC = () => {
  const route = useRouter()
  return (
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
      <li className="flex items-center mt-4">
        <Link href="/admin/profile">
          <a
            className={`flex-1 py-2 px-6 hover:bg-opacity-20 hover:bg-gray-700 ${
              route.route == '/admin/profile'
                ? 'bg-opacity-20 bg-gray-700 text-white'
                : 'text-gray-500'
            }`}
          >
            <PersonIcon />
            <span className="mx-3">Profile</span>
          </a>
        </Link>
      </li>
    </ul>
  )
}
