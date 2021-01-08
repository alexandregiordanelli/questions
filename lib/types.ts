import { Notebook, PromiseReturnType, Topic, SubTopic, Alternative, Question, RightAlternative } from "@prisma/client";
import { NowRequest } from "@vercel/node";
import { Probot } from "probot";
import { Reducer } from "react"
import firebase from '../lib/firebase-client';
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
    notebook: Notebook,
    menu: MenuWithQuestions,
    question?: QuestionWithAll,
    suggestions?: SubTopicWithQuestions,
}

export type Path = {
    params: {
        slug: string[]
    }
}
export type QuestionOnRepo = {
    question: string
    solution: string
    options: string[]
    answer: number
} & QuestionMetaOnRepo

export type QuestionMetaOnRepo = {
    id?: number
    topic: string
    url: string
    price?: number
    title?: string
    notebookId: number
}

export type NotebookOnRepo = {
    data: string
} & NotebookMetaOnRepo

export type NotebookMetaOnRepo = {
    id?: number
    name: string
    tag: string
    price: number
    topics: {
        id?: number
        name: string
        subtopics: {
            id?: number
            name: string
            tag: string
        }[]
    }[]
}

export enum Env {
    development = 'development',
    preview = 'preview',
    production = 'production'
}

export type MainContext = [MainState, React.Dispatch<MainAction>]

export type UserState = {
    currentUser: firebase.User
    allUsers: firebase.User[]
}

export enum UserActionType {
    ChangeUser,
    AddUser,
    DeleteUsers
}

export type UserAction = {
    type: UserActionType
    value?: firebase.User
}

export type MainState = {
    user: UserState
};

export type MainAction = UserAction

export type MainReducer = Reducer<MainState, MainAction>


export type ProbotRequest = NowRequest & {
    probot: Probot
}