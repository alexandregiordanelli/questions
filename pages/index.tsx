import { GetStaticProps } from 'next';
import IndexPage from '../components/Pages/IndexPage/IndexPage'
import React from 'react'
import { useAmp } from 'next/amp'
import HeadHtml from '../components/HeadHtml'
import { InferGetStaticPropsType } from 'next'
import getNotebooks from '../services/getNotebooks';
import { Notebook } from '@prisma/client';

type PageProps = {
    notebooks: Notebook[]
}

const Index: React.FC<PageProps> = props => {
    
    return (
        <>
            <HeadHtml 
            />
            <style jsx>{`
            .main {
                flex-direction: column;
                min-height: 100vh;
                display: flex;
            }
            `}</style>
            <div className="main">
                <IndexPage notebooks={props.notebooks}/>
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