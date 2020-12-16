import React from "react"
import { Menu, Question, Question2, QuestionsOf } from "../../../lib/types"
import { LeftMenu } from "./LeftMenu"
import { IndexQuestionPage } from "./IndexQuestionPage"
import { QuestionFormWithRightMenu } from "./QuestionFormWithRightMenu"

const QuestionPage: React.FC<{
    deepth: number
    content: QuestionsOf
    question?: Question2
}> = props => {
    return (
        <>

            <div className={"container"}>
                {props.deepth >= 1 && <LeftMenu menu={props.content.menu} />}
                {props.deepth > 1 && props.question && <QuestionFormWithRightMenu question={props.question} />}
                {props.deepth == 1 && <IndexQuestionPage content={props.content} />}
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