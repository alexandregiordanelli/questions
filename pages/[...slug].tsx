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
        const notebookTag = context.params.slug[0]
        
        const notebook = await prisma.notebook.findUnique({
            where: {
                tag: notebookTag
            }
        })

        if(!notebook.id){
            return {
                notFound: true
            }
        }

        const menu = await getMenu(notebookTag)

        if (context.params.slug.length > 1) {
            const questionUrl = context.params.slug[1]

            const question = await getQuestion(notebookTag, questionUrl)

            if(!question){
                return {
                    notFound: true
                }
            }

            const suggestions = await getSuggestions(notebookTag, question.subTopic.tag)

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
}

export const getStaticPaths: GetStaticPaths = async () => {

    const paths = await getQuestions('enem')

    return ({
        paths: paths.slice(0, 2),
        fallback: 'blocking'
    })
}
