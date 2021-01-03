import React from "react"
import { LeftMenu } from "./LeftMenu"
import { IndexQuestionPage } from "./IndexQuestionPage"
import { QuestionFormWithRightMenu } from "./QuestionFormWithRightMenu"
import { PagesProps } from "../../../lib/types"

const QuestionPage: React.FC<{
    deepth: number
} & PagesProps> = props => {
    return (
        <>

            <div className={"container"}>
                {props.deepth >= 1 && 
                    <LeftMenu 
                    menu={props.menu} 
                    />
                }
                {props.deepth > 1 && props.question && 
                    <QuestionFormWithRightMenu 
                    question={props.question} 
                    suggestions={props.suggestions} 
                    />
                }
                {props.deepth == 1 && 
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

export default QuestionPage