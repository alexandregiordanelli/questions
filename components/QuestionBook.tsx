import React from 'react';
import remark2rehype from 'remark-rehype';
import unified from 'unified';
import markdown from 'remark-parse';
import gfm from 'remark-gfm';
import rehype2react from 'rehype-react';

export const QuestionBook: React.FC<{
    questionBook: string;
    startUrl: string;
}> = props => {
    return (
        <>
            <style jsx>{`
            .main {
                flex: 1;
            }
            .box {
                background-color: rgb(27, 31, 35);
                padding-top: 40px;
                padding-bottom: 40px;
            }
            .center {
                padding: 32px;
                margin-left: auto;
                margin-right: auto;
                width: 100%;
                max-width: 960px;    
            }
            .main-title {
                font-weight: 600;
                font-size: 48px;
                line-height: 1.25;
                color: rgb(33, 136, 255);
                padding-bottom: 16px;
                margin: 0px;
            }
            .subtitle {
                font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;
                font-size: 16px;
                margin-top: 0px;
                margin-bottom: 8px;
                color: rgb(121, 184, 255);
            }
            `}</style>
            <div className="main">
                <div className='box'>
                    <div className='center'>
                        <h2 className="main-title">Enem</h2>
                        <p className="subtitle">Enem Resolvido separado por assunto.</p>
                        {/* <img src="/enem.png"/> */}
                    </div>
                </div>
                <div className='center'>
                {unified()
                .use(markdown)
                .use(gfm)
                .use(remark2rehype)
                .use(rehype2react, {
                    createElement: React.createElement,
                    Fragment: React.Fragment
                })
                .processSync(props.questionBook).result}
                </div>
            </div>
        </>
    );
};
