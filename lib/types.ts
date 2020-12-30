import { NowRequest } from "@vercel/node";
import { Probot } from "probot";
import { Reducer } from "react"
import firebase from '../lib/firebase-client';

export type Menu = {
    title: string
    topics: Topic[]
}
export type Topic = {
    title: string
    topic: string
    url: string
}
export type Question = {
    file: string
    title: string
    url: string
    topic: string;
    content?: string
    absolutUrl?: string
}
export type Nav = {
    menu: Menu[]
    questions: Question[]
}
export type Notebook = {
    name: string
    files: string[]
}
export type GitHub = {
    username: string
    repo: string
}
export type Path = {
    params: {
        slug: string[]
    }
}
export type QuestionParsed = {
    question: string
    solution: string
    options: string[]
    answer: number
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

export type Question2 = {
    question: string
    solution: string
    options: string[]
    answer: number
    topic: string
} & Question2Basic

export type QuestionsOf = {
    data: string
    menu: Menu[]
    price: number
    title: string
    url: string
    subtitle: string
}

export type Question2Basic = {
    title: string
    url: string
}

export type QuestionsOfDic = {
    id: string,
    data: QuestionsOf
}

export type ProbotRequest = NowRequest & {
    probot: Probot
}