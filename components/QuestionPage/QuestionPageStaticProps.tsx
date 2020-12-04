import { GitHub } from '../../lib/types';
import { getFileContentFromGHRepo, getNavFromNotebook } from '../../lib/utils';
import { GetStaticProps } from 'next';

export const QuestionPageStaticProps: GetStaticProps = async (context) => {
    console.log(1, context.params.slug)
    if (!context.params.slug)
        return { 
            props: {},
            revalidate: 1
        };

    try {
        const notebook = context.params.slug[0];

        const ghRepo: GitHub = {
            username: 'alexandregiordanelli',
            repo: 'questions_md'
        };

        const nav = await getNavFromNotebook(ghRepo, notebook);

        if (context.params.slug.length > 1) {
            const questionIndex = nav.questions.findIndex(x => x.url == context.params.slug[1]);

            if (questionIndex > -1) {
                const question = nav.questions[questionIndex];

                question.content = await getFileContentFromGHRepo(ghRepo, question.file);

                const questions = nav.questions.filter(x => x.topic == question.topic);
                const newQuestionIndex = questions.findIndex(x => x.url == context.params.slug[1]);

                return {
                    props: {
                        menu: nav.menu,
                        questions,
                        questionIndex: newQuestionIndex
                    },
                    revalidate: 1,
                };

            } else {
                return {
                    props: {}
                };
            }
        } else if (context.params.slug.length == 1) {

            return {
                props: {
                    menu: nav.menu,
                    questions: [nav.questions[0]],
                    questionBook: await getFileContentFromGHRepo(ghRepo, `${notebook}/index.md`),
                    questionIndex: -1
                },
                revalidate: 1,
            };
        }
    } catch (e) {
        console.log(e);

        return {
            props: {}
        };
    }
};
