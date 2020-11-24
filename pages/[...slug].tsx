import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { MD2React } from '../components/MD2React'
import { GitHub, Menu, Question } from '../types'
import { ampUrl, getFileContentFromGHRepo, getNavFromNotebook, getPathsFromGHRepo } from '../lib/utils'
import NavPointer from '../components/NavPointer'
import { GetStaticPaths, GetStaticProps } from 'next'
import remark2rehype from 'remark-rehype'
import unified from 'unified'
import markdown from 'remark-parse'
import gfm from 'remark-gfm'
import rehype2react from 'rehype-react';
import Link from 'next/link'
import Head from 'next/head'
import { LeftMenu } from '../components/LeftMenu'
import { useAmp } from 'next/amp'

export const config = { amp: true}

type QuestionPageProps = {
    questions: Question[]
    menu: Menu[]
    questionIndex: number
    questionBook: string
}
export default function QuestionPage(props: QuestionPageProps) {
    const [toggleMenu, setToggleMenu] = useState(false)
    const router = useRouter()
    const isAmp = useAmp()
    
    if(router.isFallback) return <div>Loading...</div>

    if(!router.query['slug']) return null

    const { menu, questions, questionIndex } = props;

    if(!(menu || questions)) return null

    const question = questions[questionIndex]
    
    const slugJoined = `/${(router.query.slug as string[]).join('/')}`

    const renderMainBox = () => {
        if(router.query['slug'].length > 1){
            return <>
                <NavPointer 
                    title={`${menu.find(x => x.topics.some(y => y.topic == question.topic)).title} / ${menu.find(x => x.topics.some(y => y.topic == question.topic)).topics.find(x => x.topic == question.topic).title}`} 
                    questions={questions}
                />
                <div>
                    <h2>Question {questions.findIndex(x => x.url == question.url) + 1} of {questions.length}</h2>
                    <MD2React 
                        md={question.content} 
                        filePath={question.absolutUrl}
                    />
                </div>
            </>
        } else if(router.query['slug'].length == 1){
            return <>
                <div>{unified()
                .use(markdown)
                .use(gfm)
                .use(remark2rehype)
                .use(rehype2react, { 
                    createElement: React.createElement
                })
                .processSync(props.questionBook).result}</div>
                <h2><Link href={router.query['slug'][0] + "/" +  props.questions[0].url}><a>Iniciar</a></Link></h2>
            </>
        }
    }


    return (
        <>
            <Head>
                {/* <link rel="canonical" href={`https://questionsof.com${slugJoined}`} />
                {!isAmp && (
                <link rel="amphtml" href={`https://questionsof.com${slugJoined}.amp`} />
                )} */}
                <title>{question?.title ?? "Enem"}</title>
                {/* <meta name="description" content={question.title}></meta> */}
            </Head>
            <style jsx global>{`
            html,
            body {
                padding: 0;
                margin: 0;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
                line-height: 1.5;
                color: #24292e;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
                font-size: 16px;
                line-height: 1.5;
                word-wrap: break-word;
            }
            
            a {
                color: inherit;
                text-decoration: none;
            }
            
            * {
                box-sizing: border-box;
            }
            `}</style>
            <style jsx>{`
            h1 {
                color: rgb(33, 136, 255);
                font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;
                font-size: 16px;
                font-weight: 400;
                padding-left: 24px;
            }
            .main {
                flex-direction: column;
                min-height: 100vh;
                display: flex;
            }
            .head {
                top: 0px;
                z-index: 1;
                position: sticky;
                height: 66px;
                background-color: rgb(27, 31, 35);
                -webkit-box-align: center;
                align-items: center;
                -webkit-box-pack: justify;
                justify-content: space-between;
                display: flex;
            }
            .container {
                display: flex;
            }
        

            #menu-check {
                display: none;
            }

            @media (max-width: 767px) {
                .grid > div {
                    padding: 0 24px;
                }
            }

            @media screen and (max-width: 1012px){
                #menu-check {
                    display: block;
                    position: fixed;
                    z-index: 1;
                    top: 0;
                    right: 0;
                }

                :global(#menu-check:checked ~ ul) {
                    right: 0;
                }
            }
        

            @media screen and (min-width: 768px){
                .grid{
                    display: grid;
                    grid-template-columns: minmax(0px, 960px) 220px;
                    margin: 0 auto;
                    column-gap: 48px;
                    padding: 48px;
                    grid-template-areas: "content table-of-contents";
                }
            }
            .grid div {
                grid-area: content / content / content / content;
            }

            div > h2 {
                padding-bottom: .3em;
                border-bottom: 1px solid #eaecef;
                margin: 0;
                margin-bottom: 16px;
                font-weight: 600;
                line-height: 1.25;
            }

            `}</style>
            <div className="main">
                <div className="head"><h1><Link href="/"><a>QuestionsOf</a></Link> {'>'} <Link href={ampUrl(isAmp, "enem")}><a>Enem</a></Link></h1></div>
                <div className={"container"}>
                    <div className={"menu"}>
                        <input id="menu-check" type="checkbox" onChange={x => setToggleMenu(x.target.checked)} checked={toggleMenu} />
                        <LeftMenu menu={menu} slugJoined={slugJoined}/>
                    </div>
                    <div className="grid">
                    {renderMainBox()}
                    </div>
                </div>
            </div>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getPathsFromGHRepo({
        username: 'alexandregiordanelli',
        repo: 'questions_md'
    })

    return ({
        paths: paths,
        fallback: true
    })
}

export const getStaticProps: GetStaticProps = async context => {

    if(!context.params.slug)
        return {props: {}}

    try{
        const notebook = context.params.slug[0]

        const ghRepo: GitHub = {
            username: 'alexandregiordanelli',
            repo: 'questions_md'
        }

        const nav = await getNavFromNotebook(ghRepo, notebook)

        if(context.params.slug.length > 1){
            const questionIndex = nav.questions.findIndex(x => x.url == context.params.slug[1])

            if(questionIndex > -1){
                const question = nav.questions[questionIndex]

                question.content = await getFileContentFromGHRepo(ghRepo, question.file)
                
                const questions = nav.questions.filter(x => x.topic == question.topic)
                const newQuestionIndex = questions.findIndex(x => x.url == context.params.slug[1])

                return {
                    props: { 
                        menu: nav.menu, 
                        questions,
                        questionIndex: newQuestionIndex 
                    },
                    revalidate: 1,
                }
            
            } else {
                return {
                    props: {}
                }
            }
        } else if(context.params.slug.length == 1) {
            
            return {
                props: { 
                    menu: nav.menu,
                    questionBook: await getFileContentFromGHRepo(ghRepo, `${notebook}/index.md`),
                    questions: [nav.questions[0]]
                },
                revalidate: 1,
            }
        }
    } catch(e){
        console.log(e)

        return {
            props: {}
        }
    }
}