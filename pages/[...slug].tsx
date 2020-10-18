import { useRouter } from 'next/router'
import React, {useState} from 'react'
import "katex/dist/contrib/mhchem.js"
import { MD2React } from '../MD2React'
import styles from '../styles/MD2React.module.css'
import firebase from '../lib/firebase'


/**
 * Returns a React component which renders markdown with latex
 * @param question markdown string
 */
const Question: React.FC<{question: string, url: string}> = props => {
    const { question, url } = props;

    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }
    if(question == null){
        return null
    }

    return <>
            {/* <style jsx>{`
            .markdown-body {
                box-sizing: border-box;
                min-width: 200px;
                max-width: 980px;
                margin: 0 auto;
                padding: 45px;
            }

            @media (max-width: 767px) {
                .markdown-body {
                    padding: 15px;
                }
            }
            `}</style> */}

        <div className={styles.MD2React}>
            <MD2React md={question} url={url}/>
        </div>
        </>
}

export default Question

type GithubContent = {
        name: string,
        path: string,
        sha: string,
        size: number,
        url: string,
        html_url: string,
        git_url: string,
        download_url: string,
        type: string
}

export async function getStaticPaths() {
    const res = await firebase.collection("owner").listDocuments()
    const owner = res.map(x => x.id)
    const res2 = await firebase.collection("owner").doc(owner[0]).collection("repo").get()
    const repos = res2.docs.map(x => x.id)

    const paths = [{ params: { slug: owner.concat(repos) }}]

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params }) {

    if(params.slug.join("/") == "alexandregiordanelli/questoes_de_mat"){

        const res2 = await firebase.collection("owner").doc(params.slug[0]).collection("repo").doc(params.slug[1]).get()
        const map = res2.data().data.map(x => x.download_url)
        const response = await fetch(map[1]);
        const body = await response.text();
        return {
            props: { question: body, url: map[1] },
            revalidate: 1,
        }
    } else {
        return {
            props: {}
        }
    }
}