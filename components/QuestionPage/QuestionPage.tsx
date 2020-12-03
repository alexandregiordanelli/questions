import { useRouter } from 'next/router';
import React from 'react';
import { Menu, Question } from '../../lib/types';
import { globalCSS } from '../../styles/globalCSS';
import { katexCSS } from "../../styles/katexCSS";
import { QuestionComponent } from '../QuestionComponent';
import { MainTemplate } from '../MainTemplate';
import { QuestionBook } from '../QuestionBook';
import { useAmp } from 'next/amp';
import { ampUrl } from '../../lib/utils';
import Head from 'next/head';

export const QuestionPage = (props: {
    questions: Question[];
    menu: Menu[];
    questionIndex: number;
    questionBook: string;
}) => {
    const isAmp = useAmp()
    
    const router = useRouter();

    if (router.isFallback) return <div>Loading...</div>;
        
    const slug = router.query['slug'] as string[]

    if (!slug) return null;
        
    const deepth = slug.length;

    const { menu, questions, questionIndex, questionBook } = props;

    if (!(menu || questions)) return null;
        
    const renderMainBox = () => {
        if (deepth > 1) return <QuestionComponent menu={menu} questions={questions} questionIndex={questionIndex} />;
        else if (deepth == 1) return <QuestionBook questionBook={questionBook} startUrl={""} />;
    };

    return (
        <>
            <Head>
                <link rel={isAmp? "canonical": "amphtml"} href={ampUrl(!isAmp, slug.join('/'))}/>
            </Head>
            <style jsx global>
                {katexCSS}
            </style>
            <style jsx global>
                {globalCSS}
            </style>
            <MainTemplate menu={menu}>
                {renderMainBox()}
            </MainTemplate>
        </>
    );
};
