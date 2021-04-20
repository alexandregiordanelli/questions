import React from 'react'
import Link from 'next/link'
import { useAuth } from 'lib/auth'
import { ChevronDownIcon } from '@primer/octicons-react'
import { getURLMedia } from 'lib/utils'

// const FocusOnLogin: React.FC = () => {
//   const { setShowFocusOnLogin } = useAuth()
//   useEffect(() => {
//     const close = (e): void => {
//       if (e.keyCode === 27) {
//         setShowFocusOnLogin(false)
//       }
//     }
//     window.addEventListener('keydown', close)
//     return () => window.removeEventListener('keydown', close)
//   }, [setShowFocusOnLogin])
//   return (
//     <div
//       tabIndex={0}
//       role="button"
//       className="fixed z-20 inset-0 bg-black opacity-90"
//       onClick={() => setShowFocusOnLogin(false)}
//       onKeyDown={() => setShowFocusOnLogin(false)}
//     />
//   )
// }

export const DropDownMenu: React.FC = () => {
  const { customer, logout } = useAuth()

  return (
    <div className="relative inline-block text-left">
      <label htmlFor="dropDownMenu" className="flex items-center text-gray-700 cursor-pointer">
        <img
          className="h-8 w-8 mr-1 rounded-full"
          src={getURLMedia(customer?.Media)}
          alt="avatar"
        />
        <ChevronDownIcon />
      </label>
      <input id="dropDownMenu" className="toggleVisibilityUL" type="checkbox" />

      <ul className="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
        <li className="py-1">
          <Link href="/dashboard">
            <a
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              My Notebooks
            </a>
          </Link>
          {[18, 19].some((x) => x == customer.id) && (
            <Link href="/admin">
              <a
                className="hidden sm:block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Admin
              </a>
            </Link>
          )}
        </li>
        <li className="py-1 flex">
          <button
            className="flex-1 text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            onClick={async () => await logout()}
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  )
}
