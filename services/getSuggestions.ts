import admin from '../lib/firebase-server';
import { Question2Basic } from '../lib/types';
import { questionConverter } from '../lib/utils';
import getQuestionof from './getQuestionof';

const getSuggestions = async (questionsof: string, topic: string) => {
    const db = admin.firestore();

    const questionsOfDic = await getQuestionof(questionsof);

    const questionQueryFromTopic = await db.collection("questionsof").doc(questionsOfDic.id).collection("questions").withConverter(questionConverter).where("topic", "==", topic).orderBy("title").get();
    const questionSuggestions = questionQueryFromTopic.docs.map(x => ({
        title: x.data().title,
        url: `${questionsOfDic.data.url}/${x.data().url}`
    } as Question2Basic));

    return questionSuggestions;
};
export default getSuggestions;
