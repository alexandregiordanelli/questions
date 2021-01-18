import { GetStaticProps } from 'next';
import IndexPage from '../components/Pages/IndexPage/IndexPage'
import React from 'react'
import { useAmp } from 'next/amp'
import HeadHtml from '../components/HeadHtml'
import { InferGetStaticPropsType } from 'next'
import getNotebooks from '../services/getNotebooks';
import { Notebook } from '@prisma/client';
import Link from 'next/link';
import { Header } from '../components/Header';
import { ChevronRightIcon, ArrowRightIcon } from '@primer/octicons-react';

type PageProps = {
    notebooks: Notebook[]
}

const Index: React.FC<PageProps> = props => {
    
    const isAmp = useAmp()

    const notebooks = [
        {
            img: 0,
            name: "ENEM",
            price: 5
        },
        {
            img: 1,
            name: "IME",
            price: 5
        },
        {
            img: 2,
            name: "ITA",
            price: 5
        },
        {
            img: 3,
            name: "Enem",
            price: 5
        },
        {
            img: 2,
            name: "Enem",
            price: 5
        },
        {
            img: 1,
            name: "Enem",
            price: 5
        },
        {
            img: 0,
            name: "Enem",
            price: 5
        },
        {
            img: 3,
            name: "Enem",
            price: 5
        },
    ]

    return (
        <div>
            <HeadHtml />
            <Header/> 
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-600">
                {!isAmp  && <img className="opacity-30" src="main.jpg"/>}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 container">
                    <div className="
                        text-center 
                        text-4xl 
                        sm:text-5xl
                        md:text-6xl
                        lg:text-7xl
                        xl:text-8xl
                        2xl:text-9xl
                        leading-none 
                        tracking-tight 
                        font-extrabold 

                        text-white 
                        ">
                        Prepare-se para a prova fazendo questões
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
            
            <div className="p-10 bg-gray-200" style={{backgroundImage: `url("graph-paper.svg")`}}>
                <span className="font-semibold text-gray-400">Notebooks</span>
                <div className="flex overflow-x-auto">
                {notebooks.map((x, i) => {
                    //const imgSrc = fs.readFile(`${i}.jpg`)
                    return <div className="bg-white shadow-md m-4 rounded-md flex-none">
                        {isAmp ? <amp-img src={`/${x.img}.jpg`} height={200} width={200} className="m-5" /> : <img src={`/${x.img}.jpg`} height={200} width={200} className="m-5" />}

                        <div className="bg-gray-50 p-5 rounded-b-md">
                            <h1 className="block font-medium">{x.name}</h1>
                            <span className="block">R${x.price}</span>
                            {/* <div className="flex justify-end mt-5 rounded-b-lg">
                                <Link href={""}><a className={"bg-gray-500 text-white rounded-lg shadow-md px-4 py-2 font-semibold"}>Click</a></Link>
                            </div> */}
                        </div>
                    </div>
                })}
                </div>
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {

    const notebooks = await getNotebooks()

    return { 
        revalidate: 1,
        props: {
            notebooks
        }
    };
}
export default Index