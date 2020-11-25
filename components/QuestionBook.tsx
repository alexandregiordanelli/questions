import React from 'react';
import remark2rehype from 'remark-rehype';
import unified from 'unified';
import markdown from 'remark-parse';
import gfm from 'remark-gfm';
import rehype2react from 'rehype-react';
import Link from 'next/link';

export const QuestionBook: React.FC<{
    questionBook: string;
    startUrl: string;
}> = props => {
    return (
        <>
            <div>{unified()
                .use(markdown)
                .use(gfm)
                .use(remark2rehype)
                .use(rehype2react, {
                    createElement: React.createElement
                })
                .processSync(props.questionBook).result}</div>
            <h2><Link href={props.startUrl}><a>Start</a></Link></h2>
        </>
    );
};
