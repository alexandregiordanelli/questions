import React from 'react'
import Link from 'next/link'
import { Logo, LogoTextual } from 'components/Logo'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-screen-xl mx-auto py-8 sm:py-16 px-8 flex items-center justify-between flex-col sm:flex-row">
        <Link href="/">
          <a className="items-center flex">
            <Logo size={48} color="rgb(31, 41, 55)" className="mr-2" />
            <LogoTextual size={48} color="rgb(31, 41, 55)" className="" />
          </a>
        </Link>
        <ul className="flex font-semibold text-sm text-gray-600 mt-8 sm:mt-0">
          <li className="mr-4">
            <Link href="/docs/privacy">
              <a>Privacy</a>
            </Link>
          </li>
          <li>
            <Link href="/docs/terms">
              <a>Terms of Service</a>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
