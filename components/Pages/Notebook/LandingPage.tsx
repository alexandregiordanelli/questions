import React from 'react'
import { Media, Customer, Notebook } from 'lib/types'
import { MarkdownText } from 'components/MarkdownText'
import { NotebookCard } from 'components/NotebookCard'
import { getURLMedia } from 'lib/utils'
import { MenuWithQuestions } from 'lib/types'
import { MenuCore2 } from './MenuCore2'
import Link from 'next/link'
import { useAuth } from 'lib/auth'

export const LandingPage: React.FC<{
  notebook: Notebook & {
    media: Media
  }
  customer: Customer & {
    media: Media
  }
  menu: MenuWithQuestions
}> = (props) => {
  const auth = useAuth()
  const hasThisNotebook = auth.subscribers?.some((x) => x.notebookId == props.notebook.id)
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
                <span className="text-xl font-medium mb-5 mt-10">Description</span>
                <MarkdownText md={props.notebook.text} customerId={props.customer.id} />
              </>
            )}

            <span className="text-xl font-medium mb-5 mt-10">Content</span>
            <MenuCore2 menu={props.menu} />
            <span className="text-xl font-medium mb-5 mt-10">Productor</span>
            <Link href={`/u/${props.customer.tag}`}>
              <a>
                <h2 className="font-medium text-black">{props.customer.name}</h2>
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
            <NotebookCard
              hasThisNotebook={hasThisNotebook}
              notebook={props.notebook}
              className="shadow-2xl"
              startQuestionTag={props.menu[0]?.subtopics[0]?.questionSubTopics[0].question.tag}
            />
          </div>
        </div>
      </div>
    </>
  )
}
