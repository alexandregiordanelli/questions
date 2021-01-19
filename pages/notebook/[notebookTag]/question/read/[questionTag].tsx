import { GetStaticProps, NextPage, GetStaticPaths } from "next"
import getNotebook from "../../../../../services/getNotebook"
import getMenu from "../../../../../services/getMenu"
import { NotebookWithTopicsAndSubTopics, MenuWithQuestions, QuestionWithAll, SubTopicWithQuestions } from "../../../../../lib/types"
import HeadHtml from "../../../../../components/HeadHtml"
import { Header } from "../../../../../components/Header"
import { LeftMenu } from "../../../../../components/Pages/Notebook/LeftMenu"
import getQuestion from "../../../../../services/getQuestion"
import getSuggestions from "../../../../../services/getSuggestions"
import { QuestionFormWithRightMenu } from "../../../../../components/Pages/Notebook/QuestionFormWithRightMenu"

type PageProps = {
    notebook: NotebookWithTopicsAndSubTopics,
    menu: MenuWithQuestions
    question: QuestionWithAll
    suggestions: SubTopicWithQuestions
}

const ReadQuestionPage: NextPage<PageProps> = props => {
    return <>
        <HeadHtml />
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex">
                <LeftMenu
                menu={props.menu}
                />
                <QuestionFormWithRightMenu 
                question={props.question} 
                suggestions={props.suggestions} 
                />
            </div>
        </div>
    </>
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
    try {
        const notebookTag = context.params.notebookTag as string
        const questionTag = context.params.questionTag as string

        const notebook = await getNotebook(notebookTag)

        if (!notebook) {
            return {
                notFound: true
            }
        }

        if (!notebook.id) {
            return {
                notFound: true
            }
        }

        const menu = await getMenu(notebook.tag)

        const question = await getQuestion(notebook.id, questionTag)

        if(!question){
            return {
                notFound: true
            }
        }

        const suggestions = await getSuggestions(notebook.tag, question.subTopic?.id)

        return {
            props: {
                notebook,
                menu,
                question,
                suggestions
            },
            revalidate: 1
        };

    } catch (e) {
        console.log(e);

        return {
            notFound: true
        };
    }
}

export const getStaticPaths: GetStaticPaths = async () => {

    // const questions = await getQuestions()
    // const paths = questions.map(x => ({
    //     params: {
    //         notebookTag: x.tag
    //     }
    // }))

    return ({
        paths: [],
        fallback: 'blocking'
    })
}
export default ReadQuestionPage