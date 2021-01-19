import { GetStaticProps } from 'next';
import React from 'react'
import { useAmp } from 'next/amp'
import HeadHtml from '../components/HeadHtml'
import getNotebooks from '../services/getNotebooks';
import { Notebook } from '@prisma/client';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Img } from '../components/Img';

type PageProps = {
    notebooks: Notebook[]
}

const Index: React.FC<PageProps> = props => {
    


    return (
        <>
            <HeadHtml />
            <Header/> 
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-600">
                <div className="opacity-30 flex">
                    <Img src={`/main.jpg`} height={4912} width={7360 } />
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 container">
                    <div className="text-center 
                        text-4xl 
                        sm:text-5xl
                        md:text-6xl
                        lg:text-7xl
                        xl:text-8xl
                        2xl:text-9xl
                        leading-none 
                        tracking-tight 
                        font-extrabold 
                        text-white ">
                        Resolva questões e fixe o conteúdo
                    </div>
                    <div className="mt-10 text-center 
                        text-2xl 
                        sm:text-3xl
                        md:text-4xl
                        lg:text-5xl
                        xl:text-6xl
                        2xl:text-7xl
                        leading-none 
                        tracking-tight 
                        font-bold 
                        text-gray-200 ">
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
            
            <div className="p-8 bg-gray-200" style={{backgroundImage: `url("graph-paper.svg")`}}>
                <span className="font-semibold text-gray-400">Notebooks</span>
                <div className="flex overflow-x-auto">
                {props.notebooks.map((x, i) => {
                    //const imgSrc = fs.readFile(`${i}.jpg`)
                    return <div className="bg-white shadow-md mt-4 mr-4 rounded-md flex-none">
                        <div className="p-5">
                            <Img src={`/${i}.jpg`} height={200} width={200} />
                        </div>
                        <div className="bg-gray-50 p-5 rounded-b-md text-gray-500">
                            <h1 className="font-medium">{x.name}</h1>
                            <span className="">R${x.price}</span>
                            <div className="flex justify-end mt-5 rounded-b-lg">
                                <Link href={`/${x.tag}`}><a className={"bg-gray-500 text-white rounded-lg shadow-md px-4 py-2 font-semibold"}>Demo</a></Link>
                            </div>
                        </div>
                    </div>
                })}
                </div>
            </div>
        </>
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