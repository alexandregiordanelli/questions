import { Notebook, PromiseReturnType, Topic, SubTopic, Alternative, Question, RightAlternative } from "@prisma/client";
import { NowRequest } from "@vercel/node";
import { Reducer } from "react"

import getMenu from "../services/getMenu";
import getQuestion from "../services/getQuestion";
import getSuggestions from "../services/getSuggestions";

export type MenuWithQuestions = PromiseReturnType<typeof getMenu>
export type QuestionWithAll = Question & {
    notebook: Notebook;
    alternatives: Alternative[];
    rightAlternative: RightAlternative;
    subTopic: SubTopic;
}
export type SubTopicWithQuestions = PromiseReturnType<typeof getSuggestions>

export type NotebookWithTopicsAndSubTopics = Notebook & {
    topics: (Topic & {
        subtopics: SubTopic[];
    })[];
}

export type PagesProps = {
    notebook: NotebookWithTopicsAndSubTopics,
    menu: MenuWithQuestions,
    question?: QuestionWithAll,
    suggestions?: SubTopicWithQuestions,
}

export type Path = {
    params: {
        slug: string[]
    }
}


export enum Env {
    development = 'development',
    preview = 'preview',
    production = 'production'
}