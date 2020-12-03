import { GitHub, Nav, Path, QuestionParsed } from "./types";
import yaml from 'js-yaml';
import React, {  } from 'react';
import math from 'remark-math';
import remark2rehype from 'remark-rehype';
import katex from 'rehype-katex';
import unified from 'unified'
import rehype2react from 'rehype-react';
import inspectUrls from '@jsdevtools/rehype-url-inspector'

import "katex/dist/contrib/mhchem.js"
import markdown from 'remark-parse'
import gfm from 'remark-gfm'

const branch = process.env.VERCEL_GIT_COMMIT_REF
    ? process.env.VERCEL_GIT_COMMIT_REF : process.env.NODE_ENV == "development" 
    ? "dev": "master"

export const letters = 'abcdefgh'.split('')

export const ampUrl = (isAmp: boolean, url: string) => !isAmp? `/${url}?amp=1`: `/${url}`

const parseUnified = (data: string, filePath: string) => {
    const isAmp = true
    return unified()
    .use(markdown)
    .use(math)
    .use(gfm)
    .use(remark2rehype)
    .use(katex, {
        output: isAmp? 'html': 'htmlAndMathml'
    })
    .use(inspectUrls, {
        inspectEach({ url, node }) {
            if(new RegExp("^(?!www\.|(?:http|ftp)s?://|[A-Za-z]:\\|//).*").test(url)){
                node.properties.src = absolute(filePath, url)
            }
        },  
        selectors: [
            "img[src]"
        ]
    })
    .use(rehype2react, { 
        createElement: React.createElement,
        Fragment: React.Fragment,
        components: {
           img: (props: any) => isAmp? <div className="fixed-height-container "><amp-img className="contain" layout="fill" {...props}/></div>: <img {...props}/>
        } 
    })
    .processSync(data).result
}


export const parseQuestion = (md: string) => {
    const firstData = md.split(/-\s\[[\sx]\]\s.*/gi)

    const question = firstData[0].trim()
    const solution = firstData.length > 1? firstData[firstData.length - 1].trim(): ''

    let answer = -1
    const options: string[] = []
    const regexOptions = /-\s\[[\sx]\]\s(.*)/gi

    var m
    do {
        m = regexOptions.exec(md);
        if(m && m[0]){
            options.push(m[1].trim())
            const regexInternal = /-\s\[x\]\s/gi
            if(regexInternal.test(m[0]))
                answer = options.length - 1
        }
    } while (m)

    return {
        question,
        solution,
        options,
        answer
    } as QuestionParsed
}

export const questionParsed2MD = (questionParsed: QuestionParsed, filePath) => {
    return {
        question: parseUnified(questionParsed.question, filePath),
        solution: parseUnified(questionParsed.solution, filePath),
        options: questionParsed.options.map(option => parseUnified(option, filePath)),
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