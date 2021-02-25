import React from 'react'
import { Notebook, Media, Customer } from '@prisma/client'
import { MarkdownText } from 'components/MarkdownText'
import { NotebookCard } from 'components/NotebookCard'
import { getURLMedia } from 'lib/utils'

export const IndexQuestionPage: React.FC<{
  notebook: Notebook & {
    media: Media
  }
  customer: Customer & {
    media: Media
  }
}> = (props) => {
  return (
    <>
      <div className="flex flex-col flex-grow">
        <div className=" bg-gray-800">
          <div className="max-w-screen-lg mx-auto">
            <h1 className="text-xl font-medium text-white my-8">{props.notebook.name}</h1>
          </div>
        </div>
        <div className="flex max-w-screen-lg mx-auto">
          <div className="py-8 pr-8 qmd flex flex-col flex-grow">
            <MarkdownText md={props.notebook.text} />
            <div className=" bg-white border-t border-b flex py-4 px-8">
              <div className="flex flex-col">
                {props.customer.media && (
                  <img
                    className="rounded-full w-24 h-24"
                    src={getURLMedia(props.customer.media)}
                    alt={props.customer.name}
                  />
                )}
                <h1 className="font-medium text-black">{props.customer.tag}</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="font-medium text-black">About</h1>
                <div className="">{props.customer.text}</div>
              </div>
            </div>
          </div>
          <div className="sticky top-24 transform -translate-y-8">
            <NotebookCard notebook={props.notebook} className="shadow-2xl" />
          </div>
        </div>
      </div>
    </>
  )
}
