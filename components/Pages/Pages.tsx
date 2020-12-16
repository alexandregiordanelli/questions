import { useRouter } from 'next/router'
import React from 'react'
import { Menu, Question, Question2, Question2Basic, QuestionsOf } from '../../lib/types'
import { Header as Header } from '../Header'
import { useAmp } from 'next/amp'
import HeadHtml from '../HeadHtml'
import { IndexPage } from './IndexPage/IndexPage'
import QuestionPage from './QuestionPage/QuestionPage'
import { StateProvider } from '../State'


export type PagesProps = {
    question: Question2
    content: QuestionsOf
    questionSuggestions: Question2Basic[]
}
export const Pages: React.FC<PagesProps> = props => {
    const isAmp = useAmp()
    
    const router = useRouter()
        
    const slug = router.query['slug'] as string[]
        
    const deepth = slug?.length

    if (deepth && !props.content) return null

    return (
        <StateProvider>
            <HeadHtml isAmp={isAmp} slug={slug}/>
            <style jsx>{`
            .main {
                flex-direction: column;
                min-height: 100vh;
                display: flex;
            }
            `}</style>
            <div className="main">
            {!deepth && <IndexPage/>}
            {deepth && (<>
                <Header/>                
                <QuestionPage deepth={deepth} content={props.content} question={props.question} questionSuggestions={props.questionSuggestions}/>
            </>)}
            </div>
        </StateProvider>
    )
}

