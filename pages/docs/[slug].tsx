import { Header } from 'components/Header'
import { HeadHtml } from 'components/HeadHtml'
import { MarkdownText } from 'components/MarkdownText'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import fs from 'fs'
import path from 'path'

const docsDirectory = path.join(process.cwd(), 'public/docs')

const getDocBySlug = (slug: string): string => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(docsDirectory, `${realSlug}.md`)
  const content = fs.readFileSync(fullPath, 'utf8')

  return content
}

type PageProps = {
  md: string
}

const Page: NextPage<PageProps> = (props) => {
  return (
    <>
      <HeadHtml />
      <Header />
      <div className="max-w-screen-lg mx-auto my-12 px-4">
        <MarkdownText md={props.md} customerId={0} />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const slug = context.params.slug as string
  return {
    props: {
      md: getDocBySlug(slug),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = ['privacy', 'terms']

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug,
        },
      }
    }),
    fallback: false,
  }
}

export default Page
