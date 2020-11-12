import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { MD2React } from '../components/MD2React'
import { Menu, Question } from '../types'
import { absolute, getFileContentFromGHRepo, getNavFromGHRepo, getPathsFromGHRepo } from '../lib/utils'
import ActiveLink from '../components/ActiveLink'
import NavPointer from '../components/NavPointer'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import remark2rehype from 'remark-rehype'
import unified from 'unified'
import markdown from 'remark-parse'
import gfm from 'remark-gfm'
import rehype2react from 'rehype-react';
import Link from 'next/link'

type QuestionPageProps = {
    questions: Question[]
    menu: Menu[]
    questionIndex: number
    questionBook: string
}
export default function QuestionPage(props: QuestionPageProps) {

    const router = useRouter()

    if(router.isFallback) return <div>Loading...</div>

    if(router.query['slug'].length == 1){
        return <>
            <div>{unified()
            .use(markdown)
            .use(gfm)
            .use(remark2rehype)
            .use(rehype2react, { 
                createElement: React.createElement
            })
            .processSync(props.questionBook).result}</div>
            <h2><Link href={router.asPath + "/" +  props.questions[0].url}><a>Iniciar</a></Link></h2>
        </>
    }

    const { menu, questions, questionIndex } = props;

    if(!(menu || questions)) return null

    const question = questions[questionIndex]
    
    const [toggleMenu, setToggleMenu] = useState(false)

    return (
        <>
            <Head>
                <title>{question.title}</title>
                <meta name="description" content={question.title}></meta>
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
            
            .block {
                padding: 24px;
                border-width: 1px 0px 0px;
                border-radius: 0px;
                border-style: solid;
                border-color: rgb(225, 228, 232);
            }
            
            .menu > ul {
                top: 66px;
                height: calc(100vh - 66px);
                overflow: auto;
                color: rgb(47, 54, 61);
                background-color: rgb(250, 251, 252);
                width: 260px;
                position: sticky;
                border-width: 0px 1px 0px 0px;
                border-style: solid;
                border-color: rgb(225, 228, 232);
                display: block;
                z-index: 1;
                padding: 0;
                margin: 0;
                list-style: none;
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

                .menu > ul{
                    right: -260px;
                    position: fixed;
                    border-width: 0px 0px 0px 1px;
                    transition: 0.5s;
                }

                #menu-check:checked ~ ul {
                    right: 0;
                }
            }
            
            .submenu {
                font-size: 14px;
                list-style: none;
                padding: 0;
                margin: 0;
                margin-top: 16px;
            }
            
            .submenu a {
                text-decoration: none;
                font-size: 14px;
                display: block;
                padding-top: 4px;
                padding-bottom: 4px;
                margin-top: 8px;
                color: rgb(3, 102, 214);
            }

            .submenu a.active {
                font-weight: 600;
                color: rgb(47, 54, 61);
            }
            
            .menu a:hover {
                text-decoration: underline;
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
                <div className="head"><h1>QuestionsOf</h1>  </div>
                <div className={"container"}>
                    <div className={"menu"}>
                        <input id="menu-check" type="checkbox" onChange={x => setToggleMenu(x.target.checked)} checked={toggleMenu} />
                        <ul>
                        {menu.map((x, i) => (
                            <li key={`${i}.0`} className={"block"}>
                                {x.title}
                                <ul className={"submenu"}>
                                    {x.topics.map((y, j) => {
                                        if(y.url){
                                            return (
                                                <li key={`${i}.${j}`}>
                                                    <ActiveLink href={absolute(router.asPath, y.url)}>
                                                        <a>{y.title}</a>
                                                    </ActiveLink>
                                                </li>
                                            )
                                        }
                                    })}
                                </ul>
                            </li>
                        ))}                             
                        </ul>
                    </div>
                    <div className="grid">
                        <NavPointer 
                            title={`${menu.find(x => x.topics.some(y => y.topic == question.topic)).title} / ${menu.find(x => x.topics.some(y => y.topic == question.topic)).topics.find(x => x.topic == question.topic).title}`} 
                            questions={questions}
                        />
                        <div>
                            <h2>Question {questions.findIndex(x => x.url == question.url) + 1} of {questions.length}</h2>
                            <MD2React 
                                md={question.content} 
                                url={question.absolutUrl}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async context => {
    const urls = ["alexandregiordanelli/enem"]
    const paths = (await Promise.all(urls.map(x => getPathsFromGHRepo(x)))).reduce((x, y) => x.concat(y))

    return {
        paths,
        fallback: true,
    }
}



export const getStaticProps: GetStaticProps = async context => {

    const ghRepo = "alexandregiordanelli/" + context.params.slug[0]
    try{
        const nav = await getNavFromGHRepo(ghRepo)
    
        if(context.params.slug.length > 1){
            const questionIndex = nav.questions.findIndex(x => x.url == context.params.slug[1])

            if(questionIndex > -1){
                const question = nav.questions[questionIndex]

                question.content = await getFileContentFromGHRepo(ghRepo, question.file)

                question.absolutUrl = "https://raw.githubusercontent.com/" + ghRepo + "/master/" + question.file

                const menu: Menu[] = nav.menu.map(x => ({
                    title: x.title,
                    topics: x.topics.map(y => {
                        const url = nav.questions.find(z => z.topic == y.topic)?.url
                        if(url){
                            return {
                                ...y,
                                url
                            }
                        }
                    }).filter(y => !!y)
                }))    
                
                const questions = nav.questions.filter(x => x.topic == question.topic)
                const newQuestionIndex = questions.findIndex(x => x.url == context.params.slug[1])


                return {
                    props: { 
                        menu, 
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
                    questionBook: await getFileContentFromGHRepo(ghRepo, "index.md"),
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

export const config = { amp: 'hybrid' }