import { GetStaticProps } from 'next';
import { PagesProps } from './Pages';
import getMenu from '../../services/getMenu';
import getQuestionof from '../../services/getQuestionof';
import getQuestion from '../../services/getQuestion';
import getSuggestions from '../../services/getSuggestions';

export const PagesStaticProps: GetStaticProps<{} | PagesProps> = async (context) => {
    if (!context.params.slug)
        return { 
            props: {},
            revalidate: 1
        };

    try {
        const questionsof = context.params.slug[0]
        
        const questionsOfDic = await getQuestionof(questionsof)
        const questionsofData = questionsOfDic.data

        questionsofData.menu = await getMenu(questionsof)

        if (context.params.slug.length > 1) {
            const questionUrl = context.params.slug[1]

            const question = await getQuestion(questionsof, questionUrl)

            const suggestions = await getSuggestions(questionsof, question.topic)

            return {
                props: {
                    content: questionsofData,
                    question,
                    questionSuggestions: suggestions
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
