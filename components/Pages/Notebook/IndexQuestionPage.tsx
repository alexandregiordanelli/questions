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
            <h2 className="text-xl font-medium mb-5">Description</h2>
            <MarkdownText md={props.notebook.text} customerId={props.customer.id} />
            <h2 className="text-xl font-medium my-5">Content</h2>

            <h2 className="text-xl font-medium my-5">Productor</h2>
            <h1 className="font-medium text-black">{props.customer.name}</h1>
            {props.customer.media && (
              <img
                className="rounded-full w-24 h-24 my-5"
                src={getURLMedia(props.customer.media)}
                alt={props.customer.name}
              />
            )}
            <MarkdownText md={props.customer.text} customerId={props.customer.id} />
          </div>
          <div className="sticky top-24 transform -translate-y-8">
            <NotebookCard notebook={props.notebook} className="shadow-2xl" />
          </div>
        </div>
      </div>
    </>
  )
}
