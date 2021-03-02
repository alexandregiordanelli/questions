import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'
import HeadHtml from 'components/HeadHtml'
import { urlEnv, ampCanonicalUrl } from 'lib/utils'
import { Header } from 'components/Header'
import { LeftMenu } from 'components/new/LeftMenu'
import React from 'react'
import { Menu } from 'lib/types'
import { join, resolve } from 'path'
import { readFileSync } from 'fs'
import { MarkdownText } from 'components/MarkdownText'
export const Page: NextPage<{
  menu: Menu
  markdown: string
}> = (props) => {
  const router = useRouter()
  const isAmp = useAmp()
  return (
    <>
      <HeadHtml>
        <link
          rel={isAmp ? 'canonical' : 'amphtml'}
          href={`${urlEnv}${ampCanonicalUrl(isAmp, router.asPath)}`}
        />
      </HeadHtml>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex">
          <LeftMenu menu={props.menu} />
          <div className="flex-grow">
            <div className="flex flex-col lg:flex-row-reverse max-w-screen-xl mx-auto p-12">
              {/* <RightMenu /> */}
              <div className="flex-grow qmd">
                <MarkdownText md={props.markdown} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<{
  menu: Menu
  markdown: string
}> = async (context) => {
  const tags = context.params.tags as string[]
  const docsDirectory = resolve(process.cwd(), 'public', 'md')
  const fullPath = join(docsDirectory, `${tags?.join('/') ?? 'index'}.md`)
  const markdown: string = readFileSync(fullPath, 'utf8')

  try {
    const menu: Menu = {
      items: [
        {
          name: 'API Basics',
          url: '/docs/api-basics',
        },
        {
          name: 'Types',
          subItems: [
            {
              name: 'Alternative',
              url: '/docs/types/alternative',
            },
            {
              name: 'Customer',
              url: '/docs/types/customer',
            },
            {
              name: 'NotebookWithTopicsAndSubTopics',
              url: '/docs/types/notebook-with-topics-and-subtopics',
            },
            {
              name: 'Notebook',
              url: '/docs/types/notebook',
            },
            {
              name: 'QuestionWithAll ',
              url: '/docs/types/question-with-all',
            },
            {
              name: 'Question',
              url: '/docs/types/question',
            },
            {
              name: 'RightAlternative',
              url: '/docs/types/right-alternative',
            },
            {
              name: 'SubTopic',
              url: '/docs/types/subtopic',
            },
            {
              name: 'Topic',
              url: '/docs/types/topic',
            },
          ],
        },
        {
          name: 'Endpoints',
          subItems: [
            {
              name: 'Notebook',
              url: '/docs/endpoints/notebook',
            },
          ],
        },
      ],
    }

    return {
      props: {
        menu,
        markdown,
      },
      revalidate: 1,
    }
  } catch (e) {
    console.log(e)
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
export default Page
