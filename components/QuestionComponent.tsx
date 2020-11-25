import React from 'react';
import { QuestionForm } from './QuestionForm';
import { Menu, Question } from '../lib/types';
import { letters, parseQuestion, questionParsed2MD } from '../lib/utils';
import RightMenu from './RightMenu';
import Head from 'next/head';

export const QuestionComponent = (props: {
    questions: Question[];
    menu: Menu[];
    questionIndex: number;
}) => {
    const { questions, menu, questionIndex } = props;

    const question = questions[questionIndex];

    const questionParsed = parseQuestion(question.content);

    const questionMD = questionParsed2MD(questionParsed, question.absolutUrl);

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
            `}</style>
            <RightMenu
                title={`${menu.find(x => x.topics.some(y => y.topic == question.topic)).title} / 
                    ${menu.find(x => x.topics.some(y => y.topic == question.topic)).topics.find(x => x.topic == question.topic).title}
                `}
                questions={questions} 
            />
            <div>
                <h2>Question {questions.findIndex(x => x.url == question.url) + 1} of {questions.length}</h2>
                <QuestionForm
                    data={questionMD}
                    filePath={question.absolutUrl} 
                />
            </div>
        </>
    );
};
