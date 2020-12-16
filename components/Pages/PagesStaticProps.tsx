import { GitHub, Question2, QuestionsOf, Topic } from '../../lib/types';
import { getFileContentFromGHRepo, getNavFromNotebook, questionConverter, questionsofConverter } from '../../lib/utils';
import { GetStaticProps } from 'next';
import { PagesProps } from './Pages';
import admin from '../../lib/firebase-server';

export const PagesStaticProps: GetStaticProps<{} | PagesProps> = async (context) => {
    if (!context.params.slug)
        return { 
            props: {},
            revalidate: 1
        };

    try {


        const questionsof = context.params.slug[0]
        
        const db = admin.firestore()
        const questionsofRef = db.collection("questionsof").withConverter(questionsofConverter)
        const questionsofQuery = await questionsofRef.where("url", "==", questionsof).get()
        if(questionsofQuery.empty){
            return {
                props: {}
            }
        }
        const questionsofDoc = questionsofQuery.docs[0]
        const questionsofData = questionsofDoc.data()
        const questionsofId = questionsofDoc.id

        const questionQueryTopicUrl = async topic => {
            const doc = await questionsofRef.doc(questionsofId).collection("questions").withConverter(questionConverter).where("topic", "==", topic).orderBy("title").limit(1).get()
            if(!doc.empty){
                return `${questionsofData.url}/${doc.docs[0].data().url}`
            } return null
        }

        const topics = questionsofData.menu.reduce((x,y) => x.concat(y.topics.map(y => y.topic)), [] as string[])

        const topicsPromise = topics.map(async x => ({
            title: questionsofData.menu.find(z => z.topics.some(a => a.topic == x)).topics.find(z => z.topic == x).title,
            url: await questionQueryTopicUrl(x),
            topic: x
        }) as Topic)
        
        const topicsResolved = await Promise.all(topicsPromise)

        questionsofData.menu = questionsofData.menu.sort((a, b) => a.title > b.title ? 1 : -1).map(x => ({
            ...x, 
            topics: x.topics.sort((a, b) => a.title > b.title ? 1 : -1).map(y => topicsResolved.find(z => z.topic == y.topic))
        }))

        if (context.params.slug.length > 1) {
            const questionURL = context.params.slug[1]
            const questionQueryMain = await questionsofRef.doc(questionsofId).collection("questions").withConverter(questionConverter).where("url", "==", questionURL).get()
            if(questionQueryMain.empty){
                return {
                    props: {}
                }
            }
            const questionDoc = questionQueryMain.docs[0]
            const questionData = questionDoc.data()

            
            return {
                props: {
                    content: questionsofData,
                    question: questionData
                },
                revalidate: 1,
            };

        } else if (context.params.slug.length == 1) {

            return {
                props: {
                    content: questionsofData
                },
                revalidate: 1,
            };
        }
    } catch (e) {
        console.log(e);

        return {
            props: {
            }
        };
    }
};
