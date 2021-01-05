import { ApplicationFunction } from 'probot/lib/types';
import { parseQuestionMd, parseReadMd } from '../lib/utils';
import { Alternative } from '@prisma/client';
import { prisma } from "../prisma/prisma"
import admin from '../lib/firebase-server';

const listenerProbot: ApplicationFunction = (app) => {
    
    app.on('push', async (context) => {

        const users = await admin.auth().getUsers([{
            providerId: "github.com",
            providerUid: context.payload.sender.id.toString()
        }])
        
        if(users.notFound){
            return
        }

        const getFileContent = async (filepath: string) => {
            const pathParams = context.repo({ path:  filepath})
            const resp = await context.octokit.repos.getContent(pathParams)
            //@ts-ignore - data is in content property but I cant access on typescript
            const data: string = resp.data.content
            return Buffer.from(data, 'base64').toString();
        }

        const notebookTag = context.payload.repository.id

        const notebookOnRepo = await parseReadMd(await getFileContent("README.md"));




        const setFileOnDB = async (f) => {
            try {
                const pathArray = f.split('/');
                const fileName = pathArray[pathArray.length - 1];
                if (fileName.split('.')[1] == "md" && fileName.split('.')[0] != "README") {
                    const questionFilename = encodeURIComponent(f)
                    const questionOnRepo = await parseQuestionMd(await getFileContent(f))

                }
            } catch (e) {
                console.log('not found', f);
            }
        };

        for await (const { added, removed, modified } of context.payload.commits) {

            for await (const f of added) {
                await setFileOnDB(f);
            }

            for await (const f of modified) {
                await setFileOnDB(f);
            }

            for await (const f of removed) {
                encodeURIComponent(f)
            }

            console.log('added', added);
            console.log('removed', removed);
            console.log('modified', modified);
        }
    });

};
export default listenerProbot
