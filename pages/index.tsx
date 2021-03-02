import { GetStaticProps } from 'next'
import React from 'react'
import HeadHtml from '../components/HeadHtml'
import { Header } from '../components/Header'
import { getNotebooks } from 'services/server/getNotebooks'
import { Notebook, Media } from '@prisma/client'
import { NotebookCard2 } from 'components/NotebookCard2'
type PageProps = {
  notebooks: (Notebook & {
    media: Media
    customer: {
      tag: string
    }
  })[]
}

const Index: React.FC<PageProps> = (props) => {
  return (
    <>
      <HeadHtml />
      <Header />
      {/* <div className="relative bg-gradient-to-b from-gray-800 to-gray-600">
        <div className="opacity-30 flex">
          <Img src={`/main.jpg`} height={4912} width={7360} />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 container">
          <div
            className="text-center 
                        text-4xl 
                        sm:text-5xl
                        md:text-6xl
                        lg:text-7xl
                        xl:text-8xl
                        2xl:text-9xl
                        leading-none 
                        tracking-tight 
                        font-extrabold 
                        text-white "
          >
            Resolva questões e fixe o conteúdo
          </div>
          <div
            className="mt-10 text-center 
                        text-2xl 
                        sm:text-3xl
                        md:text-4xl
                        lg:text-5xl
                        xl:text-6xl
                        2xl:text-7xl
                        leading-none 
                        tracking-tight 
                        font-bold 
                        text-gray-200 "
          >
            Porque a melhor maneira de aprender é exercitando
          </div>
        </div>
      </div> */}
      <div className="flex flex-wrap">
        {props.notebooks.map((x, i) => {
          return <NotebookCard2 notebook={x} customerTag={x.customer.tag} key={i} className="m-8" />
        })}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const notebooks = await getNotebooks()

  return {
    props: {
      notebooks,
    },
    revalidate: 1,
  }
}
export default Index
