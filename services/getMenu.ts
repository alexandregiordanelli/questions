import admin from "../lib/firebase-server"
import { Menu, Question2, Topic } from "../lib/types"
import { questionConverter } from "../lib/utils"
import getQuestionof from "./getQuestionof"

const questionQueryTopicUrl = async (questionsfRef: FirebaseFirestore.CollectionReference<Question2>, topic: string, questionsofUrl: string) => {
    const doc = await questionsfRef.where("topic", "==", topic).orderBy("title").limit(1).get()
    if(!doc.empty)
        return `${questionsofUrl}/${doc.docs[0].data().url}`
    return null
}

const getMenu = async (questionsof: string) => {

    const db = admin.firestore()

    const questionsOfDic = await getQuestionof(questionsof)
    const questionsofData = questionsOfDic.data

    const questionsfRef = db.collection("questionsof").doc(questionsOfDic.id).collection("questions").withConverter(questionConverter)

    const topics = questionsofData.menu.reduce((x,y) => x.concat(y.topics.map(y => y.topic)), [] as string[])

    const topicsPromise = topics.map(async x => ({
        title: questionsofData.menu.find(z => z.topics.some(a => a.topic == x)).topics.find(z => z.topic == x).title,
        url: await questionQueryTopicUrl(questionsfRef, x, questionsofData.url),
        topic: x
    }) as Topic)

    const topicsResolved = await Promise.all(topicsPromise)

    return questionsofData.menu.sort((a, b) => a.title > b.title ? 1 : -1).map(x => ({
        ...x, 
        topics: x.topics.sort((a, b) => a.title > b.title ? 1 : -1).map(y => topicsResolved.find(z => z.topic == y.topic))
    } as Menu))
}
export default getMenu