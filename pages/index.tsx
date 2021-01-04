import { GetStaticProps } from 'next';
import IndexPage from '../components/Pages/IndexPage/IndexPage'
import React from 'react'
import { useAmp } from 'next/amp'
import HeadHtml from '../components/HeadHtml'
import { StateProvider } from '../components/State'
import { InferGetStaticPropsType } from 'next'

const Index: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = props => {
    const isAmp = useAmp()

    return (
        <StateProvider>
            <HeadHtml 
            isAmp={isAmp} 
            />
            <style jsx>{`
            .main {
                flex-direction: column;
                min-height: 100vh;
                display: flex;
            }
            `}</style>
            <div className="main">
                <IndexPage/>
            </div>
        </StateProvider>
    )
}
export const getStaticProps: GetStaticProps = async () => {
    return { 
        revalidate: 1,
        props: {}
    };
}
export default Index