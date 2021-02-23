import React from 'react'
import { Notebook, Media } from '@prisma/client'
import { MarkdownText } from 'components/MarkdownText'
import { NotebookCard } from 'components/NotebookCard'

export const IndexQuestionPage: React.FC<{
  notebook: Notebook & {
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
        <div className="">
          <div className="flex max-w-screen-lg mx-auto">
            <div className="py-8 pr-8 qmd flex flex-col">
              <MarkdownText md={props.notebook.text} />
            </div>
            <div className="sticky top-24 transform -translate-y-8">
              <NotebookCard notebook={props.notebook} className="shadow-2xl" />
            </div>
            {/* <div>

            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
