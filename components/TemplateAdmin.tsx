import { MenuAdmin } from 'components/MenuAdmin'
import React from 'react'
import { Header } from './Header'
import { HeadHtml } from './HeadHtml'

export const TemplateAdmin: React.FC<{
  className?: string
}> = (props) => {
  return (
    <div className="h-screen flex flex-col">
      <HeadHtml>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/default.min.css"
        />
      </HeadHtml>
      <Header />
      <div className="flex-grow flex overflow-auto">
        <div className="w-60 bg-gray-800">
          <MenuAdmin />
        </div>
        <div className={`flex-1 overflow-auto ${props.className ?? ''}`}>{props.children}</div>
      </div>
    </div>
  )
}
