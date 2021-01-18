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

type PageProps = {
    notebooks: Notebook[]
}

const Index: React.FC<PageProps> = props => {
    
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
            <div className="p-10 bg-gray-100" style={{
backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23d9d9d9' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`}}>
                <span className="font-semibold text-gray-400">Notebooks</span>
                <div className="flex overflow-x-auto">
                {notebooks.map((x, i) => {
                    //const imgSrc = fs.readFile(`${i}.jpg`)
                    return <div className="bg-white shadow-md m-4 rounded-md p-5 flex-none">
                        <img src={`/${x.img}.jpg`} height={200} width={200} />
                        <h1 className="block ">{x.name}</h1>
                        <span className="block">R${x.price}</span>

                        <Link href={""}><a className={"bg-gray-500 text-white rounded-lg float-right shadow-md px-4 py-2 font-semibold"}>Click</a></Link>
                        {/* {x.tag} */}
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