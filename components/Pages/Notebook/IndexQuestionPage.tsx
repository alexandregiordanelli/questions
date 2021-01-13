import React from 'react';
import remark2rehype from 'remark-rehype';
import unified from 'unified';
import markdown from 'remark-parse';
import gfm from 'remark-gfm';
import rehype2react from 'rehype-react';
import { Notebook } from '@prisma/client';
import { PencilIcon } from '@primer/octicons-react';
import { useRouter } from 'next/router';
export const IndexQuestionPage: React.FC<{
    notebook: Notebook;
}> = props => {
    const router = useRouter()
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
                        <div className="flex items-center">
                            <h2 className="main-title">{props.notebook.name}</h2>
                            <button onClick={()=> router.push({
                                pathname: `[...slug]`,
                                query: {
                                    slug: props.notebook.tag,
                                    edit: true
                                }
                            })}><PencilIcon className="text-white" size={'medium'} /></button>
                            
                        </div>
                        <p className="subtitle">{props.notebook.price ?? ""}</p>
                        
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
                .processSync(props.notebook.description).result}
                </div>
            </div>
        </>
    );
};
