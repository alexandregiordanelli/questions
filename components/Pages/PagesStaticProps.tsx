import { GetStaticProps } from 'next';
import { PagesProps } from './Pages';
import { Menu, Question2, Question2Basic, QuestionsOfDic } from '../../lib/types';
import { urlEnv } from '../../lib/utils';

export const PagesStaticProps: GetStaticProps<{} | PagesProps> = async (context) => {
    if (!context.params.slug)
        return { 
            props: {},
            revalidate: 1
        };

    try {
        const questionsof = context.params.slug[0]
        
        const questionsOfDicRes = await fetch(`${urlEnv}/api/questionsof/${questionsof}`)
        const questionsOfDic: QuestionsOfDic = await questionsOfDicRes.json()
        const questionsofData = questionsOfDic.data

        const menuRes = await fetch(`${urlEnv}/api/menu/${questionsof}`)
        const menu: Menu[] = await menuRes.json()

        questionsofData.menu = menu

        if (context.params.slug.length > 1) {
            const questionUrl = context.params.slug[1]

            const questionRes = await fetch(`${urlEnv}/api/question/${questionsof}/${questionUrl}`)
            const question: Question2 = await questionRes.json()

            const suggestionsRes = await fetch(`${urlEnv}/api/suggestions/${questionsof}/${question.topic}`)
            const suggestions: Question2Basic[] = await suggestionsRes.json()

            return {
                props: {
                    content: questionsofData,
                    question,
                    questionSuggestions: suggestions,
                    revalidate: 1,
                }
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
