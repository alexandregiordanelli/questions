import { useRouter } from 'next/router';
import React from 'react';
import { Menu, Question } from '../../lib/types';
import { globalCSS } from '../../styles/globalCSS';
import { katexCSS } from "../../styles/katexCSS";
import { QuestionComponent } from '../QuestionComponent';
import { MainTemplate } from '../MainTemplate';
import { QuestionBook } from '../QuestionBook';

export const QuestionPage = (props: {
    questions: Question[];
    menu: Menu[];
    questionIndex: number;
    questionBook: string;
}) => {
    const router = useRouter();

    if (router.isFallback) return <div>Loading...</div>;
        
    if (!router.query['slug']) return null;
        
    const deepth = router.query['slug'].length;

    const { menu, questions, questionIndex, questionBook } = props;

    if (!(menu || questions)) return null;
        
    const renderMainBox = () => {
        if (deepth > 1) return <QuestionComponent menu={menu} questions={questions} questionIndex={questionIndex} />;
        else if (deepth == 1) return <QuestionBook questionBook={questionBook} startUrl={""} />;
    };

    return (
        <>
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
