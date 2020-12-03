import React from 'react';
import { QuestionForm } from './QuestionForm';
import { Menu, Question } from '../lib/types';
import { letters, parseQuestion, questionParsed2MD } from '../lib/utils';
import RightMenu from './RightMenu';
import Head from 'next/head';
import { ChevronRightIcon } from '@primer/octicons-react';
import { useAmp } from 'next/amp';

export const QuestionComponent = (props: {
    questions: Question[];
    menu: Menu[];
    questionIndex: number;
}) => {
    const isAmp = useAmp()
    
    const { questions, menu, questionIndex } = props;

    const question = questions[questionIndex];

    const questionParsed = parseQuestion(question.content);

    const questionMD = questionParsed2MD(isAmp, questionParsed, question.absolutUrl);

    const menuFiltered = menu.find(x => x.topics.some(y => y.topic == question.topic))

    const title = menuFiltered.topics.length > 1 ? <>{menuFiltered.title}<ChevronRightIcon className="icon-menu-right"/>{menuFiltered.topics.find(x => x.topic == question.topic).title}</>: <>{menuFiltered.title}</>

    return (
        <>
            <Head>
                <title>{question.title}</title>
                <meta name="description" content={question.title}></meta>
                {questionParsed.answer > -1 && <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [{
                                "@type": "Question",
                                "name": questionParsed.question,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": questionParsed.options[questionParsed.answer]
                                }
                            }]
                        })
                    }} />}
            </Head>
            <style jsx global>{`
            #right-answer:checked ~ #${letters[questionParsed.answer]} + label {
                background-color: rgb(220, 255, 228);
                border-color: rgba(23, 111, 44, 0.2);
            }
            .icon-menu-right {
                color: rgb(88, 96, 105);
                margin: 0 6px;
            }
            `}</style>
            <style jsx>{`
            @media (max-width: 767px) {
                .grid > div {
                    padding: 0 24px;
                }
            }

            @media screen and (min-width: 768px){
                .grid{
                    display: grid;
                    grid-template-columns: minmax(0px, 960px) 220px;
                    margin: 0 auto;
                    column-gap: 48px;
                    padding: 48px;
                    grid-template-areas: "content table-of-contents";
                }
            }
            .grid div {
                grid-area: content / content / content / content;
            }

            div > h2 {
                padding-bottom: .3em;
                border-bottom: 1px solid #eaecef;
                margin: 0;
                margin-bottom: 16px;
                font-weight: 600;
                line-height: 1.25;
            }
            `}</style>
            <div className="grid">
                <RightMenu
                    title={title}
                    questions={questions} 
                />
                <div>
                    <h2>{question.title}</h2>
                    {/* <h2>Question {questions.findIndex(x => x.url == question.url) + 1} of {questions.length}</h2> */}
                    <QuestionForm
                        data={questionMD}
                        filePath={question.absolutUrl} 
                    />
                </div>
            </div>
        </>
    );
};
