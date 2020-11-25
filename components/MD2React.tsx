import React from 'react';
import "katex/dist/contrib/mhchem.js"
import { QuestionParsed } from '../lib/types';
import { letters } from '../lib/utils';

export const MD2React: React.FC<{
    data: QuestionParsed, 
    filePath: string
}> = props => {

    const html = [
        <input key={0} type="checkbox" id="right-answer"/>,
        <label key={1} htmlFor="right-answer">Right Answer</label>,
        <div key={2} className="q">{props.data.question}</div>
    ]

    props.data.options.forEach((x, i) => {
        const letter = letters[i]
        html.push(
            <>
                <input key={3} type="radio" id={letter} name="qmd" value={letter}/>
                <label key={4} htmlFor={letter}>{x}</label>
            </>
        )
    })

    html.push(...[
        <input key={5} type="checkbox" id="solution"/>,
        <label key={6} htmlFor="solution">Solution</label>,
        <div key={7} className="s">{props.data.solution}</div>
    ])


    return (
        <form className="qmd" action="/api/hello" target="_blank">
            {html}
        </form>
    )
}