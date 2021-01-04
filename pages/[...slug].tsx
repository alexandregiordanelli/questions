import { GetStaticPaths, GetStaticProps } from 'next';
import { Notebook } from '../components/Pages/Notebook/Notebook'
import { PagesProps } from '../lib/types';
import { prisma } from '../prisma/prisma';
import getMenu from '../services/getMenu';
import getNotebook from '../services/getNotebook';
import getQuestion from '../services/getQuestion';
import getQuestions from '../services/getQuestions';
import getSuggestions from '../services/getSuggestions';

export default Notebook
export const getStaticProps: GetStaticProps<PagesProps> = async (context) => {
    try {
        const questionsof = context.params.slug[0]
        
        const notebook = await getNotebook(questionsof)

        const menu = await getMenu(questionsof)

        if (context.params.slug.length > 1) {
            const questionUrl = context.params.slug[1]

            const question = await getQuestion(notebook.id, questionUrl)

            const suggestions = await getSuggestions(questionsof, question.subTopic.tag)
            
            prisma.$disconnect()

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
            
            prisma.$disconnect()

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
}

export const getStaticPaths: GetStaticPaths = async () => {

    const paths = await getQuestions('enem')

    return ({
        paths: paths.slice(0, 2),
        fallback: 'blocking'
    })
}
