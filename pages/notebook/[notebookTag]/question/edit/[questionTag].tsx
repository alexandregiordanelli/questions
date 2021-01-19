import { NextPage, GetServerSideProps } from "next";
import { NotebookWithTopicsAndSubTopics } from "../../../../../lib/types";
import getNotebook from "../../../../../services/getNotebook";
import EditQuestion from "../../../../../components/EditQuestion";

type PageProps = {
    notebook: NotebookWithTopicsAndSubTopics,
}

const EditQuestionPage: NextPage<PageProps> = props => {
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

export default EditQuestionPage