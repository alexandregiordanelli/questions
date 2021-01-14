import React from "react"
import { LeftMenu } from "./LeftMenu"
import { IndexQuestionPage } from "./IndexQuestionPage"
import { QuestionFormWithRightMenu } from "./QuestionFormWithRightMenu"
import { PagesProps } from "../../../lib/types"
import EditNotebook from "../../EditNotebook"
import { useRouter } from "next/router"

const NotebookPage: React.FC<{

} & PagesProps> = props => {
    const router = useRouter()
        
    const slug = router.query['slug'] as string[]
        
    const deepth = slug?.length

    return (
        <>
            <div className={`${router.query.edit? 'max-h-full': 'max-h-0'} transition-all overflow-hidden`}><EditNotebook notebook={props.notebook}/></div>
            <div className={"container"}>
                {deepth >= 1 && 
                    <LeftMenu 
                    menu={props.menu} 
                    />
                }
                {deepth > 1 && props.question && 
                    <QuestionFormWithRightMenu 
                    question={props.question} 
                    suggestions={props.suggestions} 
                    />
                }
                {deepth == 1 && 
                    <IndexQuestionPage 
                    notebook={props.notebook} 
                    />
                }
            </div>

            <style jsx>{`
            .container {
                display: flex;
            }
            `}</style>

        </>
    )
}

export default NotebookPage