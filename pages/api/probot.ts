const frontmatter = require('@github-docs/frontmatter')
import { NowApiHandler, NowRequest, NowResponse } from "@vercel/node";
import { createNodeMiddleware, createProbot, Probot } from "probot"
import { ApplicationFunction } from 'probot/lib/types';
import admin from '../../lib/firebase-server';


const db = admin.firestore()

async function parseReadMd(md){
    const mdparsed = frontmatter(md)
    const meta = mdparsed.data
    const data = mdparsed.content
    return {
        ...meta,
        data
    }
}

async function parseQuestionMd(md){
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

const myApp: ApplicationFunction = app => {
    console.log(2222)
    app.log('Yay, the app was loaded!')
    app.webhooks.onAny(()=>{
        console.log("aqui")
    })
    app.on('issue_comment', async (context) => {

        console.log(111)
        console.log(context)
        // const getFilesOnPath = path => context.octokit.repos.getContent(context.repo({ path }))

        // const getFileContent = async filepath => Buffer.from(
        //     (await getFilesOnPath(filepath)).data.toString(), 'base64'
        // ).toString()

        // const notebookItem = await parseReadMd(await getFileContent("README.md"))
        // const notebookDoc = db.collection("questionsof").doc(context.payload.repository.id.toString())                            
        // await notebookDoc.set(notebookItem)

        // const question = async filepath => await notebookDoc.collection("questions").doc(encodeURIComponent(filepath)).set(await parseQuestionMd(await getFileContent(filepath)))

        // const setOnDB = async f => {
        //     try{
        //         const pathArray = f.split('/')
        //         const fileName = pathArray[pathArray.length - 1]
        //         if(fileName.split('.')[1] == "md" && fileName.split('.')[0] != "README"){
        //             await question(f)
        //         }
        //     }catch(e){
        //         console.log('not found', f)
        //     }
        // }
        
        // for await (const {added, removed, modified} of context.payload.commits){

        //     for await (const f of added) {
        //         await setOnDB(f)
        //     }

        //     for await (const f of modified) {
        //         await setOnDB(f)
        //     }

        //     for await (const f of removed) {
        //         await notebookDoc.collection("questions").doc(encodeURIComponent(f)).delete()
        //     }

        //     console.log('added', added)
        //     console.log('removed', removed)
        //     console.log('modified', modified)
        // }

    });

    // For more information on building apps:
    // https://probot.github.io/docs/

    // To get your app running against GitHub, see:
    // https://probot.github.io/docs/development/
};



  
const probot: NowApiHandler = async (req, res) => {
    console.log(req.headers)
}
export default probot
