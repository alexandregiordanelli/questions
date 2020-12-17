import admin from '../lib/firebase-server';
import { Path } from '../lib/types';
import { questionConverter } from '../lib/utils';
import getQuestionof from './getQuestionof';

const getQuestions = async (questionsof: string) => {
    const db = admin.firestore();

    const questionsOfDic = await getQuestionof(questionsof);

    const questionsQuery = await db.collection("questionsof").doc(questionsOfDic.id).collection("questions").withConverter(questionConverter).orderBy('url').get();
    const questionsListPath = questionsQuery.docs.map(x => ({
        params: {
            slug: [questionsOfDic.data.url].concat(x.data().url) // [enem,questao1]
        }
    }) as Path);

    return questionsListPath;
};
export default getQuestions;
