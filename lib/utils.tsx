import { Env, NotebookMetaOnRepo, NotebookOnRepo, QuestionMetaOnRepo, QuestionOnRepo, QuestionWithAll } from "./types"
import matter from 'gray-matter'

export const urlEnvDic = {
    [Env.development]: 'http://localhost:3000',
    [Env.preview]: `https://questionsof-git-${process.env.VERCEL_GIT_COMMIT_REF}.giordanelli.vercel.app`,
    [Env.production]: 'https://questionsof.com'
}

const env = process.env.NEXT_PUBLIC_VERCEL_ENV as Env

export const urlEnv = urlEnvDic[Env[env]]

export const letters = 'abcdefgh'.split('')

export const ampUrl = (isAmp: boolean, url = "") => isAmp? `/amp/${url}`: `/${url}`

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
// export const parseQuestionMd = async (md: string) => {

//     const mdparsed = matter(md)
    
//     const meta = mdparsed.data as QuestionMetaOnRepo
//     const data = mdparsed.content
    
//     const firstData = data.split(/-\s\[[\sx]\]\s.*/gi)
    
//     const question = firstData[0].trim()
//     const solution = firstData.length > 1? firstData[firstData.length - 1].trim(): ''
    
//     let answer = -1
//     const options = []
//     const regexOptions = /-\s\[[\sx]\]\s(.*)/gi
    
//     var m
//     do {
//         m = regexOptions.exec(data);
//         if(m && m[0]){
//             options.push(m[1].trim())
//             const regexInternal = /-\s\[x\]\s/gi
//             if(regexInternal.test(m[0]))
//                 answer = options.length - 1
//         }
//     } while (m)

//     const resp: QuestionOnRepo = {
//         question,
//         solution,
//         options,
//         answer, 
//         ...meta
//     }

//     return resp
// }

// export const parseReadMd = async (md: string) => {
//     const mdparsed = matter(md)
//     const meta = mdparsed.data as NotebookMetaOnRepo
//     const data = mdparsed.content

//     const resp: NotebookOnRepo = {
//         ...meta,
//         data
//     }

//     return resp
// }