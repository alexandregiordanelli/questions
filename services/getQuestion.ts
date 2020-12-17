import admin from '../lib/firebase-server';
import { questionConverter } from '../lib/utils';
import getQuestionof from './getQuestionof';
export const getQuestion = async (questionsof: string, questionUrl: string) => {
    const db = admin.firestore();

    const questionsOfDic = await getQuestionof(questionsof);

    const questionQueryMain = await db.collection("questionsof").doc(questionsOfDic.id).collection("questions").withConverter(questionConverter).where("url", "==", questionUrl).limit(1).get();

    if (!questionQueryMain.empty) {
        const questionDoc = questionQueryMain.docs[0];
        const questionData = questionDoc.data();
        return questionData;
    }

    return null;
};
export default getQuestion;
