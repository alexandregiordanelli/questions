import { ApplicationFunction } from 'probot/lib/types';
import { parseQuestionMd, parseReadMd } from '../lib/utils';
import admin from '../lib/firebase-server';

const listenerProbot: ApplicationFunction = (app) => {
    app.on('push', async (context) => {
        const db = admin.firestore()

        const getFilesOnPath = path => {
            const pathParams = context.repo({ path })
            return context.octokit.repos.getContent(pathParams)
        }

        const getFileContent = async (filepath) => {
            const resp = await getFilesOnPath(filepath)
            //@ts-ignore - data is in content property but I cant access on typescript
            const data: string = resp.data.content
            return Buffer.from(data, 'base64').toString();
        }

        const notebookItem = await parseReadMd(await getFileContent("README.md"));
        const notebookDoc = db.collection("questionsof").doc(context.payload.repository.id.toString());
        await notebookDoc.set(notebookItem);

        const setQuestionDataOnDB = async (filepath) => {
            
            const id = encodeURIComponent(filepath)
            const question = await parseQuestionMd(await getFileContent(filepath))
            return await notebookDoc.collection("questions")
                .doc(id)
                .set(question);
        }

        const setFileOnDB = async (f) => {
            try {
                const pathArray = f.split('/');
                const fileName = pathArray[pathArray.length - 1];
                if (fileName.split('.')[1] == "md" && fileName.split('.')[0] != "README") {
                    await setQuestionDataOnDB(f);
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
                await notebookDoc.collection("questions").doc(encodeURIComponent(f)).delete();
            }

            console.log('added', added);
            console.log('removed', removed);
            console.log('modified', modified);
        }
    });

};
export default listenerProbot
