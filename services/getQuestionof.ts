import admin from '../lib/firebase-server';
import { QuestionsOfDic } from '../lib/types';
import { questionsofConverter } from '../lib/utils';

const getQuestionof = async (questionsof: string) => {
    const db = admin.firestore();
    const questionsofRef = db.collection("questionsof").withConverter(questionsofConverter);

    const questionsofQuery = await questionsofRef.where("url", "==", questionsof).limit(1).get();
    if (!questionsofQuery.empty) {
        const questionsofDoc = questionsofQuery.docs[0];
        const questionsofData = questionsofDoc.data();
        const questionsofId = questionsofDoc.id;

        return ({
            id: questionsofId,
            data: questionsofData
        }) as QuestionsOfDic;
    }
    return null;
};
export default getQuestionof;
