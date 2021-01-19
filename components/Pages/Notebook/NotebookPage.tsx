import React from "react"
import { LeftMenu } from "./LeftMenu"
import { IndexQuestionPage } from "./IndexQuestionPage"
import { QuestionFormWithRightMenu } from "./QuestionFormWithRightMenu"
import { PagesProps } from "../../../lib/types"
import EditNotebook from "../../EditNotebook"
import { useRouter } from "next/router"
import EditQuestion from "../../EditQuestion"
import Link from "next/link"

const NotebookPage: React.FC<{

} & PagesProps> = props => {
    const router = useRouter()
        
    const slug = router.query['slug'] as string[]
        
    const deepth = slug?.length

    return (
        <>
            <div className={`${(router.query.edit || router.query.add)? 'max-h-1000px': 'max-h-0'} transition-all `}>
            {deepth == 1 && 
                (router.query.edit && <EditNotebook notebook={props.notebook}/>) ||
                (router.query.add  && <EditQuestion notebook={props.notebook} />)
            }
            {deepth > 1 && props.question &&
                router.query.edit && <EditQuestion notebook={props.notebook} question={props.question} />
            }
            </div>
            <div className={"flex"}>
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
        </>
    )
}

export default NotebookPage