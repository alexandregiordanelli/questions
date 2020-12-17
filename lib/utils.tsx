import { Env, GitHub, Nav, Path, Question2, QuestionParsed, QuestionsOf } from "./types";
import yaml from 'js-yaml';
import React, {  } from 'react';
import math from 'remark-math';
import remark2rehype from 'remark-rehype';
import katex from 'rehype-katex';
import unified from 'unified'
import rehype2react from 'rehype-react';

import "katex/dist/contrib/mhchem.js"
import markdown from 'remark-parse'
import gfm from 'remark-gfm'

const branch = process.env.VERCEL_GIT_COMMIT_REF
    ? process.env.VERCEL_GIT_COMMIT_REF : process.env.NODE_ENV == "development" 
    ? "dev": "master"

export const urlEnvDic = {
    [Env.development]: 'http://localhost:3000',
    [Env.preview]: 'https://questions.giordanelli.vercel.app',
    [Env.production]: 'https://questionsof.com'
}

const env = process.env.NEXT_PUBLIC_VERCEL_ENV as Env

export const urlEnv = urlEnvDic[Env[env]]

export const letters = 'abcdefgh'.split('')

export const ampUrl = (isAmp: boolean, url = "") => isAmp? `/amp/${url}`: `/${url}`

const parseUnified = (isAmp: boolean, data: string) => {//, filePath: string) => {
    return unified()
    .use(markdown)
    .use(math)
    .use(gfm)
    .use(remark2rehype)
    .use(katex, {
        output: isAmp? 'html': 'htmlAndMathml'
    })
    // .use(inspectUrls, {
    //     inspectEach({ url, node }) {
    //         if(new RegExp("^(?!www\.|(?:http|ftp)s?://|[A-Za-z]:\\|//).*").test(url)){
    //             node.properties.src = absolute(filePath, url)
    //         }
    //     },  
    //     selectors: [
    //         "img[src]"
    //     ]
    // })
    .use(rehype2react, { 
        createElement: React.createElement,
        Fragment: React.Fragment,
        components: {
           img: (props: any) => isAmp? <div className="fixed-height-container "><amp-img className="contain" layout="fill" {...props}/></div>: <img {...props}/>
        } 
    })
    .processSync(data).result
}


export const questionParsed2MD = (isAmp: boolean, questionParsed: Question2) => { //, filePath) => {
    return {
        question: parseUnified(isAmp, questionParsed.question),
        solution: parseUnified(isAmp, questionParsed.solution),
        options: questionParsed.options.map(option => parseUnified(isAmp, option)),
        answer: questionParsed.answer
    } as QuestionParsed
}

export async function getFileContentFromGHRepo(ghRepo: GitHub, filePathFromRoot: string){
    const response = await fetch(`https://raw.githubusercontent.com/${ghRepo.username}/${ghRepo.repo}/${branch}/${filePathFromRoot}`);
    const body =  await response.text();

    if(response.status != 200)
        throw new Error(body + " " + `https://raw.githubusercontent.com/${ghRepo.username}/${ghRepo.repo}/${branch}/${filePathFromRoot}`)

    return body
}

export const absolute = (base, relative) => {
    let stack = base.split("/");
    let parts = relative.split("/");
    stack.pop();

    for (let i = 0; i < parts.length; i++) {
        if (parts[i] == ".")
            continue;
        if (parts[i] == "..")
            stack.pop();

        else
            stack.push(parts[i]);
    }
    return stack.join("/");
};

export const yml2Nav = (text: string) => yaml.safeLoad(text) as Nav

export const yml2NotebookList = (text: string) => yaml.safeLoad(text) as string[]

export const getNavFromNotebook = async (ghRepo: GitHub, notebook: string) => {

    try {
        const nav = yml2Nav(await getFileContentFromGHRepo(ghRepo, `${notebook}/nav.yaml`))
        
        nav.questions = nav.questions.sort((a, b) => a.title > b.title ? 1: -1)

        nav.menu = nav.menu.map(x => ({
            ...x,
            title: x.title,
            topics: x.topics.map(y => {
                const url = nav.questions.find(z => z.topic == y.topic)?.url
                if(url){
                    return {
                        ...y,
                        url: `${notebook}/${url}`
                    }
                }
            }).filter(y => !!y)
        }))

        nav.questions = nav.questions.map(x => ({
            ...x,
            title: x.title.substring(0, 50),
            file: `${notebook}/${x.file}`,
            absolutUrl: `https://raw.githubusercontent.com/${ghRepo.username}/${ghRepo.repo}/${branch}/${notebook}/${x.file}`
        }))

        return nav
    }
    catch (e) {
        throw new Error("Notebook Nav.yaml not found. "+ e)
    }
}

export const getNavFromGHRepo = async (ghRepo: GitHub) => yml2NotebookList(await getFileContentFromGHRepo(ghRepo, `nav.yaml`))

export async function getPathsFromNotebook(ghRepo: GitHub, notebook: string) {

    const nav = await getNavFromNotebook(ghRepo, notebook)

    const pathList: Path[] = nav.questions
        .map(x => ({ 
            params: { 
                slug: [notebook].concat(x.url) // [enem,questao1]
            } 
        }))

    pathList.unshift({
        params: {
            slug: [notebook]
        }
    })

    return pathList
}

export async function getPathsFromGHRepo(ghRepo: GitHub) {

    const notebookList = await getNavFromGHRepo(ghRepo)

    let navListFromGhRepo: Path[] = []

    for(let notebook of notebookList){
        navListFromGhRepo = navListFromGhRepo.concat(await getPathsFromNotebook(ghRepo, notebook))
    }

    return navListFromGhRepo
}

export const questionsofConverter: FirebaseFirestore.FirestoreDataConverter<QuestionsOf> = {
    toFirestore(questionsof: QuestionsOf): FirebaseFirestore.DocumentData {
        return questionsof
    },
    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot) {
        const data = snapshot.data()!
        return data as QuestionsOf
    }
}

export const questionConverter: FirebaseFirestore.FirestoreDataConverter<Question2> = {
    toFirestore(question: Question2): FirebaseFirestore.DocumentData {
        return question
    },
    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot) {
        const data = snapshot.data()!
        return data as Question2
    }
}