import { useRouter } from 'next/router'
import React from 'react'
import "katex/dist/contrib/mhchem.js"
import { MD2React } from '../MD2React'
import { Nav } from './types'
import { getNavFromGHRepo, getPathsFromGHRepo } from '../lib/utils'

/**
 * Returns a React component which renders markdown with latex
 * @param question markdown string
 */
const QuestionPage: React.FC<{nav: Nav, questionIndex: number}> = props => {
    const router = useRouter()
    if(router.isFallback) return <div>Loading...</div>
    const { nav, questionIndex } = props;
    if(!nav) return null
    const question = nav.questions[questionIndex]
    return <MD2React md={question.content} url={question.absolutUrl}/>
}

export default QuestionPage

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