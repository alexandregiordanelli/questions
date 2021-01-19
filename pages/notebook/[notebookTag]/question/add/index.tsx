import { NextPage, GetServerSideProps } from "next";
import EditQuestion from "../../../../../components/EditQuestion";
import getNotebook from "../../../../../services/getNotebook";
import { NotebookWithTopicsAndSubTopics } from "../../../../../lib/types";

type PageProps = {
    notebook: NotebookWithTopicsAndSubTopics,
}

const AddQuestionPage: NextPage<PageProps> = props => {
    return <EditQuestion notebook={props.notebook} />
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    try {

        const notebookTag = context.params.notebookTag as string
        
        const notebook = await getNotebook(notebookTag)

        if(!notebook || !notebook.id){
            return {
                notFound: true
            }
        }

        return {
            props: {
                notebook,
            },
        };


    } catch (e) {
        console.log(e);

        return {
            notFound: true
        };
    }
}

export default AddQuestionPage