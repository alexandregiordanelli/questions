import { useRouter } from 'next/router'
import React from 'react'
import { Menu, Question } from '../../lib/types'
import { Header as Header } from '../Header'
import { useAmp } from 'next/amp'
import HeadHtml from '../HeadHtml'
import { IndexPage } from './IndexPage/IndexPage'
import QuestionPage from './QuestionPage/QuestionPage'

export const Pages: React.FC<{
    questions: Question[]
    menu: Menu[]
    questionIndex: number
    questionBook: string
}> = props => {
    const isAmp = useAmp()
    
    const router = useRouter()
        
    const slug = router.query['slug'] as string[]
        
    const deepth = slug?.length

    const { menu, questions, questionIndex, questionBook } = props

    if (deepth && !(menu || questions)) return null

    return (
        <>
            <HeadHtml isAmp={isAmp} slug={slug}/>
            <style jsx>{`
            .container {
                display: flex;
            }
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
                <QuestionPage deepth={deepth} menu={menu} questionBook={questionBook} questionIndex={questionIndex} questions={questions}/>
            </>)}
            </div>
        </>
    )
}

