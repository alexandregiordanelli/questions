import { GetStaticProps } from 'next';
import getNotebook from '../../services/getNotebook';
import getMenu from '../../services/getMenu';
import getQuestion from '../../services/getQuestion';
import getSuggestions from '../../services/getSuggestions';
import { PagesProps } from '../../lib/types';


export const PagesStaticProps: GetStaticProps<PagesProps> = async (context) => {
    if (!context.params.slug)
        return { 
            revalidate: 1,
            notFound: true
        };

    try {
        const questionsof = context.params.slug[0]
        
        const notebook = await getNotebook(questionsof)

        const menu = await getMenu(questionsof)

        if (context.params.slug.length > 1) {
            const questionUrl = context.params.slug[1]

            const question = await getQuestion(questionsof, questionUrl)

            const suggestions = await getSuggestions(questionsof, question.subTopicTag)
            
            return {
                props: {
                    notebook,
                    menu,
                    question,
                    suggestions
                },
                revalidate: 1
            };

        } else if (context.params.slug.length == 1) {

            return {
                props: {
                    notebook,
                    menu
                },
                revalidate: 1,
            };
        }
    } catch (e) {
        console.log(e);

        return {
            notFound: true
        };
    }
};
