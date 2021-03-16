import React from 'react'
import { Notebook, Media, Customer } from '@prisma/client'
import { MarkdownText } from 'components/MarkdownText'
import { NotebookCard } from 'components/NotebookCard'
import { getURLMedia } from 'lib/utils'
import { MenuWithQuestions } from 'lib/types'
import { MenuCore2 } from './MenuCore2'
import Link from 'next/link'

export const IndexQuestionPage: React.FC<{
  notebook: Notebook & {
    media: Media
  }
  customer: Customer & {
    media: Media
  }
  menu: MenuWithQuestions
}> = (props) => {
  return (
    <>
      <div className="flex flex-col flex-grow">
        <div className=" bg-gray-800">
          <div className="max-w-screen-lg mx-auto">
            <h1 className="text-xl font-medium text-white mb-16 my-8 text-center lg:text-left">
              {props.notebook.name}
            </h1>
          </div>
        </div>
        <div className="flex flex-col-reverse lg:flex-row lg:w-full lg:max-w-screen-lg mx-auto">
          <div className="p-8 lg:pl-0 flex flex-col flex-grow">
            {props.notebook.text && (
              <>
                <h2 className="text-xl font-medium mb-5 mt-10">Description</h2>
                <MarkdownText md={props.notebook.text} customerId={props.customer.id} />
              </>
            )}

            <h2 className="text-xl font-medium mb-5 mt-10">Content</h2>
            <MenuCore2 menu={props.menu} customerTag={props.customer.tag} />
            <h2 className="text-xl font-medium mb-5 mt-10">Productor</h2>
            <Link href={`/u/${props.customer.tag}`}>
              <a>
                <h1 className="font-medium text-black">{props.customer.name}</h1>
              </a>
            </Link>
            {props.customer.media && (
              <img
                className="rounded-full w-24 h-24 my-5"
                src={getURLMedia(props.customer.media)}
                alt={props.customer.name}
              />
            )}
            <MarkdownText md={props.customer.text} customerId={props.customer.id} />
          </div>
          <div className="static lg:sticky lg:self-start  top-24 transform -translate-y-8 mx-auto -mb-8">
            <NotebookCard notebook={props.notebook} className="shadow-2xl" />
          </div>
        </div>
      </div>
    </>
  )
}
