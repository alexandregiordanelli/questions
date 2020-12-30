import { Env, Question2, QuestionParsed, QuestionsOf } from "./types";
import React from 'react';
import math from 'remark-math';
import remark2rehype from 'remark-rehype';
import katex from 'rehype-katex';
import unified from 'unified'
import rehype2react from 'rehype-react';
import frontmatter from '@github-docs/frontmatter'
import "katex/dist/contrib/mhchem.js"
import markdown from 'remark-parse'
import gfm from 'remark-gfm'

export const urlEnvDic = {
    [Env.development]: 'http://localhost:3000',
    [Env.preview]: `https://questionsof-git-${process.env.VERCEL_GIT_COMMIT_REF}.giordanelli.vercel.app`,
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

export const parseQuestionMd = async md => {
    const mdparsed = frontmatter(md)
    
    const meta = mdparsed.data
    const data = mdparsed.content
    
    const firstData = data.split(/-\s\[[\sx]\]\s.*/gi)
    
    const question = firstData[0].trim()
    const solution = firstData.length > 1? firstData[firstData.length - 1].trim(): ''
    
    let answer = -1
    const options = []
    const regexOptions = /-\s\[[\sx]\]\s(.*)/gi
    
    var m
    do {
        m = regexOptions.exec(data);
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
        answer, 
        ...meta
    }
}

export const parseReadMd = async md => {
    const mdparsed = frontmatter(md)
    const meta = mdparsed.data
    const data = mdparsed.content
    return {
        ...meta,
        data
    }
}