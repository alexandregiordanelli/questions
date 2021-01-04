import { useRouter } from 'next/router'
import React from 'react'
import { Header as Header } from '../../Header'
import { useAmp } from 'next/amp'
import HeadHtml from '../../HeadHtml'
import { IndexPage } from '../IndexPage/IndexPage'
import NotebookPage from './NotebookPage'
import { StateProvider } from '../../State'
import { InferGetStaticPropsType } from 'next'
import { getStaticProps } from '../../../pages/[...slug]'
import { PagesProps } from '../../../lib/types'

export const Notebook: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = props => {
    const isAmp = useAmp()
    
    const router = useRouter()
        
    const slug = router.query['slug'] as string[]
        
    const deepth = slug?.length

    return (
        <StateProvider>
            <HeadHtml 
            isAmp={isAmp} 
            slug={slug}
            />
            <style jsx>{`
            .main {
                flex-direction: column;
                min-height: 100vh;
                display: flex;
            }
            `}</style>
            <div className="main">
            {!deepth && 
                <IndexPage/>
            }
            {deepth && 
                <>
                    <Header/>                
                    <NotebookPage 
                    deepth={deepth} 
                    menu={props.menu}
                    notebook={props.notebook} 
                    question={props.question} 
                    suggestions={props.suggestions}
                    />
                </>
            }
            </div>
        </StateProvider>
    )
}

