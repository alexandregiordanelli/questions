import React from "react"
import { Menu, Question } from "../../../lib/types"
import { LeftMenu } from "./LeftMenu"
import { IndexQuestionPage } from "./IndexQuestionPage"
import { QuestionFormWithRightMenu } from "./QuestionFormWithRightMenu"

const QuestionPage: React.FC<{
    deepth: number
    menu: Menu[]
    questions: Question[]
    questionIndex: number
    questionBook: string
}> = props => {
    return (
        <>
            <style jsx>{`
            .container {
                display: flex;
            }
            `}</style>
            <div className={"container"}>
                {props.deepth >= 1 && <LeftMenu menu={props.menu} />}
                {props.deepth > 1 && <QuestionFormWithRightMenu menu={props.menu} questions={props.questions} questionIndex={props.questionIndex} />}
                {props.deepth == 1 && <IndexQuestionPage questionBook={props.questionBook} startUrl={""} />}
            </div>
        </>
    )
}

export default QuestionPage