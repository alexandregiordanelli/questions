import React, { Fragment, useEffect, useState } from 'react';
import "katex/dist/contrib/mhchem.js"
import { QuestionParsed } from '../lib/types';
import { letters } from '../lib/utils';

export const QuestionForm: React.FC<{
    data: QuestionParsed
}> = props => {
    const [letterChosen, setLetterChosen] = useState('')
    const [showSolution, setShowSolution] = useState(false)
    const [showRightAnswer, setRightAnswer] = useState(false)

    useEffect(()=>{
        setLetterChosen('')
        setShowSolution(false)
        setRightAnswer(false)
    }, [props.data])

    const html = [
        <input key={0} type="checkbox" id="right-answer" checked={showRightAnswer} onChange={x => setRightAnswer(x.target.checked)}/>,
        <label key={1} htmlFor="right-answer">Right Answer</label>,
        <div key={2} className="q">{props.data.question}</div>
    ]

    props.data.options.forEach((x, i) => {
        const letter = letters[i]
        html.push(
            <Fragment key={3 + i.toString()}>
                <input type="radio" id={letter} name="qmd" checked={letter == letterChosen} value={letter} onChange={x => setLetterChosen(x.target.value)}/>
                <label htmlFor={letter}>{x}</label>
            </Fragment>
        )
    })

    html.push(...[
        <input key={5} type="checkbox" id="solution" checked={showSolution} onChange={x => setShowSolution(x.target.checked)}/>,
        <label key={6} htmlFor="solution">Solution</label>,
        <div key={7} className="s">{props.data.solution}</div>
    ])

    return (
        <form className="qmd" action="/api/hello" target="_blank">
            {html}
        </form>
    )
}