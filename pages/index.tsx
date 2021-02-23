import { GetStaticProps } from 'next'
import React from 'react'
import HeadHtml from '../components/HeadHtml'
import { getCustomers } from '../services/server/getCustomers'
import { Header } from '../components/Header'
import { Img } from '../components/Img'
import { NotebookListComponent } from '../components/NotebookListComponent'
import { CustomerWithNotebooks } from 'lib/types'
import Link from 'next/link'

type PageProps = {
  customers: CustomerWithNotebooks[]
}

const Index: React.FC<PageProps> = (props) => {
  return (
    <>
      <HeadHtml />
      <Header />
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-600">
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
          {/* <div className="text-xl sm:text-4xl lg:text-5xl leading-none font-bold tracking-tight text-white">
                        <ul>
                            <li>Escolha a prova.</li>
                            <li>Faça questões.</li>
                            <li>Aprenda com a solução da questão.</li>
                            <li>Analise suas estatísticas.</li>
                        </ul>
                    </div> */}
        </div>
      </div>

      {props.customers.map((x, i) => {
        return (
          <div key={i}>
            <div className=" border-t border-b p-6 pt-16">
              <Link href={`/${x.tag}`}>
                <a className="text-xl font-medium text-black my-8">{x.tag}</a>
              </Link>
            </div>

            <NotebookListComponent customer={x} />
          </div>
        )
      })}
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const customers = await getCustomers()

  return {
    props: {
      customers,
    },
    revalidate: 1,
  }
}
export default Index
