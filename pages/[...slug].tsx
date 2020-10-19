import { useRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'
import "katex/dist/contrib/mhchem.js"
import { MD2React } from '../MD2React'
import { Nav } from './types'
import { absolute, getNavFromGHRepo, getPathsFromGHRepo } from '../lib/utils'
import styles from "../styles/[...slug].module.css"

type QuestionPageProps = {
    nav: Nav
    questionIndex: number
}
export default function QuestionPage(props: QuestionPageProps) {
    const router = useRouter()
    if(router.isFallback) return <div>Loading...</div>
    const { nav, questionIndex } = props;
    if(!nav) return null
    const question = nav.questions[questionIndex]
    return (
        <div className={styles.container}>
            <div style={{backgroundColor: 'red'}}>
                <ul className={styles.menu}>
                {nav.menu.map((x, i) => (
                    <li key={`${i}.0`} className={styles.block}>
                        <Link href={x.title}><a>{x.title}</a></Link>
                        <ul className={styles.submenu}>
                            {x.topics.map((y, j) => (
                                <li key={`${i}.${j}`}><Link href={absolute(router.asPath, nav.questions.find(z => z.topic == y.topic)?.url ?? "")} ><a>{y.title}</a></Link></li>
                            ))}
                        </ul>
                    </li>
                ))}                             
                </ul>
            </div>
            <div style={{flexGrow: 1}}>
                <h1>{question.title}</h1>
                <MD2React md={question.content} url={question.absolutUrl}/>
            </div>
            <div style={{backgroundColor: 'yellow'}}>
            <ul>
                {nav.menu.map((x, i) => (
                    <li key={`${i}.0`}>
                        <a href={x.title}>{x.title}</a>
                        <ul>
                            {x.topics.map((y, j) => (
                                <li key={`${i}.${j}`}><a href={y.topic}>{y.title}</a></li>
                            ))}
                        </ul>
                    </li>
                ))}
                </ul> 
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const urls = ["alexandregiordanelli/questoes_de_mat", "nataliaanjos/questoes_de_mat2"]
    const paths = (await Promise.all(urls.map(x => getPathsFromGHRepo(x)))).reduce((x, y) => x.concat(y))

    console.log(paths)

    return {
        paths,
        fallback: true,
    }
}



export async function getStaticProps({ params }) {

    const ghRepo = params.slug[0] + "/" + params.slug[1]
    try{
        const nav = await getNavFromGHRepo(ghRepo)
    
        const questionIndex = nav.questions.findIndex(x => x.url == params.slug[2])

        if(questionIndex > -1){
            const question = nav.questions[questionIndex]

            question.absolutUrl = "https://raw.githubusercontent.com/" + ghRepo + "/master/" + question.file
            const response = await fetch(question.absolutUrl );
            question.content = await response.text();

            return {
                props: { nav, questionIndex },
                revalidate: 1,
            }
        } else {
            return {
                props: {}
            }
        }
    } catch(e){
        console.log(e)

        return {
            props: {}
        }
    }
}